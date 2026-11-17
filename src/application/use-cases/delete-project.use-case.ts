import { IProjectRepository } from "@/domain/repositories/project-repository.interface";
import { Result } from "@/shared/types/result";
import { AppError } from "@/shared/errors/app-error";

export class DeleteProjectUseCase {
  constructor(private readonly projectRepository: IProjectRepository) {}

  public async execute(id: string): Promise<Result<boolean, AppError>> {
    return this.projectRepository.delete(id);
  }
}
