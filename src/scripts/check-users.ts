import { prisma } from "../infrastructure/database/prisma";

async function check() {
  try {
    const users = await prisma.user.findMany({
      select: { id: true, name: true, email: true, role: true, emailVerified: true, createdAt: true },
    });
    const accounts = await prisma.account.count();
    console.log("USERS_IN_DB:", JSON.stringify(users, null, 2));
    console.log("ACCOUNTS_IN_DB:", accounts);
  } catch (err) {
    console.error("Check Error:", err);
  } finally {
    process.exit(0);
  }
}

check();
