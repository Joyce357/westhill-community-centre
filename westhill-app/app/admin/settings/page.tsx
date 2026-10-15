import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import SettingsManager from "@/components/admin/SettingsManager";
import { SITE_SETTINGS } from "@/lib/data";

interface SiteSettingsType {
  organizationName: string;
  primaryEmail: string;
  volunteerEmail: string | null;
  phone: string;
  streetAddress: string;
  unit: string | null;
  city: string;
  province: string;
  postalCode: string;
  hoursWeekday: string;
  hoursSaturday: string;
  hoursSunday: string;
  facebookUrl: string | null;
  instagramUrl: string | null;
  linkedinUrl: string | null;
  youtubeUrl: string | null;
}

export default async function AdminSettingsPage() {
  await requireAuth();

  let settings: SiteSettingsType = {
    organizationName: SITE_SETTINGS.orgName,
    primaryEmail: SITE_SETTINGS.primaryEmail,
    volunteerEmail: SITE_SETTINGS.volunteerEmail || null,
    phone: SITE_SETTINGS.phone,
    streetAddress: "4234 Lawrence Avenue East",
    unit: "Unit 4",
    city: "Scarborough",
    province: "Ontario",
    postalCode: "M1E 4R4",
    hoursWeekday: SITE_SETTINGS.weekdayHours,
    hoursSaturday: SITE_SETTINGS.saturdayHours,
    hoursSunday: SITE_SETTINGS.sundayHours,
    facebookUrl: SITE_SETTINGS.socials.facebook || null,
    instagramUrl: SITE_SETTINGS.socials.instagram || null,
    linkedinUrl: SITE_SETTINGS.socials.linkedin || null,
    youtubeUrl: SITE_SETTINGS.socials.youtube || null,
  };

  try {
    if (process.env.DATABASE_URL) {
      const fromDb = await prisma.siteSettings.findUnique({
        where: { id: "singleton" },
      });
      if (fromDb) {
        settings = fromDb;
      }
    }
  } catch (err) {
    console.warn("Using fallback settings data:", err);
  }

  return <SettingsManager initialSettings={settings} />;
}
