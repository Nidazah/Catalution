import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Matches the FaqItem shape used by src/app/admin/faq/page.tsx:
// { title, description, image, meta, link }
const faqItems = [
  {
    title: "What services does Catalution offer?",
    description:
      "Catalution provides end-to-end consulting and technology solutions, including strategy, process automation, and custom software delivery tailored to each client's operations.",
    image: "",
    meta: "",
    link: "",
  },
  {
    title: "How long does a typical engagement take?",
    description:
      "Timelines vary by scope, but most engagements run from a few weeks for advisory work to a few months for full implementation projects. We agree on a timeline together during onboarding.",
    image: "",
    meta: "",
    link: "",
  },
  {
    title: "Do you work with small businesses or only enterprises?",
    description:
      "We work with organizations of all sizes, from growing small businesses to large enterprises, and scale our approach to fit your team and budget.",
    image: "",
    meta: "",
    link: "",
  },
  {
    title: "How do I get started?",
    description:
      "Reach out through our contact page with a short description of your needs, and our team will schedule an initial consultation to discuss goals and next steps.",
    image: "",
    meta: "",
    link: "",
  },
  {
    title: "What industries do you specialize in?",
    description:
      "Our team has experience across a range of industries and adapts our frameworks to the specific regulatory and operational needs of your sector.",
    image: "",
    meta: "",
    link: "",
  },
];

async function main() {
  const section = await prisma.contentSection.findFirst({
    where: { sectionKey: "FAQ" },
  });

  if (!section) {
    console.error('No ContentSection row with sectionKey "FAQ" found. Nothing updated.');
    process.exit(1);
  }

  const updated = await prisma.contentSection.update({
    where: { id: section.id },
    data: { items: faqItems },
  });

  console.log(`Updated ContentSection "${updated.id}" with ${faqItems.length} FAQ items.`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });