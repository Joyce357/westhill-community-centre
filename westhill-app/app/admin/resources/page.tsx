import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import ResourcesManager, { ResourceItemData } from "@/components/admin/ResourcesManager";

export default async function AdminResourcesPage() {
  await requireAuth();

  let items: ResourceItemData[] = [];

  try {
    if (process.env.DATABASE_URL) {
      items = await prisma.resourceItem.findMany({
        orderBy: [{ displayOrder: "asc" }, { createdAt: "desc" }],
      });
    }
  } catch (err) {
    console.warn("Failed to load resources from database:", err);
  }

  return <ResourcesManager initialItems={items} />;
}
