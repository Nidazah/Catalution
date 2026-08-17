// prisma/seed.ts
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

// ============================================
// CONFIGURATION
// ============================================

// Admin user credentials (override with env vars)
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@catalution.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "ChangeMe123!";

// Image URLs
const PLACEHOLDER_IMAGE = "/images/services/tj-service-1.webp";
const UNSplash_IMAGE =
  "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1200&auto=format&fit=crop";

// ============================================
// SEED DATA: SERVICES (Comprehensive)
// ============================================

const services = [
  {
    title: "Business Process Optimization",
    slug: "business-process-optimization",
    shortDescription: "Streamline workflows and cut inefficiencies",
    description:
      "In today's dynamic business environment, the key to success lies in strategic planning and operational excellence. Our business process optimization service helps you identify bottlenecks, eliminate waste, and create efficient workflows that drive growth.",
    fullDescription:
      "We take a comprehensive approach to business process optimization, starting with a thorough audit of your current operations. Our team analyzes every aspect of your workflows, from initial customer contact to final delivery, identifying opportunities for improvement at every stage. We implement proven methodologies like Lean, Six Sigma, and continuous improvement frameworks to create lasting change. The result is a more agile, responsive organization that can adapt quickly to market changes while maintaining high quality standards.",
    icon: "waves",
    image:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1200&auto=format&fit=crop",
    heroImage2:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200&auto=format&fit=crop",
    features: [
      {
        title: "Workflow Analysis",
        description:
          "Comprehensive review of all business processes to identify bottlenecks",
        icon: "search",
      },
      {
        title: "Process Redesign",
        description: "Streamline and optimize workflows for maximum efficiency",
        icon: "refresh",
      },
      {
        title: "Implementation Support",
        description: "Hands-on guidance throughout the optimization journey",
        icon: "tools",
      },
    ],
    overviewItems: [
      "Reduce operational costs by up to 30%",
      "Improve delivery times by 40%",
      "Increase customer satisfaction scores",
      "Create scalable processes for growth",
    ],
    ctaLabel: "Get optimization",
    ctaUrl: "/contact",
    sortOrder: 1,
    active: true,
    published: true,
  },
  {
    title: "Strategic Planning & Execution",
    slug: "strategic-planning-execution",
    shortDescription: "Turn ambitious goals into actionable roadmaps",
    description:
      "In today's dynamic business environment, the key to success lies in strategic planning and operational excellence. We help you translate ambitious business goals into clear, actionable roadmaps that deliver measurable results.",
    fullDescription:
      "Our strategic planning service begins with a deep dive into your organization's vision, mission, and current capabilities. We work with your leadership team to define clear objectives, develop comprehensive strategies, and create detailed execution plans. We employ proven frameworks like OKRs, Balanced Scorecard, and SWOT analysis to ensure your strategy is both ambitious and achievable. We don't just help you plan – we ensure your strategy drives real business results through ongoing monitoring and adjustment.",
    icon: "boxes",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200&auto=format&fit=crop",
    heroImage2:
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=1200&auto=format&fit=crop",
    features: [
      {
        title: "Vision Alignment",
        description:
          "Ensure all stakeholders are aligned on organizational goals",
        icon: "eye",
      },
      {
        title: "Strategic Roadmap",
        description: "Clear, phased approach to achieving business objectives",
        icon: "road",
      },
      {
        title: "Performance Metrics",
        description: "Define and track KPIs to measure progress",
        icon: "chart",
      },
    ],
    overviewItems: [
      "Clear 3-5 year strategic roadmap",
      "Monthly performance reviews",
      "Quarterly strategy adjustments",
      "Team-wide alignment and buy-in",
    ],
    ctaLabel: "Get strategic clarity",
    ctaUrl: "/contact",
    sortOrder: 2,
    active: true,
    published: true,
  },
  {
    title: "Leadership Executive Coaching",
    slug: "leadership-executive-coaching",
    shortDescription: "One-on-one coaching for high-performing leaders",
    description:
      "In today's dynamic business environment, the key to success lies in strategic planning and operational excellence. Our executive coaching program develops confident, decisive leaders who inspire their teams and drive organizational success.",
    fullDescription:
      "Our executive coaching program is designed for leaders who want to reach their full potential. We pair each executive with an experienced coach who provides personalized guidance on leadership challenges, decision-making, and team management. Through a combination of one-on-one sessions, 360-degree feedback, and practical exercises, we help leaders develop the skills they need to excel in today's complex business environment. Our approach is practical and results-oriented, focusing on real-world challenges and opportunities.",
    icon: "users",
    image:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=1200&auto=format&fit=crop",
    heroImage2:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1200&auto=format&fit=crop",
    features: [
      {
        title: "Personalized Coaching",
        description: "Tailored development plans for each executive",
        icon: "user",
      },
      {
        title: "360-Degree Feedback",
        description: "Comprehensive performance assessment from all angles",
        icon: "feedback",
      },
      {
        title: "Leadership Development",
        description: "Build essential leadership skills and capabilities",
        icon: "growth",
      },
    ],
    overviewItems: [
      "12-month coaching program",
      "Monthly one-on-one sessions",
      "Actionable development plans",
      "Measurable leadership growth",
    ],
    ctaLabel: "Start coaching",
    ctaUrl: "/contact",
    sortOrder: 3,
    active: true,
    published: true,
  },
  {
    title: "Legacy Leadership Institute",
    slug: "legacy-leadership-institute",
    shortDescription: "Build an enduring culture of leadership",
    description:
      "In today's dynamic business environment, the key to success lies in strategic planning and operational excellence. Our institute develops leadership capabilities across your entire organization, creating a culture of excellence that lasts.",
    fullDescription:
      "The Legacy Leadership Institute is our flagship program for building sustainable leadership capacity. We work with organizations to identify emerging leaders and develop their skills through a structured program that combines classroom learning, practical projects, and mentorship. Our curriculum covers strategic thinking, change management, emotional intelligence, and other essential leadership competencies. By developing leaders at all levels, we help organizations build a pipeline of talent that ensures long-term success.",
    icon: "sparkles",
    image:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1200&auto=format&fit=crop",
    heroImage2:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1200&auto=format&fit=crop",
    features: [
      {
        title: "Leadership Curriculum",
        description: "Comprehensive program covering all aspects of leadership",
        icon: "book",
      },
      {
        title: "Mentorship Program",
        description: "Connect emerging leaders with experienced executives",
        icon: "handshake",
      },
      {
        title: "Capstone Projects",
        description: "Practical application of leadership skills",
        icon: "project",
      },
    ],
    overviewItems: [
      "6-month intensive program",
      "Monthly workshops and seminars",
      "Executive mentorship",
      "Practical leadership projects",
    ],
    ctaLabel: "Build leadership legacy",
    ctaUrl: "/contact",
    sortOrder: 4,
    active: true,
    published: true,
  },
  {
    title: "Executive Growth Solutions",
    slug: "executive-growth-solutions",
    shortDescription: "Accelerate executive team performance",
    description:
      "In today's dynamic business environment, the key to success lies in strategic planning and operational excellence. Our comprehensive development plans accelerate performance across your entire executive team.",
    fullDescription:
      "Executive Growth Solutions provides a systematic approach to developing your executive team. We assess individual and team capabilities, identify development opportunities, and create comprehensive growth plans that align with organizational objectives. Our programs combine individual coaching, team workshops, and strategic projects to build the capabilities your executives need to drive business success. We focus on practical skills that deliver immediate results while building long-term leadership capacity.",
    icon: "circledot",
    image:
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=1200&auto=format&fit=crop",
    heroImage2:
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1200&auto=format&fit=crop",
    features: [
      {
        title: "Team Assessment",
        description: "Comprehensive evaluation of executive team capabilities",
        icon: "clipboard",
      },
      {
        title: "Development Planning",
        description: "Customized growth plans for each executive",
        icon: "plan",
      },
      {
        title: "Performance Tracking",
        description: "Measure and optimize executive performance",
        icon: "graph",
      },
    ],
    overviewItems: [
      "Executive team assessment",
      "Individual development plans",
      "Team-building workshops",
      "Performance metrics and tracking",
    ],
    ctaLabel: "Accelerate growth",
    ctaUrl: "/contact",
    sortOrder: 5,
    active: true,
    published: true,
  },
  {
    title: "Empowered Leadership Journey",
    slug: "empowered-leadership-journey",
    shortDescription: "Mentorship-driven leadership development",
    description:
      "In today's dynamic business environment, the key to success lies in strategic planning and operational excellence. Our program transforms emerging managers into confident, visionary leaders through mentorship and practical experience.",
    fullDescription:
      "The Empowered Leadership Journey is designed for emerging managers and high-potential employees who are ready to take the next step in their leadership development. Through a combination of mentorship, practical projects, and structured learning, participants develop the confidence and skills needed to lead effectively. Our program focuses on authentic leadership, emotional intelligence, and the ability to inspire and motivate teams. We believe that great leaders are made, not born, and our program provides the tools and support needed to develop outstanding leaders.",
    icon: "repeat",
    image:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1200&auto=format&fit=crop",
    heroImage2:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1200&auto=format&fit=crop",
    features: [
      {
        title: "Mentorship Program",
        description: "Learn from experienced leaders and executives",
        icon: "mentor",
      },
      {
        title: "Practical Experience",
        description: "Lead real projects that make an impact",
        icon: "experience",
      },
      {
        title: "Community Building",
        description: "Join a network of emerging leaders",
        icon: "network",
      },
    ],
    overviewItems: [
      "9-month development journey",
      "Bi-weekly mentorship sessions",
      "Leadership capstone project",
      "Peer learning and support network",
    ],
    ctaLabel: "Start your journey",
    ctaUrl: "/contact",
    sortOrder: 6,
    active: true,
    published: true,
  },
];

