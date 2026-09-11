-- CreateEnum
CREATE TYPE "ResourceType" AS ENUM ('DOCUMENT', 'EXTERNAL_LINK', 'GUIDE');

-- CreateTable
CREATE TABLE "ResourceItem" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "resourceType" "ResourceType" NOT NULL DEFAULT 'DOCUMENT',
    "url" TEXT NOT NULL,
    "fileSize" TEXT,
    "category" TEXT DEFAULT 'Downloads',
    "icon" TEXT DEFAULT 'fas fa-file-pdf',
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "isPublished" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ResourceItem_pkey" PRIMARY KEY ("id")
);
