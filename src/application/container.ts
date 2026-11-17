import { PrismaVectorRepository } from "@/infrastructure/repositories/prisma-vector.repository";
import { PrismaProjectRepository } from "@/infrastructure/repositories/prisma-project.repository";
import { OpenRouterEmbeddingService } from "@/infrastructure/ai/openrouter-embedding.service";
import { GeminiLLMService } from "@/infrastructure/ai/gemini-llm.service";
import { AskRagChatUseCase } from "./use-cases/ask-rag-chat.use-case";
import { SeedKnowledgeUseCase } from "./use-cases/seed-knowledge.use-case";
import { CreateProjectUseCase } from "./use-cases/create-project.use-case";
import { GetProjectsUseCase } from "./use-cases/get-projects.use-case";
import { DeleteProjectUseCase } from "./use-cases/delete-project.use-case";

class ServiceContainer {
  private static instance: ServiceContainer;

  public readonly vectorRepository: PrismaVectorRepository;
  public readonly projectRepository: PrismaProjectRepository;
  public readonly embeddingService: OpenRouterEmbeddingService;
  public readonly llmService: GeminiLLMService;

  public readonly askRagChatUseCase: AskRagChatUseCase;
  public readonly seedKnowledgeUseCase: SeedKnowledgeUseCase;
  public readonly createProjectUseCase: CreateProjectUseCase;
  public readonly getProjectsUseCase: GetProjectsUseCase;
  public readonly deleteProjectUseCase: DeleteProjectUseCase;

  private constructor() {
    this.vectorRepository = new PrismaVectorRepository();
    this.projectRepository = new PrismaProjectRepository();
    this.embeddingService = new OpenRouterEmbeddingService();
    this.llmService = new GeminiLLMService();

    this.askRagChatUseCase = new AskRagChatUseCase(
      this.vectorRepository,
      this.embeddingService,
      this.llmService
    );

    this.seedKnowledgeUseCase = new SeedKnowledgeUseCase(
      this.vectorRepository,
      this.embeddingService
    );

    this.createProjectUseCase = new CreateProjectUseCase(
      this.projectRepository,
      this.vectorRepository,
      this.embeddingService
    );

    this.getProjectsUseCase = new GetProjectsUseCase(this.projectRepository);
    this.deleteProjectUseCase = new DeleteProjectUseCase(this.projectRepository);
  }

  public static getInstance(): ServiceContainer {
    if (!ServiceContainer.instance) {
      ServiceContainer.instance = new ServiceContainer();
    }
    return ServiceContainer.instance;
  }
}

export const container = ServiceContainer.getInstance();
