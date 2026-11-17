import { auth } from "@/infrastructure/auth/auth";
import { prisma } from "@/infrastructure/database/prisma";
import { logger } from "@/infrastructure/logging/logger";

export interface SeedAdminResult {
  seeded: boolean;
  email: string;
  message: string;
}

export async function seedAdminUser(): Promise<SeedAdminResult> {
  const adminEmail = process.env.ADMIN_EMAIL || "infanjiounrahman20606@gmail.com";
  const adminPassword = process.env.ADMIN_PASSWORD || "InfanAdmin2026!#";
  const adminName = process.env.ADMIN_NAME || "Infan Jioun Rahman";

  try {
    // Check if admin user already exists in PostgreSQL
    const existingUser = await prisma.user.findUnique({
      where: { email: adminEmail },
    });

    if (existingUser) {
      return {
        seeded: false,
        email: adminEmail,
        message: `Admin user (${adminEmail}) already exists in PostgreSQL.`,
      };
    }

    // Sign up initial admin user through Better Auth
    await auth.api.signUpEmail({
      body: {
        email: adminEmail,
        password: adminPassword,
        name: adminName,
      },
    });

    // Mark email verified for seeded admin
    await prisma.user.update({
      where: { email: adminEmail },
      data: { emailVerified: true, role: "admin" },
    });

    logger.info(`Seeded initial admin user: ${adminEmail}`, "seedAdminUser");

    return {
      seeded: true,
      email: adminEmail,
      message: `Initial admin account created for ${adminEmail}.`,
    };
  } catch (error) {
    logger.error("Failed to seed admin user", "seedAdminUser", error);
    throw error;
  }
}
