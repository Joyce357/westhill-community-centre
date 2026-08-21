"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

const AnnouncementSchema = z.object({
  message: z.string().min(5, "Message must be at least 5 characters."),
  ctaText: z.string().optional().nullable(),
  ctaUrl: z.string().optional().nullable(),
  isActive: z.boolean().default(true),
  startsAt: z.string().optional().nullable(),
  expiresAt: z.string().optional().nullable(),
});

export async function createAnnouncementAction(formData: FormData) {
  await requireAuth();

  const raw = {
    message: formData.get("message") as string,
    ctaText: (formData.get("ctaText") as string) || null,
    ctaUrl: (formData.get("ctaUrl") as string) || null,
    isActive: formData.get("isActive") === "on" || formData.get("isActive") === "true",
    startsAt: (formData.get("startsAt") as string) || null,
    expiresAt: (formData.get("expiresAt") as string) || null,
  };

  const parsed = AnnouncementSchema.safeParse(raw);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  const { message, ctaText, ctaUrl, isActive, startsAt, expiresAt } = parsed.data;

  // If new announcement is active, optionally deactivate other announcements to avoid conflicting banners
  if (isActive) {
    await prisma.announcement.updateMany({
      where: { isActive: true },
      data: { isActive: false },
    });
  }

  await prisma.announcement.create({
    data: {
      message,
      ctaText,
      ctaUrl,
      isActive,
      startsAt: startsAt ? new Date(startsAt) : null,
      expiresAt: expiresAt ? new Date(expiresAt) : null,
    },
  });

  revalidatePath("/");
  revalidatePath("/admin/announcements");
  revalidatePath("/admin");
  return { success: true };
}

export async function updateAnnouncementAction(id: string, formData: FormData) {
  await requireAuth();

  const raw = {
    message: formData.get("message") as string,
    ctaText: (formData.get("ctaText") as string) || null,
    ctaUrl: (formData.get("ctaUrl") as string) || null,
    isActive: formData.get("isActive") === "on" || formData.get("isActive") === "true",
    startsAt: (formData.get("startsAt") as string) || null,
    expiresAt: (formData.get("expiresAt") as string) || null,
  };

  const parsed = AnnouncementSchema.safeParse(raw);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  const { message, ctaText, ctaUrl, isActive, startsAt, expiresAt } = parsed.data;

  if (isActive) {
    await prisma.announcement.updateMany({
      where: { id: { not: id }, isActive: true },
      data: { isActive: false },
    });
  }

  await prisma.announcement.update({
    where: { id },
    data: {
      message,
      ctaText,
      ctaUrl,
      isActive,
      startsAt: startsAt ? new Date(startsAt) : null,
      expiresAt: expiresAt ? new Date(expiresAt) : null,
    },
  });

  revalidatePath("/");
  revalidatePath("/admin/announcements");
  revalidatePath("/admin");
  return { success: true };
}

export async function toggleAnnouncementActiveAction(id: string, setActive: boolean) {
  await requireAuth();

  if (setActive) {
    await prisma.announcement.updateMany({
      where: { id: { not: id }, isActive: true },
      data: { isActive: false },
    });
  }

  await prisma.announcement.update({
    where: { id },
    data: { isActive: setActive },
  });

  revalidatePath("/");
  revalidatePath("/admin/announcements");
  revalidatePath("/admin");
  return { success: true };
}

export async function deleteAnnouncementAction(id: string) {
  await requireAuth();

  await prisma.announcement.delete({
    where: { id },
  });

  revalidatePath("/");
  revalidatePath("/admin/announcements");
  revalidatePath("/admin");
  return { success: true };
}
