import { defineConfig, env } from "@prisma/config";
import fs from "fs";
import path from "path";

// Load environment variables from .env.local and .env
const loadEnv = (fileName: string) => {
  const filePath = path.resolve(process.cwd(), fileName);
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, "utf8");
    for (const line of content.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const idx = trimmed.indexOf("=");
      if (idx !== -1) {
        const key = trimmed.slice(0, idx).trim();
        let val = trimmed.slice(idx + 1).trim();
        if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
          val = val.slice(1, -1);
        }
        if (!process.env[key]) {
          process.env[key] = val;
        }
      }
    }
  }
};

loadEnv(".env.local");
loadEnv(".env");

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: env("DATABASE_URL"),
  },
});
