import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const plans = [
  {
    name: "Starter",
    monthly: "29",
    yearly: "290",
    sortOrder: 1,
    features: [
      "1 User",
      "5 Gb Disk Space",
      "Email Support",
    ],
  },
  {
    name: "Pro",
    monthly: "79",
    yearly: "790",
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
    monthly: "199",
    yearly: "1990",
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
    const result = await prisma.plan.upsert({
      where: {
        name: plan.name,
      },
      update: {
        monthly: plan.monthly,
        yearly: plan.yearly,
        features: plan.features,
        sortOrder: plan.sortOrder,
        active: true,
        published: true,
      },
      create: {
        name: plan.name,
        monthly: plan.monthly,
        yearly: plan.yearly,
        features: plan.features,
        sortOrder: plan.sortOrder,
        active: true,
        published: true,
      },
    });

    console.log(
      `Upserted: ${result.name} — monthly ${result.monthly}, yearly ${result.yearly}`,
    );
  }

  console.log(`Seeded ${plans.length} pricing plans.`);
}

main()
  .catch((error) => {
    console.error("Pricing seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });