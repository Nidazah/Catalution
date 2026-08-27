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
