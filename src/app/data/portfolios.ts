export type Portfolio = {
  id: number;
  title: string;
  tags: string[];
  img: string;
  heroImage: string;
  intro: string;
  description: string[];
  overview: {
    text: string;
    points: string[];
  };
  media: {
    image: string;
    videoUrl: string;
  };
  finalResult: string[];
  info: {
    client: string;
    portfolio: string;
    service: string;
    category: string;
    date: string;
  };
};

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

export const portfolios: Portfolio[] = [
  {
    id: 1,
    title: "Innovate Consultancy",
    tags: ["Strategy", "Growth"],
    img: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=85",
    heroImage:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1800&q=85",
    intro:
      "Transforming operational efficiency with state-of-the-art solutions for modern businesses.",
    description: sharedDescription,
    overview: sharedOverview,
    media: {
      image:
        "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1400&q=85",
      videoUrl: "https://www.youtube.com/watch?v=eEzD-Y97ges",
    },
    finalResult: sharedFinalResult,
    info: {
      client: "Albert Buttler",
      portfolio: "Financial",
      service: "Corporate",
      category: "Marketing",
      date: "08 March 2023",
    },
  },

  {
    id: 2,
    title: "Strat Edge Solutions",
    tags: ["Strategy", "Digital Transformation"],
    img: "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=1200&q=85",
    heroImage:
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1800&q=85",
    intro:
      "Driving digital transformation and operational growth through strategic business solutions.",
    description: sharedDescription,
    overview: sharedOverview,
    media: {
      image:
        "https://images.unsplash.com/photo-1556761175-129418cb2dfe?auto=format&fit=crop&w=1400&q=85",
      videoUrl: "https://www.youtube.com/watch?v=eEzD-Y97ges",
    },
    finalResult: sharedFinalResult,
    info: {
      client: "Albert Buttler",
      portfolio: "Financial",
      service: "Corporate",
      category: "Digital Strategy",
      date: "08 March 2023",
    },
  },

  {
    id: 3,
    title: "Prime Strategy Partners",
    tags: ["Consulting", "Strategy"],
    img: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=85",
    heroImage:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1800&q=85",
    intro:
      "Building smarter strategies that help organizations achieve sustainable growth and stronger performance.",
    description: sharedDescription,
    overview: sharedOverview,
    media: {
      image:
        "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1400&q=85",
      videoUrl: "https://www.youtube.com/watch?v=eEzD-Y97ges",
    },
    finalResult: sharedFinalResult,
    info: {
      client: "Albert Buttler",
      portfolio: "Financial",
      service: "Business Consulting",
      category: "Strategy",
      date: "08 March 2023",
    },
  },

  {
    id: 4,
    title: "Elevate Enterprise",
    tags: ["Business", "Growth"],
    img: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=85",
    heroImage:
      "https://images.unsplash.com/photo-1551836022-4c4c79ecde51?auto=format&fit=crop&w=1800&q=85",
    intro:
      "Elevating business performance through innovative processes, technology, and strategic growth.",
    description: sharedDescription,
    overview: sharedOverview,
    media: {
      image:
        "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1400&q=85",
      videoUrl: "https://www.youtube.com/watch?v=eEzD-Y97ges",
    },
    finalResult: sharedFinalResult,
    info: {
      client: "Albert Buttler",
      portfolio: "Enterprise",
      service: "Business Transformation",
      category: "Growth",
      date: "08 March 2023",
    },
  },

  {
    id: 5,
    title: "Empower Enterprise",
    tags: ["Technology", "Innovation"],
    img: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1200&q=85",
    heroImage:
      "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=1800&q=85",
    intro:
      "Empowering teams with modern technology and innovative solutions designed for long-term business success.",
    description: sharedDescription,
    overview: sharedOverview,
    media: {
      image:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1400&q=85",
      videoUrl: "https://www.youtube.com/watch?v=eEzD-Y97ges",
    },
    finalResult: sharedFinalResult,
    info: {
      client: "Albert Buttler",
      portfolio: "Technology",
      service: "Digital Transformation",
      category: "Innovation",
      date: "08 March 2023",
    },
  },

  {
    id: 6,
    title: "Innovative Solutions",
    tags: ["Innovation", "Technology"],
    img: "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1200&q=85",
    heroImage:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1800&q=85",
    intro:
      "Creating innovative technology-driven solutions that simplify operations and accelerate business growth.",
    description: sharedDescription,
    overview: sharedOverview,
    media: {
      image:
        "https://images.unsplash.com/photo-1556761175-129418cb2dfe?auto=format&fit=crop&w=1400&q=85",
      videoUrl: "https://www.youtube.com/watch?v=eEzD-Y97ges",
    },
    finalResult: sharedFinalResult,
    info: {
      client: "Albert Buttler",
      portfolio: "Technology",
      service: "Digital Solutions",
      category: "Innovation",
      date: "08 March 2023",
    },
  },
];

export function getPortfolioById(
  id: number
): Portfolio | undefined {
  return portfolios.find((p) => p.id === id);
}

export function getAdjacentPortfolioIds(id: number) {
  const total = portfolios.length;

  const prevId = id > 1 ? id - 1 : total;
  const nextId = id < total ? id + 1 : 1;

  return {
    prevId,
    nextId,
  };
}