import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { container } from "@/application/container";
import { auth } from "@/infrastructure/auth/auth";
import { logger } from "@/infrastructure/logging/logger";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function DELETE(_req: NextRequest, { params }: RouteParams): Promise<NextResponse> {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json(
        { success: false, error: "Unauthorized. Admin session required to delete projects." },
        { status: 401 }
      );
    }

    const { id } = await params;
    if (!id) {
      return NextResponse.json({ success: false, error: "Missing project id." }, { status: 400 });
    }

    const result = await container.deleteProjectUseCase.execute(id);

    if (!result.success) {
      logger.error(`Failed to delete project ${id}`, "DELETE /api/projects/[id]", result.error);
      return NextResponse.json({ success: false, error: result.error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: "Project deleted successfully." }, { status: 200 });
  } catch (error) {
    logger.error("Unhandled error in DELETE /api/projects/[id]", "DELETE /api/projects/[id]", error);
    return NextResponse.json({ success: false, error: "Failed to delete project." }, { status: 500 });
  }
}
