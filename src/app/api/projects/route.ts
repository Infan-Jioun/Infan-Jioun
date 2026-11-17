import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { CreateProjectSchema } from "@/shared/validation/project.schema";
import { container } from "@/application/container";
import { auth } from "@/infrastructure/auth/auth";
import { logger } from "@/infrastructure/logging/logger";

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const url = new URL(req.url);
    const category = url.searchParams.get("category") || undefined;

    const result = await container.getProjectsUseCase.execute(category);

    if (!result.success) {
      logger.error("Failed to query projects", "GET /api/projects", result.error);
      return NextResponse.json(
        { success: false, error: result.error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: result.data,
    });
  } catch (error) {
    logger.error("Unhandled error in GET /api/projects", "GET /api/projects", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch projects." },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json(
        { success: false, error: "Unauthorized. Admin session required to create projects." },
        { status: 401 }
      );
    }

    const body = await req.json();

    // Strict boundary validation matching project.ts format
    const validationResult = CreateProjectSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid project payload",
          details: validationResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const input = validationResult.data;
    const result = await container.createProjectUseCase.execute(input);

    if (!result.success) {
      logger.error("Failed to create project", "POST /api/projects", result.error);
      return NextResponse.json(
        { success: false, error: result.error.message, code: result.error.code },
        { status: 500 }
      );
    }

    logger.info(`Successfully created project: ${result.data.title}`, "POST /api/projects");

    return NextResponse.json(
      {
        success: true,
        data: result.data,
      },
      { status: 201 }
    );
  } catch (error) {
    logger.error("Unhandled error in POST /api/projects", "POST /api/projects", error);
    return NextResponse.json(
      { success: false, error: "Internal server error while creating project." },
      { status: 500 }
    );
  }
}