// ============================================
// SEED DATA: CONTENT SECTIONS (Optional)
// ============================================

const contentSections = [
  {
    sectionKey: "HERO" as const,
    label: "Hero",
    eyebrow: "CATALUTION • ERP • POS • TRANSFORMATION",
    title: "Catalyzing solutions. Accelerating growth.",
    description:
      "Smart ERP, POS and business transformation solutions that streamline operations, boost efficiency and create sustainable growth.",
    image: "/images/hero/h5-hero.png",
    primaryButtonLabel: "Get Started",
    primaryButtonUrl: "/contact",
    secondaryButtonLabel: "Explore Services",
    secondaryButtonUrl: "/services",
    sortOrder: 1,
  },
  {
    sectionKey: "ABOUT" as const,
    label: "About",
    eyebrow: "ABOUT CATALUTION",
    title: "A catalyst for smarter business transformation.",
    description:
      "We combine practical technology with strategic thinking to help businesses modernize operations and grow with confidence.",
    image: "/images/about/h5-about-1.webp",
    primaryButtonLabel: "Learn More",
    primaryButtonUrl: "/about",
    sortOrder: 2,
  },
  {
    sectionKey: "PROCESS" as const,
    label: "Process",
    eyebrow: "HOW IT WORKS",
    title: "Three steps to transform your business.",
    description:
      "From discovery to deployment and optimization, we make complex transformation clear and measurable.",
    image: "/images/h5-process-img.webp",
    sortOrder: 3,
  },
  {
    sectionKey: "WORK" as const,
    label: "Work",
    eyebrow: "OUR APPROACH",
    title: "Technology that works for your business.",
    description:
      "We audit, tailor, deploy and continuously optimize the systems your teams depend on.",
    sortOrder: 4,
  },
  {
    sectionKey: "TEAM" as const,
    label: "Team",
    eyebrow: "MEET OUR TEAM",
    title: "Experts who turn change into momentum.",
    description:
      "A multidisciplinary team focused on practical solutions, clean implementation and measurable outcomes.",
    sortOrder: 5,
  },
  {
    sectionKey: "CASE_STUDIES" as const,
    label: "Case Studies",
    eyebrow: "OUR CASE STUDIES",
    title: "Explore outstanding client projects.",
    description:
      "Showcase real transformation stories, measurable results and the solutions behind them.",
    sortOrder: 6,
  },
  {
    sectionKey: "PRICING" as const,
    label: "Pricing",
    eyebrow: "PRICING PLAN",
    title: "Flexible solutions, powerful results.",
    description:
      "Present clear packages that scale with your operational and transformation needs.",
    sortOrder: 7,
  },
  {
    sectionKey: "TESTIMONIALS" as const,
    label: "Testimonials",
    eyebrow: "CLIENT WORD",
    title: "Teams who trust Catalution beyond the first project.",
    description:
      "Build credibility with concise customer stories and business outcomes.",
    sortOrder: 8,
  },
  {
    sectionKey: "CTA" as const,
    label: "CTA",
    eyebrow: "LET'S TALK",
    title: "Ready to transform your business?",
    description:
      "Book a free consultation and get concrete next steps for your business.",
    primaryButtonLabel: "Free Consultation",
    primaryButtonUrl: "/contact",
    sortOrder: 9,
  },
  {
    sectionKey: "BLOG" as const,
    label: "Blog",
    eyebrow: "INSIGHTS",
    title: "Ideas for smarter business growth.",
    description:
      "Publish insights, implementation lessons and practical technology guidance.",
    sortOrder: 10,
  },
  {
    sectionKey: "FAQ" as const,
    label: "FAQ",
    eyebrow: "FAQ",
    title: "Questions, answered clearly.",
    description:
      "Help visitors understand your services, implementation process and support model.",
    sortOrder: 11,
  },
  {
    sectionKey: "CAREERS" as const,
    label: "Careers",
    eyebrow: "JOIN CATALUTION",
    title: "Build what moves businesses forward.",
    description:
      "Manage open positions and employer-brand messaging from one place.",
    sortOrder: 12,
  },
];

