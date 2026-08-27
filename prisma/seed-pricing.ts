import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const plans = [
  {
    name: "Starter",
    description: "Perfect for individuals and small projects",
    monthly: 29,
    yearly: 290,
    sortOrder: 1,
    features: [
      "1 User",
      "5 Gb Disk Space",
      "Email Support",
    ],
  },
  {
    name: "Pro",
    description: "For growing teams that need more power",
    monthly: 79,
    yearly: 790,
    sortOrder: 2,
    features: [
      "5 Users",
      "10 Gb Disk Space",
      "Email Support",
      "24/7 Tech Support",
    ],
  },
  {
    name: "Enterprise",
    description: "Full-featured solution for large organizations",
    monthly: 199,
    yearly: 1990,
    sortOrder: 3,
    features: [
      "10 Users",
      "100 Gb Disk Space",
      "Email Support",
      "24/7 Tech Support",
      "Free Upgrades",
    ],
  },
];

async function main() {
  for (const plan of plans) {
    // Upsert the monthly interval entry
    await prisma.pricingPlan.upsert({
      where: {
        name: `${plan.name} Monthly`,
      },
      update: {
        description: plan.description,
        price: plan.monthly,
        currency: "USD",
        interval: "monthly",
        features: plan.features,
        sortOrder: plan.sortOrder,
        active: true,
        published: true,
      },
      create: {
        name: `${plan.name} Monthly`,
        description: plan.description,
        price: plan.monthly,
        currency: "USD",
        interval: "monthly",
        features: plan.features,
        sortOrder: plan.sortOrder,
        active: true,
        published: true,
      },
    });

    // Upsert the yearly interval entry
    await prisma.pricingPlan.upsert({
      where: {
        name: `${plan.name} Yearly`,
      },
      update: {
        description: plan.description,
        price: plan.yearly,
        currency: "USD",
        interval: "yearly",
        features: plan.features,
        sortOrder: plan.sortOrder,
        active: true,
        published: true,
      },
      create: {
        name: `${plan.name} Yearly`,
        description: plan.description,
        price: plan.yearly,
        currency: "USD",
        interval: "yearly",
        features: plan.features,
        sortOrder: plan.sortOrder,
        active: true,
        published: true,
      },
    });

    console.log(
      `Upserted: ${plan.name} — monthly $${plan.monthly}, yearly $${plan.yearly}`,
    );
  }

  console.log(`Seeded ${plans.length} pricing plans (${plans.length * 2} entries).`);
}

main()
  .catch((error) => {
    console.error("Pricing seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });