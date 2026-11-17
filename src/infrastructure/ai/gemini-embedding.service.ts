import { GoogleGenerativeAI, EmbedContentRequest } from "@google/generative-ai";
import { IEmbeddingService } from "@/domain/services/embedding-service.interface";
import { Result, ok, err } from "@/shared/types/result";
import { AppError } from "@/shared/errors/app-error";
import { logger } from "../logging/logger";

interface ExtendedEmbedContentRequest extends EmbedContentRequest {
  outputDimensionality?: number;
}

export class GeminiEmbeddingService implements IEmbeddingService {
  private readonly client: GoogleGenerativeAI;
  private readonly modelName: string = "gemini-embedding-001";
  private readonly dimensions: number = 768;
  // In-memory LRU-like cache for ultra-fast response on frequent queries
  private static readonly cache = new Map<string, number[]>();
  private static readonly MAX_CACHE_SIZE = 500;

  constructor(apiKey?: string) {
    const key = apiKey ?? process.env.GEMINI_API_KEY;
    if (!key) {
      throw AppError.aiService("GEMINI_API_KEY environment variable is missing.");
    }
    this.client = new GoogleGenerativeAI(key);
  }

  public getDimensions(): number {
    return this.dimensions;
  }

  private normalizeText(text: string): string {
    return text.trim().toLowerCase();
  }

  public async generateEmbedding(text: string): Promise<Result<number[], AppError>> {
    const cleanText = text.trim();
    if (!cleanText) {
      return err(AppError.validation("Text cannot be empty for embedding generation."));
    }

    const cacheKey = this.normalizeText(cleanText);
    const cached = GeminiEmbeddingService.cache.get(cacheKey);
    if (cached) {
      return ok(cached);
    }

    try {
      const model = this.client.getGenerativeModel({ model: this.modelName });
      const request: ExtendedEmbedContentRequest = {
        content: { role: "user", parts: [{ text: cleanText }] },
        outputDimensionality: this.dimensions,
      };
      const response = await model.embedContent(request as unknown as EmbedContentRequest);

      const values = response.embedding.values;
      if (!values || values.length === 0) {
        return err(AppError.aiService("Embedding generation returned empty vector."));
      }

      if (GeminiEmbeddingService.cache.size >= GeminiEmbeddingService.MAX_CACHE_SIZE) {
        const firstKey = GeminiEmbeddingService.cache.keys().next().value;
        if (firstKey) GeminiEmbeddingService.cache.delete(firstKey);
      }
      GeminiEmbeddingService.cache.set(cacheKey, values);

      return ok(values);
    } catch (error) {
      logger.error("Failed to generate embedding", "GeminiEmbeddingService", error);
      return err(AppError.aiService("Failed to generate embedding from Gemini API", error));
    }
  }

  public async generateBatchEmbeddings(texts: string[]): Promise<Result<number[][], AppError>> {
    if (!texts || texts.length === 0) {
      return ok([]);
    }

    try {
      const model = this.client.getGenerativeModel({ model: this.modelName });
      const results: number[][] = [];

      for (const text of texts) {
        const cleanText = text.trim();
        const cached = GeminiEmbeddingService.cache.get(this.normalizeText(cleanText));
        if (cached) {
          results.push(cached);
          continue;
        }

        const request: ExtendedEmbedContentRequest = {
          content: { role: "user", parts: [{ text: cleanText }] },
          outputDimensionality: this.dimensions,
        };
        const res = await model.embedContent(request as unknown as EmbedContentRequest);

        const values = res.embedding.values;
        if (!values || values.length === 0) {
          return err(AppError.aiService(`Batch embedding returned empty vector for text: "${text.slice(0, 30)}..."`));
        }

        GeminiEmbeddingService.cache.set(this.normalizeText(cleanText), values);
        results.push(values);
      }

      return ok(results);
    } catch (error) {
      logger.error("Failed to generate batch embeddings", "GeminiEmbeddingService", error);
      return err(AppError.aiService("Failed to process batch embeddings", error));
    }
  }
}
