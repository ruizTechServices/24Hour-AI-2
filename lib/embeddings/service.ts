import OpenAI from 'openai';
import { supabase } from '@/lib/supabase/client';

export interface EmbeddingRequest {
  content: string;
  contentType: 'chat_message' | 'document' | 'knowledge_base';
  organizationId: string;
  userId: string;
  sourceId?: string;
  metadata?: Record<string, any>;
}

export interface SearchRequest {
  query: string;
  organizationId: string;
  userId: string;
  contentType?: string;
  limit?: number;
  threshold?: number;
}

export interface SearchResult {
  id: string;
  content: string;
  contentType: string;
  similarity: number;
  metadata: Record<string, any>;
  createdAt: string;
}

export class EmbeddingService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  /**
   * Generate embedding for content and store in database
   */
  async createEmbedding(request: EmbeddingRequest): Promise<string> {
    try {
      // Generate embedding using OpenAI
      const embeddingResponse = await this.openai.embeddings.create({
        model: 'text-embedding-3-small',
        input: request.content,
      });

      const embedding = embeddingResponse.data[0].embedding;

      // Store in database
      const { data, error } = await supabase
        .from('embeddings')
        .insert({
          organization_id: request.organizationId,
          user_id: request.userId,
          content: request.content,
          content_type: request.contentType,
          source_id: request.sourceId,
          embedding: embedding,
          metadata: request.metadata || {},
        })
        .select('id')
        .single();

      if (error) {
        throw new Error(`Failed to store embedding: ${error.message}`);
      }

      return data.id;
    } catch (error) {
      console.error('Embedding creation error:', error);
      throw error;
    }
  }

  /**
   * Search for similar content using vector similarity
   */
  async searchSimilar(request: SearchRequest): Promise<SearchResult[]> {
    try {
      // Generate embedding for search query
      const embeddingResponse = await this.openai.embeddings.create({
        model: 'text-embedding-3-small',
        input: request.query,
      });

      const queryEmbedding = embeddingResponse.data[0].embedding;

      // Build query
      let query = supabase
        .from('embeddings')
        .select(`
          id,
          content,
          content_type,
          metadata,
          created_at,
          embedding <=> '[${queryEmbedding.join(',')}]' as similarity
        `)
        .eq('organization_id', request.organizationId)
        .is('deleted_at', null)
        .order('similarity', { ascending: true })
        .limit(request.limit || 10);

      // Add content type filter if specified
      if (request.contentType) {
        query = query.eq('content_type', request.contentType);
      }

      const { data, error } = await query;

      if (error) {
        throw new Error(`Search failed: ${error.message}`);
      }

      // Filter by similarity threshold
      const threshold = request.threshold || 0.8;
      const results = data
        .filter((item: any) => item.similarity <= (1 - threshold))
        .map((item: any) => ({
          id: item.id,
          content: item.content,
          contentType: item.content_type,
          similarity: 1 - item.similarity, // Convert distance to similarity
          metadata: item.metadata,
          createdAt: item.created_at,
        }));

      return results;
    } catch (error) {
      console.error('Semantic search error:', error);
      throw error;
    }
  }

  /**
   * Batch create embeddings for multiple contents
   */
  async createBatchEmbeddings(requests: EmbeddingRequest[]): Promise<string[]> {
    const results: string[] = [];

    // Process in batches to avoid rate limits
    const batchSize = 10;
    for (let i = 0; i < requests.length; i += batchSize) {
      const batch = requests.slice(i, i + batchSize);
      const batchPromises = batch.map(request => this.createEmbedding(request));
      const batchResults = await Promise.all(batchPromises);
      results.push(...batchResults);

      // Add delay between batches to respect rate limits
      if (i + batchSize < requests.length) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    return results;
  }

  /**
   * Update existing embedding
   */
  async updateEmbedding(embeddingId: string, content: string, metadata?: Record<string, any>): Promise<void> {
    try {
      // Generate new embedding
      const embeddingResponse = await this.openai.embeddings.create({
        model: 'text-embedding-3-small',
        input: content,
      });

      const embedding = embeddingResponse.data[0].embedding;

      // Update in database
      const updateData: any = {
        content,
        embedding,
        updated_at: new Date().toISOString(),
      };

      if (metadata) {
        updateData.metadata = metadata;
      }

      const { error } = await supabase
        .from('embeddings')
        .update(updateData)
        .eq('id', embeddingId);

      if (error) {
        throw new Error(`Failed to update embedding: ${error.message}`);
      }
    } catch (error) {
      console.error('Embedding update error:', error);
      throw error;
    }
  }

  /**
   * Delete embedding (soft delete)
   */
  async deleteEmbedding(embeddingId: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('embeddings')
        .update({ deleted_at: new Date().toISOString() })
        .eq('id', embeddingId);

      if (error) {
        throw new Error(`Failed to delete embedding: ${error.message}`);
      }
    } catch (error) {
      console.error('Embedding deletion error:', error);
      throw error;
    }
  }

  /**
   * Get embeddings for an organization
   */
  async getEmbeddings(organizationId: string, contentType?: string, limit = 50): Promise<any[]> {
    try {
      let query = supabase
        .from('embeddings')
        .select('id, content, content_type, metadata, created_at')
        .eq('organization_id', organizationId)
        .is('deleted_at', null)
        .order('created_at', { ascending: false })
        .limit(limit);

      if (contentType) {
        query = query.eq('content_type', contentType);
      }

      const { data, error } = await query;

      if (error) {
        throw new Error(`Failed to fetch embeddings: ${error.message}`);
      }

      return data || [];
    } catch (error) {
      console.error('Get embeddings error:', error);
      throw error;
    }
  }
}

// Singleton instance
export const embeddingService = new EmbeddingService();
