import { requireAuth } from "@/lib/auth";
import { getAllSiteMediaPlacements, getPublishedGalleryItemsForAdmin } from "@/lib/queries";
import SiteMediaManager from "@/components/admin/SiteMediaManager";

export const metadata = {
  title: "Site Media Manager | West Hill Admin",
};

export default async function AdminSiteMediaPage() {
  await requireAuth();

  const [placements, galleryItems] = await Promise.all([
    getAllSiteMediaPlacements(),
    getPublishedGalleryItemsForAdmin(),
  ]);

  return (
    <SiteMediaManager
      initialPlacements={placements}
      galleryItems={galleryItems}
    />
  );
}
