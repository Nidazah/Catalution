// prisma/seed-careers.ts
//
// One-time seed: migrates the hardcoded job listings currently in
// src/app/careers/page.tsx (allJobs) and src/app/careers/[id]/page.tsx
// (jobDetails) into the Career table.
//
// Run with:
//   npx tsx prisma/seed-careers.ts
//   (install tsx first if needed: npm install -D tsx)
//
// Safe to re-run — upserts on slug, so it will not duplicate rows or
// overwrite anything already edited through /admin/careers.
//
// NOTE ON DATA FOUND WHILE WRITING THIS SCRIPT:
// - allJobs (the listing page, id "1"-"8") is the array that actually
//   drives what's clickable on the live /careers page. Its title/salary/
//   location for each id are treated as canonical below.
// - jobDetails (the detail page) only has full content for ids "1", "2",
//   "3" — and its id "1" entry has a DIFFERENT title ("Business strategy
//   consultant") than allJobs' id "1" ("Business Development Manager").
//   That's a pre-existing mismatch in the frontend data, not something
//   introduced here. This script keeps allJobs' title as the source of
//   truth and pulls description/requirements/etc. from jobDetails by id
//   where available.
// - ids "4"-"8" have no detail content anywhere in the frontend (clicking
//   them 404s on the current static page), so they're seeded with short
//   generic placeholder description/requirements/responsibilities text,
//   same approach used for the earlier Services seed — edit the real
//   copy in via /admin/careers before publishing.

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

type CareerSeed = {
  slug: string;
  title: string;
  department: string;
  location: string;
  type: string;
  urgency: string | null;
  icon: string;
  description: string;
  requirements: string;
  requirementsGrid: string[];
  responsibilities: string;
  responsibilitiesList: string[];
  category: string;
  number: string;
  company: string;
  website: string | null;
  salary: string;
  vacancy: string;
  applyOn: string;
  tags: string[];
  sortOrder: number;
};

