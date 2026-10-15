import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import GalleryGrid from "@/components/GalleryGrid";
import { getPublishedGalleryItems } from "@/lib/queries";

import { getCanonicalUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Community Gallery & Event Highlights",
  description:
    "Explore authentic photography from West Hill Community Centre programs, recreation, grand opening celebration, and community milestones in Scarborough.",
  alternates: {
    canonical: getCanonicalUrl("/gallery"),
  },
  openGraph: {
    title: "Community Gallery & Event Highlights | West Hill Community Centre",
    description:
      "Explore authentic photography from West Hill Community Centre programs, recreation, grand opening celebration, and community milestones in Scarborough.",
    url: getCanonicalUrl("/gallery"),
  },
};

export default async function GalleryPage() {
  const media = await getPublishedGalleryItems();

  return (
    <>
      <PageHero
        title="Community Gallery"
        subtitle="Moments from West Hill Community Centre events, programs, and community milestones."
        theme="light"
      />

      <section className="gallery-section-wrapper" aria-label="Photo Gallery">
        <GalleryGrid media={media} />
      </section>
    </>
  );
}
