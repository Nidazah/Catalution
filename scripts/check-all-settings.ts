import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const all = await prisma.siteSettings.findMany();
  console.log("=== ALL SITE SETTINGS ===");
  console.log(JSON.stringify(all, null, 2));
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());