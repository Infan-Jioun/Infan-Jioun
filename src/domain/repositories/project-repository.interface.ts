import { Result } from "@/shared/types/result";
import { AppError } from "@/shared/errors/app-error";
import { ProjectEntity, CreateProjectInput } from "../entities/project.entity";

export interface IProjectRepository {
  findAll(category?: string): Promise<Result<ProjectEntity[], AppError>>;
  findById(id: string): Promise<Result<ProjectEntity | null, AppError>>;
  create(input: CreateProjectInput): Promise<Result<ProjectEntity, AppError>>;
  delete(id: string): Promise<Result<boolean, AppError>>;
}
