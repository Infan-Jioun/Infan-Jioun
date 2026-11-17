import { prisma } from "../infrastructure/database/prisma";

async function check() {
  try {
    const projects = await prisma.project.count();
    const chunks = await prisma.documentChunk.count();
    console.log("PROJECTS_COUNT:", projects);
    console.log("CHUNKS_COUNT:", chunks);
  } catch (err) {
    console.error("Error:", err);
  } finally {
    process.exit(0);
  }
}

check();
