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
      return announcement;
    }
  } catch {
    // Return null on failure to prevent stale presentation
    return null;
  }

  return null;
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
          address: `${settings.unit ? `${settings.unit}, ` : ""}${settings.streetAddress}`,
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
          slug: p.slug,
          title: p.title,
          category: p.category.name,
          categorySlug: p.category.slug,
          description: p.shortDescription,
          fullDescription: p.fullDescription,
          icon: p.icon || "fas fa-folder",
          image: p.imageUrl || "/images/hero_community.png",
          link: `/programs#${p.slug}`,
          displayLabel: p.displayLabel || null,
          schedule: p.schedule,
          location: p.location,
          // eligibility intentionally NOT exposed publicly (admin-controlled displayLabel is the only audience badge)
          registrationInfo: p.registrationInfo,
          isFeatured: p.isFeatured,
          displayOrder: p.displayOrder,
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
          slug: p.slug,
          title: p.title,
          category: p.category.name,
          categorySlug: p.category.slug,
          description: p.shortDescription,
          fullDescription: p.fullDescription,
          icon: p.icon || "fas fa-folder",
          image: p.imageUrl || "/images/hero_community.png",
          link: `/programs#${p.slug}`,
          displayLabel: p.displayLabel || null,
          schedule: p.schedule,
          location: p.location,
          // eligibility intentionally NOT exposed publicly
          registrationInfo: p.registrationInfo,
          isFeatured: p.isFeatured,
          displayOrder: p.displayOrder,
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

export async function getUpcomingEvents(): Promise<EventItem[]> {
  try {
    if (process.env.DATABASE_URL) {
      const now = new Date();
      const events = await prisma.event.findMany({
        where: {
          isPublished: true,
          eventDate: { gte: now },
        },
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
      return [];
    }
  } catch {
    // Database query failed
  }

  // Filter initial events strictly for verified future dates
  const now = new Date();
  return INITIAL_EVENTS.filter((e) => new Date(e.date) >= now);
}

export async function getPublishedGalleryItems(): Promise<Array<{ type: "image" | "video"; src: string; title: string; category?: string; thumbnail?: string }>> {
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
          thumbnail: item.thumbnailUrl || undefined,
        }));
      }
    }
  } catch (err) {
    console.warn("Failed to load gallery items from database, using initial data fallback:", err);
  }

  const { GALLERY_MEDIA } = await import("./data");
  return GALLERY_MEDIA;
}

export async function getGalleryItemById(id: string) {
  try {
    if (process.env.DATABASE_URL) {
      const item = await prisma.galleryItem.findUnique({
        where: { id },
      });
      if (item && item.isPublished) {
        return {
          id: item.id,
          title: item.title,
          mediaType: item.mediaType,
          mediaUrl: item.mediaUrl,
          thumbnailUrl: item.thumbnailUrl,
          altText: item.altText || item.title,
        };
      }
    }
  } catch (err) {
    console.warn(`Failed to fetch gallery item by id ${id}:`, err);
  }
  return null;
}

export async function getGrandOpeningMedia(): Promise<{ mediaUrl: string; altText: string }> {
  try {
    if (process.env.DATABASE_URL) {
      // 1. Try finding by the specific Ribbon Cutting GalleryItem ID or title
      const byId = await prisma.galleryItem.findFirst({
        where: {
          isPublished: true,
          OR: [
            { id: "cmt39nfni000wh2uomb32aes2" },
            { title: { contains: "Ribbon Cutting", mode: "insensitive" } },
          ],
        },
      });
      if (byId) {
        return {
          mediaUrl: byId.mediaUrl,
          altText: byId.altText || byId.title || "Grand Opening & Ribbon Cutting Ceremony",
        };
      }

      // 2. Fall back to any Grand Opening ceremony image
      const byCat = await prisma.galleryItem.findFirst({
        where: {
          category: "Grand Opening Ceremony 2026",
          mediaType: "IMAGE",
          isPublished: true,
        },
        orderBy: { displayOrder: "asc" },
      });
      if (byCat) {
        return {
          mediaUrl: byCat.mediaUrl,
          altText: byCat.altText || byCat.title || "Grand Opening & Ribbon Cutting Ceremony",
        };
      }
    }
  } catch (err) {
    console.warn("Failed to fetch Grand Opening media:", err);
  }

  return {
    mediaUrl: "/assets/images/westhillcenterOpening/Ribbon Cutting.jpeg",
    altText: "West Hill Community Centre Grand Opening & Ribbon Cutting Ceremony",
  };
}

