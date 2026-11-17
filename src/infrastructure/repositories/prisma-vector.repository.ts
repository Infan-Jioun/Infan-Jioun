
import { Prisma } from "@prisma/client";
import { prisma } from "../database/prisma";
import { IVectorRepository } from "@/domain/repositories/vector-repository.interface";
import { DocumentChunk, DocumentChunkInput } from "@/domain/entities/document-chunk.entity";
import { Result, ok, err } from "@/shared/types/result";
import { AppError } from "@/shared/errors/app-error";
import { logger } from "../logging/logger";

interface RawSimilarityRow {
  id: string;
  title: string;
  category: string;
  content: string;
  metadata: Record<string, unknown> | null;
  similarity: number | string;
  createdAt: Date;
  updatedAt: Date;
}

export class PrismaVectorRepository implements IVectorRepository {
  private formatVector(vector: number[]): string {
    return `[${vector.join(",")}]`;
  }

  public async searchSimilar(
    embedding: number[],
    topK: number,
    minSimilarity: number = 0.30
  ): Promise<Result<DocumentChunk[], AppError>> {
    try {
      const vectorString = this.formatVector(embedding);

      // Exact cosine distance search in pgvector using <=>
      const rows = await prisma.$queryRaw<RawSimilarityRow[]>(
        Prisma.sql`
          SELECT 
            id,
            title,
            category,
            content,
            metadata,
            (1 - (embedding <=> ${vectorString}::vector)) AS similarity,
            "createdAt",
            "updatedAt"
          FROM document_chunks
          WHERE embedding IS NOT NULL
            AND (1 - (embedding <=> ${vectorString}::vector)) >= ${minSimilarity}
          ORDER BY embedding <=> ${vectorString}::vector ASC
          LIMIT ${topK};
        `
      );

      const chunks: DocumentChunk[] = rows.map((row: RawSimilarityRow) => ({
        id: row.id,
        title: row.title,
        category: row.category,
        content: row.content,
        metadata: (row.metadata as Record<string, unknown>) ?? null,
        similarity: typeof row.similarity === "number" ? row.similarity : parseFloat(String(row.similarity)),
        createdAt: row.createdAt,
        updatedAt: row.updatedAt,
      }));

      return ok(chunks);
    } catch (error) {
      logger.error("Vector similarity search failed", "PrismaVectorRepository", error);
      return err(AppError.database("Failed to execute vector search", error));
    }
  }

  public async saveChunk(
    chunk: DocumentChunkInput,
    embedding: number[]
  ): Promise<Result<DocumentChunk, AppError>> {
    const res = await this.saveBatchChunks([{ chunk, embedding }]);
    if (!res.success) return err(res.error);
    return ok({
      id: "saved",
      title: chunk.title,
      category: chunk.category,
      content: chunk.content,
      metadata: chunk.metadata ?? null,
    });
  }

  public async saveBatchChunks(
    items: Array<{ chunk: DocumentChunkInput; embedding: number[] }>
  ): Promise<Result<number, AppError>> {
    try {
      let insertedCount = 0;

      for (const item of items) {
        const vectorString = this.formatVector(item.embedding);
        const metadataJson = JSON.stringify(item.chunk.metadata ?? {});

        await prisma.$executeRaw(
          Prisma.sql`
            INSERT INTO document_chunks (
              id,
              title,
              category,
              content,
              metadata,
              embedding,
              "createdAt",
              "updatedAt"
            )
            VALUES (
              gen_random_uuid()::text,
              ${item.chunk.title},
              ${item.chunk.category},
              ${item.chunk.content},
              ${metadataJson}::jsonb,
              ${vectorString}::vector,
              NOW(),
              NOW()
            );
          `
        );
        insertedCount++;
      }

      return ok(insertedCount);
    } catch (error) {
      logger.error("Batch save of vector chunks failed", "PrismaVectorRepository", error);
      return err(AppError.database("Failed to save batch chunks", error));
    }
  }

  public async countChunks(): Promise<Result<number, AppError>> {
    try {
      const count = await prisma.documentChunk.count();
      return ok(count);
    } catch (error) {
      logger.error("Failed to count chunks", "PrismaVectorRepository", error);
      return err(AppError.database("Failed to count chunks", error));
    }
  }

  public async deleteAllChunks(): Promise<Result<number, AppError>> {
    try {
      const result = await prisma.documentChunk.deleteMany();
      return ok(result.count);
    } catch (error) {
      logger.error("Failed to delete chunks", "PrismaVectorRepository", error);
      return err(AppError.database("Failed to delete chunks", error));
    }
  }

  public async ensureHnswIndex(): Promise<Result<void, AppError>> {
    try {
      await prisma.$executeRawUnsafe(`CREATE EXTENSION IF NOT EXISTS vector;`);
      return ok(undefined);
    } catch (error) {
      logger.error("Failed to ensure vector extension", "PrismaVectorRepository", error);
      return err(AppError.database("Failed to initialize vector extension", error));
    }
  }
}
