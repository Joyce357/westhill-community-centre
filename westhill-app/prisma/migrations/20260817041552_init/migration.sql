-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'EDITOR');

-- CreateEnum
CREATE TYPE "SubmissionStatus" AS ENUM ('UNREAD', 'READ', 'IN_PROGRESS', 'RESOLVED', 'ARCHIVED');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'ADMIN',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SiteSettings" (
    "id" TEXT NOT NULL DEFAULT 'singleton',
    "organizationName" TEXT NOT NULL DEFAULT 'West Hill Community Centre',
    "primaryEmail" TEXT NOT NULL DEFAULT 'info@westhillcommunitycentre.ca',
    "volunteerEmail" TEXT DEFAULT 'volunteer@westhillcommunity.org',
    "phone" TEXT NOT NULL DEFAULT '(416) 555-0199',
    "streetAddress" TEXT NOT NULL DEFAULT '4234 Lawrence Avenue East',
    "unit" TEXT DEFAULT 'Units 2–3',
    "city" TEXT NOT NULL DEFAULT 'Scarborough',
    "province" TEXT NOT NULL DEFAULT 'Ontario',
    "postalCode" TEXT NOT NULL DEFAULT 'M1E 4R4',
    "hoursWeekday" TEXT NOT NULL DEFAULT 'Mon – Fri: 9:00 AM – 6:00 PM',
    "hoursSaturday" TEXT NOT NULL DEFAULT 'Saturday: By Program Schedule',
    "hoursSunday" TEXT NOT NULL DEFAULT 'Sunday: Closed',
    "facebookUrl" TEXT,
    "instagramUrl" TEXT,
    "linkedinUrl" TEXT,
    "youtubeUrl" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SiteSettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Announcement" (
    "id" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "ctaText" TEXT,
    "ctaUrl" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "startsAt" TIMESTAMP(3),
    "expiresAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Announcement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProgramCategory" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "displayOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "ProgramCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Program" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "shortDescription" TEXT NOT NULL,
    "fullDescription" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "icon" TEXT,
    "imageUrl" TEXT,
    "schedule" TEXT,
    "eligibility" TEXT,
    "location" TEXT,
    "registrationInfo" TEXT,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "isPublished" BOOLEAN NOT NULL DEFAULT true,
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Program_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "eventDate" TIMESTAMP(3) NOT NULL,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT,
    "location" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "imageUrl" TEXT,
    "flyerUrl" TEXT,
    "rsvpEnabled" BOOLEAN NOT NULL DEFAULT true,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "isPublished" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContactSubmission" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "subject" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "status" "SubmissionStatus" NOT NULL DEFAULT 'UNREAD',
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ContactSubmission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VolunteerApplication" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "roles" TEXT NOT NULL,
    "availability" TEXT NOT NULL,
    "experience" TEXT,
    "interests" TEXT,
    "status" "SubmissionStatus" NOT NULL DEFAULT 'UNREAD',
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VolunteerApplication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProgramInquiry" (
    "id" TEXT NOT NULL,
    "programId" TEXT,
    "programTitle" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "participantAge" TEXT,
    "message" TEXT,
    "status" "SubmissionStatus" NOT NULL DEFAULT 'UNREAD',
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProgramInquiry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PartnershipInquiry" (
    "id" TEXT NOT NULL,
    "organization" TEXT NOT NULL,
    "contactPerson" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "tierInterest" TEXT,
    "proposalDetails" TEXT NOT NULL,
    "status" "SubmissionStatus" NOT NULL DEFAULT 'UNREAD',
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PartnershipInquiry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NewsletterSubscription" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "source" TEXT NOT NULL DEFAULT 'website-footer',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NewsletterSubscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventRsvp" (
    "id" TEXT NOT NULL,
    "eventId" TEXT,
    "eventTitle" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "attendeesCount" INTEGER NOT NULL DEFAULT 1,
    "specialNotes" TEXT,
    "status" "SubmissionStatus" NOT NULL DEFAULT 'UNREAD',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EventRsvp_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ProgramCategory_name_key" ON "ProgramCategory"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ProgramCategory_slug_key" ON "ProgramCategory"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Program_slug_key" ON "Program"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Event_slug_key" ON "Event"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "NewsletterSubscription_email_key" ON "NewsletterSubscription"("email");

-- AddForeignKey
ALTER TABLE "Program" ADD CONSTRAINT "Program_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "ProgramCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProgramInquiry" ADD CONSTRAINT "ProgramInquiry_programId_fkey" FOREIGN KEY ("programId") REFERENCES "Program"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventRsvp" ADD CONSTRAINT "EventRsvp_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;
