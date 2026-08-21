import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import AnnouncementsManager from "@/components/admin/AnnouncementsManager";

export default async function AdminAnnouncementsPage() {
  await requireAuth();

  let announcements: Array<{
    id: string;
    message: string;
    ctaText: string | null;
    ctaUrl: string | null;
    isActive: boolean;
    startsAt: Date | null;
    expiresAt: Date | null;
    createdAt: Date;
  }> = [
    {
      id: "seed-announcement-1",
      message: "Summer Youth Programs registration is now open!",
      ctaText: "Register today",
      ctaUrl: "/programs",
      isActive: true,
      startsAt: null,
      expiresAt: null,
      createdAt: new Date(),
    },
  ];

  try {
    if (process.env.DATABASE_URL) {
      const fromDb = await prisma.announcement.findMany({
        orderBy: { createdAt: "desc" },
      });
      if (fromDb.length > 0) {
        announcements = fromDb;
      }
    }
  } catch (err) {
    console.warn("Using initial announcement data:", err);
  }

  return <AnnouncementsManager initialAnnouncements={announcements} />;
}
