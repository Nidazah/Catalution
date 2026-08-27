import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("\n=== SERVICES ===");
  const services = await prisma.service.findMany();
  console.log(JSON.stringify(services, null, 2));
  console.log("SERVICE COUNT:", services.length);

  console.log("\n=== PORTFOLIO ===");
  const portfolios = await prisma.portfolio.findMany();
  console.log(JSON.stringify(portfolios, null, 2));
  console.log("PORTFOLIO COUNT:", portfolios.length);

  console.log("\n=== PRICING ===");
  const pricing = await prisma.pricingPlan.findMany();
  console.log(JSON.stringify(pricing, null, 2));
  console.log("PRICING COUNT:", pricing.length);

  console.log("\n=== CONTENT SECTIONS ===");
  const sections = await prisma.contentSection.findMany();
  console.log(JSON.stringify(sections, null, 2));
  console.log("CONTENT COUNT:", sections.length);

  console.log("\n=== SITE SETTINGS ===");
  const settings = await prisma.siteSettings.findMany();
  console.log(JSON.stringify(settings, null, 2));
  console.log("SETTINGS COUNT:", settings.length);
}

main()
  .catch((error) => {
    console.error("\nDATABASE ERROR:");
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });