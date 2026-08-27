import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const teamItems = [
    {
      name: "Savanah Nguyen",
      role: "Manager",
      image: "/images/team/Savanah-Nguyen.webp",
    },
    {
      name: "Esther Howard",
      role: "Co. Founder",
      image: "/images/team/Esther-Howard.webp",
    },
    {
      name: "Kristin Watson",
      role: "Sr. Manager",
      image: "/images/team/Kristin-Watson.webp",
    },
    {
      name: "Guy Hawkins",
      role: "Sr. Marketer",
      image: "/images/team/Guy-Hawkins.webp",
    },
  ];

  const existing = await prisma.contentSection.findUnique({
    where: {
      sectionKey: "TEAM",
    },
  });

  if (existing) {
    console.log("TEAM section already exists.");

    if (existing.items) {
      console.log(
        "Existing TEAM items found. No changes made to avoid overwriting admin content."
      );
      return;
    }

    await prisma.contentSection.update({
      where: {
        sectionKey: "TEAM",
      },
      data: {
        label: "Team",
        eyebrow: "MEET OUR TEAMS",
        title: "Expert team members",
        description:
          "In today's dynamic business environment, the key to success strategics..",
        primaryButtonLabel: "More members",
        primaryButtonUrl: "#team",
        items: teamItems,
        published: true,
        sortOrder: 0,
      },
    });

    console.log("TEAM section populated successfully.");
    return;
  }

  await prisma.contentSection.create({
    data: {
      sectionKey: "TEAM",
      label: "Team",
      eyebrow: "MEET OUR TEAMS",
      title: "Expert team members",
      description:
        "In today's dynamic business environment, the key to success strategics..",
      primaryButtonLabel: "More members",
      primaryButtonUrl: "#team",
      items: teamItems,
      published: true,
      sortOrder: 0,
    },
  });

  console.log("TEAM section created and populated successfully.");
}

main()
  .catch((error) => {
    console.error("Failed to seed TEAM section:");
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });