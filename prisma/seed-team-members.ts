import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type SeedMember = {
  name: string;
  role: string;
  slug: string;
  image: string;
  sortOrder: number;
};

const members: SeedMember[] = [
  {
    name: "Savanah Nguyen",
    role: "Manager",
    slug: "savanah-nguyen",
    image: "/images/team/Savanah-Nguyen.webp",
    sortOrder: 1,
  },
  {
    name: "Esther Howard",
    role: "Co. Founder",
    slug: "esther-howard",
    image: "/images/team/Esther-Howard.webp",
    sortOrder: 2,
  },
  {
    name: "Kristin Watson",
    role: "Sr. Manager",
    slug: "kristin-watson",
    image: "/images/team/Kristin-Watson.webp",
    sortOrder: 3,
  },
  {
    name: "Guy Hawkins",
    role: "Sr. Marketer",
    slug: "guy-hawkins",
    image: "/images/team/Guy-Hawkins.webp",
    sortOrder: 4,
  },
];

async function main() {
  console.log(`Starting Team seed for ${members.length} members...`);

  let created = 0;
  let updated = 0;

  for (const member of members) {
    const existing = await prisma.teamMember.findUnique({
      where: { slug: member.slug },
    });

    await prisma.teamMember.upsert({
      where: { slug: member.slug },
      update: {
        name: member.name,
        role: member.role,
        image: member.image,
        sortOrder: member.sortOrder,
      },
      create: {
        name: member.name,
        role: member.role,
        slug: member.slug,
        image: member.image,
        sortOrder: member.sortOrder,
        active: true,
        published: true,
      },
    });

    if (existing) {
      updated++;
      console.log(`UPDATED: ${member.slug}`);
    } else {
      created++;
      console.log(`CREATED: ${member.slug}`);
    }
  }

  console.log("=================================");
  console.log("TEAM MEMBERS SEED COMPLETE");
  console.log("=================================");
  console.log(`Source members: ${members.length}`);
  console.log(`Created:        ${created}`);
  console.log(`Updated:        ${updated}`);
}

main()
  .catch((e) => {
    console.error("Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });