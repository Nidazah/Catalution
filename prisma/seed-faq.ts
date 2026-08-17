import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// The 5 Q&As currently hardcoded in src/app/faq/page.tsx and
// src/components/ServiceFAQ.tsx. Seeding them into the FAQ ContentSection
// so both places can be switched to read from the DB instead.
const faqItems = [
  {
    title: "How do consultants add value to a business?",
    description:
      "Consultants bring deep expertise, fresh perspectives, and data-driven strategies to identify inefficiencies and implement tailored solutions that drive sustainable growth.",
    image: "",
    meta: "",
    link: "",
  },
  {
    title: "How do I know if my business needs a consultant?",
    description:
      "If your business is facing growth plateaus, operational bottlenecks, or needs a new strategic direction, a consultant can provide the objective insights and specialized skills necessary to overcome these challenges.",
    image: "",
    meta: "",
    link: "",
  },
  {
    title: "How do business consultants charge for their services?",
    description:
      "Consultants typically charge based on project scope, hourly rates, or long-term retainers. We offer flexible pricing models designed to align with your specific project goals and budget.",
    image: "",
    meta: "",
    link: "",
  },
  {
    title: "Can a business consultant guarantee results?",
    description:
      "While we cannot guarantee specific outcomes, we commit to delivering our best expertise, data-driven strategies, and a structured roadmap. We work closely with you to ensure our strategies are actionable.",
    image: "",
    meta: "",
    link: "",
  },
  {
    title: "How can I measure the success of a consulting engagement?",
    description:
      "Success is measured through pre-defined KPIs, ROI analysis, and post-engagement performance reviews. We establish clear metrics at the start of every project to track our progress.",
    image: "",
    meta: "",
    link: "",
  },
];

async function main() {
  await prisma.contentSection.upsert({
    where: { sectionKey: "FAQ" },
    update: {
      // Only refresh items on re-run if the section is still empty, so
      // edits made later through /admin/content are never overwritten.
    },
    create: {
      sectionKey: "FAQ",
      label: "FAQ",
      eyebrow: "",
      title: "Hi, how we support you?",
      description: "No matter the strategy, we've got it handled.",
      image: "",
      primaryButtonLabel: "",
      primaryButtonUrl: "",
      secondaryButtonLabel: "",
      secondaryButtonUrl: "",
      items: faqItems,
      published: true,
      sortOrder: 0,
    },
  });

  console.log(
    `Seeded FAQ content section (upsert on sectionKey — safe to re-run).`,
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());