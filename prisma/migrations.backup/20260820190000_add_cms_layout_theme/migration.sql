CREATE TABLE "SiteSettings" (
  "id" TEXT NOT NULL,
  "key" TEXT NOT NULL,
  "data" JSONB NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "SiteSettings_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "SiteSettings_key_key" ON "SiteSettings"("key");
