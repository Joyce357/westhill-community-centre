import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import ProgramsManager from "@/components/admin/ProgramsManager";
import { INITIAL_PROGRAMS } from "@/lib/data";

interface ProgramItemType {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  categoryId: string;
  category: { id: string; name: string };
  displayLabel: string | null;
  icon: string | null;
  imageUrl: string | null;
  schedule: string | null;
  eligibility: string | null;
  location: string | null;
  registrationInfo: string | null;
  isFeatured: boolean;
  isPublished: boolean;
  displayOrder: number;
}

export default async function AdminProgramsPage() {
  await requireAuth();

  const fallbackCategories = [
    { id: "youth-services", name: "Youth Services" },
    { id: "support-services", name: "Support Services" },
    { id: "community-wellness", name: "Community & Wellness" },
    { id: "advocacy-referrals", name: "Advocacy & Referrals" },
    { id: "employment-aid", name: "Employment & Practical Aid" },
  ];

  const fallbackPrograms: ProgramItemType[] = INITIAL_PROGRAMS.map((p, idx) => ({
    id: p.id,
    slug: p.id,
    title: p.title,
    shortDescription: p.description,
    fullDescription: p.description,
    categoryId: fallbackCategories[idx % fallbackCategories.length].id,
    category: fallbackCategories[idx % fallbackCategories.length],
    displayLabel: null,
    icon: p.icon,
    imageUrl: p.image,
    schedule: "Mon – Fri: Flexible Hours",
    eligibility: "Open to Scarborough residents",
    location: "4234 Lawrence Ave E",
    registrationInfo: "Free drop-in or intake session",
    isFeatured: idx < 3,
    isPublished: true,
    displayOrder: idx + 1,
  }));

  let programs: ProgramItemType[] = fallbackPrograms;
  let categories = fallbackCategories;

  try {
    if (process.env.DATABASE_URL) {
      const [dbPrograms, dbCategories] = await Promise.all([
        prisma.program.findMany({
          orderBy: [{ displayOrder: "asc" }, { createdAt: "desc" }],
          include: { category: true },
        }),
        prisma.programCategory.findMany({
          orderBy: { displayOrder: "asc" },
        }),
      ]);

      if (dbPrograms.length > 0) programs = dbPrograms;
      if (dbCategories.length > 0) categories = dbCategories;
    }
  } catch (err) {
    console.warn("Using fallback programs data:", err);
  }

  return <ProgramsManager initialPrograms={programs} categories={categories} />;
}
