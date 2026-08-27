import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const blogPosts = [
  {
    title: "The Future of Business Process Optimization",
    slug: "the-future-of-business-process-optimization",
    excerpt:
      "Discover how AI and machine learning are transforming the way companies optimize their workflows and reduce operational costs.",
    image:
      "https://images.unsplash.com/photo-1552664688-cf412ec27db2?w=800&q=80",
    author: "Sarah Mitchell",
    authorAvatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=128&q=80",
    date: "October 15, 2024",
    comments: 3,
    category: "Business Strategy",
    tags: ["AI", "Automation", "Workflow"],
  },
  {
    title: "5 Leadership Traits Every Executive Needs",
    slug: "5-leadership-traits-every-executive-needs",
    excerpt:
      "We break down the essential leadership qualities that drive successful teams and foster innovation in the modern corporate landscape.",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80",
    author: "David Chen",
    authorAvatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=128&q=80",
    date: "October 10, 2024",
    comments: 5,
    category: "Leadership",
    tags: ["Executive", "Management", "Team Building"],
  },
  {
    title: "Sustainable Design: More Than Just a Trend",
    slug: "sustainable-design-more-than-just-a-trend",
    excerpt:
      "Why sustainable design practices are becoming a core business requirement and how to implement them effectively in 2024.",
    image:
      "https://images.openai.com/static-rsc-4/PKBUYuehBB8uksWZSznUqlUIgfpdsxZO42AxPvSuOAMxFVARaVV5Fm7wid5m-XBSDy1vX6LMqpKiwTRsVue0PaePhrpJX2nSX6TsolKy8gLWLU3TvNty4fx7DkauaNJzV6qz9hrLypQlkGI_YrP0_KzP6VZ2SS6WzfALURVeR08Od0DrVDDiY6xQdnq8VW7A?purpose=fullsize",
    author: "Emily Rodriguez",
    authorAvatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=128&q=80",
    date: "October 5, 2024",
    comments: 2,
    category: "Design",
    tags: ["Sustainability", "Eco-Friendly", "Design"],
  },
  {
    title: "Mastering the Art of Strategic Planning",
    slug: "mastering-the-art-of-strategic-planning",
    excerpt:
      "A comprehensive guide to building actionable long-term strategies that align with your company's vision and market goals.",
    image:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80",
    author: "Michael Thompson",
    authorAvatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=128&q=80",
    date: "September 28, 2024",
    comments: 7,
    category: "Strategy",
    tags: ["Planning", "Execution", "Growth"],
  },
  {
    title: "How to navigate consulting tips for transforming",
    slug: "how-to-navigate-consulting-tips-for-transforming",
    excerpt:
      "In today's dynamic business environment, the key to success lies in strategic planning.",
    image:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&q=80",
    author: "Rachel Green",
    authorAvatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=128&q=80",
    date: "August 28, 2024",
    comments: 3,
    category: "Branding",
    tags: ["Consulting", "Transformation", "Strategy"],
  },
  {
    title: "Innovation in action examples of consulting success",
    slug: "innovation-in-action-examples-of-consulting-success",
    excerpt:
      "In today's dynamic business environment, the key to success lies in strategic planning.",
    image:
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&q=80",
    author: "James Wilson",
    authorAvatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=128&q=80",
    date: "August 28, 2024",
    comments: 3,
    category: "Business",
    tags: ["Innovation", "Success", "Growth"],
  },
  {
    title: "Innovative solutions for business success dynamic from today",
    slug: "innovative-solutions-for-business-success-dynamic-from-today",
    excerpt:
      "In today's dynamic business environment, the key to success lies in strategic planning.",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80",
    author: "Alice Walker",
    authorAvatar:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=128&q=80",
    date: "August 28, 2024",
    comments: 3,
    category: "Consulting",
    tags: ["Solutions", "Dynamic", "Success"],
  },
  {
    title: "Mastering change management key lessons for businesses",
    slug: "mastering-change-management-key-lessons-for-businesses",
    excerpt:
      "In today's dynamic business environment, the key to success lies in strategic planning.",
    image:
      "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800&q=80",
    author: "Laura Bennett",
    authorAvatar:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=128&q=80",
    date: "August 28, 2024",
    comments: 3,
    category: "Innovations",
    tags: ["Change", "Management", "Lessons"],
  },
  {
    title: "Harness digital transformation a roadmap for businesses",
    slug: "harness-digital-transformation-a-roadmap-for-businesses",
    excerpt:
      "In today's dynamic business environment, the key to success lies in strategic planning.",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80",
    author: "Michael Ross",
    authorAvatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=128&q=80",
    date: "August 28, 2024",
    comments: 3,
    category: "Managements",
    tags: ["Digital", "Transformation", "Roadmap"],
  },
  {
    title: "Measuring success key metrics every business track",
    // Original static post had no slug.
    slug: "measuring-success-key-metrics-every-business-track",
    excerpt:
      "In today's dynamic business environment, the key to success lies in strategic planning.",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
    author: "Emily Davis",
    authorAvatar:
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=128&q=80",
    date: "August 28, 2024",
    comments: 3,
    category: "Marketing",
    tags: ["Metrics", "Success", "Tracking"],
  },
  {
    title: "What consultants should know about working with nonprofits",
    slug: "what-consultants-should-know-about-working-with-nonprofits",
    excerpt:
      "In today's dynamic business environment, the key to success lies in strategic planning.",
    image:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80",
    author: "Daniel Carter",
    authorAvatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=128&q=80",
    date: "October 6, 2024",
    comments: 3,
    category: "Business",
    tags: ["Consulting", "Nonprofits", "Strategy"],
  },
  {
    title: "Why every entrepreneur needs solid digital marketing",
    slug: "why-every-entrepreneur-needs-solid-digital-marketing",
    excerpt:
      "In today's dynamic business environment, the key to success lies in strategic planning.",
    image:
      "https://images.unsplash.com/photo-1552664688-cf412ec27db2?w=800&q=80",
    author: "Sophia Taylor",
    authorAvatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=128&q=80",
    date: "August 24, 2024",
    comments: 3,
    category: "Consulting",
    tags: ["Marketing", "Entrepreneur", "Digital"],
  },
];

