import { Result } from "@/shared/types/result";
import { AppError } from "@/shared/errors/app-error";
import { DocumentChunk, DocumentChunkInput } from "../entities/document-chunk.entity";

export interface IVectorRepository {
  searchSimilar(
    embedding: number[],
    topK: number,
    minSimilarity?: number
  ): Promise<Result<DocumentChunk[], AppError>>;

  saveChunk(
    chunk: DocumentChunkInput,
    embedding: number[]
  ): Promise<Result<DocumentChunk, AppError>>;

  saveBatchChunks(
    items: Array<{ chunk: DocumentChunkInput; embedding: number[] }>
  ): Promise<Result<number, AppError>>;

  countChunks(): Promise<Result<number, AppError>>;

  deleteAllChunks(): Promise<Result<number, AppError>>;

  ensureHnswIndex(): Promise<Result<void, AppError>>;
}

