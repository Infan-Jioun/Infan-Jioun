import { NextRequest, NextResponse } from "next/server";
import { container } from "@/application/container";
import { logger } from "@/infrastructure/logging/logger";

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const url = new URL(req.url);
    const force = url.searchParams.get("force") === "true";

    logger.info(`Triggering knowledge base seed (force=${force})...`, "POST /api/chat/seed");

    const result = await container.seedKnowledgeUseCase.execute(force);

    if (!result.success) {
      logger.error("Seeding failed", "POST /api/chat/seed", result.error);
      return NextResponse.json(
        { error: result.error.message, code: result.error.code },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: "Knowledge base indexed successfully into PostgreSQL vector database.",
        data: result.data,
      },
      { status: 200 }
    );
  } catch (error) {
    logger.error("Unhandled error in seed endpoint", "POST /api/chat/seed", error);
    return NextResponse.json(
      { error: "Failed to seed knowledge base", code: "INTERNAL_ERROR" },
      { status: 500 }
    );
  }
}

