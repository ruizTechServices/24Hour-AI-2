// Base interface for all AI providers
export interface AIProvider {
  name: string;
  models: string[];
  chat(request: ChatRequest): Promise<ChatResponse>;
  isAvailable(): Promise<boolean>;
  getRateLimit(): RateLimit;
}

export interface ChatRequest {
  model: string;
  messages: ChatMessage[];
  temperature?: number;
  maxTokens?: number;
  stream?: boolean;
  userId: string;
  organizationId: string;
}

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface ChatResponse {
  id: string;
  model: string;
  content: string;
  usage: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
  finishReason: 'stop' | 'length' | 'content_filter' | 'error';
  provider: string;
}

export interface RateLimit {
  requestsPerMinute: number;
  requestsPerDay: number;
  tokensPerMinute: number;
  tokensPerDay: number;
}

export abstract class BaseAIProvider implements AIProvider {
  abstract name: string;
  abstract models: string[];
  
  abstract chat(request: ChatRequest): Promise<ChatResponse>;
  abstract isAvailable(): Promise<boolean>;
  abstract getRateLimit(): RateLimit;

  protected validateRequest(request: ChatRequest): void {
    if (!request.model) {
      throw new Error('Model is required');
    }
    
    if (!request.messages || request.messages.length === 0) {
      throw new Error('Messages are required');
    }
    
    if (!this.models.includes(request.model)) {
      throw new Error(`Model ${request.model} not supported by ${this.name}`);
    }
  }

  protected handleError(error: any, context: string): never {
    console.error(`${this.name} ${context} error:`, error);
    
    if (error.status === 429) {
      throw new Error('Rate limit exceeded');
    } else if (error.status === 401) {
      throw new Error('Authentication failed');
    } else if (error.status === 403) {
      throw new Error('Access forbidden');
    } else {
      throw new Error(`${this.name} service unavailable`);
    }
  }
}
