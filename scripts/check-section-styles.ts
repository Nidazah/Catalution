import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const row = await prisma.siteSettings.findUnique({
    where: { key: "SECTION_STYLES" },
  });
  console.log(JSON.stringify(row?.data, null, 2));
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());