/**
 * One-off seed script: loads the 6 services currently hardcoded in
 * Navbar.tsx's servicesLinks / fallbackServicesLinks array into the
 * Service table, so /admin/services and the live navbar dropdown
 * have real data to show.
 *
 * Usage (from your project root, Catalution_content_only_cms/Catalution):
 *   npx tsx seed-services.ts
 * (or: npx ts-node seed-services.ts)
 *
 * Safe to re-run: uses upsert on `slug`, so re-running won't create
 * duplicates or overwrite anything you've already edited in the admin.
 */

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const PLACEHOLDER_IMAGE = "/images/services/tj-service-1.webp";

const services = [
  {
    title: "Business process optimization",
    slug: "business-process-optimization",
    icon: "waves",
    description:
      "We streamline your core workflows to remove bottlenecks, cut waste, and boost operational efficiency across your organization.",
    sortOrder: 1,
  },
  {
    title: "Strategic planning & execution",
    slug: "strategic-planning-execution",
    icon: "boxes",
    description:
      "We help you build a clear, actionable roadmap and then support you through execution so your strategy actually gets delivered.",
    sortOrder: 2,
  },
  {
    title: "Leadership executive coaching",
    slug: "leadership-executive-coaching",
    icon: "users",
    description:
      "One-on-one coaching for executives and senior leaders, focused on sharpening decision-making and leadership impact.",
    sortOrder: 3,
  },
  {
    title: "Legacy leadership institute",
    slug: "legacy-leadership-institute",
    icon: "sparkles",
    description:
      "A structured leadership development program designed to build lasting, values-driven leadership across your organization.",
    sortOrder: 4,
  },
  {
    title: "Executive growth solutions",
    slug: "executive-growth-solutions",
    icon: "circledot",
    description:
      "Tailored growth strategies and support systems that help executives scale their impact as the business scales.",
    sortOrder: 5,
  },
  {
    title: "Empowered leadership journey",
    slug: "empowered-leadership-journey",
    icon: "repeat",
    description:
      "An ongoing leadership development journey that builds confidence, capability, and continuity across leadership transitions.",
    sortOrder: 6,
  },
];

async function main() {
  for (const service of services) {
    const result = await prisma.service.upsert({
      where: { slug: service.slug },
      update: {}, // don't overwrite if it already exists / was edited
      create: {
        title: service.title,
        slug: service.slug,
        icon: service.icon,
        description: service.description,
        image: PLACEHOLDER_IMAGE,
        sortOrder: service.sortOrder,
        active: true,
        published: true,
      },
    });
    console.log(`Upserted: ${result.title} (${result.slug})`);
  }
}

main()
  .catch((err) => {
    console.error("Seed failed:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });