import { OpenAIProvider } from './providers/openai';
import { AnthropicProvider } from './providers/anthropic';
import { GoogleProvider } from './providers/google';
import { MistralProvider } from './providers/mistral';
import { DeepSeekProvider } from './providers/deepseek';
import { AIProvider, ChatRequest, ChatResponse } from './providers/base';
import { supabase } from '@/lib/supabase/client';

interface RateLimitState {
  requests: number;
  tokens: number;
  windowStart: number;
}

interface CircuitBreakerState {
  failures: number;
  lastFailure: number;
  state: 'closed' | 'open' | 'half-open';
}

export class AIService {
  private providers: Map<string, AIProvider> = new Map();
  private rateLimits: Map<string, RateLimitState> = new Map();
  private circuitBreakers: Map<string, CircuitBreakerState> = new Map();
  private readonly CIRCUIT_BREAKER_THRESHOLD = 5;
  private readonly CIRCUIT_BREAKER_TIMEOUT = 60000; // 1 minute

  constructor() {
    this.initializeProviders();
  }

  private initializeProviders() {
    const providers = [
      new OpenAIProvider(),
      new AnthropicProvider(),
      new GoogleProvider(),
      new MistralProvider(),
      new DeepSeekProvider(),
    ];

    for (const provider of providers) {
      this.providers.set(provider.name, provider);
      this.circuitBreakers.set(provider.name, {
        failures: 0,
        lastFailure: 0,
        state: 'closed',
      });
    }
  }

  /**
   * Main chat method with intelligent provider selection and fallback
   */
  async chat(request: ChatRequest): Promise<ChatResponse> {
    // Check user subscription and rate limits
    await this.checkUserAccess(request.userId, request.organizationId);

    // Determine the best provider for the request
    const providerName = this.selectProvider(request.model);
    
    if (!providerName) {
      throw new Error(`No provider available for model: ${request.model}`);
    }

    // Try primary provider with fallback
    try {
      const response = await this.executeWithFallback(request, providerName);
      
      // Log successful request
      await this.logChatRequest(request, response, 'success');
      
      return response;
    } catch (error) {
      // Log failed request
      await this.logChatRequest(request, null, 'failed', error as Error);
      throw error;
    }
  }

  /**
   * Get all available models across providers
   */
  getAvailableModels(): Record<string, string[]> {
    const models: Record<string, string[]> = {};
    
    for (const [name, provider] of this.providers) {
      if (this.isProviderHealthy(name)) {
        models[name] = provider.models;
      }
    }
    
    return models;
  }

  /**
   * Get provider health status
   */
  async getProviderStatus(): Promise<Record<string, boolean>> {
    const status: Record<string, boolean> = {};
    
    for (const [name, provider] of this.providers) {
      try {
        status[name] = await provider.isAvailable() && this.isProviderHealthy(name);
      } catch {
        status[name] = false;
      }
    }
    
    return status;
  }

  private selectProvider(model: string): string | null {
    // Find providers that support the requested model
    const availableProviders: string[] = [];
    
    for (const [name, provider] of this.providers) {
      if (provider.models.includes(model) && this.isProviderHealthy(name)) {
        availableProviders.push(name);
      }
    }

    if (availableProviders.length === 0) {
      return null;
    }

    // Prefer providers with lower current load
    return availableProviders.sort((a, b) => {
      const aState = this.rateLimits.get(a);
      const bState = this.rateLimits.get(b);
      const aLoad = aState ? aState.requests : 0;
      const bLoad = bState ? bState.requests : 0;
      return aLoad - bLoad;
    })[0];
  }

  private async executeWithFallback(request: ChatRequest, primaryProvider: string): Promise<ChatResponse> {
    const provider = this.providers.get(primaryProvider);
    if (!provider) {
      throw new Error(`Provider ${primaryProvider} not found`);
    }

    try {
      // Check rate limits
      if (!this.checkRateLimit(primaryProvider, request)) {
        throw new Error(`Rate limit exceeded for ${primaryProvider}`);
      }

      // Execute request
      const response = await provider.chat(request);
      
      // Update rate limits
      this.updateRateLimit(primaryProvider, response.usage.totalTokens);
      
      // Reset circuit breaker on success
      this.resetCircuitBreaker(primaryProvider);
      
      return response;
    } catch (error) {
      // Update circuit breaker
      this.recordFailure(primaryProvider);
      
      // Try fallback providers
      const fallbackProvider = this.findFallbackProvider(request.model, primaryProvider);
      if (fallbackProvider) {
        console.log(`Falling back to ${fallbackProvider} due to ${primaryProvider} failure`);
        return this.executeWithFallback(request, fallbackProvider);
      }
      
      throw error;
    }
  }

