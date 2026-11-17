import { seedAdminUser } from "../application/use-cases/seed-admin-user.use-case";

async function main() {
  try {
    const res = await seedAdminUser();
    console.log("SEED_RESULT:", JSON.stringify(res));
  } catch (err) {
    console.error("SEED_ERROR:", err);
  } finally {
    process.exit(0);
  }
}

main();
