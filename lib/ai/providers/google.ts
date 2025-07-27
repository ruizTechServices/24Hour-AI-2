import { GoogleGenerativeAI } from '@google/generative-ai';
import { BaseAIProvider, ChatRequest, ChatResponse, RateLimit } from './base';

export class GoogleProvider extends BaseAIProvider {
  name = 'google';
  models = [
    'gemini-1.5-pro',
    'gemini-1.5-flash',
    'gemini-1.0-pro'
  ];

  private client: GoogleGenerativeAI;

  constructor() {
    super();
    this.client = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY!);
  }

  async chat(request: ChatRequest): Promise<ChatResponse> {
    this.validateRequest(request);

    try {
      const model = this.client.getGenerativeModel({ 
        model: request.model,
        generationConfig: {
          temperature: request.temperature ?? 0.7,
          maxOutputTokens: request.maxTokens ?? 1000,
        }
      });

      // Convert messages to Google's format
      const { systemInstruction, history, prompt } = this.formatMessages(request.messages);

      const chat = model.startChat({
        history,
        systemInstruction,
      });

      const result = await chat.sendMessage(prompt);
      const response = await result.response;
      const content = response.text();

      if (!content) {
        throw new Error('No response content received');
      }

      return {
        id: `google-${Date.now()}`,
        model: request.model,
        content,
        usage: {
          promptTokens: response.usageMetadata?.promptTokenCount ?? 0,
          completionTokens: response.usageMetadata?.candidatesTokenCount ?? 0,
          totalTokens: response.usageMetadata?.totalTokenCount ?? 0,
        },
        finishReason: this.mapFinishReason(response.candidates?.[0]?.finishReason),
        provider: this.name,
      };
    } catch (error: any) {
      this.handleError(error, 'chat completion');
    }
  }

  async isAvailable(): Promise<boolean> {
    try {
      const model = this.client.getGenerativeModel({ model: 'gemini-1.0-pro' });
      await model.generateContent('test');
      return true;
    } catch {
      return false;
    }
  }

  getRateLimit(): RateLimit {
    return {
      requestsPerMinute: 1500,
      requestsPerDay: 50000,
      tokensPerMinute: 32000,
      tokensPerDay: 1000000,
    };
  }

  private formatMessages(messages: any[]) {
    let systemInstruction = '';
    const history: any[] = [];
    let prompt = '';

    for (let i = 0; i < messages.length; i++) {
      const message = messages[i];
      
      if (message.role === 'system') {
        systemInstruction = message.content;
      } else if (i === messages.length - 1) {
        // Last message becomes the prompt
        prompt = message.content;
      } else {
        // Convert to Google's format
        history.push({
          role: message.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: message.content }],
        });
      }
    }

    return { systemInstruction, history, prompt };
  }

  private mapFinishReason(reason: string | undefined): 'stop' | 'length' | 'content_filter' | 'error' {
    switch (reason) {
      case 'STOP':
        return 'stop';
      case 'MAX_TOKENS':
        return 'length';
      case 'SAFETY':
        return 'content_filter';
      default:
        return 'error';
    }
  }
}