// ============================================
// SEED FUNCTION
// ============================================

async function main() {
  console.log("🌱 Starting database seed...");
  console.log("====================================");

  // --- Create/Update Admin User ---
  const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 12);

  const admin = await prisma.user.upsert({
    where: { email: ADMIN_EMAIL },
    update: {
      password: passwordHash,
      name: "Admin",
      role: "ADMIN",
    },
    create: {
      email: ADMIN_EMAIL,
      password: passwordHash,
      name: "Admin",
      role: "ADMIN",
    },
  });

  console.log(`✅ Admin user ready: ${admin.email}`);
  if (!process.env.ADMIN_PASSWORD) {
    console.log(
      `   ℹ️  Using default password: "${ADMIN_PASSWORD}" - Change it after first login`,
    );
  }
  console.log("");

  // --- Seed Services ---
  console.log(`📦 Seeding ${services.length} services...`);

  let serviceCount = 0;
  for (const service of services) {
    try {
      await prisma.service.upsert({
        where: { slug: service.slug },
        update: service,
        create: service,
      });
      serviceCount++;
    } catch (error) {
      console.error(`   ❌ Failed to seed service: ${service.slug}`, error);
    }
  }

  console.log(`✅ Seeded ${serviceCount} services successfully`);
  console.log("");

  // --- Seed Content Sections (Optional) ---
  if (contentSections.length > 0) {
    console.log(`📄 Seeding ${contentSections.length} content sections...`);

    let sectionCount = 0;
    for (const section of contentSections) {
      try {
        await prisma.contentSection.upsert({
          where: { sectionKey: section.sectionKey },
          update: section,
          create: section,
        });
        sectionCount++;
      } catch (error) {
        console.error(
          `   ❌ Failed to seed section: ${section.sectionKey}`,
          error,
        );
      }
    }

    console.log(`✅ Seeded ${sectionCount} content sections successfully`);
    console.log("");
  }

  console.log("====================================");
  console.log("🎉 Database seed completed successfully!");
}

// ============================================
// EXECUTE SEED
// ============================================

main()
  .catch((error) => {
    console.error("❌ Seed failed with error:");
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
