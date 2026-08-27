-- CreateEnum
CREATE TYPE "ContentSectionKey" AS ENUM ('HERO', 'ABOUT', 'PROCESS', 'WORK', 'TEAM', 'CASE_STUDIES', 'PRICING', 'TESTIMONIALS', 'CTA', 'BLOG', 'FAQ', 'CAREERS');

-- CreateTable
CREATE TABLE "ContentSection" (
    "id" TEXT NOT NULL,
    "sectionKey" "ContentSectionKey" NOT NULL,
    "label" TEXT NOT NULL,
    "eyebrow" TEXT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "image" TEXT,
    "primaryButtonLabel" TEXT,
    "primaryButtonUrl" TEXT,
    "secondaryButtonLabel" TEXT,
    "secondaryButtonUrl" TEXT,
    "items" JSONB,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ContentSection_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ContentSection_sectionKey_key" ON "ContentSection"("sectionKey");

-- CreateIndex
CREATE INDEX "ContentSection_sortOrder_idx" ON "ContentSection"("sortOrder");

-- CreateIndex
CREATE INDEX "ContentSection_published_idx" ON "ContentSection"("published");
