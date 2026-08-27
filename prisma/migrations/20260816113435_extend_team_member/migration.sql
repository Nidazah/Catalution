-- AlterTable
ALTER TABLE "TeamMember" ADD COLUMN     "coreBeliefs" JSONB,
ADD COLUMN     "experience" JSONB,
ADD COLUMN     "facebook" TEXT,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "skills" JSONB;
