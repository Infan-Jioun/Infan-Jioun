import { prisma } from "@/infrastructure/database/prisma";
import { Prisma } from "@prisma/client";
import projectsFallback from "./project";

export interface TechStackItem {
  name: string;
  icon: string;
}

export interface ProjectEntity {
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
  techStack: TechStackItem[];
  features: string[];
  createdAt: Date;
  updatedAt: Date;
}

interface RawProjectInput {
  category: string;
  title: string;
  description: string;
  detailedDescription: string;
  liveLink: string;
  frontendRepo: string | null;
  backendRepo: string | null;
  imageUrl: string;
  additionalImages: string[];
  techStack: TechStackItem[];
  features: string[];
}

export async function getProjects(): Promise<ProjectEntity[]> {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: "desc" },
    });

    if (projects.length > 0) {
      return projects.map((p: typeof projects[number]) => ({
        ...p,
        techStack: (p.techStack as unknown as TechStackItem[]) ?? [],
      }));
    }

    const fallbackList = projectsFallback as RawProjectInput[];

    const seeded = await Promise.all(
      fallbackList.map((item: RawProjectInput) =>
        prisma.project.create({
          data: {
            category: item.category,
            title: item.title,
            description: item.description,
            detailedDescription: item.detailedDescription,
            liveLink: item.liveLink,
            frontendRepo: item.frontendRepo,
            backendRepo: item.backendRepo,
            imageUrl: item.imageUrl,
            additionalImages: item.additionalImages,
            techStack: item.techStack as unknown as Prisma.InputJsonValue,
            features: item.features,
          },
        })
      )
    );

    return seeded.map((p: typeof seeded[number]) => ({
      ...p,
      techStack: (p.techStack as unknown as TechStackItem[]) ?? [],
    }));
  } catch {
    const fallbackList = projectsFallback as RawProjectInput[];
    return fallbackList.map((p: RawProjectInput, idx: number) => ({
      ...p,
      id: `fallback-${idx}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));
  }
}
