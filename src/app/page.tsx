import { prisma, withDbRetry } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";

import Hero, { type HeroItem, type HeroSettings } from "../components/Hero";
import AboutSection from "../components/About";
import Services from "../components/Services";
import Process, { type ProcessItem } from "../components/Process";
import Marquee from "../components/Marquee";
import Team, { type TeamItem } from "../components/Team";
import CaseStudy, { type CaseStudyItem } from "../components/Case-Study";
import Price from "../components/Price";
import Testimonials from "../components/Testimonials";
import CTA from "../components/CTA";
import CmsSection from "../components/CmsSection";

import { contentSectionDefaults } from "@/lib/content-section-defaults";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function parseJsonArray<T = unknown>(
  value: Prisma.JsonValue | null | undefined,
): T[] {
  return Array.isArray(value) ? (value as T[]) : [];
}

function isJsonObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export default async function Home() {
  const allSections = await withDbRetry(
    () =>
      prisma.contentSection.findMany({
        where: {
          published: true,
        },
        orderBy: [
          {
            sortOrder: "asc",
          },
          {
            createdAt: "asc",
          },
        ],
      }),
    3,
    2000,
  ).catch(() => []);

  /*
   * ---------------------------------------------------------
   * Merge CMS content with original defaults.
   *
   * Important:
   * - Missing database section => use defaults.
   * - Existing database value => use CMS value.
   * - Empty items array is preserved intentionally.
   * ---------------------------------------------------------
   */

  const defaultMap = contentSectionDefaults as Record<string, any>;

  const byKey = Object.fromEntries(
    Object.entries(defaultMap).map(([key, defaults]) => {
      const row = allSections.find((section) => section.sectionKey === key);

      if (!row) {
        return [key, structuredClone(defaults)];
      }

      const rowSettings = isJsonObject(row.settings) ? row.settings : {};

      const defaultSettings = isJsonObject(defaults.settings)
        ? defaults.settings
        : {};

      return [
        key,
        {
          ...structuredClone(defaults),
          ...row,

          /*
           * Preserve an explicitly empty CMS array.
           * Only use defaults when the database value
           * is actually missing/null.
           */
          items:
            row.items !== null &&
            row.items !== undefined &&
            Array.isArray(row.items)
              ? row.items
              : structuredClone(defaults.items ?? []),

          settings: {
            ...defaultSettings,
            ...rowSettings,
          },
        },
      ];
    }),
  );

  /*
   * ---------------------------------------------------------
   * HERO
   * ---------------------------------------------------------
   */

  const heroItems = parseJsonArray<HeroItem>(byKey.HERO?.items);

  const heroSettings: HeroSettings = isJsonObject(byKey.HERO?.settings)
    ? (byKey.HERO.settings as HeroSettings)
    : {};

  /*
   * ---------------------------------------------------------
   * PROCESS
   * ---------------------------------------------------------
   */

  const processItems = parseJsonArray<ProcessItem>(byKey.PROCESS?.items);

  /*
   * ---------------------------------------------------------
   * TEAM
   * ---------------------------------------------------------
   */

  const teamItemsFromSection = parseJsonArray<TeamItem>(byKey.TEAM?.items);

  const hasTeamCms = allSections.some(
    (section) => section.sectionKey === "TEAM",
  );

  const teamMembers = await withDbRetry(
    () =>
      prisma.teamMember.findMany({
        where: {
          active: true,
          published: true,
        },
        orderBy: [
          {
            sortOrder: "asc",
          },
          {
            createdAt: "asc",
          },
        ],
        take: 4,
      }),
    3,
    2000,
  ).catch(() => []);

  const teamItems: TeamItem[] = teamMembers.map((member) => ({
    title: member.name,
    meta: member.role,
    image: member.image,
    link: `/team/${member.slug}`,
  }));

  /*
   * ---------------------------------------------------------
   * CASE STUDIES
   * ---------------------------------------------------------
   */

  const caseStudyItems = parseJsonArray<CaseStudyItem>(
    byKey.CASE_STUDIES?.items,
  );

  /*
   * ---------------------------------------------------------
   * PRICING
   * ---------------------------------------------------------
   */

  const pricingSettings = isJsonObject(byKey.PRICING?.settings)
    ? byKey.PRICING.settings
    : {};

  /*
   * ---------------------------------------------------------
   * TESTIMONIALS
   * ---------------------------------------------------------
   */

  const testimonialSettings = isJsonObject(byKey.TESTIMONIALS?.settings)
    ? byKey.TESTIMONIALS.settings
    : {};

  /*
   * ---------------------------------------------------------
   * RENDER
   * ---------------------------------------------------------
   */

  return (
    <main>
      <CmsSection sectionKey="HERO">
        <Hero
          eyebrow={byKey.HERO?.eyebrow}
          title={byKey.HERO?.title}
          description={byKey.HERO?.description}
          image={byKey.HERO?.image}
          primaryButtonLabel={byKey.HERO?.primaryButtonLabel}
          primaryButtonUrl={byKey.HERO?.primaryButtonUrl}
          items={heroItems}
          settings={heroSettings}
        />
      </CmsSection>

      <CmsSection sectionKey="SERVICES">
        <Services />
      </CmsSection>

      <CmsSection sectionKey="ABOUT">
        <AboutSection
          eyebrow={byKey.ABOUT?.eyebrow}
          title={byKey.ABOUT?.title}
          description={byKey.ABOUT?.description}
          image={byKey.ABOUT?.image}
          primaryButtonLabel={byKey.ABOUT?.primaryButtonLabel}
          primaryButtonUrl={byKey.ABOUT?.primaryButtonUrl}
          settings={(byKey.ABOUT?.settings as any) || {}}
        />
      </CmsSection>

      <CmsSection sectionKey="MARQUE">
        <Marquee />
      </CmsSection>

      <CmsSection sectionKey="PROCESS">
        <Process
          eyebrow={byKey.PROCESS?.eyebrow}
          title={byKey.PROCESS?.title}
          description={byKey.PROCESS?.description}
          image={byKey.PROCESS?.image}
          items={processItems}
        />
      </CmsSection>

      <CmsSection sectionKey="TEAM">
        <Team
          eyebrow={byKey.TEAM?.eyebrow}
          title={byKey.TEAM?.title}
          description={byKey.TEAM?.description}
          image={byKey.TEAM?.image}
          primaryButtonLabel={byKey.TEAM?.primaryButtonLabel}
          primaryButtonUrl={byKey.TEAM?.primaryButtonUrl}
          items={hasTeamCms ? teamItemsFromSection : teamItems}
          settings={(byKey.TEAM?.settings as any) || {}}
        />
      </CmsSection>

      <CmsSection sectionKey="CASE_STUDIES">
        <CaseStudy
          eyebrow={byKey.CASE_STUDIES?.eyebrow}
          title={byKey.CASE_STUDIES?.title}
          description={byKey.CASE_STUDIES?.description}
          items={caseStudyItems}
        />
      </CmsSection>

      <CmsSection sectionKey="PRICING">
        <Price
          eyebrow={byKey.PRICING?.eyebrow}
          title={byKey.PRICING?.title}
          description={byKey.PRICING?.description}
          cmsSettings={pricingSettings as any}
        />
      </CmsSection>

      <CmsSection sectionKey="TESTIMONIALS">
        <Testimonials
          eyebrow={byKey.TESTIMONIALS?.eyebrow}
          title={byKey.TESTIMONIALS?.title}
          cmsSettings={testimonialSettings as any}
        />
      </CmsSection>

      <CmsSection sectionKey="CTA">
        <CTA
          eyebrow={byKey.CTA?.eyebrow}
          title={byKey.CTA?.title}
          description={byKey.CTA?.description}
          image={byKey.CTA?.image}
          primaryButtonLabel={byKey.CTA?.primaryButtonLabel}
          primaryButtonUrl={byKey.CTA?.primaryButtonUrl}
        />
      </CmsSection>
    </main>
  );
}
