import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const sharedOverview = {
  text: "Develop and propose state-of-the-art solutions, including technology upgrades, process reengineering, and automation strategies, tailored to your business needs. Oversee the deployment and integration of new systems and technologies, ensuring minimal disruption to your ongoing operations and seamless adaptation. Provide comprehensive training for your team to ensure effective use of new systems and ongoing support to address any issues or challenges. Establish metrics and benchmarks to monitor the impact of the new solutions.",
  points: [
    "Streamline operations to reduce waste and enhance productivity.",
    "Lower operational costs through automation and optimized processes.",
    "Improve overall business performance with advanced solutions.",
    "Benefit from professional insights throughout the transformation process.",
  ],
};

const sharedDescription = [
  "Our mission is to empower businesses of all sizes to thrive in an ever-changing marketplace. We are committed to delivering exceptional value through strategic insight and innovative approaches. Our consulting solutions empower businesses to improve performance, optimize operations, and achieve sustainable growth.",
  "We combine strategic thinking, innovative technology, and practical solutions to help organizations overcome challenges, improve efficiency, and build a stronger foundation for long-term success.",
];

const sharedFinalResult = [
  "Our mission is to empower businesses of all sizes to thrive in an ever-changing marketplace. Through strategic insight and innovative approaches, we help organizations improve efficiency and achieve sustainable growth.",
  "By combining technology, strategy, and operational improvements, businesses can reduce costs, enhance productivity, and create a stronger foundation for future success.",
];

const portfolios = [
  {
    slug: "innovate-consultancy",
    title: "Innovate Consultancy",
    tags: ["Strategy", "Growth"],
    image:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=85",
    heroImage:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1800&q=85",
    intro:
      "Transforming operational efficiency with state-of-the-art solutions for modern businesses.",
    description: sharedDescription,
    overviewText: sharedOverview.text,
    overviewPoints: sharedOverview.points,
    mediaImage:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1400&q=85",
    videoUrl: "https://www.youtube.com/watch?v=eEzD-Y97ges",
    finalResult: sharedFinalResult,
    client: "Albert Buttler",
    portfolio: "Financial",
    service: "Corporate",
    category: "Marketing",
    date: "08 March 2023",
  },

  {
    slug: "strat-edge-solutions",
    title: "Strat Edge Solutions",
    tags: ["Strategy", "Digital Transformation"],
    image:
      "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=1200&q=85",
    heroImage:
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1800&q=85",
    intro:
      "Driving digital transformation and operational growth through strategic business solutions.",
    description: sharedDescription,
    overviewText: sharedOverview.text,
    overviewPoints: sharedOverview.points,
    mediaImage:
      "https://images.unsplash.com/photo-1556761175-129418cb2dfe?auto=format&fit=crop&w=1400&q=85",
    videoUrl: "https://www.youtube.com/watch?v=eEzD-Y97ges",
    finalResult: sharedFinalResult,
    client: "Albert Buttler",
    portfolio: "Financial",
    service: "Corporate",
    category: "Digital Strategy",
    date: "08 March 2023",
  },

  {
    slug: "prime-strategy-partners",
    title: "Prime Strategy Partners",
    tags: ["Consulting", "Strategy"],
    image:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=85",
    heroImage:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1800&q=85",
    intro:
      "Building smarter strategies that help organizations achieve sustainable growth and stronger performance.",
    description: sharedDescription,
    overviewText: sharedOverview.text,
    overviewPoints: sharedOverview.points,
    mediaImage:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1400&q=85",
    videoUrl: "https://www.youtube.com/watch?v=eEzD-Y97ges",
    finalResult: sharedFinalResult,
    client: "Albert Buttler",
    portfolio: "Financial",
    service: "Business Consulting",
    category: "Strategy",
    date: "08 March 2023",
  },

  {
    slug: "elevate-enterprise",
    title: "Elevate Enterprise",
    tags: ["Business", "Growth"],
    image:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=85",
    heroImage:
      "https://images.unsplash.com/photo-1551836022-4c4c79ecde51?auto=format&fit=crop&w=1800&q=85",
    intro:
      "Elevating business performance through innovative processes, technology, and strategic growth.",
    description: sharedDescription,
    overviewText: sharedOverview.text,
    overviewPoints: sharedOverview.points,
    mediaImage:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1400&q=85",
    videoUrl: "https://www.youtube.com/watch?v=eEzD-Y97ges",
    finalResult: sharedFinalResult,
    client: "Albert Buttler",
    portfolio: "Enterprise",
    service: "Business Transformation",
    category: "Growth",
    date: "08 March 2023",
  },

  {
    slug: "empower-enterprise",
    title: "Empower Enterprise",
    tags: ["Technology", "Innovation"],
    image:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1200&q=85",
    heroImage:
      "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=1800&q=85",
    intro:
      "Empowering teams with modern technology and innovative solutions designed for long-term business success.",
    description: sharedDescription,
    overviewText: sharedOverview.text,
    overviewPoints: sharedOverview.points,
    mediaImage:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1400&q=85",
    videoUrl: "https://www.youtube.com/watch?v=eEzD-Y97ges",
    finalResult: sharedFinalResult,
    client: "Albert Buttler",
    portfolio: "Technology",
    service: "Digital Transformation",
    category: "Innovation",
    date: "08 March 2023",
  },

  {
    slug: "innovative-solutions",
    title: "Innovative Solutions",
    tags: ["Innovation", "Technology"],
    image:
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1200&q=85",
    heroImage:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1800&q=85",
    intro:
      "Creating innovative technology-driven solutions that simplify operations and accelerate business growth.",
    description: sharedDescription,
    overviewText: sharedOverview.text,
    overviewPoints: sharedOverview.points,
    mediaImage:
      "https://images.unsplash.com/photo-1556761175-129418cb2dfe?auto=format&fit=crop&w=1400&q=85",
    videoUrl: "https://www.youtube.com/watch?v=eEzD-Y97ges",
    finalResult: sharedFinalResult,
    client: "Albert Buttler",
    portfolio: "Technology",
    service: "Digital Solutions",
    category: "Innovation",
    date: "08 March 2023",
  },
];

async function main() {
  console.log("Seeding portfolios...");

  for (let i = 0; i < portfolios.length; i++) {
    const portfolio = portfolios[i];

    const result = await prisma.portfolio.upsert({
      where: {
        slug: portfolio.slug,
      },
      update: {
        // Do not overwrite existing admin edits.
      },
      create: {
        ...portfolio,
        sortOrder: i + 1,
        active: true,
        published: true,
      },
    });

    console.log(
      `${i + 1}. ${result.title} (${result.slug})`
    );
  }

  console.log("Portfolio seed completed successfully.");
}

main()
  .catch((error) => {
    console.error("Portfolio seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });