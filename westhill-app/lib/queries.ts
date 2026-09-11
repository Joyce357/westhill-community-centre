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

export interface PublishedResourceItem {
  id: string;
  title: string;
  description: string | null;
  resourceType: "DOCUMENT" | "EXTERNAL_LINK" | "GUIDE";
  url: string;
  fileSize: string | null;
  category: string | null;
  icon: string | null;
  displayOrder: number;
}

export async function getPublishedResources(): Promise<PublishedResourceItem[]> {
  try {
    if (process.env.DATABASE_URL) {
      const items = await prisma.resourceItem.findMany({
        where: { isPublished: true },
        orderBy: [{ displayOrder: "asc" }, { createdAt: "desc" }],
      });

      if (items.length > 0) {
        return items.map((i) => ({
          id: i.id,
          title: i.title,
          description: i.description,
          resourceType: i.resourceType as "DOCUMENT" | "EXTERNAL_LINK" | "GUIDE",
          url: i.url,
          fileSize: i.fileSize,
          category: i.category,
          icon: i.icon,
          displayOrder: i.displayOrder,
        }));
      }
    }
  } catch (err) {
    console.warn("Failed to load resources from database, using fallback:", err);
  }

  return [
    {
      id: "res-1",
      title: "Volunteer Handbook",
      description: "Official guide and volunteer orientation packet for West Hill Community Centre.",
      resourceType: "DOCUMENT",
      url: "/assets/documents/Volunteer-Handbook-West-Hill-Community-Centre.pdf",
      fileSize: "PDF | 153 KB | Official Guide",
      category: "Downloads",
      icon: "fas fa-file-pdf",
      displayOrder: 1,
    },
    {
      id: "res-2",
      title: "Program Registration Guide",
      description: "Detailed step-by-step registration instructions for youth, seniors, and family programs.",
      resourceType: "GUIDE",
      url: "/programs",
      fileSize: "PDF | Document Info",
      category: "Downloads",
      icon: "fas fa-file-pdf",
      displayOrder: 2,
    },
    {
      id: "res-3",
      title: "Community Partnership Package",
      description: "Information on organizational sponsorships, joint initiatives, and community impact tiers.",
      resourceType: "GUIDE",
      url: "/partners",
      fileSize: "PDF | Partnership Info",
      category: "Downloads",
      icon: "fas fa-file-pdf",
      displayOrder: 3,
    },
    {
      id: "res-4",
      title: "Summer Program Information",
      description: "Upcoming summer schedules, sports leagues, and camp registration details.",
      resourceType: "DOCUMENT",
      url: "#",
      fileSize: "Coming Soon",
      category: "Downloads",
      icon: "fas fa-file-pdf",
      displayOrder: 4,
    },
    {
      id: "res-5",
      title: "Event Participation Guide",
      description: "Calendar and participation guidelines for upcoming community celebrations and workshops.",
      resourceType: "GUIDE",
      url: "/events",
      fileSize: "PDF | Events Calendar",
      category: "Downloads",
      icon: "fas fa-file-pdf",
      displayOrder: 5,
    },
    {
      id: "res-6",
      title: "Toronto 211",
      description: "Free, confidential service connecting you to government and community programs across Toronto.",
      resourceType: "EXTERNAL_LINK",
      url: "https://211toronto.ca",
      fileSize: null,
      category: "Community Connections",
      icon: "fas fa-landmark",
      displayOrder: 6,
    },
    {
      id: "res-7",
      title: "Toronto Public Library",
      description: "The Morningside and Port Union library branches provide book lending, study spaces, and child learning groups.",
      resourceType: "EXTERNAL_LINK",
      url: "https://www.torontopubliclibrary.ca",
      fileSize: null,
      category: "Community Connections",
      icon: "fas fa-book-open",
      displayOrder: 7,
    },
    {
      id: "res-8",
      title: "Settlement Services",
      description: "Connect with settlement counseling, English language learning (LINC), and housing referral helpers in Scarborough.",
      resourceType: "EXTERNAL_LINK",
      url: "https://settlement.org",
      fileSize: null,
      category: "Community Connections",
      icon: "fas fa-hands-holding",
      displayOrder: 8,
    },
  ];
}

export interface PublishedPartnerItem {
  id: string;
  name: string;
  description: string | null;
  logoUrl: string | null;
  websiteUrl: string | null;
  tier: string | null;
  category: string | null;
  displayOrder: number;
  isFeatured: boolean;
}

export async function getPublishedPartners(): Promise<PublishedPartnerItem[]> {
  try {
    if (process.env.DATABASE_URL) {
      const items = await prisma.partner.findMany({
        where: { isPublished: true },
        orderBy: [{ displayOrder: "asc" }, { createdAt: "desc" }],
      });

      if (items.length > 0) {
        return items.map((p) => ({
          id: p.id,
          name: p.name,
          description: p.description,
          logoUrl: p.logoUrl,
          websiteUrl: p.websiteUrl,
          tier: p.tier,
          category: p.category,
          displayOrder: p.displayOrder,
          isFeatured: p.isFeatured,
        }));
      }
    }
  } catch (err) {
    console.warn("Failed to load partners from database, using fallback:", err);
  }

  return [
    {
      id: "partner-1",
      name: "Toronto District School Board (TDSB)",
      description: "Collaborating on educational programs, youth tutoring, and community school initiatives across East Scarborough.",
      logoUrl: null,
      websiteUrl: "https://www.tdsb.on.ca",
      tier: "Community Builder",
      category: "Education",
      displayOrder: 1,
      isFeatured: true,
    },
    {
      id: "partner-2",
      name: "Toronto Public Health",
      description: "Providing community wellness clinics, health workshops, immunization advice, and family wellness guidelines.",
      logoUrl: null,
      websiteUrl: "https://www.toronto.ca/community-people/health-wellness-care/",
      tier: "Cornerstone Partner",
      category: "Health & Wellness",
      displayOrder: 2,
      isFeatured: true,
    },
    {
      id: "partner-3",
      name: "West Hill Collegiate Institute",
      description: "Connecting local students with volunteer opportunities, athletic tournaments, and youth development circles.",
      logoUrl: null,
      websiteUrl: "https://schoolweb.tdsb.on.ca/westhill",
      tier: "Youth Advocate",
      category: "Education",
      displayOrder: 3,
      isFeatured: true,
    },
    {
      id: "partner-4",
      name: "Jays Care Foundation",
      description: "Supporting inclusive youth baseball and athletic recreation leagues for neighborhood children in Scarborough.",
      logoUrl: null,
      websiteUrl: "https://www.mlb.com/bluejays/community/jays-care",
      tier: "Youth Advocate",
      category: "Sports & Recreation",
      displayOrder: 4,
      isFeatured: true,
    },
    {
      id: "partner-5",
      name: "Code Ninjas Scarborough",
      description: "Delivering introductory coding camps, STEM workshops, and digital literacy for youth hub members.",
      logoUrl: null,
      websiteUrl: "https://www.codeninjas.com",
      tier: "Youth Advocate",
      category: "STEM & Technology",
      displayOrder: 5,
      isFeatured: false,
    },
    {
      id: "partner-6",
      name: "West Hill Community Association",
      description: "Collaborating on neighborhood events, civic engagement, and community advocacy across Scarborough-West Hill.",
      logoUrl: null,
      websiteUrl: "https://www.westhillcommunityassociation.com",
      tier: "Community Builder",
      category: "Community & Civic",
      displayOrder: 6,
      isFeatured: false,
    },
  ];
}