async function main() {
  console.log(`Starting Blog seed for ${blogPosts.length} posts...`);

  const slugs = blogPosts.map((post) => post.slug);
  const duplicateSlugs = slugs.filter(
    (slug, index) => slugs.indexOf(slug) !== index
  );

  if (duplicateSlugs.length > 0) {
    throw new Error(
      `Duplicate slugs detected: ${[
        ...new Set(duplicateSlugs),
      ].join(", ")}`
    );
  }

  let created = 0;
  let updated = 0;

  for (const [index, post] of blogPosts.entries()) {
    const existing = await prisma.blog.findUnique({
      where: {
        slug: post.slug,
      },
    });

    const data = {
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: null,
      image: post.image,
      author: post.author,
      authorAvatar: post.authorAvatar,
      date: post.date,
      comments: post.comments,
      category: post.category,
      tags: post.tags,
      sortOrder: index,
      active: true,
      published: true,
    };

    if (existing) {
      await prisma.blog.update({
        where: { id: existing.id },
        data,
      });

      updated++;
      console.log(`UPDATED: ${post.slug}`);
    } else {
      await prisma.blog.create({
        data,
      });

      created++;
      console.log(`CREATED: ${post.slug}`);
    }
  }

  console.log("");
  console.log("=================================");
  console.log("BLOG SEED COMPLETE");
  console.log("=================================");
  console.log(`Source posts: ${blogPosts.length}`);
  console.log(`Created:      ${created}`);
  console.log(`Updated:      ${updated}`);
  console.log(`Total:        ${created + updated}`);
  console.log("");
  console.log(
    "Mapping issue handled: original post #10 had no slug."
  );
  console.log(
    "Generated slug: measuring-success-key-metrics-every-business-track"
  );
}

main()
  .catch((error) => {
    console.error("BLOG SEED FAILED");
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });