import { Result } from "@/shared/types/result";
import { AppError } from "@/shared/errors/app-error";

export interface IEmbeddingService {
  generateEmbedding(text: string): Promise<Result<number[], AppError>>;
  generateBatchEmbeddings(texts: string[]): Promise<Result<number[][], AppError>>;
  getDimensions(): number;
}

