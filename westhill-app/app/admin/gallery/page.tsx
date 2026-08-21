import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import GalleryManager, { GalleryItemData } from "@/components/admin/GalleryManager";

export default async function AdminGalleryPage() {
  await requireAuth();

  let items: GalleryItemData[] = [];

  try {
    if (process.env.DATABASE_URL) {
      items = await prisma.galleryItem.findMany({
        orderBy: [{ displayOrder: "asc" }, { createdAt: "desc" }],
      });
    }
  } catch (err) {
    console.warn("Failed to load gallery items from database:", err);
  }

  return <GalleryManager initialItems={items} />;
}
