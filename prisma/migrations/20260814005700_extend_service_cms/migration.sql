ALTER TABLE "Service"
  ADD COLUMN "shortDescription" TEXT,
  ADD COLUMN "fullDescription" TEXT,
  ADD COLUMN "heroImage2" TEXT,
  ADD COLUMN "features" JSONB,
  ADD COLUMN "overviewItems" JSONB,
  ADD COLUMN "ctaUrl" TEXT NOT NULL DEFAULT '/contact',
  ADD COLUMN "active" BOOLEAN NOT NULL DEFAULT true;

CREATE INDEX "Service_active_idx" ON "Service"("active");
