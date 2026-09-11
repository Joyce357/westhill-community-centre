import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import PartnersManager, { PartnerData } from "@/components/admin/PartnersManager";

export default async function AdminPartnersPage() {
  await requireAuth();

  let items: PartnerData[] = [];

  try {
    if (process.env.DATABASE_URL) {
      items = await prisma.partner.findMany({
        orderBy: [{ displayOrder: "asc" }, { createdAt: "desc" }],
      });
    }
  } catch (err) {
    console.warn("Failed to load partners from database:", err);
  }

  return <PartnersManager initialItems={items} />;
}
