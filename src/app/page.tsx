// src/app/page.tsx
import { prisma, withDbRetry } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";
import Hero from "../components/Hero";
import AboutSection from "../components/About";
import Services from "../components/Services";
import Process, { type ProcessItem } from "../components/Process";
import Marquee from "../components/Marquee";
import Work from "../components/Work";
import Team, { type TeamItem } from "../components/Team";
import CaseStudy from "../components/Case-Study";
import Price from "../components/Price";
import Testimonials from "../components/Testimonials";
import CTA from "../components/CTA";

// Type helper for safely parsing JSON fields
function parseJsonArray<T = any>(value: Prisma.JsonValue | null | undefined): T[] {
  if (!value) return [];
  if (Array.isArray(value)) return value as T[];
  return [];
}

export default async function Home() {
  // Fetch all content sections with retry
  const allSections = await withDbRetry(
    () => prisma.contentSection.findMany({ 
      where: { published: true } 
    }),
    3, // retries
    2000 // delay
  ).catch(() => []);

  // Create a map for easy access
  const byKey = Object.fromEntries(allSections.map((s) => [s.sectionKey, s]));

  // Fetch team members with retry
  const teamMembers = await withDbRetry(
    () => prisma.teamMember.findMany({
      where: { active: true, published: true },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
      take: 4,
    }),
    3,
    2000
  ).catch(() => []);

  // Map team members to TeamItem format
  const teamItems: TeamItem[] = teamMembers.map((m) => ({
    title: m.name,
    meta: m.role,
    image: m.image,
    link: `/team/${m.slug}`,
  }));

  // Safely parse process items
  const processItems = parseJsonArray<ProcessItem>(byKey.PROCESS?.items);
  const teamItemsFromSection = parseJsonArray<TeamItem>(byKey.TEAM?.items);

  return (
    <main>
      {/* Hero Section */}
      <Hero
        eyebrow={byKey.HERO?.eyebrow}
        title={byKey.HERO?.title}
        description={byKey.HERO?.description}
        image={byKey.HERO?.image}
        primaryButtonLabel={byKey.HERO?.primaryButtonLabel}
        primaryButtonUrl={byKey.HERO?.primaryButtonUrl}
      />

      {/* Services Section */}
      <Services />

      {/* About Section */}
      <AboutSection
        eyebrow={byKey.ABOUT?.eyebrow}
        title={byKey.ABOUT?.title}
        description={byKey.ABOUT?.description}
        image={byKey.ABOUT?.image}
        primaryButtonLabel={byKey.ABOUT?.primaryButtonLabel}
        primaryButtonUrl={byKey.ABOUT?.primaryButtonUrl}
      />

      {/* Process Section */}
      <Process
        eyebrow={byKey.PROCESS?.eyebrow}
        title={byKey.PROCESS?.title}
        description={byKey.PROCESS?.description}
        primaryButtonLabel={byKey.PROCESS?.primaryButtonLabel}
        primaryButtonUrl={byKey.PROCESS?.primaryButtonUrl}
        items={processItems.length > 0 ? processItems : undefined}
      />

      {/* Marquee */}
      <Marquee />

      {/* Work Section */}
      <Work
        eyebrow={byKey.WORK?.eyebrow}
        title={byKey.WORK?.title}
        description={byKey.WORK?.description}
        image={byKey.WORK?.image}
        primaryButtonLabel={byKey.WORK?.primaryButtonLabel}
        primaryButtonUrl={byKey.WORK?.primaryButtonUrl}
      />

      {/* Team Section */}
      <Team
        eyebrow={byKey.TEAM?.eyebrow}
        title={byKey.TEAM?.title}
        description={byKey.TEAM?.description}
        image={byKey.TEAM?.image}
        primaryButtonLabel={byKey.TEAM?.primaryButtonLabel}
        primaryButtonUrl={byKey.TEAM?.primaryButtonUrl}
        items={teamItems.length > 0 ? teamItems : teamItemsFromSection.length > 0 ? teamItemsFromSection : undefined}
      />

      {/* Case Study Section */}
      <CaseStudy />

      {/* Pricing Section */}
      <Price />

      {/* Testimonials Section */}
      <Testimonials />

      {/* CTA Section */}
      <CTA />
    </main>
  );
}