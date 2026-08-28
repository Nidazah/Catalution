/**
 * Seeds the 12 new ContentSection rows added in this patch:
 *   - 10 inner-page hero banners (PAGE_HERO_*)
 *   - HISTORY (timeline milestones)
 *   - ABOUT_LOGOS (client/partner logo strip)
 *
 * Safe to re-run: upserts on the unique `sectionKey` field, same
 * pattern as the site's other seed-*.ts scripts. Uses the exact
 * defaults from src/lib/content-section-defaults.ts so the seeded
 * rows match what's already live — nothing changes visually until
 * an admin edits them in /admin/content.
 *
 * Run after pasting the enum additions into schema.prisma and
 * running `npx prisma db push` + `npx prisma generate`:
 *
 *   npx tsx prisma/seed-page-content-v2.ts
 */

import { PrismaClient } from "@prisma/client";
import { contentSectionDefaults } from "../src/lib/content-section-defaults";

const prisma = new PrismaClient();

const NEW_KEYS = [
  "PAGE_HERO_ABOUT",
  "PAGE_HERO_SERVICES",
  "PAGE_HERO_PORTFOLIOS",
  "PAGE_HERO_BLOG",
  "PAGE_HERO_TEAM",
  "PAGE_HERO_CAREERS",
  "PAGE_HERO_CONTACT",
  "PAGE_HERO_PRICING",
  "PAGE_HERO_FAQ",
  "PAGE_HERO_HISTORY",
  "HISTORY",
  "ABOUT_LOGOS",
] as const;

async function main() {
  for (const key of NEW_KEYS) {
    const defaults = (contentSectionDefaults as Record<string, any>)[key];

    if (!defaults) {
      console.warn(`No defaults found for ${key}, skipping`);
      continue;
    }

    await prisma.contentSection.upsert({
      where: { sectionKey: key as any },
      update: {},
      create: {
        sectionKey: key as any,
        label: defaults.label,
        eyebrow: defaults.eyebrow ?? "",
        title: defaults.title,
        description: defaults.description ?? "",
        image: defaults.image ?? "",
        primaryButtonLabel: defaults.primaryButtonLabel ?? "",
        primaryButtonUrl: defaults.primaryButtonUrl ?? "",
        secondaryButtonLabel: defaults.secondaryButtonLabel ?? "",
        secondaryButtonUrl: defaults.secondaryButtonUrl ?? "",
        items: defaults.items ?? [],
        settings: defaults.settings ?? {},
        sortOrder: 0,
        published: true,
      },
    });

    console.log(`Seeded ${key}`);
  }
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
