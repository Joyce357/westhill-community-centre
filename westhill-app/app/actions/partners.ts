"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

const PartnerSchema = z.object({
  name: z.string().min(2, "Partner / Organization name is required (min 2 characters)."),
  description: z.string().optional().nullable(),
  logoUrl: z.string().optional().nullable(),
  websiteUrl: z.string().optional().nullable(),
  tier: z.string().optional().nullable().default("Community Partner"),
  category: z.string().optional().nullable().default("Community"),
  displayOrder: z.coerce.number().default(0),
  isFeatured: z.boolean().default(false),
  isPublished: z.boolean().default(true),
});

export async function createPartnerAction(formData: FormData) {
  await requireAuth();

  const raw = {
    name: formData.get("name") as string,
    description: (formData.get("description") as string) || null,
    logoUrl: (formData.get("logoUrl") as string) || null,
    websiteUrl: (formData.get("websiteUrl") as string) || null,
    tier: (formData.get("tier") as string) || "Community Partner",
    category: (formData.get("category") as string) || "Community",
    displayOrder: formData.get("displayOrder") || 0,
    isFeatured: formData.get("isFeatured") === "on" || formData.get("isFeatured") === "true",
    isPublished: formData.get("isPublished") === "on" || formData.get("isPublished") === "true",
  };

  const parsed = PartnerSchema.safeParse(raw);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  await prisma.partner.create({
    data: {
      name: parsed.data.name,
      description: parsed.data.description,
      logoUrl: parsed.data.logoUrl,
      websiteUrl: parsed.data.websiteUrl,
      tier: parsed.data.tier,
      category: parsed.data.category,
      displayOrder: parsed.data.displayOrder,
      isFeatured: parsed.data.isFeatured,
      isPublished: parsed.data.isPublished,
    },
  });

  revalidatePath("/partners");
  revalidatePath("/admin/partners");
  revalidatePath("/admin");
  revalidatePath("/");
  return { success: true };
}

export async function updatePartnerAction(id: string, formData: FormData) {
  await requireAuth();

  const raw = {
    name: formData.get("name") as string,
    description: (formData.get("description") as string) || null,
    logoUrl: (formData.get("logoUrl") as string) || null,
    websiteUrl: (formData.get("websiteUrl") as string) || null,
    tier: (formData.get("tier") as string) || "Community Partner",
    category: (formData.get("category") as string) || "Community",
    displayOrder: formData.get("displayOrder") || 0,
    isFeatured: formData.get("isFeatured") === "on" || formData.get("isFeatured") === "true",
    isPublished: formData.get("isPublished") === "on" || formData.get("isPublished") === "true",
  };

  const parsed = PartnerSchema.safeParse(raw);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  await prisma.partner.update({
    where: { id },
    data: {
      name: parsed.data.name,
      description: parsed.data.description,
      logoUrl: parsed.data.logoUrl,
      websiteUrl: parsed.data.websiteUrl,
      tier: parsed.data.tier,
      category: parsed.data.category,
      displayOrder: parsed.data.displayOrder,
      isFeatured: parsed.data.isFeatured,
      isPublished: parsed.data.isPublished,
    },
  });

  revalidatePath("/partners");
  revalidatePath("/admin/partners");
  revalidatePath("/admin");
  revalidatePath("/");
  return { success: true };
}

export async function togglePartnerPublishedAction(id: string, isPublished: boolean) {
  await requireAuth();

  await prisma.partner.update({
    where: { id },
    data: { isPublished },
  });

  revalidatePath("/partners");
  revalidatePath("/admin/partners");
  revalidatePath("/admin");
  revalidatePath("/");
  return { success: true };
}

export async function togglePartnerFeaturedAction(id: string, isFeatured: boolean) {
  await requireAuth();

  await prisma.partner.update({
    where: { id },
    data: { isFeatured },
  });

  revalidatePath("/partners");
  revalidatePath("/admin/partners");
  revalidatePath("/admin");
  revalidatePath("/");
  return { success: true };
}

export async function updatePartnerOrderAction(id: string, displayOrder: number) {
  await requireAuth();

  await prisma.partner.update({
    where: { id },
    data: { displayOrder },
  });

  revalidatePath("/partners");
  revalidatePath("/admin/partners");
  revalidatePath("/admin");
  revalidatePath("/");
  return { success: true };
}

export async function deletePartnerAction(id: string) {
  await requireAuth();

  await prisma.partner.delete({
    where: { id },
  });

  revalidatePath("/partners");
  revalidatePath("/admin/partners");
  revalidatePath("/admin");
  revalidatePath("/");
  return { success: true };
}
