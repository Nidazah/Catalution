import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const count = await prisma.plan.count();
  const plans = await prisma.plan.findMany({
    orderBy: { sortOrder: "asc" },
  });

  console.log("PLAN COUNT:", count);
  console.log(JSON.stringify(plans, null, 2));
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
