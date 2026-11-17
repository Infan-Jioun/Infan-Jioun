import { IProjectRepository } from "@/domain/repositories/project-repository.interface";
import { IVectorRepository } from "@/domain/repositories/vector-repository.interface";
import { IEmbeddingService } from "@/domain/services/embedding-service.interface";
import { ProjectEntity, CreateProjectInput } from "@/domain/entities/project.entity";
import { Result, ok, err } from "@/shared/types/result";
import { AppError } from "@/shared/errors/app-error";
import { logger } from "@/infrastructure/logging/logger";

export class CreateProjectUseCase {
  constructor(
    private readonly projectRepository: IProjectRepository,
    private readonly vectorRepository: IVectorRepository,
    private readonly embeddingService: IEmbeddingService
  ) {}

  public async execute(input: CreateProjectInput): Promise<Result<ProjectEntity, AppError>> {
    // 1. Create project in PostgreSQL
    const projectRes = await this.projectRepository.create(input);
    if (!projectRes.success) {
      return err(projectRes.error);
    }

    const createdProject = projectRes.data;

    // 2. Automatically sync project into RAG Vector Knowledge Base (document_chunks)
    try {
      const techNames = input.techStack.map((t) => t.name).join(", ");
      const featureList = input.features.map((f) => `- ${f}`).join("\n");

      const ragContent = `
Project Name: ${input.title}
Category: ${input.category}
Description: ${input.description}
Detailed Overview: ${input.detailedDescription}
Live Demo: ${input.liveLink}
Frontend Repository: ${input.frontendRepo || "N/A"}
Backend Repository: ${input.backendRepo || "N/A"}
Tech Stack: ${techNames}
Key Features:
${featureList}
`.trim();

      const embeddingText = `Project: ${input.title} - ${input.category}\n${ragContent}`;
      const embeddingRes = await this.embeddingService.generateEmbedding(embeddingText);

      if (embeddingRes.success) {
        await this.vectorRepository.saveChunk(
          {
            title: `Project: ${input.title}`,
            category: "project",
            content: ragContent,
            metadata: {
              projectId: createdProject.id,
              liveUrl: input.liveLink,
              frontendRepo: input.frontendRepo ?? null,
              backendRepo: input.backendRepo ?? null,
              category: input.category,
            },
          },
          embeddingRes.data
        );
        logger.info(`Auto-indexed new project "${input.title}" into vector database.`, "CreateProjectUseCase");
      } else {
        logger.warn(
          `Project created but auto-vectorization failed: ${embeddingRes.error.message}`,
          "CreateProjectUseCase"
        );
      }
    } catch (vectorError) {
      logger.error("Failed to auto-index created project into RAG vector DB", "CreateProjectUseCase", vectorError);
    }

    return ok(createdProject);
  }
}
