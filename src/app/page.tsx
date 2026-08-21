import { prisma, withDbRetry } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";
import Hero, { type HeroItem } from "../components/Hero";
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

export const dynamic = "force-dynamic";
export const revalidate = 0;

function parseJsonArray<T = unknown>(
  value: Prisma.JsonValue | null | undefined,
): T[] {
  return Array.isArray(value) ? (value as T[]) : [];
}

export default async function Home() {
  const allSections = await withDbRetry(
    () =>
      prisma.contentSection.findMany({
        where: { published: true },
        orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
      }),
    3,
    2000,
  ).catch(() => []);

  const byKey = Object.fromEntries(allSections.map((s) => [s.sectionKey, s]));

  const teamMembers = await withDbRetry(
    () =>
      prisma.teamMember.findMany({
        where: { active: true, published: true },
        orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
        take: 4,
      }),
    3,
    2000,
  ).catch(() => []);

  const teamItems: TeamItem[] = teamMembers.map((m) => ({
    title: m.name,
    meta: m.role,
    image: m.image,
    link: `/team/${m.slug}`,
  }));

  const heroItems = parseJsonArray<HeroItem>(byKey.HERO?.items);
  const processItems = parseJsonArray<ProcessItem>(byKey.PROCESS?.items);
  const teamItemsFromSection = parseJsonArray<TeamItem>(byKey.TEAM?.items);
  const caseStudyItems = parseJsonArray<CaseStudyItem>(
    byKey.CASE_STUDIES?.items,
  );

  return (
    <main>
      <CmsSection sectionKey="HERO"><Hero
        eyebrow={byKey.HERO?.eyebrow}
        title={byKey.HERO?.title}
        description={byKey.HERO?.description}
        image={byKey.HERO?.image}
        primaryButtonLabel={byKey.HERO?.primaryButtonLabel}
        primaryButtonUrl={byKey.HERO?.primaryButtonUrl}
        items={heroItems}
      /></CmsSection>

      <CmsSection sectionKey="SERVICES"><Services /></CmsSection>

      <CmsSection sectionKey="ABOUT"><AboutSection
        eyebrow={byKey.ABOUT?.eyebrow}
        title={byKey.ABOUT?.title}
        description={byKey.ABOUT?.description}
        image={byKey.ABOUT?.image}
        primaryButtonLabel={byKey.ABOUT?.primaryButtonLabel}
        primaryButtonUrl={byKey.ABOUT?.primaryButtonUrl}
      /></CmsSection>

      <CmsSection sectionKey="MARQUE"><Marquee /></CmsSection>

      <CmsSection sectionKey="PROCESS"><Process
        eyebrow={byKey.PROCESS?.eyebrow}
        title={byKey.PROCESS?.title}
        description={byKey.PROCESS?.description}
        image={byKey.PROCESS?.image}
        items={processItems}
      /></CmsSection>

      <CmsSection sectionKey="TEAM"><Team
        eyebrow={byKey.TEAM?.eyebrow}
        title={byKey.TEAM?.title}
        description={byKey.TEAM?.description}
        image={byKey.TEAM?.image}
        primaryButtonLabel={byKey.TEAM?.primaryButtonLabel}
        primaryButtonUrl={byKey.TEAM?.primaryButtonUrl}
        items={teamItems.length ? teamItems : teamItemsFromSection}
      /></CmsSection>

      <CmsSection sectionKey="CASE_STUDIES"><CaseStudy
        eyebrow={byKey.CASE_STUDIES?.eyebrow}
        title={byKey.CASE_STUDIES?.title}
        description={byKey.CASE_STUDIES?.description}
        items={caseStudyItems}
      /></CmsSection>

      <CmsSection sectionKey="PRICING"><Price
        eyebrow={byKey.PRICING?.eyebrow}
        title={byKey.PRICING?.title}
        description={byKey.PRICING?.description}
      /></CmsSection>

      <CmsSection sectionKey="TESTIMONIALS"><Testimonials
        eyebrow={byKey.TESTIMONIALS?.eyebrow}
        title={byKey.TESTIMONIALS?.title}
      /></CmsSection>

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
