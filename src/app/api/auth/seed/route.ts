import { NextResponse } from "next/server";
import { seedAdminUser } from "@/application/use-cases/seed-admin-user.use-case";
import { logger } from "@/infrastructure/logging/logger";

export async function POST(): Promise<NextResponse> {
  try {
    const result = await seedAdminUser();
    return NextResponse.json({ success: true, data: result }, { status: 200 });
  } catch (error) {
    logger.error("Admin seed endpoint failed", "POST /api/auth/seed", error);
    return NextResponse.json(
      { success: false, error: "Failed to seed admin user." },
      { status: 500 }
    );
  }
}

export async function GET(): Promise<NextResponse> {
  try {
    const result = await seedAdminUser();
    return NextResponse.json({ success: true, data: result }, { status: 200 });
  } catch (error) {
    logger.error("Admin seed status check failed", "GET /api/auth/seed", error);
    return NextResponse.json(
      { success: false, error: "Failed to check or seed admin user." },
      { status: 500 }
    );
  }
}