  private findFallbackProvider(model: string, excludeProvider: string): string | null {
    for (const [name, provider] of this.providers) {
      if (name !== excludeProvider && 
          provider.models.includes(model) && 
          this.isProviderHealthy(name)) {
        return name;
      }
    }
    return null;
  }

  private checkRateLimit(providerName: string, request: ChatRequest): boolean {
    const provider = this.providers.get(providerName);
    if (!provider) return false;

    const limits = provider.getRateLimit();
    const state = this.rateLimits.get(providerName);
    const now = Date.now();
    const windowDuration = 60000; // 1 minute

    if (!state || now - state.windowStart > windowDuration) {
      // Reset window
      this.rateLimits.set(providerName, {
        requests: 0,
        tokens: 0,
        windowStart: now,
      });
      return true;
    }

    return state.requests < limits.requestsPerMinute && 
           state.tokens < limits.tokensPerMinute;
  }

  private updateRateLimit(providerName: string, tokens: number): void {
    const state = this.rateLimits.get(providerName);
    if (state) {
      state.requests += 1;
      state.tokens += tokens;
    }
  }

  private isProviderHealthy(providerName: string): boolean {
    const breaker = this.circuitBreakers.get(providerName);
    if (!breaker) return true;

    const now = Date.now();

    switch (breaker.state) {
      case 'closed':
        return true;
      case 'open':
        if (now - breaker.lastFailure > this.CIRCUIT_BREAKER_TIMEOUT) {
          breaker.state = 'half-open';
          return true;
        }
        return false;
      case 'half-open':
        return true;
      default:
        return false;
    }
  }

  private recordFailure(providerName: string): void {
    const breaker = this.circuitBreakers.get(providerName);
    if (!breaker) return;

    breaker.failures += 1;
    breaker.lastFailure = Date.now();

    if (breaker.failures >= this.CIRCUIT_BREAKER_THRESHOLD) {
      breaker.state = 'open';
      console.warn(`Circuit breaker opened for ${providerName}`);
    }
  }

  private resetCircuitBreaker(providerName: string): void {
    const breaker = this.circuitBreakers.get(providerName);
    if (breaker) {
      breaker.failures = 0;
      breaker.state = 'closed';
    }
  }

  private async checkUserAccess(userId: string, organizationId: string): Promise<void> {
    // Get organization subscription status
    const { data: org, error } = await supabase
      .from('organizations')
      .select('subscription_tier, subscription_end_date, subscription_status')
      .eq('id', organizationId)
      .single();

    if (error || !org) {
      throw new Error('Organization not found');
    }

    // Check if subscription is active
    if (org.subscription_status !== 'active' && org.subscription_tier !== 'free') {
      throw new Error('Subscription expired or inactive');
    }

    // Check subscription end date
    if (org.subscription_end_date && new Date(org.subscription_end_date) < new Date()) {
      throw new Error('Subscription expired');
    }

    // Check daily usage limits based on tier
    const today = new Date().toISOString().split('T')[0];
    const { data: usage } = await supabase
      .from('chat_history')
      .select('id')
      .eq('organization_id', organizationId)
      .gte('created_at', `${today}T00:00:00.000Z`)
      .lt('created_at', `${today}T23:59:59.999Z`);

    const dailyRequests = usage?.length || 0;

    // Get tier limits
    const { data: tierData } = await supabase
      .from('subscription_tiers')
      .select('max_ai_requests_per_day')
      .eq('name', org.subscription_tier)
      .single();

    const maxRequests = tierData?.max_ai_requests_per_day;
    if (maxRequests && dailyRequests >= maxRequests) {
      throw new Error('Daily request limit exceeded');
    }
  }

  private async logChatRequest(
    request: ChatRequest, 
    response: ChatResponse | null, 
    status: 'success' | 'failed',
    error?: Error
  ): Promise<void> {
    try {
      await supabase.from('chat_history').insert({
        organization_id: request.organizationId,
        user_id: request.userId,
        role: 'user',
        content: request.messages[request.messages.length - 1]?.content || '',
        metadata: {
          model: request.model,
          provider: response?.provider,
          status,
          error: error?.message,
          usage: response?.usage,
        }
      });

      if (response) {
        await supabase.from('chat_history').insert({
          organization_id: request.organizationId,
          user_id: request.userId,
          role: 'assistant',
          content: response.content,
          metadata: {
            model: response.model,
            provider: response.provider,
            usage: response.usage,
          }
        });
      }
    } catch (error) {
      console.error('Failed to log chat request:', error);
    }
  }
}

// Singleton instance
export const aiService = new AIService();