export async function getHomepageMedia() {
  const [grandOpening, heroItem, welcomeItem] = await Promise.all([
    getGrandOpeningMedia(),
    getGalleryItemById("cmt39nga8001hh2uox4hvz0aq"), // Hero storefront image
    getGalleryItemById("cmt39ngpr001wh2uoxr6fs4r4"), // Welcome community image
  ]);

  return {
    grandOpening,
    hero: {
      mediaUrl: heroItem?.mediaUrl || "/assets/images/westhillcenterOpening/WhatsApp Image 2026-06-09 at 11.10.49 PM (6).jpeg",
      altText: heroItem?.altText || "West Hill Community Centre storefront entrance with community members, volunteers, and opening balloon display",
    },
    welcome: {
      mediaUrl: welcomeItem?.mediaUrl || "/assets/images/westhillcenterOpening/WhatsApp Image 2026-06-09 at 11.10.51 PM (5).jpeg",
      altText: welcomeItem?.altText || "West Hill community members and neighbours gathered outside the community centre",
    },
  };
}

export interface HomepageContentData {
  heroEyebrow: string;
  heroTitle: string;
  heroDescription: string;
  heroPrimaryCtaLabel: string;
  heroPrimaryCtaUrl: string;
  heroSecondaryCtaLabel: string;
  heroSecondaryCtaUrl: string;
  heroGalleryItemId: string | null;

  welcomeEyebrow: string;
  welcomeHeading: string;
  welcomeDescription: string;
  welcomeGalleryItemId: string | null;

  programsEyebrow: string;
  programsHeading: string;
  programsDescription: string;

  milestoneEyebrow: string;
  milestoneTitle: string;
  milestoneDateText: string;
  milestoneDescription: string;
  milestoneCtaLabel: string;
  milestoneCtaUrl: string;
  milestoneGalleryItemId: string | null;

  ctaEyebrow: string;
  ctaHeading: string;
  ctaDescription: string;
  ctaButton1Label: string;
  ctaButton1Url: string;
  ctaButton2Label: string;
  ctaButton2Url: string;
  ctaButton3Label: string;
  ctaButton3Url: string;

  seoTitle: string;
  seoDescription: string;
  seoOgGalleryItemId: string | null;
}

export interface ResolvedHomepageData {
  content: HomepageContentData;
  media: {
    hero: { mediaUrl: string; altText: string };
    heroSlides: Array<{ mediaUrl: string; altText: string }>;
    welcome: { mediaUrl: string; altText: string; title: string | null; isDefault: boolean };
    milestone: { mediaUrl: string; altText: string };
    ogImage?: { mediaUrl: string; altText: string } | null;
    pathway1: { mediaUrl: string; altText: string };
    pathway2: { mediaUrl: string; altText: string };
    pathway3: { mediaUrl: string; altText: string };
  };
}

// Homepage placements render still images only. If a selected GalleryItem is a
// video, use its thumbnail when available; otherwise treat it as unresolved.
function toHomepageImage(
  item: Awaited<ReturnType<typeof getGalleryItemById>>
): { mediaUrl: string; altText: string; title: string } | null {
  if (!item) return null;
  if (item.mediaType === "IMAGE") {
    return { mediaUrl: item.mediaUrl, altText: item.altText, title: item.title };
  }
  if (item.thumbnailUrl) {
    return { mediaUrl: item.thumbnailUrl, altText: item.altText, title: item.title };
  }
  return null;
}

