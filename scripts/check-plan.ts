import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const count = await prisma.pricingPlan.count();
  const plans = await prisma.pricingPlan.findMany({
    orderBy: { sortOrder: "asc" },
  });

  console.log("PLAN COUNT:", count);
  console.log(JSON.stringify(plans, null, 2));
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
