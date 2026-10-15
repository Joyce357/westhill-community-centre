"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

function revalidatePage(page: string) {
  if (!page || page === "homepage") {
    revalidatePath("/");
  } else {
    revalidatePath("/" + page);
  }
  revalidatePath("/admin/site-media");
  revalidatePath("/admin/homepage");
  revalidatePath("/admin");
}

export async function updatePlacementAction(id: string, galleryItemId: string | null) {
  await requireAuth();

  const placement = await prisma.siteMediaPlacement.findUnique({
    where: { id },
  });

  if (!placement) {
    return { success: false, error: "Placement not found." };
  }

  await prisma.siteMediaPlacement.update({
    where: { id },
    data: {
      galleryItemId: galleryItemId || null,
    },
  });

  // If this was a homepage placement that also maps to HomepageContent, keep them synchronized
  if (placement.slotKey === "homepage-welcome") {
    await prisma.homepageContent.upsert({
      where: { id: "singleton" },
      update: { welcomeGalleryItemId: galleryItemId },
      create: { id: "singleton", welcomeGalleryItemId: galleryItemId },
    });
  } else if (placement.slotKey === "homepage-milestone") {
    await prisma.homepageContent.upsert({
      where: { id: "singleton" },
      update: { milestoneGalleryItemId: galleryItemId },
      create: { id: "singleton", milestoneGalleryItemId: galleryItemId },
    });
  }

  revalidatePage(placement.page);
  return { success: true };
}

export async function addHeroSlideAction(galleryItemId: string) {
  await requireAuth();

  if (!galleryItemId) {
    return { success: false, error: "Please select an image." };
  }

  // Count existing hero slides to assign next displayOrder
  const existingSlides = await prisma.siteMediaPlacement.findMany({
    where: { slotKey: "homepage-hero-slide" },
    orderBy: { displayOrder: "asc" },
  });

  const nextOrder = existingSlides.length > 0
    ? Math.max(...existingSlides.map((s) => s.displayOrder)) + 1
    : 0;

  const newPlacement = await prisma.siteMediaPlacement.create({
    data: {
      slotKey: "homepage-hero-slide",
      page: "homepage",
      label: `Hero Slide ${nextOrder + 1}`,
      galleryItemId,
      displayOrder: nextOrder,
      isActive: true,
    },
  });

  revalidatePage("homepage");
  return { success: true, placement: newPlacement };
}

export async function removeHeroSlideAction(id: string) {
  await requireAuth();

  const slide = await prisma.siteMediaPlacement.findUnique({
    where: { id },
  });

  if (!slide || slide.slotKey !== "homepage-hero-slide") {
    return { success: false, error: "Slide not found." };
  }

  await prisma.siteMediaPlacement.delete({
    where: { id },
  });

  // Re-index remaining slides so displayOrder is sequential
  const remaining = await prisma.siteMediaPlacement.findMany({
    where: { slotKey: "homepage-hero-slide" },
    orderBy: { displayOrder: "asc" },
  });

  for (let i = 0; i < remaining.length; i++) {
    if (remaining[i].displayOrder !== i) {
      await prisma.siteMediaPlacement.update({
        where: { id: remaining[i].id },
        data: { displayOrder: i, label: `Hero Slide ${i + 1}` },
      });
    }
  }

  revalidatePage("homepage");
  return { success: true };
}

export async function reorderHeroSlidesAction(orderedIds: string[]) {
  await requireAuth();

  if (!Array.isArray(orderedIds) || orderedIds.length === 0) {
    return { success: false, error: "Invalid slide order array." };
  }

  await prisma.$transaction(
    orderedIds.map((id, index) =>
      prisma.siteMediaPlacement.update({
        where: { id },
        data: {
          displayOrder: index,
          label: `Hero Slide ${index + 1}`,
        },
      })
    )
  );

  revalidatePage("homepage");
  return { success: true };
}
