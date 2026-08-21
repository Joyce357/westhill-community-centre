import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import GalleryGrid from "@/components/GalleryGrid";
import { getPublishedGalleryItems } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Community Gallery | West Hill Community Centre",
  description:
    "Explore photos and moments from West Hill Community Centre's programs, events, grand opening ceremony, and local gatherings in Scarborough.",
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
