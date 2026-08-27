import "dotenv/config";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.$queryRaw`SELECT 1`;

  const counts = await Promise.all([
    ["User", prisma.user.count()],
    ["Service", prisma.service.count()],
    ["Portfolio", prisma.portfolio.count()],
    ["Blog", prisma.blog.count()],
    ["TeamMember", prisma.teamMember.count()],
    ["Testimonial", prisma.testimonial.count()],
    ["PricingPlan", prisma.pricingPlan.count()],
    ["ContentSection", prisma.contentSection.count()],
    ["ContactMessage", prisma.contactMessage.count()],
  ] as const);

  console.log("Database connection: OK");
  for (const [name, promise] of counts) {
    console.log(`${name}: ${await promise}`);
  }
}

main()
  .catch((error) => {
    console.error("Database verification FAILED.");
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
