/**
 * One-off seed script: loads the 6 testimonials currently hardcoded in
 * src/components/Testimonials.tsx's `quotes` array into the Testimonial
 * table, so /admin/testimonials has real data to show.
 *
 * Usage (from your project root, Catalution_content_only_cms/Catalution):
 *   npx tsx prisma/seed-testimonials.ts
 * (or: npx ts-node prisma/seed-testimonials.ts)
 *
 * Safe to re-run: uses upsert on `slug`, so re-running won't create
 * duplicates or overwrite anything you've already edited in the admin.
 */

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const testimonials = [
  {
    quote:
      "Solvior didn't just take a ticket queue — they asked why the queue existed in the first place. Our infra bill dropped and our on-call rotation got quiet.",
    name: "Amara Reyes",
    role: "VP Engineering, Ledgerly",
    sortOrder: 1,
  },
  {
    quote:
      "We'd stalled twice trying to modernize our claims system in-house. Solvior shipped the migration in a single quarter without a day of downtime.",
    name: "Faisal Rahman",
    role: "CTO, Northbeam Health",
    sortOrder: 2,
  },
  {
    quote:
      "The AI intake tool they built is the first internal tool our clinicians actually asked to keep using after the pilot ended.",
    name: "Priya Menon",
    role: "Head of Product, Carewell",
    sortOrder: 3,
  },
  {
    quote:
      "Solvior rebuilt our checkout flow and cut cart abandonment by a third in six weeks. They explained every tradeoff before we signed off on it.",
    name: "Daniel Ochoa",
    role: "Founder, Marlowe & Finch",
    sortOrder: 4,
  },
  {
    quote:
      "Most consultants hand you a slide deck. Solvior handed us a working pipeline, documentation, and a team that could actually run it after they left.",
    name: "Grace Lindqvist",
    role: "Director of Data, Halstrom Group",
    sortOrder: 5,
  },
  {
    quote:
      "We brought them in for a two-week audit. What they found saved us more in the first month than the entire engagement cost.",
    name: "Tomás Rivera",
    role: "COO, Beacon Freight",
    sortOrder: 6,
  },
];

async function main() {
  for (const t of testimonials) {
    const slug = slugify(t.name);
    const result = await prisma.testimonial.upsert({
      where: { slug },
      update: {}, // don't overwrite if it already exists / was edited
      create: {
        quote: t.quote,
        name: t.name,
        role: t.role,
        slug,
        sortOrder: t.sortOrder,
        active: true,
        published: true,
      },
    });
    console.log(`Upserted: ${result.name} (${result.slug})`);
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