export async function getHomepageContent(): Promise<ResolvedHomepageData> {
  const DEFAULT_CONTENT: HomepageContentData = {
    heroEyebrow: "Welcome to West Hill Community Centre • Scarborough",
    heroTitle: "A Place to Connect, Belong & Thrive in Scarborough",
    heroDescription:
      "Empowering East Toronto families, youth, seniors, and newcomers through barrier-free community wellness, recreational initiatives, and neighbourhood leadership.",
    heroPrimaryCtaLabel: "Explore Programs",
    heroPrimaryCtaUrl: "/programs",
    heroSecondaryCtaLabel: "View Events",
    heroSecondaryCtaUrl: "/events",
    heroGalleryItemId: "cmt39nga8001hh2uox4hvz0aq",

    welcomeEyebrow: "WHO WE ARE",
    welcomeHeading: "A Welcoming Space for Care, Growth & Connection",
    welcomeDescription:
      "West Hill Community Centre operates as a safe, resident-centered neighbourhood sanctuary. We partner directly with Ward 25 families, grassroots leaders, and youth workers to address systemic barriers, foster intergenerational friendship, and cultivate civic pride in East Toronto.",
    welcomeGalleryItemId: "cmt39ngpr001wh2uoxr6fs4r4",

    programsEyebrow: "WHAT WE OFFER",
    programsHeading: "Programs & Community Services",
    programsDescription:
      "Explore ongoing programs, seasonal initiatives, and partner-led services happening weekly across our facility.",

    milestoneEyebrow: "Community Milestone • June 9, 2026",
    milestoneTitle: "Grand Opening & Ribbon Cutting Ceremony",
    milestoneDateText: "June 9, 2026",
    milestoneDescription:
      "Following years of grassroots advocacy by local residents, West Hill Community Centre officially opened its permanent doors to deliver health, wellness, recreational leagues, and youth opportunities for generations to come.",
    milestoneCtaLabel: "View Opening Event Photo Album",
    milestoneCtaUrl: "/gallery",
    milestoneGalleryItemId: "cmt39nfni000wh2uomb32aes2",

    ctaEyebrow: "JOIN THE MOVEMENT",
    ctaHeading: "Be Part of What’s Happening at West Hill",
    ctaDescription:
      "Choose one of three meaningful pathways to participate, lead, or volunteer with our neighbourhood family.",
    ctaButton1Label: "Register for Programs",
    ctaButton1Url: "/programs",
    ctaButton2Label: "Volunteer with Us",
    ctaButton2Url: "/volunteer",
    ctaButton3Label: "Partner / Sponsor",
    ctaButton3Url: "/partners",

    seoTitle: "West Hill Community Centre | Connecting Communities, Supporting Families",
    seoDescription:
      "West Hill Community Centre brings people together through community programs, family support services, youth development initiatives, and local advocacy in Scarborough.",
    seoOgGalleryItemId: null,
  };

  let dbRecord: Awaited<ReturnType<typeof prisma.homepageContent.findUnique>> = null;
  try {
    if (process.env.DATABASE_URL) {
      dbRecord = await prisma.homepageContent.findUnique({
        where: { id: "singleton" },
      });
    }
  } catch (err) {
    console.warn("Failed to fetch HomepageContent from database:", err);
  }

  const content: HomepageContentData = {
    heroEyebrow: dbRecord?.heroEyebrow?.trim() || DEFAULT_CONTENT.heroEyebrow,
    heroTitle: dbRecord?.heroTitle?.trim() || DEFAULT_CONTENT.heroTitle,
    heroDescription: dbRecord?.heroDescription?.trim() || DEFAULT_CONTENT.heroDescription,
    heroPrimaryCtaLabel: dbRecord?.heroPrimaryCtaLabel?.trim() || DEFAULT_CONTENT.heroPrimaryCtaLabel,
    heroPrimaryCtaUrl: dbRecord?.heroPrimaryCtaUrl?.trim() || DEFAULT_CONTENT.heroPrimaryCtaUrl,
    heroSecondaryCtaLabel: dbRecord?.heroSecondaryCtaLabel?.trim() || DEFAULT_CONTENT.heroSecondaryCtaLabel,
    heroSecondaryCtaUrl: dbRecord?.heroSecondaryCtaUrl?.trim() || DEFAULT_CONTENT.heroSecondaryCtaUrl,
    heroGalleryItemId: dbRecord?.heroGalleryItemId?.trim() || DEFAULT_CONTENT.heroGalleryItemId,

    welcomeEyebrow: dbRecord?.welcomeEyebrow?.trim() || DEFAULT_CONTENT.welcomeEyebrow,
    welcomeHeading: dbRecord?.welcomeHeading?.trim() || DEFAULT_CONTENT.welcomeHeading,
    welcomeDescription: dbRecord?.welcomeDescription?.trim() || DEFAULT_CONTENT.welcomeDescription,
    welcomeGalleryItemId: dbRecord?.welcomeGalleryItemId?.trim() || DEFAULT_CONTENT.welcomeGalleryItemId,

    programsEyebrow: dbRecord?.programsEyebrow?.trim() || DEFAULT_CONTENT.programsEyebrow,
    programsHeading: dbRecord?.programsHeading?.trim() || DEFAULT_CONTENT.programsHeading,
    programsDescription: dbRecord?.programsDescription?.trim() || DEFAULT_CONTENT.programsDescription,

    milestoneEyebrow: dbRecord?.milestoneEyebrow?.trim() || DEFAULT_CONTENT.milestoneEyebrow,
    milestoneTitle: dbRecord?.milestoneTitle?.trim() || DEFAULT_CONTENT.milestoneTitle,
    milestoneDateText: dbRecord?.milestoneDateText?.trim() || DEFAULT_CONTENT.milestoneDateText,
    milestoneDescription: dbRecord?.milestoneDescription?.trim() || DEFAULT_CONTENT.milestoneDescription,
    milestoneCtaLabel: dbRecord?.milestoneCtaLabel?.trim() || DEFAULT_CONTENT.milestoneCtaLabel,
    milestoneCtaUrl: dbRecord?.milestoneCtaUrl?.trim() || DEFAULT_CONTENT.milestoneCtaUrl,
    milestoneGalleryItemId: dbRecord?.milestoneGalleryItemId?.trim() || DEFAULT_CONTENT.milestoneGalleryItemId,

    ctaEyebrow: dbRecord?.ctaEyebrow?.trim() || DEFAULT_CONTENT.ctaEyebrow,
    ctaHeading: dbRecord?.ctaHeading?.trim() || DEFAULT_CONTENT.ctaHeading,
    ctaDescription: dbRecord?.ctaDescription?.trim() || DEFAULT_CONTENT.ctaDescription,
    ctaButton1Label: dbRecord?.ctaButton1Label?.trim() || DEFAULT_CONTENT.ctaButton1Label,
    ctaButton1Url: dbRecord?.ctaButton1Url?.trim() || DEFAULT_CONTENT.ctaButton1Url,
    ctaButton2Label: dbRecord?.ctaButton2Label?.trim() || DEFAULT_CONTENT.ctaButton2Label,
    ctaButton2Url: dbRecord?.ctaButton2Url?.trim() || DEFAULT_CONTENT.ctaButton2Url,
    ctaButton3Label: dbRecord?.ctaButton3Label?.trim() || DEFAULT_CONTENT.ctaButton3Label,
    ctaButton3Url: dbRecord?.ctaButton3Url?.trim() || DEFAULT_CONTENT.ctaButton3Url,

    seoTitle: dbRecord?.seoTitle?.trim() || DEFAULT_CONTENT.seoTitle,
    seoDescription: dbRecord?.seoDescription?.trim() || DEFAULT_CONTENT.seoDescription,
    seoOgGalleryItemId: dbRecord?.seoOgGalleryItemId?.trim() || null,
  };

  // Resolve media through GalleryItem records in Neon (only the ID is stored)
  const [heroRaw, welcomeRaw, milestoneRaw, ogRaw] = await Promise.all([
    content.heroGalleryItemId ? getGalleryItemById(content.heroGalleryItemId) : null,
    content.welcomeGalleryItemId ? getGalleryItemById(content.welcomeGalleryItemId) : null,
    content.milestoneGalleryItemId ? getGalleryItemById(content.milestoneGalleryItemId) : null,
    content.seoOgGalleryItemId ? getGalleryItemById(content.seoOgGalleryItemId) : null,
  ]);
  const heroMedia = toHomepageImage(heroRaw);
  const welcomeMedia = toHomepageImage(welcomeRaw);
  const milestoneMedia = toHomepageImage(milestoneRaw);
  const ogMedia = toHomepageImage(ogRaw);

  const fallbackGrandOpening = milestoneMedia ? null : await getGrandOpeningMedia();

  // Curated authentic West Hill slides for reliable fallback
  const leadHeroSlide = {
    mediaUrl: heroMedia?.mediaUrl || "/assets/images/westhillcenterOpening/WhatsApp Image 2026-06-09 at 11.10.49 PM (6).jpeg",
    altText: heroMedia?.altText || "West Hill Community Centre storefront entrance with community members, volunteers, and opening balloon display",
  };

  const DEFAULT_ADDITIONAL_SLIDES = [
    {
      mediaUrl: "/assets/images/westhillcenterOpening/Ribbon Cutting.jpeg",
      altText: "Official Ribbon Cutting Ceremony with community leaders and resident advocates",
    },
    {
      mediaUrl: "/assets/images/westhillcenterOpening/WhatsApp Image 2026-06-09 at 11.10.51 PM (5).jpeg",
      altText: "West Hill community members and neighbours gathered outside the centre",
    },
    {
      mediaUrl: "/assets/images/westhillcenterOpening/WhatsApp Image 2026-06-09 at 11.10.49 PM (7).jpeg",
      altText: "Community partners and attendees celebrating at West Hill Community Centre",
    },
    {
      mediaUrl: "/assets/images/westhillcenterOpening/WhatsApp Image 2026-06-09 at 11.10.49 PM (4).jpeg",
      altText: "Celebration inside West Hill Community Centre with families and youth",
    },
  ];

  // Fetch administrator-configured hero slides from SiteMediaPlacement
  let heroSlides: Array<{ mediaUrl: string; altText: string }> = [];
  try {
    if (process.env.DATABASE_URL) {
      const slidePlacements = await prisma.siteMediaPlacement.findMany({
        where: { slotKey: "homepage-hero-slide", isActive: true },
        include: { galleryItem: true },
        orderBy: { displayOrder: "asc" },
      });
      heroSlides = slidePlacements
        .filter((sp) => sp.galleryItem && sp.galleryItem.isPublished)
        .map((sp) => ({
          mediaUrl: sp.galleryItem!.mediaUrl,
          altText: sp.galleryItem!.altText || sp.galleryItem!.title || "West Hill Community Centre",
        }));
    }
  } catch (err) {
    console.warn("Failed to fetch site media hero slides:", err);
  }

  // Fallback to lead slide + curated authentic slides if no custom slides configured
  if (heroSlides.length === 0) {
    heroSlides.push(leadHeroSlide);
    for (const d of DEFAULT_ADDITIONAL_SLIDES) {
      if (!heroSlides.some((existing) => existing.mediaUrl === d.mediaUrl)) {
        heroSlides.push(d);
      }
      if (heroSlides.length >= 4) break;
    }
  }

  // Fetch pathway card placements
  const [p1, p2, p3] = await Promise.all([
    getSiteMediaSlot("homepage-pathway-1", {
      mediaUrl: "/images/Senoirs-Program-incolaboration-with-Toronto-public-Library-12.jpeg",
      altText: "Young participants and community members",
    }),
    getSiteMediaSlot("homepage-pathway-2", {
      mediaUrl: "/assets/images/westhillcenterOpening/WhatsApp Image 2026-06-09 at 11.10.51 PM (4).jpeg",
      altText: "Active community volunteers at West Hill centre",
    }),
    getSiteMediaSlot("homepage-pathway-3", {
      mediaUrl: "/images/westhill-storefront.jpeg",
      altText: "West Hill Community Centre exterior storefront",
    }),
  ]);

  return {
    content,
    media: {
      hero: heroSlides[0] || leadHeroSlide,
      heroSlides,
      welcome: {
        mediaUrl: welcomeMedia?.mediaUrl || "/assets/images/westhillcenterOpening/WhatsApp Image 2026-06-09 at 11.10.51 PM (5).jpeg",
        altText: welcomeMedia?.altText || "West Hill community members and neighbours gathered outside the community centre",
        title: welcomeMedia?.title || null,
        isDefault: !welcomeMedia || content.welcomeGalleryItemId === DEFAULT_CONTENT.welcomeGalleryItemId,
      },
      milestone: {
        mediaUrl: milestoneMedia?.mediaUrl || fallbackGrandOpening!.mediaUrl,
        altText: milestoneMedia?.altText || fallbackGrandOpening!.altText,
      },
      ogImage: ogMedia ? { mediaUrl: ogMedia.mediaUrl, altText: ogMedia.altText || "West Hill Community Centre" } : null,
      pathway1: { mediaUrl: p1.mediaUrl, altText: p1.altText },
      pathway2: { mediaUrl: p2.mediaUrl, altText: p2.altText },
      pathway3: { mediaUrl: p3.mediaUrl, altText: p3.altText },
    },
  };
}

