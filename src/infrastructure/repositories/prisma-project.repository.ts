import { Prisma } from "@prisma/client";
import { prisma } from "../database/prisma";
import { IProjectRepository } from "@/domain/repositories/project-repository.interface";
import { ProjectEntity, CreateProjectInput, TechStackItem } from "@/domain/entities/project.entity";
import { Result, ok, err } from "@/shared/types/result";
import { AppError } from "@/shared/errors/app-error";
import { logger } from "../logging/logger";

interface DbProjectRecord {
  id: string;
  category: string;
  title: string;
  description: string;
  detailedDescription: string;
  liveLink: string;
  frontendRepo: string | null;
  backendRepo: string | null;
  imageUrl: string;
  additionalImages: string[];
  techStack: Prisma.JsonValue;
  features: string[];
  createdAt: Date;
  updatedAt: Date;
}

export class PrismaProjectRepository implements IProjectRepository {
  private mapRecordToEntity(record: DbProjectRecord): ProjectEntity {
    return {
      ...record,
      techStack: (record.techStack as unknown as TechStackItem[]) ?? [],
    };
  }

  public async findAll(category?: string): Promise<Result<ProjectEntity[], AppError>> {
    try {
      const records = await prisma.project.findMany({
        where: category ? { category } : undefined,
        orderBy: { createdAt: "desc" },
      });

      return ok(records.map((r: DbProjectRecord) => this.mapRecordToEntity(r)));
    } catch (error) {
      logger.error("Failed to query projects", "PrismaProjectRepository", error);
      return err(AppError.database("Failed to fetch projects from PostgreSQL", error));
    }
  }

  public async findById(id: string): Promise<Result<ProjectEntity | null, AppError>> {
    try {
      const record = await prisma.project.findUnique({
        where: { id },
      });

      if (!record) return ok(null);
      return ok(this.mapRecordToEntity(record as DbProjectRecord));
    } catch (error) {
      logger.error(`Failed to find project by id ${id}`, "PrismaProjectRepository", error);
      return err(AppError.database("Failed to find project", error));
    }
  }

  public async create(input: CreateProjectInput): Promise<Result<ProjectEntity, AppError>> {
    try {
      const created = await prisma.project.create({
        data: {
          category: input.category,
          title: input.title,
          description: input.description,
          detailedDescription: input.detailedDescription,
          liveLink: input.liveLink,
          frontendRepo: input.frontendRepo ?? null,
          backendRepo: input.backendRepo ?? null,
          imageUrl: input.imageUrl,
          additionalImages: input.additionalImages ?? [],
          techStack: input.techStack as unknown as Prisma.InputJsonValue,
          features: input.features,
        },
      });

      return ok(this.mapRecordToEntity(created as DbProjectRecord));
    } catch (error) {
      logger.error("Failed to insert project", "PrismaProjectRepository", error);
      return err(AppError.database("Failed to create project in PostgreSQL", error));
    }
  }

  public async delete(id: string): Promise<Result<boolean, AppError>> {
    try {
      await prisma.project.delete({
        where: { id },
      });
      return ok(true);
    } catch (error) {
      logger.error(`Failed to delete project ${id}`, "PrismaProjectRepository", error);
      return err(AppError.database("Failed to delete project", error));
    }
  }
}
