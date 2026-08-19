import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const result = await prisma.$queryRawUnsafe(
    'SELECT COUNT(*) as count FROM "_prisma_migrations"'
  );
  console.log("Migrations recorded in _prisma_migrations:", result[0].count);
}

main()
  .catch((e) => {
    console.error(e.message);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());