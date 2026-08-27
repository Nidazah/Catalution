import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.table({
    Services: await prisma.service.count(),
    Careers: await prisma.career.count(),
    TeamMembers: await prisma.teamMember.count(),
    Portfolios: await prisma.portfolio.count(),
    PricingPlans: await prisma.pricingPlan.count(),
    Blogs: await prisma.blog.count(),
    Testimonials: await prisma.testimonial.count(),
    ContentSections: await prisma.contentSection.count(),
  });
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
