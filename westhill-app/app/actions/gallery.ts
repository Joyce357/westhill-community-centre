"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

const GalleryItemSchema = z.object({
  title: z.string().min(2, "Title / caption must be at least 2 characters."),
  mediaType: z.enum(["IMAGE", "VIDEO"]).default("IMAGE"),
  mediaUrl: z.string().min(1, "Media URL or file path is required."),
  thumbnailUrl: z.string().optional().nullable(),
  altText: z.string().optional().nullable(),
  category: z.string().optional().nullable().default("Grand Opening Ceremony 2026"),
  displayOrder: z.coerce.number().default(0),
  isPublished: z.boolean().default(true),
});

export async function createGalleryItemAction(formData: FormData) {
  await requireAuth();

  const raw = {
    title: formData.get("title") as string,
    mediaType: (formData.get("mediaType") as string) || "IMAGE",
    mediaUrl: formData.get("mediaUrl") as string,
    thumbnailUrl: (formData.get("thumbnailUrl") as string) || null,
    altText: (formData.get("altText") as string) || null,
    category: (formData.get("category") as string) || "Grand Opening Ceremony 2026",
    displayOrder: formData.get("displayOrder") || 0,
    isPublished: formData.get("isPublished") === "on" || formData.get("isPublished") === "true",
  };

  const parsed = GalleryItemSchema.safeParse(raw);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  await prisma.galleryItem.create({
    data: {
      title: parsed.data.title,
      mediaType: parsed.data.mediaType,
      mediaUrl: parsed.data.mediaUrl,
      thumbnailUrl: parsed.data.thumbnailUrl,
      altText: parsed.data.altText || parsed.data.title,
      category: parsed.data.category,
      displayOrder: parsed.data.displayOrder,
      isPublished: parsed.data.isPublished,
    },
  });

  revalidatePath("/");
  revalidatePath("/gallery");
  revalidatePath("/programs");
  revalidatePath("/admin/gallery");
  revalidatePath("/admin");
  return { success: true };
}

async function revalidatePlacementsForGalleryItem(galleryItemId: string) {
  try {
    const placements = await prisma.siteMediaPlacement.findMany({
      where: { galleryItemId },
      select: { page: true },
    });
    for (const p of placements) {
      if (!p.page || p.page === "homepage") {
        revalidatePath("/");
      } else {
        revalidatePath("/" + p.page);
      }
    }
    revalidatePath("/admin/site-media");
  } catch {
    // Non-blocking
  }
}

export async function updateGalleryItemAction(id: string, formData: FormData) {
  await requireAuth();

  const raw = {
    title: formData.get("title") as string,
    mediaType: (formData.get("mediaType") as string) || "IMAGE",
    mediaUrl: formData.get("mediaUrl") as string,
    thumbnailUrl: (formData.get("thumbnailUrl") as string) || null,
    altText: (formData.get("altText") as string) || null,
    category: (formData.get("category") as string) || "Grand Opening Ceremony 2026",
    displayOrder: formData.get("displayOrder") || 0,
    isPublished: formData.get("isPublished") === "on" || formData.get("isPublished") === "true",
  };

  const parsed = GalleryItemSchema.safeParse(raw);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  await prisma.galleryItem.update({
    where: { id },
    data: {
      title: parsed.data.title,
      mediaType: parsed.data.mediaType,
      mediaUrl: parsed.data.mediaUrl,
      thumbnailUrl: parsed.data.thumbnailUrl,
      altText: parsed.data.altText || parsed.data.title,
      category: parsed.data.category,
      displayOrder: parsed.data.displayOrder,
      isPublished: parsed.data.isPublished,
    },
  });

  await revalidatePlacementsForGalleryItem(id);
  revalidatePath("/");
  revalidatePath("/gallery");
  revalidatePath("/programs");
  revalidatePath("/admin/gallery");
  revalidatePath("/admin");
  return { success: true };
}

export async function toggleGalleryItemPublishedAction(id: string, isPublished: boolean) {
  await requireAuth();

  await prisma.galleryItem.update({
    where: { id },
    data: { isPublished },
  });

  await revalidatePlacementsForGalleryItem(id);
  revalidatePath("/");
  revalidatePath("/gallery");
  revalidatePath("/programs");
  revalidatePath("/admin/gallery");
  revalidatePath("/admin");
  return { success: true };
}

export async function updateGalleryItemOrderAction(id: string, displayOrder: number) {
  await requireAuth();

  await prisma.galleryItem.update({
    where: { id },
    data: { displayOrder },
  });

  revalidatePath("/");
  revalidatePath("/gallery");
  revalidatePath("/programs");
  revalidatePath("/admin/gallery");
  revalidatePath("/admin");
  return { success: true };
}

export async function deleteGalleryItemAction(id: string) {
  await requireAuth();

  await revalidatePlacementsForGalleryItem(id);
  await prisma.galleryItem.delete({
    where: { id },
  });

  revalidatePath("/");
  revalidatePath("/gallery");
  revalidatePath("/programs");
  revalidatePath("/admin/gallery");
  revalidatePath("/admin");
  return { success: true };
}
