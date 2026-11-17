import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { container } from "@/application/container";
import projectsFallback from "@/lib/project";
import { CreateProjectInput } from "@/domain/entities/project.entity";
import { auth } from "@/infrastructure/auth/auth";
import { logger } from "@/infrastructure/logging/logger";

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
  techStack: { name: string; icon: string }[];
  features: string[];
}

export async function POST(): Promise<NextResponse> {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json(
        { success: false, error: "Unauthorized. Admin session required to sync projects." },
        { status: 401 }
      );
    }

    const rawList = projectsFallback as RawProjectInput[];
    let createdCount = 0;
    let skippedCount = 0;

    // Fetch existing projects to avoid duplicates by title
    const existingRes = await container.getProjectsUseCase.execute();
    const existingTitles = new Set(
      existingRes.success ? existingRes.data.map((p) => p.title.toLowerCase().trim()) : []
    );

    for (const raw of rawList) {
      if (existingTitles.has(raw.title.toLowerCase().trim())) {
        skippedCount++;
        continue;
      }

      const input: CreateProjectInput = {
        category: raw.category,
        title: raw.title,
        description: raw.description,
        detailedDescription: raw.detailedDescription,
        liveLink: raw.liveLink,
        frontendRepo: raw.frontendRepo,
        backendRepo: raw.backendRepo,
        imageUrl: raw.imageUrl,
        additionalImages: raw.additionalImages || [],
        techStack: raw.techStack || [],
        features: raw.features || [],
      };

      const res = await container.createProjectUseCase.execute(input);
      if (res.success) {
        createdCount++;
        existingTitles.add(raw.title.toLowerCase().trim());
      } else {
        logger.error(`Failed to seed project ${raw.title}`, "POST /api/projects/sync", res.error);
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: `Synced ${createdCount} projects to PostgreSQL & Vector RAG (${skippedCount} already existed).`,
        createdCount,
        skippedCount,
      },
      { status: 200 }
    );
  } catch (error) {
    logger.error("Failed to sync projects from project.ts", "POST /api/projects/sync", error);
    return NextResponse.json(
      { success: false, error: "Failed to sync fallback projects." },
      { status: 500 }
    );
  }
}
