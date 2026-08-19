-- CreateTable
CREATE TABLE "Career" (
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

-- CreateTable
CREATE TABLE "CareerApplication" (
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

-- CreateTable
CREATE TABLE "FAQ" (
    "id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FAQ_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Plan" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "monthly" TEXT NOT NULL,
    "yearly" TEXT NOT NULL,
    "features" TEXT[],
    "active" BOOLEAN NOT NULL DEFAULT true,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Plan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContactInfo" (
    "id" TEXT NOT NULL,
    "emailPrimary" TEXT NOT NULL,
    "emailSecondary" TEXT,
    "phone" TEXT NOT NULL,
    "addressLine1" TEXT NOT NULL,
    "addressLine2" TEXT NOT NULL,
    "mapEmbedUrl" TEXT,
    "rating" DOUBLE PRECISION,
    "reviewCount" INTEGER,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ContactInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContactSubmission" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "service" TEXT,
    "message" TEXT NOT NULL,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ContactSubmission_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Career_slug_key" ON "Career"("slug");

-- CreateIndex
CREATE INDEX "CareerApplication_careerId_idx" ON "CareerApplication"("careerId");

-- CreateIndex
CREATE INDEX "CareerApplication_email_idx" ON "CareerApplication"("email");

-- CreateIndex
CREATE INDEX "CareerApplication_status_idx" ON "CareerApplication"("status");

-- CreateIndex
CREATE INDEX "CareerApplication_createdAt_idx" ON "CareerApplication"("createdAt");

-- CreateIndex
CREATE INDEX "FAQ_sortOrder_idx" ON "FAQ"("sortOrder");

-- CreateIndex
CREATE INDEX "FAQ_published_idx" ON "FAQ"("published");

-- CreateIndex
CREATE INDEX "FAQ_active_idx" ON "FAQ"("active");

-- CreateIndex
CREATE UNIQUE INDEX "Plan_name_key" ON "Plan"("name");

-- CreateIndex
CREATE INDEX "ContactSubmission_createdAt_idx" ON "ContactSubmission"("createdAt");

-- CreateIndex
CREATE INDEX "ContactSubmission_read_idx" ON "ContactSubmission"("read");

-- AddForeignKey
ALTER TABLE "CareerApplication" ADD CONSTRAINT "CareerApplication_careerId_fkey" FOREIGN KEY ("careerId") REFERENCES "Career"("id") ON DELETE CASCADE ON UPDATE CASCADE;