const careers: CareerSeed[] = [
  {
    slug: slugify("Business Development Manager"),
    title: "Business Development Manager",
    department: "Consulting",
    location: "London, UK",
    type: "Full time job/on site",
    urgency: "Urgent",
    icon: "swirl",
    description:
      "Our mission is to empower businesses of all sizes to thrive in an ever-changing marketplace. We are committed to delivering exceptional value through strategic insight and innovative approaches.",
    requirements:
      "Formulating and implementing business goals. We begin with an in-depth analysis of your business and market to identify opportunities and challenges, then work with you to define clear, actionable steps.",
    requirementsGrid: [
      "Clear vision and direction for your business consulting.",
      "Enhanced ability to anticipate and respond to market changes.",
      "Data-driven decision-making for strategic planning execution.",
      "Structured approach to achieving your business goals.",
    ],
    responsibilities:
      "Our mission is to empower businesses of all sizes to thrive in an ever-changing marketplace, delivering exceptional value through strategic insight and innovative approaches.",
    responsibilitiesList: [
      "Discover our expertise",
      "Journey and commitment explained",
      "Meet our team and learn",
      "Meet our clients",
    ],
    category: "Business consultant",
    number: "6080UO",
    company: "Catalution",
    website: "www.catalution.com",
    salary: "$400-$550 / week",
    vacancy: "03 Available",
    applyOn: "OCT 22, 2024",
    tags: ["Business", "Consulting", "Insights"],
    sortOrder: 1,
  },
  {
    slug: slugify("Executive Leadership Coach"),
    title: "Executive Leadership Coach",
    department: "Consulting",
    location: "London, UK",
    type: "Full time job/on site",
    urgency: "Urgent",
    icon: "dots",
    description:
      "We are looking for an experienced Executive Leadership Coach to work with our C-suite clients, delivering high-impact one-on-one coaching sessions and facilitating leadership workshops.",
    requirements:
      "Formulating and implementing leadership frameworks. We begin with an in-depth analysis of your organizational structure to identify opportunities and challenges.",
    requirementsGrid: [
      "Proven executive coaching expertise.",
      "Enhanced ability to anticipate and respond to leadership challenges.",
      "Data-driven decision-making for strategic planning.",
      "Structured approach to achieving organizational goals.",
    ],
    responsibilities:
      "Our mission is to empower businesses to thrive in an ever-changing marketplace through strategic insight and innovative approaches.",
    responsibilitiesList: [
      "Deliver tailored one-on-one executive coaching sessions.",
      "Facilitate leadership development workshops.",
      "Assess organizational needs and design custom coaching programs.",
      "Provide actionable feedback to drive leadership growth.",
    ],
    category: "Executive Coach",
    number: "6081UO",
    company: "Catalution",
    website: "www.catalution.com",
    salary: "$400-$550 / week",
    vacancy: "02 Available",
    applyOn: "OCT 22, 2024",
    tags: ["Leadership", "Executive", "Coaching"],
    sortOrder: 2,
  },
  {
    slug: slugify("Senior UX Designer"),
    title: "Senior UX Designer",
    department: "Product Design",
    location: "London, UK",
    type: "Full time job/on site",
    urgency: "Urgent",
    icon: "triangle",
    description:
      "We are seeking a Senior UX Designer to lead the design of our digital products, driving user-centered design processes and collaborating closely with developers and product managers.",
    requirements:
      "We believe in creating world-class user experiences, starting with a deep understanding of our users to drive innovative design solutions.",
    requirementsGrid: [
      "Lead the UX design process from research to final implementation.",
      "Create user flows, wireframes, and high-fidelity prototypes.",
      "Conduct user testing and iterate based on feedback.",
      "Collaborate with developers for pixel-perfect implementation.",
    ],
    responsibilities:
      "Our mission is to drive user-centered design across all our digital products.",
    responsibilitiesList: [
      "Lead the UX design process",
      "Create user flows and prototypes",
      "Conduct user testing",
      "Collaborate with developers",
    ],
    category: "UX Designer",
    number: "7080UO",
    company: "Catalution",
    website: "www.catalution.com",
    salary: "$400-$550 / week",
    vacancy: "01 Available",
    applyOn: "OCT 22, 2024",
    tags: ["Design", "UX", "UI"],
    sortOrder: 3,
  },
  {
    slug: slugify("Management consultant"),
    title: "Management consultant",
    department: "Consulting",
    location: "London, UK",
    type: "Full time job/on site",
    urgency: "Urgent",
    icon: "c",
    description:
      "We are looking for a Management Consultant to help our clients solve complex business problems and improve organizational performance.",
    requirements:
      "Strong analytical background with experience advising businesses on strategy, operations, and performance improvement.",
    requirementsGrid: [
      "Strong analytical and problem-solving skills.",
      "Experience advising clients on business strategy.",
      "Comfortable presenting findings to senior stakeholders.",
      "Ability to manage multiple client engagements.",
    ],
    responsibilities:
      "Support clients in identifying operational improvements and implementing strategic change across their organizations.",
    responsibilitiesList: [
      "Analyze client business processes",
      "Develop improvement recommendations",
      "Present findings to stakeholders",
      "Support implementation of agreed changes",
    ],
    category: "Management consultant",
    number: "6082UO",
    company: "Catalution",
    website: "www.catalution.com",
    salary: "$400-$550 / week",
    vacancy: "01 Available",
    applyOn: "OCT 22, 2024",
    tags: ["Consulting", "Strategy", "Operations"],
    sortOrder: 4,
  },
  {
    slug: slugify("Business process consultant"),
    title: "Business process consultant",
    department: "Consulting",
    location: "London, UK",
    type: "Full time job/on site",
    urgency: "Urgent",
    icon: "people",
    description:
      "We are looking for a Business Process Consultant to analyze, redesign, and optimize client workflows for greater efficiency.",
    requirements:
      "Experience mapping and improving business processes, with a strong understanding of process optimization methodologies.",
    requirementsGrid: [
      "Experience with process mapping and analysis.",
      "Familiarity with process improvement methodologies.",
      "Strong stakeholder communication skills.",
      "Ability to translate findings into actionable plans.",
    ],
    responsibilities:
      "Work with clients to identify inefficiencies and design streamlined, measurable processes.",
    responsibilitiesList: [
      "Map current-state business processes",
      "Identify inefficiencies and bottlenecks",
      "Design improved future-state processes",
      "Support rollout and adoption",
    ],
    category: "Business process consultant",
    number: "6083UO",
    company: "Catalution",
    website: "www.catalution.com",
    salary: "$400-$550 / week",
    vacancy: "01 Available",
    applyOn: "OCT 22, 2024",
    tags: ["Consulting", "Process", "Operations"],
    sortOrder: 5,
  },
  {
    slug: slugify("Performance optimization"),
    title: "Performance optimization",
    department: "Consulting",
    location: "London, UK",
    type: "Full time job/on site",
    urgency: "Urgent",
    icon: "eye",
    description:
      "We are looking for a Performance Optimization specialist to help clients measure, benchmark, and improve organizational performance.",
    requirements:
      "Strong quantitative background with experience building performance metrics and improvement plans.",
    requirementsGrid: [
      "Experience with performance benchmarking.",
      "Comfortable working with data and KPIs.",
      "Ability to design measurable improvement plans.",
      "Clear communication of findings to clients.",
    ],
    responsibilities:
      "Help clients define the right metrics and build sustainable performance improvement programs.",
    responsibilitiesList: [
      "Define and track key performance indicators",
      "Benchmark performance against industry standards",
      "Design improvement initiatives",
      "Report on progress to clients",
    ],
    category: "Performance optimization",
    number: "6084UO",
    company: "Catalution",
    website: "www.catalution.com",
    salary: "$400-$550 / week",
    vacancy: "01 Available",
    applyOn: "OCT 22, 2024",
    tags: ["Consulting", "Performance", "Strategy"],
    sortOrder: 6,
  },
  {
    slug: slugify("Senior Data Analyst"),
    title: "Senior Data Analyst",
    department: "Analytics",
    location: "London, UK",
    type: "Full time job/on site",
    urgency: "Urgent",
    icon: "swirl",
    description:
      "We are looking for a Senior Data Analyst to turn client data into clear, actionable insight that drives business decisions.",
    requirements:
      "Strong SQL and data visualization skills, with experience translating raw data into business recommendations.",
    requirementsGrid: [
      "Strong SQL and data analysis skills.",
      "Experience with data visualization tools.",
      "Ability to translate data into business insight.",
      "Comfortable presenting to non-technical stakeholders.",
    ],
    responsibilities:
      "Analyze client data sets and build reporting that supports strategic decision-making.",
    responsibilitiesList: [
      "Build and maintain reporting dashboards",
      "Analyze data trends and patterns",
      "Present insights to clients and internal teams",
      "Support data-driven decision-making",
    ],
    category: "Data Analyst",
    number: "7081UO",
    company: "Catalution",
    website: "www.catalution.com",
    salary: "$500-$650 / week",
    vacancy: "01 Available",
    applyOn: "OCT 22, 2024",
    tags: ["Data", "Analytics", "Insights"],
    sortOrder: 7,
  },
  {
    slug: slugify("UX Researcher"),
    title: "UX Researcher",
    department: "Product Design",
    location: "London, UK",
    type: "Full time job/on site",
    urgency: "Urgent",
    icon: "dots",
    description:
      "We are looking for a UX Researcher to lead user research initiatives that inform product and design decisions.",
    requirements:
      "Experience planning and running qualitative and quantitative research studies with real users.",
    requirementsGrid: [
      "Experience with qualitative and quantitative research methods.",
      "Ability to synthesize findings into clear recommendations.",
      "Comfortable working closely with designers and product managers.",
      "Strong written and verbal communication skills.",
    ],
    responsibilities:
      "Plan and run research studies that inform product and design decisions across the team.",
    responsibilitiesList: [
      "Plan and conduct user research studies",
      "Synthesize findings into actionable insights",
      "Collaborate with designers and product managers",
      "Present research outcomes to stakeholders",
    ],
    category: "UX Researcher",
    number: "7082UO",
    company: "Catalution",
    website: "www.catalution.com",
    salary: "$450-$600 / week",
    vacancy: "01 Available",
    applyOn: "OCT 22, 2024",
    tags: ["Design", "Research", "UX"],
    sortOrder: 8,
  },
];

async function main() {
  for (const career of careers) {
    await prisma.career.upsert({
      where: { slug: career.slug },
      update: career,
      create: career,
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
