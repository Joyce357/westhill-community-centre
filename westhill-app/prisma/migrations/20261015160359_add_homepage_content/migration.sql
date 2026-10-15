-- AlterTable
ALTER TABLE "SiteSettings" ALTER COLUMN "unit" SET DEFAULT 'Unit 4';

-- CreateTable
CREATE TABLE "HomepageContent" (
    "id" TEXT NOT NULL DEFAULT 'singleton',
    "heroEyebrow" TEXT,
    "heroTitle" TEXT,
    "heroDescription" TEXT,
    "heroPrimaryCtaLabel" TEXT,
    "heroPrimaryCtaUrl" TEXT,
    "heroSecondaryCtaLabel" TEXT,
    "heroSecondaryCtaUrl" TEXT,
    "heroGalleryItemId" TEXT,
    "welcomeEyebrow" TEXT,
    "welcomeHeading" TEXT,
    "welcomeDescription" TEXT,
    "welcomeGalleryItemId" TEXT,
    "programsEyebrow" TEXT,
    "programsHeading" TEXT,
    "programsDescription" TEXT,
    "milestoneEyebrow" TEXT,
    "milestoneTitle" TEXT,
    "milestoneDateText" TEXT,
    "milestoneDescription" TEXT,
    "milestoneCtaLabel" TEXT,
    "milestoneCtaUrl" TEXT,
    "milestoneGalleryItemId" TEXT,
    "ctaEyebrow" TEXT,
    "ctaHeading" TEXT,
    "ctaDescription" TEXT,
    "ctaButton1Label" TEXT,
    "ctaButton1Url" TEXT,
    "ctaButton2Label" TEXT,
    "ctaButton2Url" TEXT,
    "ctaButton3Label" TEXT,
    "ctaButton3Url" TEXT,
    "seoTitle" TEXT,
    "seoDescription" TEXT,
    "seoOgGalleryItemId" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HomepageContent_pkey" PRIMARY KEY ("id")
);
