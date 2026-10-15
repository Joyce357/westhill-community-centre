import type { Metadata } from "next";
import { getPublishedPrograms, getSiteSettings, getGrandOpeningMedia, getSiteMediaSlot } from "@/lib/queries";
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
  const [programs, settings, grandOpeningMedia, archiveMedia1, archiveMedia2] = await Promise.all([
    getPublishedPrograms(),
    getSiteSettings(),
    getGrandOpeningMedia(),
    getSiteMediaSlot("programs-archive-1", {
      mediaUrl: "/assets/images/westhillcenterOpening/WhatsApp Image 2026-06-09 at 11.10.51 PM (4).jpeg",
      altText: "Community donation and care distribution",
    }),
    getSiteMediaSlot("programs-archive-2", {
      mediaUrl: "/images/Youth Award.jpeg",
      altText: "Youth tech hackathon and recognition",
    }),
  ]);

  return (
    <ProgramsDirectoryView
      programs={programs}
      settingsAddress={settings.address}
      grandOpeningMedia={grandOpeningMedia}
      archiveMedia1={archiveMedia1}
      archiveMedia2={archiveMedia2}
    />
  );
}

