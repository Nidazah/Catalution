import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash("admin123", 10);

  const admin = await prisma.user.update({
    where: {
      email: "admin@catalution.com",
    },
    data: {
      password,
      role: "ADMIN",
      name: "Admin",
    },
  });

  console.log("Admin password reset successfully:");
  console.log(admin.email);
  console.log("Password: admin123");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());