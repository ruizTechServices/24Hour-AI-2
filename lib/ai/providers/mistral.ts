import { BaseAIProvider, ChatRequest, ChatResponse, RateLimit } from './base';

export class MistralProvider extends BaseAIProvider {
  name = 'mistral';
  models = [
    'mistral-large-latest',
    'mistral-medium-latest',
    'mistral-small-latest',
    'open-mistral-7b',
    'open-mixtral-8x7b',
    'open-mixtral-8x22b'
  ];

  private apiKey: string;
  private baseUrl = 'https://api.mistral.ai/v1';

  constructor() {
    super();
    this.apiKey = process.env.MISTRAL_API_KEY!;
  }

  async chat(request: ChatRequest): Promise<ChatResponse> {
    this.validateRequest(request);

    try {
      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: request.model,
          messages: request.messages,
          temperature: request.temperature ?? 0.7,
          max_tokens: request.maxTokens ?? 1000,
          stream: false,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      const choice = data.choices[0];

      if (!choice?.message?.content) {
        throw new Error('No response content received');
      }

      return {
        id: data.id,
        model: data.model,
        content: choice.message.content,
        usage: {
          promptTokens: data.usage?.prompt_tokens ?? 0,
          completionTokens: data.usage?.completion_tokens ?? 0,
          totalTokens: data.usage?.total_tokens ?? 0,
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
      const response = await fetch(`${this.baseUrl}/models`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
        },
      });
      return response.ok;
    } catch {
      return false;
    }
  }

  getRateLimit(): RateLimit {
    return {
      requestsPerMinute: 1000,
      requestsPerDay: 10000,
      tokensPerMinute: 30000,
      tokensPerDay: 500000,
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
