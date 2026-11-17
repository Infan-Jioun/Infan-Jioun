import { IProjectRepository } from "@/domain/repositories/project-repository.interface";
import { ProjectEntity } from "@/domain/entities/project.entity";
import { Result } from "@/shared/types/result";
import { AppError } from "@/shared/errors/app-error";

export class GetProjectsUseCase {
  constructor(private readonly projectRepository: IProjectRepository) {}

  public async execute(category?: string): Promise<Result<ProjectEntity[], AppError>> {
    return this.projectRepository.findAll(category);
  }
}
