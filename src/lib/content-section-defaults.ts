const defaultMarqueeItems = [
  "Mission and progress",
  "Founders and vision",
  "Growth and impact",
  "Team and values",
];

export const contentSectionDefaults = {
  HERO: {
    label: "Hero",
    eyebrow: "SOLVER AGENCY",
    title: "Proven consulting for modern global enterprises",
    description:
      "Transform your business with expert consultancy services — our team of seasoned consultants unparalleled.",
    image: "/images/hero/h5-hero.png",
    primaryButtonLabel: "Free consultation",
    primaryButtonUrl: "#contact",
    secondaryButtonLabel: "",
    secondaryButtonUrl: "",
    settings: {
      reelEnabled: true,
      reelLabel: "Play our reels",
      reelUrl: "https://www.youtube.com/watch?v=MLpWrANjFbI",
      clientCardEnabled: true,
      clientCount: "39K+",
      clientLabel: "Happy clients all over world.",
      clientAvatar1: "",
      clientAvatar2: "",
      clientAvatar3: "",
      badgeLabel: "NUMBER",
      badgeValue: "#1",
    },
    items: [],
  },

  SERVICES: {
  label: "Services",
  eyebrow: "",
  title: "Our Services",
  description: "",
  image: "",
  primaryButtonLabel: "",
  primaryButtonUrl: "",
  secondaryButtonLabel: "",
  secondaryButtonUrl: "",
  items: [
    {
      title: "Strategic planning",
      description: "",
      image: "",
      meta: "",
      link: "/services",
    },
    {
      title: "Market research",
      description: "",
      image: "",
      meta: "",
      link: "/services",
    },
    {
      title: "Business process",
      description: "",
      image: "",
      meta: "",
      link: "/services",
    },
    {
      title: "Financial management",
      description: "",
      image: "",
      meta: "",
      link: "/services",
    },
    {
      title: "Change management",
      description: "",
      image: "",
      meta: "",
      link: "/services",
    },
    {
      title: "IT consulting",
      description: "",
      image: "",
      meta: "",
      link: "/services",
    },
    {
      title: "Leadership",
      description: "",
      image: "",
      meta: "",
      link: "/services",
    },
  ],
},

  ABOUT: {
    label: "About",
    eyebrow: "ABOUT OUR COMPANY",
    title:
      "Crafting success tailored solution for each & every challenges",
    description:
      "Our mission is to empower businesses of all sizes to thrive in an ever-changing marketplace. In today's dynamic business environment, the key to success lies in adaptability. Our consultancy excels in providing quick solutions tailored to your unique challenges.",
    image: "/images/about/h5-about-1.webp",
    primaryButtonLabel: "Learn About Us",
    primaryButtonUrl: "#contact",
    secondaryButtonLabel: "",
    secondaryButtonUrl: "",
    settings: {
      statBadgeLabel: "Reach",
      statBadgeValue: "20M",
      stat1Value: "8.5x",
      stat1Label: "Faster growth",
      stat2Value: "20M",
      stat2Label: "Reach worldwide",
    },
    items: [],
  },

  MARQUE: {
    label: "Marquee",
    eyebrow: "",
    title: "Marquee",
    description: "",
    image: "",
    primaryButtonLabel: "",
    primaryButtonUrl: "",
    secondaryButtonLabel: "",
    secondaryButtonUrl: "",

    items: defaultMarqueeItems.map((text) => ({
      title: text,
      description: "",
      image: "",
      meta: "",
      link: "",
    })),
  },

  PROCESS: {
    label: "Process",
    eyebrow: "",
    title: "Our Process",
    description: "",
    image: "",
    primaryButtonLabel: "",
    primaryButtonUrl: "",
    secondaryButtonLabel: "",
    secondaryButtonUrl: "",
    items: [],
  },

  TEAM: {
    label: "Team",
    eyebrow: "MEET OUR TEAMS",
    title: "Expert team members",
    description:
      "In today's dynamic business environment, the key to success strategics..",
    image: "",
    primaryButtonLabel: "",
    primaryButtonUrl: "",
    secondaryButtonLabel: "",
    secondaryButtonUrl: "",
    settings: {
      socialLinks: ["#", "#", "#", "#"],
    },
    items: [],
  },

  PRICING: {
    label: "Pricing",
    eyebrow: "PRICING PLAN",
    title: "Flexible pricing, powerful tangible results",
    description:
      "In today's dynamic business environment, the key to success starts with a plan that scales alongside your goals.",
    image: "",
    primaryButtonLabel: "",
    primaryButtonUrl: "",
    secondaryButtonLabel: "",
    secondaryButtonUrl: "",
    settings: {
      monthlyLabel: "Monthly",
      yearlyLabel: "Yearly",
      yearlySavingsText: "Save up to 2 months with annual billing",
    },
    items: [],
  },

  TESTIMONIALS: {
    label: "Testimonials",
    eyebrow: "Client word",
    title: "Teams who kept us past the first project.",
    description: "",
    image: "",
    primaryButtonLabel: "",
    primaryButtonUrl: "",
    secondaryButtonLabel: "",
    secondaryButtonUrl: "",
    items: [],
  },

  CASE_STUDIES: {
    label: "Case Study",
    eyebrow: "OUR CASE STUDIES",
    title:
      "Explore our outstanding client projects",
    description: "",
    image: "",
    primaryButtonLabel: "",
    primaryButtonUrl: "",
    secondaryButtonLabel: "",
    secondaryButtonUrl: "",
    items: [],
  },

  CTA: {
    label: "CTA",
    eyebrow: "• LET'S TALK",
    title: "Ready to transform your business?",
    description:
      "Book a free consultation. We'll reply within one business day with concrete next steps.",
    image: "",
    primaryButtonLabel: "Free consultation",
    primaryButtonUrl:
      "mailto:support@solvior.com",
    secondaryButtonLabel: "",
    secondaryButtonUrl: "",
    items: [],
  },

  /* =========================================================
     /about and /history inner-page sections
  ========================================================= */

  PAGE_HERO_ABOUT: {
    label: "About page hero",
    eyebrow: "",
    title: "About Us",
    description: "",
    image: "/images/portfolios/porofolio.webp",
    primaryButtonLabel: "",
    primaryButtonUrl: "",
    secondaryButtonLabel: "",
    secondaryButtonUrl: "",
    items: [],
  },

  PAGE_HERO_HISTORY: {
    label: "History page hero",
    eyebrow: "",
    title: "Our History",
    description: "",
    image: "/images/portfolios/porofolio.webp",
    primaryButtonLabel: "",
    primaryButtonUrl: "",
    secondaryButtonLabel: "",
    secondaryButtonUrl: "",
    items: [],
  },

  ABOUT_INTRO: {
    label: "About intro",
    eyebrow: "ABOUT OUR COMPANY",
    title: "Crafting success tailored solution for each & every challenges",
    description:
      "Our mission is to empower businesses of all size to thrive in an businesses ever changing marketplace. We are committed to the delivering exceptional in the value through our strategic inset, innovative approaches.",
    image: "",
    primaryButtonLabel: "Learn more",
    primaryButtonUrl: "/contact",
    secondaryButtonLabel: "",
    secondaryButtonUrl: "",
    settings: {
      paragraph2:
        "Committed to the delivering exceptional in the value through our strategic inset, innovative approaches empower.",
    },
    items: [],
  },

  ABOUT_FEATURES: {
    label: "About feature cards",
    eyebrow: "",
    title: "",
    description: "",
    image: "",
    primaryButtonLabel: "",
    primaryButtonUrl: "",
    secondaryButtonLabel: "",
    secondaryButtonUrl: "",
    items: [
      {
        title: "Quick solutions",
        description:
          "Our consultancy excels in providing quick solutions tailored to your business challenges",
        image: "",
        meta: "",
        link: "",
        icon: "boxes",
      },
      {
        title: "Expert advice",
        description:
          "Our consultancy excels in providing quick solutions tailored to your business challenges",
        image: "",
        meta: "",
        link: "",
        icon: "layers",
      },
      {
        title: "Strategic planning",
        description:
          "Our consultancy excels in providing quick solutions tailored to your business challenges",
        image: "",
        meta: "",
        link: "",
        icon: "circledot",
      },
      {
        title: "Efficient operations",
        description:
          "Our consultancy excels in providing quick solutions tailored to your business challenges",
        image: "",
        meta: "",
        link: "",
        icon: "shield",
      },
    ],
  },

  ABOUT_EVOLUTION: {
    label: "About evolution & stats",
    eyebrow: "Our evolution",
    title: "",
    description:
      "\u201cFounded in 2002 by Burdee Ncolase en our firm started with our great vision to bring innovative solutions of businesses facing unprecedented challenges. That began as a small consultings firm quickly evolved into a trusted partner for companies around the globe. Our journey into began with a simple idea that offer unparalleled consulting services empower. Our core values of integrity, innovation, and excellence guide everything we do leading the wave in consulting.\u201d",
    image:
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop",
    primaryButtonLabel: "",
    primaryButtonUrl: "https://www.youtube.com/watch?v=GGf1JjSAKP4",
    secondaryButtonLabel: "",
    secondaryButtonUrl: "",
    items: [
      { title: "93%", description: "", image: "", meta: "Complete projects", link: "" },
      { title: "20M", description: "", image: "", meta: "Reach worldwide", link: "" },
      { title: "8.5x", description: "", image: "", meta: "Faster growth", link: "" },
    ],
  },

  ABOUT_SKILLS: {
    label: "About skill & experience",
    eyebrow: "",
    title: "Skill and experience",
    description:
      "In today's dynamic business environment, the key to success lies in strategic planning and operational excellence.",
    image: "",
    primaryButtonLabel: "",
    primaryButtonUrl: "",
    secondaryButtonLabel: "",
    secondaryButtonUrl: "",
    items: [
      { title: "Business consultants", description: "", image: "", meta: "90%", link: "" },
      { title: "Client communication", description: "", image: "", meta: "82%", link: "" },
    ],
  },

  ABOUT_LOGOS: {
    label: "About client logos",
    eyebrow: "",
    title: "Join the 1000+ companies benefiting from Catalution",
    description: "",
    image: "",
    primaryButtonLabel: "",
    primaryButtonUrl: "",
    secondaryButtonLabel: "",
    secondaryButtonUrl: "",
    items: [
      { title: "flomodia", description: "", image: "/images/about/brand-thumb-6.png", meta: "", link: "" },
      { title: "Influence 4You", description: "", image: "/images/about/brand-thumb-1.png", meta: "", link: "" },
      { title: "monceau", description: "", image: "/images/about/brand-thumb-2.png", meta: "", link: "" },
      { title: "tse", description: "", image: "/images/about/brand-thumb-3.png", meta: "", link: "" },
      { title: "coudac", description: "", image: "/images/about/brand-thumb-4.png", meta: "", link: "" },
      { title: "WEGLOT", description: "", image: "/images/about/brand-thumb-5.png", meta: "", link: "" },
    ],
  },

  HISTORY_INTRO: {
    label: "History intro",
    eyebrow: "Our Background",
    title: "Discover how we have evolved our company's on legacy.",
    description:
      "Our mission is to empower businesses of all sizes to thrive in an ever-changing marketplace. We are committed to delivering exceptional value through strategic insights, innovative approaches.",
    image: "",
    primaryButtonLabel: "Learn More",
    primaryButtonUrl: "/contact",
    secondaryButtonLabel: "",
    secondaryButtonUrl: "",
    settings: {
      paragraph2:
        "Committed to delivering exceptional value through strategic insights, innovative approaches empower.",
    },
    items: [],
  },

  HISTORY: {
    label: "History timeline",
    eyebrow: "",
    title: "",
    description: "",
    image: "",
    primaryButtonLabel: "",
    primaryButtonUrl: "",
    secondaryButtonLabel: "",
    secondaryButtonUrl: "",
    items: [
      {
        title: "Founding and early years",
        description:
          "Our mission is to empower businesses of all sizes to thrive in an ever-changing marketplace. We are committed to delivering exceptional value through strategic insights and innovative approaches.",
        image: "/images/history/history-1.webp",
        meta: "2008",
        link: "",
        settings: { align: "left", image2: "/images/history/history-2.webp" },
      },
      {
        title: "Expansion and growth",
        description:
          "Our mission is to empower businesses of all sizes to thrive in an ever-changing marketplace. We are committed to delivering exceptional value through strategic insights and innovative approaches.",
        image: "/images/history/history-3.webp",
        meta: "2012",
        link: "",
        settings: { align: "right", image2: "/images/history/history-4.webp" },
      },
      {
        title: "Innovation and industry leadership",
        description:
          "Our mission is to empower businesses of all sizes to thrive in an ever-changing marketplace. We are committed to delivering exceptional value through strategic insights and innovative approaches.",
        image: "/images/history/history-5.webp",
        meta: "2016",
        link: "",
        settings: { align: "left", image2: "/images/history/history-6.webp" },
      },
      {
        title: "Global expansion and diversification",
        description:
          "Our mission is to empower businesses of all sizes to thrive in an ever-changing marketplace. We are committed to delivering exceptional value through strategic insights and innovative approaches.",
        image: "/images/history/history-7.webp",
        meta: "2020",
        link: "",
        settings: { align: "right", image2: "/images/history/history-8.webp" },
      },
      {
        title: "Looking ahead",
        description:
          "Our mission is to empower businesses of all sizes to thrive in an ever-changing marketplace. We are committed to delivering exceptional value through strategic insights and innovative approaches.",
        image: "/images/history/history-9.webp",
        meta: "2024",
        link: "",
        settings: { align: "left", image2: "/images/history/history-1.webp" },
      },
    ],
  },
};

/* =========================================================
   NOTE

   This file used to also export a second, independently-
   hardcoded copy of defaultTheme, defaultLayout,
   defaultSectionStyle(s), plus its own mergeDeep/mergeSetting/
   getDefaultSetting helpers — an entire parallel copy of the
   site-settings system that nothing actually imported (only
   contentSectionDefaults above was ever used). It carried the
   same "transparent" background/border default that broke
   Reset-to-Default for section backgrounds (see
   lib/site-defaults.ts + app/RootShell.tsx for the real fix).
   Removed as dead/drift-risk code. The single source of truth
   for theme/layout/section-style defaults is lib/site-defaults.ts
   — import from there, don't recreate these here.
========================================================= */
