CREATE TABLE IF NOT EXISTS "Career" (
  "id" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "slug" TEXT NOT NULL,
  "department" TEXT NOT NULL,
  "location" TEXT NOT NULL,
  "type" TEXT NOT NULL,
  "urgency" TEXT,
  "icon" TEXT NOT NULL DEFAULT 'swirl',
  "description" TEXT NOT NULL,
  "requirements" TEXT NOT NULL,
  "requirementsGrid" JSONB,
  "responsibilities" TEXT NOT NULL,
  "responsibilitiesList" JSONB,
  "category" TEXT NOT NULL,
  "number" TEXT NOT NULL,
  "company" TEXT NOT NULL DEFAULT 'Catalution',
  "website" TEXT,
  "salary" TEXT NOT NULL,
  "vacancy" TEXT NOT NULL,
  "applyOn" TEXT NOT NULL,
  "tags" JSONB,
  "sortOrder" INTEGER NOT NULL DEFAULT 0,
  "active" BOOLEAN NOT NULL DEFAULT true,
  "published" BOOLEAN NOT NULL DEFAULT true,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Career_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "CareerApplication" (
  "id" TEXT NOT NULL,
  "careerId" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "phone" TEXT NOT NULL,
  "coverLetter" TEXT NOT NULL,
  "cvUrl" TEXT NOT NULL,
  "cvFileName" TEXT NOT NULL,
  "cvFileType" TEXT NOT NULL,
  "cvFileSize" INTEGER NOT NULL,
  "status" TEXT NOT NULL DEFAULT 'NEW',
  "notes" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "CareerApplication_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "Career_slug_key"
ON "Career" ("slug");

CREATE INDEX IF NOT EXISTS "CareerApplication_careerId_idx"
ON "CareerApplication" ("careerId");

CREATE INDEX IF NOT EXISTS "CareerApplication_email_idx"
ON "CareerApplication" ("email");

CREATE INDEX IF NOT EXISTS "CareerApplication_status_idx"
ON "CareerApplication" ("status");

CREATE INDEX IF NOT EXISTS "CareerApplication_createdAt_idx"
ON "CareerApplication" ("createdAt");

ALTER TABLE "CareerApplication"
DROP CONSTRAINT IF EXISTS "CareerApplication_careerId_fkey";

ALTER TABLE "CareerApplication"
ADD CONSTRAINT "CareerApplication_careerId_fkey"
FOREIGN KEY ("careerId")
REFERENCES "Career"("id")
ON DELETE CASCADE
ON UPDATE CASCADE;
