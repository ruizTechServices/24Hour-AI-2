import OpenAI from 'openai';
import { BaseAIProvider, ChatRequest, ChatResponse, RateLimit } from './base';

export class OpenAIProvider extends BaseAIProvider {
  name = 'openai';
  models = [
    'gpt-4o',
    'gpt-4o-mini',
    'gpt-4-turbo',
    'gpt-4',
    'gpt-3.5-turbo'
  ];

  private client: OpenAI;

  constructor() {
    super();
    this.client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async chat(request: ChatRequest): Promise<ChatResponse> {
    this.validateRequest(request);

    try {
      const completion = await this.client.chat.completions.create({
        model: request.model,
        messages: request.messages,
        temperature: request.temperature ?? 0.7,
        max_tokens: request.maxTokens ?? 1000,
        stream: false,
      });

      const choice = completion.choices[0];
      if (!choice?.message?.content) {
        throw new Error('No response content received');
      }

      return {
        id: completion.id,
        model: completion.model,
        content: choice.message.content,
        usage: {
          promptTokens: completion.usage?.prompt_tokens ?? 0,
          completionTokens: completion.usage?.completion_tokens ?? 0,
          totalTokens: completion.usage?.total_tokens ?? 0,
        },
        finishReason: this.mapFinishReason(choice.finish_reason),
        provider: this.name,
      };
    } catch (error: any) {
      this.handleError(error, 'chat completion');
    }
  }

  async isAvailable(): Promise<boolean> {
    try {
      await this.client.models.list();
      return true;
    } catch {
      return false;
    }
  }

  getRateLimit(): RateLimit {
    return {
      requestsPerMinute: 3500,
      requestsPerDay: 10000,
      tokensPerMinute: 90000,
      tokensPerDay: 1000000,
    };
  }

  private mapFinishReason(reason: string | null): 'stop' | 'length' | 'content_filter' | 'error' {
    switch (reason) {
      case 'stop':
        return 'stop';
      case 'length':
        return 'length';
      case 'content_filter':
        return 'content_filter';
      default:
        return 'error';
    }
  }
}
