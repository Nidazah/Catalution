const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  await prisma.$executeRawUnsafe(`
    ALTER TABLE "ContentSection"
    ADD COLUMN IF NOT EXISTS "settings" JSONB;
  `);

  console.log("? ContentSection.settings added.");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
