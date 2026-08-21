import { prisma } from "./prisma";
import {
  INITIAL_PROGRAMS,
  INITIAL_EVENTS,
  SITE_SETTINGS,
  ProgramItem,
  EventItem,
} from "./data";

export async function getActiveAnnouncement() {
  try {
    if (process.env.DATABASE_URL) {
      const now = new Date();
      const announcement = await prisma.announcement.findFirst({
        where: {
          isActive: true,
          OR: [
            { startsAt: null, expiresAt: null },
            { startsAt: { lte: now }, expiresAt: null },
            { startsAt: null, expiresAt: { gte: now } },
            { startsAt: { lte: now }, expiresAt: { gte: now } },
          ],
        },
        orderBy: { createdAt: "desc" },
      });
      if (announcement) return announcement;
    }
  } catch {
    // Fall back to default active announcement
  }

  return {
    id: "default-active-announcement",
    message: "Summer Youth Programs registration is now open!",
    ctaText: "Register today",
    ctaUrl: "/programs",
    isActive: true,
    startsAt: null,
    expiresAt: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

export async function getSiteSettings() {
  try {
    if (process.env.DATABASE_URL) {
      const settings = await prisma.siteSettings.findUnique({
        where: { id: "singleton" },
      });

      if (settings) {
        return {
          orgName: settings.organizationName,
          primaryEmail: settings.primaryEmail,
          volunteerEmail: settings.volunteerEmail || "volunteer@westhillcommunity.org",
          phone: settings.phone,
          address: `${settings.streetAddress}${settings.unit ? `, ${settings.unit}` : ""}`,
          locationText: `${settings.city}, ${settings.province} ${settings.postalCode}`,
          hours: {
            weekday: settings.hoursWeekday,
            saturday: settings.hoursSaturday,
            sunday: settings.hoursSunday,
          },
          social: {
            facebook: settings.facebookUrl || undefined,
            instagram: settings.instagramUrl || undefined,
            linkedin: settings.linkedinUrl || undefined,
            youtube: settings.youtubeUrl || undefined,
          },
        };
      }
    }
  } catch {
    // Fall back gracefully
  }

  return {
    orgName: SITE_SETTINGS.orgName,
    primaryEmail: SITE_SETTINGS.primaryEmail,
    volunteerEmail: SITE_SETTINGS.volunteerEmail,
    phone: SITE_SETTINGS.phone,
    address: SITE_SETTINGS.address,
    locationText: "Scarborough, Ontario M1E 4R4",
    hours: {
      weekday: SITE_SETTINGS.weekdayHours,
      saturday: SITE_SETTINGS.saturdayHours,
      sunday: SITE_SETTINGS.sundayHours,
    },
    social: {
      facebook: SITE_SETTINGS.socials.facebook,
      instagram: SITE_SETTINGS.socials.instagram,
      linkedin: SITE_SETTINGS.socials.linkedin,
      youtube: SITE_SETTINGS.socials.youtube,
    },
  };
}

export async function getPublishedPrograms(): Promise<ProgramItem[]> {
  try {
    if (process.env.DATABASE_URL) {
      const progs = await prisma.program.findMany({
        where: { isPublished: true },
        include: { category: true },
        orderBy: [{ displayOrder: "asc" }, { createdAt: "desc" }],
      });

      if (progs.length > 0) {
        return progs.map((p) => ({
          id: p.id,
          title: p.title,
          category: p.category.name,
          description: p.shortDescription,
          icon: p.icon || "fas fa-folder",
          image: p.imageUrl || "/images/hero_community.png",
          link: `/programs#${p.slug}`,
        }));
      }
    }
  } catch {
    // Fall back to initial programs
  }

  return INITIAL_PROGRAMS;
}

export async function getFeaturedPrograms(): Promise<ProgramItem[]> {
  try {
    if (process.env.DATABASE_URL) {
      const progs = await prisma.program.findMany({
        where: { isPublished: true, isFeatured: true },
        include: { category: true },
        orderBy: [{ displayOrder: "asc" }, { createdAt: "desc" }],
      });

      if (progs.length > 0) {
        return progs.map((p) => ({
          id: p.id,
          title: p.title,
          category: p.category.name,
          description: p.shortDescription,
          icon: p.icon || "fas fa-folder",
          image: p.imageUrl || "/images/hero_community.png",
          link: `/programs#${p.slug}`,
        }));
      }
    }
  } catch {
    // Fall back
  }

  return INITIAL_PROGRAMS.slice(0, 3);
}

export async function getPublishedEvents(): Promise<EventItem[]> {
  try {
    if (process.env.DATABASE_URL) {
      const events = await prisma.event.findMany({
        where: { isPublished: true },
        orderBy: { eventDate: "asc" },
      });

      if (events.length > 0) {
        return events.map((e) => {
          const d = new Date(e.eventDate);
          return {
            id: e.id,
            title: e.title,
            description: e.description,
            date: d.toISOString().split("T")[0],
            day: String(d.getDate()).padStart(2, "0"),
            month: d.toLocaleString("default", { month: "short" }).toUpperCase(),
            time: e.endTime ? `${e.startTime} - ${e.endTime}` : e.startTime,
            location: e.location,
            category: e.category,
            image: e.imageUrl || "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&q=80&w=600",
          };
        });
      }
    }
  } catch {
    // Fall back
  }

  return INITIAL_EVENTS;
}

export async function getPublishedGalleryItems(): Promise<Array<{ type: "image" | "video"; src: string; title: string; category?: string }>> {
  try {
    if (process.env.DATABASE_URL) {
      const items = await prisma.galleryItem.findMany({
        where: { isPublished: true },
        orderBy: [{ displayOrder: "asc" }, { createdAt: "desc" }],
      });

      if (items.length > 0) {
        return items.map((item) => ({
          type: item.mediaType === "VIDEO" ? ("video" as const) : ("image" as const),
          src: item.mediaUrl,
          title: item.title,
          category: item.category || undefined,
        }));
      }
    }
  } catch (err) {
    console.warn("Failed to load gallery items from database, using initial data fallback:", err);
  }

  const { GALLERY_MEDIA } = await import("./data");
  return GALLERY_MEDIA;
}

