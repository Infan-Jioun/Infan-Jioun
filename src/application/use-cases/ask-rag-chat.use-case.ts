import { IVectorRepository } from "@/domain/repositories/vector-repository.interface";
import { IEmbeddingService } from "@/domain/services/embedding-service.interface";
import { ILLMService } from "@/domain/services/llm-service.interface";
import { DomainChatMessage, RagChatResult, RagCitation } from "@/domain/entities/chat-message.entity";
import { Result, ok, err } from "@/shared/types/result";
import { AppError } from "@/shared/errors/app-error";
import { logger } from "@/infrastructure/logging/logger";
import { SeedKnowledgeUseCase } from "./seed-knowledge.use-case";

export interface AskRagChatInput {
  messages: DomainChatMessage[];
}

export class AskRagChatUseCase {
  private readonly seedUseCase: SeedKnowledgeUseCase;

  constructor(
    private readonly vectorRepository: IVectorRepository,
    private readonly embeddingService: IEmbeddingService,
    private readonly llmService: ILLMService
  ) {
    this.seedUseCase = new SeedKnowledgeUseCase(this.vectorRepository, this.embeddingService);
  }

  public async execute(input: AskRagChatInput): Promise<Result<RagChatResult, AppError>> {
    const { messages } = input;
    if (!messages || messages.length === 0) {
      return err(AppError.validation("Chat history cannot be empty."));
    }

    const lastMessage = messages[messages.length - 1];
    if (!lastMessage || !lastMessage.content.trim()) {
      return err(AppError.validation("Last message content cannot be empty."));
    }

    const userQuery = lastMessage.content.trim();

    try {
      // 1. Auto-seed guard: Ensure vector DB has documents
      const countRes = await this.vectorRepository.countChunks();
      if (countRes.success && countRes.data === 0) {
        logger.info("Vector database is empty. Auto-indexing initial knowledge base...", "AskRagChatUseCase");
        await this.seedUseCase.execute(false);
      }

      // 2. Vectorize user query
      const embeddingRes = await this.embeddingService.generateEmbedding(userQuery);
      if (!embeddingRes.success) {
        return err(embeddingRes.error);
      }
      const queryVector = embeddingRes.data;

      // 3. Perform fast similarity search via pgvector (HNSW Index)
      const topK = 4;
      const minSimilarity = 0.35;
      const searchRes = await this.vectorRepository.searchSimilar(queryVector, topK, minSimilarity);
      if (!searchRes.success) {
        return err(searchRes.error);
      }

      const relevantChunks = searchRes.data;

      // 4. Construct retrieved context with source attribution
      const contextBlocks = relevantChunks.map((chunk, index) => {
        return `[Source ${index + 1}: ${chunk.title} (${chunk.category})]\n${chunk.content}`;
      });
      const retrievedContext = contextBlocks.join("\n\n---\n\n");

      // 5. Generate final grounded response with Gemini LLM
      const answerRes = await this.llmService.generateRagAnswer(userQuery, retrievedContext, messages);
      if (!answerRes.success) {
        return err(answerRes.error);
      }

      // 6. Map citations
      const citations: RagCitation[] = relevantChunks.map((chunk) => ({
        title: chunk.title,
        category: chunk.category,
        similarity: chunk.similarity ?? 0,
      }));

      return ok({
        message: answerRes.data,
        citations,
      });
    } catch (error) {
      logger.error("Unhandled error in AskRagChatUseCase", "AskRagChatUseCase", error);
      return err(AppError.internal("Failed to process RAG chat request", error));
    }
  }
}

