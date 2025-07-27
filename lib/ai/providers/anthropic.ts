import Anthropic from '@anthropic-ai/sdk';
import { BaseAIProvider, ChatRequest, ChatResponse, RateLimit } from './base';

export class AnthropicProvider extends BaseAIProvider {
  name = 'anthropic';
  models = [
    'claude-3-5-sonnet-20241022',
    'claude-3-5-haiku-20241022',
    'claude-3-opus-20240229',
    'claude-3-sonnet-20240229',
    'claude-3-haiku-20240307'
  ];

  private client: Anthropic;

  constructor() {
    super();
    this.client = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });
  }

  async chat(request: ChatRequest): Promise<ChatResponse> {
    this.validateRequest(request);

    try {
      // Convert messages format for Anthropic
      const { systemMessage, messages } = this.formatMessages(request.messages);

      const response = await this.client.messages.create({
        model: request.model,
        max_tokens: request.maxTokens ?? 1000,
        temperature: request.temperature ?? 0.7,
        system: systemMessage,
        messages: messages,
      });

      const content = response.content[0];
      if (content.type !== 'text') {
        throw new Error('Unexpected response format');
      }

      return {
        id: response.id,
        model: response.model,
        content: content.text,
        usage: {
          promptTokens: response.usage.input_tokens,
          completionTokens: response.usage.output_tokens,
          totalTokens: response.usage.input_tokens + response.usage.output_tokens,
        },
        finishReason: this.mapStopReason(response.stop_reason),
        provider: this.name,
      };
    } catch (error: any) {
      this.handleError(error, 'chat completion');
    }
  }

  async isAvailable(): Promise<boolean> {
    try {
      // Test with a minimal request
      await this.client.messages.create({
        model: 'claude-3-haiku-20240307',
        max_tokens: 1,
        messages: [{ role: 'user', content: 'Hi' }],
      });
      return true;
    } catch {
      return false;
    }
  }

  getRateLimit(): RateLimit {
    return {
      requestsPerMinute: 1000,
      requestsPerDay: 10000,
      tokensPerMinute: 40000,
      tokensPerDay: 300000,
    };
  }

  private formatMessages(messages: any[]) {
    let systemMessage = '';
    const anthropicMessages: any[] = [];

    for (const message of messages) {
      if (message.role === 'system') {
        systemMessage = message.content;
      } else {
        anthropicMessages.push({
          role: message.role,
          content: message.content,
        });
      }
    }

    return { systemMessage, messages: anthropicMessages };
  }

  private mapStopReason(reason: string | null): 'stop' | 'length' | 'content_filter' | 'error' {
    switch (reason) {
      case 'end_turn':
        return 'stop';
      case 'max_tokens':
        return 'length';
      case 'stop_sequence':
        return 'stop';
      default:
        return 'error';
    }
  }
}
