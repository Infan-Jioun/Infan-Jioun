import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "@/infrastructure/database/prisma";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days session
    updateAge: 60 * 60 * 24, // 1 day
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60,
    },
  },
  secret: process.env.BETTER_AUTH_SECRET || "infan_jioun_portfolio_auth_secret_production_2026",
  baseURL: process.env.BETTER_AUTH_URL || process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
});
