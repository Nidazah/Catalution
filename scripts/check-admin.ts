import { prisma } from "../src/lib/prisma";
import bcrypt from "bcryptjs";

async function main() {
  const email = "admin@catalution.com";
  const password = "admin123";

  const user = await prisma.user.findUnique({
    where: { email },
  });

  console.log("========== ADMIN CHECK ==========");

  if (!user) {
    console.log("USER FOUND: NO");
    return;
  }

  console.log("USER FOUND: YES");
  console.log("Email:", user.email);
  console.log("Name:", user.name);
  console.log("Role:", user.role);
  console.log("Password hash exists:", !!user.password);
  console.log("Password hash prefix:", user.password.substring(0, 7));

  const passwordValid = await bcrypt.compare(
    password,
    user.password
  );

  console.log("Password valid:", passwordValid);
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });