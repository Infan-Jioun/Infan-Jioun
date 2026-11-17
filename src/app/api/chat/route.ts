import { NextRequest, NextResponse } from "next/server";
import { ChatRequestSchema, ChatResponseDto } from "@/shared/validation/chat.schema";
import { container } from "@/application/container";
import { logger } from "@/infrastructure/logging/logger";

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const body = await req.json();

    // 1. Boundary Runtime Validation via Zod
    const validationResult = ChatRequestSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: "Invalid request payload",
          details: validationResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { messages } = validationResult.data;

    // 2. Execute RAG Use Case
    const result = await container.askRagChatUseCase.execute({ messages });

    if (!result.success) {
      logger.error("RAG Chat execution error", "POST /api/chat", result.error);
      const statusCode = result.error.code === "VALIDATION_ERROR" ? 400 : 500;
      return NextResponse.json(
        {
          error: result.error.message,
          code: result.error.code,
        },
        { status: statusCode }
      );
    }

    // 3. Return grounded RAG response
    const responsePayload: ChatResponseDto = {
      message: result.data.message,
      sources: result.data.citations,
    };

    return NextResponse.json(responsePayload, { status: 200 });
  } catch (error) {
    logger.error("Unhandled API route exception", "POST /api/chat", error);
    return NextResponse.json(
      {
        error: "An unexpected error occurred while processing your request.",
        code: "INTERNAL_ERROR",
      },
      { status: 500 }
    );
  }
}