export async function getPublishedGalleryItemsForAdmin() {
  try {
    if (process.env.DATABASE_URL) {
      return await prisma.galleryItem.findMany({
        where: { isPublished: true, mediaType: "IMAGE" },
        select: {
          id: true,
          title: true,
          category: true,
          mediaType: true,
          mediaUrl: true,
          thumbnailUrl: true,
          altText: true,
        },
        orderBy: [{ displayOrder: "asc" }, { createdAt: "desc" }],
      });
    }
  } catch (err) {
    console.warn("Failed to load gallery items for admin selector:", err);
  }
  return [];
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
      description: "Delivering introductory coding camps, STEM workshops, and digital literacy for youth development participants.",
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

// ============================================================================
// SITE MEDIA PLACEMENT RESOLUTION (GLOBAL CMS PLACEMENTS)
// ============================================================================

export interface ResolvedMediaSlot {
  id?: string;
  mediaUrl: string;
  altText: string;
  title?: string | null;
  category?: string | null;
  isAssigned: boolean;
}

export async function getSiteMediaSlot(
  slotKey: string,
  fallback?: { mediaUrl: string; altText: string; title?: string }
): Promise<ResolvedMediaSlot> {
  try {
    if (process.env.DATABASE_URL) {
      const placement = await prisma.siteMediaPlacement.findFirst({
        where: { slotKey, isActive: true },
        include: { galleryItem: true },
        orderBy: { displayOrder: "asc" },
      });

      if (placement?.galleryItem && placement.galleryItem.isPublished) {
        return {
          id: placement.id,
          mediaUrl: placement.galleryItem.mediaUrl,
          altText: placement.galleryItem.altText || placement.galleryItem.title,
          title: placement.galleryItem.title,
          category: placement.galleryItem.category,
          isAssigned: true,
        };
      }
    }
  } catch (err) {
    console.warn(`Failed to fetch media slot for ${slotKey}:`, err);
  }

  return {
    mediaUrl: fallback?.mediaUrl || "/assets/images/og-share.png",
    altText: fallback?.altText || "West Hill Community Centre",
    title: fallback?.title || null,
    category: null,
    isAssigned: false,
  };
}

export async function getAllSiteMediaPlacements() {
  try {
    if (process.env.DATABASE_URL) {
      return await prisma.siteMediaPlacement.findMany({
        include: {
          galleryItem: {
            select: {
              id: true,
              title: true,
              mediaUrl: true,
              thumbnailUrl: true,
              altText: true,
              category: true,
              isPublished: true,
            },
          },
        },
        orderBy: [{ page: "asc" }, { displayOrder: "asc" }, { createdAt: "asc" }],
      });
    }
  } catch (err) {
    console.warn("Failed to fetch all site media placements:", err);
  }
  return [];
}



