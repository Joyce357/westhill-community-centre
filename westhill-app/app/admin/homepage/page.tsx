import { requireAuth } from "@/lib/auth";
import { getHomepageContent, getPublishedGalleryItemsForAdmin } from "@/lib/queries";
import HomepageManager from "@/components/admin/HomepageManager";

export default async function AdminHomepagePage() {
  await requireAuth();

  const [homepageData, galleryItems] = await Promise.all([
    getHomepageContent(),
    getPublishedGalleryItemsForAdmin(),
  ]);

  return (
    <HomepageManager
      initialContent={homepageData.content}
      galleryItems={galleryItems}
    />
  );
}
