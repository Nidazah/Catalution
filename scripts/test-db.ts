import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: ["error", "warn"],
});

async function main() {
  console.log("DATABASE_URL host:", new URL(process.env.DATABASE_URL!).hostname);
  console.log("NODE_OPTIONS:", process.env.NODE_OPTIONS);

  try {
    const result = await prisma.$queryRaw<
      { database: string; user: string }[]
    >`SELECT current_database() AS database, current_user AS user`;

    console.log("DATABASE CONNECTION SUCCESS:");
    console.log(result);
  } catch (error) {
    console.error("DATABASE CONNECTION FAILED:");
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

main();