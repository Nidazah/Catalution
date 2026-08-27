require("dotenv").config();

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  console.log("Testing PostgreSQL connection...");

  const result = await prisma.$queryRaw`SELECT NOW() AS now`;

  console.log("DATABASE CONNECTED ✅");
  console.table(result);
}

main()
  .catch((error) => {
    console.error("DATABASE TEST FAILED ❌");
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });