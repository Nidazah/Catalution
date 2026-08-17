-- CreateTable
CREATE TABLE "Portfolio" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "tags" JSONB,
    "image" TEXT NOT NULL,
    "heroImage" TEXT,
    "intro" TEXT,
    "description" JSONB,
    "overviewText" TEXT,
    "overviewPoints" JSONB,
    "mediaImage" TEXT,
    "videoUrl" TEXT,
    "finalResult" JSONB,
    "client" TEXT,
    "portfolio" TEXT,
    "service" TEXT,
    "date" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Portfolio_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Portfolio_slug_key" ON "Portfolio"("slug");

-- CreateIndex
CREATE INDEX "Portfolio_sortOrder_idx" ON "Portfolio"("sortOrder");

-- CreateIndex
CREATE INDEX "Portfolio_published_idx" ON "Portfolio"("published");

-- CreateIndex
CREATE INDEX "Portfolio_active_idx" ON "Portfolio"("active");

-- CreateIndex
CREATE INDEX "Portfolio_category_idx" ON "Portfolio"("category");
