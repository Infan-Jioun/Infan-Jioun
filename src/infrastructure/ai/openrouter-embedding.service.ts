import { IEmbeddingService } from "@/domain/services/embedding-service.interface";
import { Result, ok, err } from "@/shared/types/result";
import { AppError } from "@/shared/errors/app-error";
import { logger } from "../logging/logger";

interface OpenRouterEmbeddingItem {
  embedding: number[];
  index: number;
}

interface OpenRouterEmbeddingResponse {
  data: OpenRouterEmbeddingItem[];
  model?: string;
  error?: {
    message: string;
    code: number;
  };
}

export class OpenRouterEmbeddingService implements IEmbeddingService {
  private readonly apiKey: string;
  private readonly modelName: string;
  private readonly dimensions: number = 2048;
  // High-performance LRU-like in-memory cache for 0ms recurring question lookups
  private static readonly cache = new Map<string, number[]>();
  private static readonly MAX_CACHE_SIZE = 500;

  constructor(apiKey?: string, model?: string) {
    this.apiKey = apiKey ?? process.env.OPENROUTER_API_KEY ?? "";
    this.modelName = model ?? process.env.OPENROUTER_MODEL ?? "nvidia/nemotron-3.5-embed-1b:free";

    if (!this.apiKey) {
      throw AppError.aiService("OPENROUTER_API_KEY environment variable is missing.");
    }
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
    const cached = OpenRouterEmbeddingService.cache.get(cacheKey);
    if (cached) {
      return ok(cached);
    }

    try {
      const response = await fetch("https://openrouter.ai/api/v1/embeddings", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${this.apiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://infan-protfolio.vercel.app",
          "X-Title": "Infan Jioun Portfolio RAG",
        },
        body: JSON.stringify({
          model: this.modelName,
          input: cleanText,
        }),
      });

      if (!response.ok) {
        const errBody = await response.json().catch(() => null);
        logger.error("OpenRouter embedding request failed", "OpenRouterEmbeddingService", {
          status: response.status,
          body: errBody,
        });
        return err(
          AppError.aiService(
            errBody?.error?.message ?? `OpenRouter embedding API failed with status ${response.status}`
          )
        );
      }

      const json: OpenRouterEmbeddingResponse = await response.json();

      if (!json.data || !json.data[0] || !json.data[0].embedding) {
        return err(AppError.aiService("OpenRouter returned empty embedding vector."));
      }

      const values = json.data[0].embedding;

      if (OpenRouterEmbeddingService.cache.size >= OpenRouterEmbeddingService.MAX_CACHE_SIZE) {
        const firstKey = OpenRouterEmbeddingService.cache.keys().next().value;
        if (firstKey) OpenRouterEmbeddingService.cache.delete(firstKey);
      }
      OpenRouterEmbeddingService.cache.set(cacheKey, values);

      return ok(values);
    } catch (error) {
      logger.error("Failed to generate embedding via OpenRouter", "OpenRouterEmbeddingService", error);
      return err(AppError.aiService("Failed to connect to OpenRouter embeddings API", error));
    }
  }

  public async generateBatchEmbeddings(texts: string[]): Promise<Result<number[][], AppError>> {
    if (!texts || texts.length === 0) {
      return ok([]);
    }

    try {
      const results: number[][] = [];

      for (const text of texts) {
        const cleanText = text.trim();
        const cacheKey = this.normalizeText(cleanText);
        const cached = OpenRouterEmbeddingService.cache.get(cacheKey);

        if (cached) {
          results.push(cached);
          continue;
        }

        const embedRes = await this.generateEmbedding(cleanText);
        if (!embedRes.success) {
          return err(embedRes.error);
        }

        results.push(embedRes.data);
      }

      return ok(results);
    } catch (error) {
      logger.error("Failed to generate batch embeddings via OpenRouter", "OpenRouterEmbeddingService", error);
      return err(AppError.aiService("Failed to process batch embeddings", error));
    }
  }
}

