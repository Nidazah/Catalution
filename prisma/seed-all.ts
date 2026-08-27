import "dotenv/config";

import { spawnSync } from "node:child_process";
import path from "node:path";

const scripts = [
  "seed.ts",
  "seed-services.ts",
  "seed-blog.ts",
  "seed-portfolios.ts",
  "seed-team.ts",
  "seed-team-members.ts",
  "seed-testimonials.ts",
  "seed-faq.ts",
  "seed-pricing.ts",
  "seed-careers.ts",
];

const tsxCli = path.join(
  process.cwd(),
  "node_modules",
  "tsx",
  "dist",
  "cli.mjs",
);

for (const script of scripts) {
  console.log(`\n🌱 Running prisma/${script}...`);

  const result = spawnSync(
    process.execPath,
    [tsxCli, path.join(process.cwd(), "prisma", script)],
    {
      stdio: "inherit",
      env: process.env,
    },
  );

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

console.log("\n✅ All database seed scripts completed successfully.");
