import type { Metadata } from "next";
import { getPublishedPrograms, getSiteSettings, getGrandOpeningMedia } from "@/lib/queries";
import ProgramsDirectoryView from "@/components/ProgramsDirectoryView";

import { getCanonicalUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Programs & Community Services",
  description:
    "Explore community-focused initiatives in Scarborough including youth mentorship, sports leagues, seniors lunch club, employment assistance, and family support.",
  alternates: {
    canonical: getCanonicalUrl("/programs"),
  },
  openGraph: {
    title: "Programs & Community Services | West Hill Community Centre",
    description:
      "Explore community-focused initiatives in Scarborough including youth mentorship, sports leagues, seniors lunch club, employment assistance, and family support.",
    url: getCanonicalUrl("/programs"),
  },
};

export default async function ProgramsPage() {
  const [programs, settings, grandOpeningMedia] = await Promise.all([
    getPublishedPrograms(),
    getSiteSettings(),
    getGrandOpeningMedia(),
  ]);

  return (
    <ProgramsDirectoryView
      programs={programs}
      settingsAddress={settings.address}
      grandOpeningMedia={grandOpeningMedia}
    />
  );
}

