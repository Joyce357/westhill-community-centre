"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

const HomepageContentSchema = z.object({
  heroEyebrow: z.string().optional().nullable(),
  heroTitle: z.string().optional().nullable(),
  heroDescription: z.string().optional().nullable(),
  heroPrimaryCtaLabel: z.string().optional().nullable(),
  heroPrimaryCtaUrl: z.string().optional().nullable(),
  heroSecondaryCtaLabel: z.string().optional().nullable(),
  heroSecondaryCtaUrl: z.string().optional().nullable(),
  heroGalleryItemId: z.string().optional().nullable(),

  welcomeEyebrow: z.string().optional().nullable(),
  welcomeHeading: z.string().optional().nullable(),
  welcomeDescription: z.string().optional().nullable(),
  welcomeGalleryItemId: z.string().optional().nullable(),

  programsEyebrow: z.string().optional().nullable(),
  programsHeading: z.string().optional().nullable(),
  programsDescription: z.string().optional().nullable(),

  milestoneEyebrow: z.string().optional().nullable(),
  milestoneTitle: z.string().optional().nullable(),
  milestoneDateText: z.string().optional().nullable(),
  milestoneDescription: z.string().optional().nullable(),
  milestoneCtaLabel: z.string().optional().nullable(),
  milestoneCtaUrl: z.string().optional().nullable(),
  milestoneGalleryItemId: z.string().optional().nullable(),

  ctaEyebrow: z.string().optional().nullable(),
  ctaHeading: z.string().optional().nullable(),
  ctaDescription: z.string().optional().nullable(),
  ctaButton1Label: z.string().optional().nullable(),
  ctaButton1Url: z.string().optional().nullable(),
  ctaButton2Label: z.string().optional().nullable(),
  ctaButton2Url: z.string().optional().nullable(),
  ctaButton3Label: z.string().optional().nullable(),
  ctaButton3Url: z.string().optional().nullable(),

  seoTitle: z.string().optional().nullable(),
  seoDescription: z.string().optional().nullable(),
  seoOgGalleryItemId: z.string().optional().nullable(),
});

export async function updateHomepageContentAction(formData: FormData) {
  await requireAuth();

  const getClean = (key: string): string | null => {
    const val = formData.get(key);
    if (typeof val === "string") {
      const trimmed = val.trim();
      return trimmed.length > 0 ? trimmed : null;
    }
    return null;
  };

  const rawData = {
    heroEyebrow: getClean("heroEyebrow"),
    heroTitle: getClean("heroTitle"),
    heroDescription: getClean("heroDescription"),
    heroPrimaryCtaLabel: getClean("heroPrimaryCtaLabel"),
    heroPrimaryCtaUrl: getClean("heroPrimaryCtaUrl"),
    heroSecondaryCtaLabel: getClean("heroSecondaryCtaLabel"),
    heroSecondaryCtaUrl: getClean("heroSecondaryCtaUrl"),
    heroGalleryItemId: getClean("heroGalleryItemId"),

    welcomeEyebrow: getClean("welcomeEyebrow"),
    welcomeHeading: getClean("welcomeHeading"),
    welcomeDescription: getClean("welcomeDescription"),
    welcomeGalleryItemId: getClean("welcomeGalleryItemId"),

    programsEyebrow: getClean("programsEyebrow"),
    programsHeading: getClean("programsHeading"),
    programsDescription: getClean("programsDescription"),

    milestoneEyebrow: getClean("milestoneEyebrow"),
    milestoneTitle: getClean("milestoneTitle"),
    milestoneDateText: getClean("milestoneDateText"),
    milestoneDescription: getClean("milestoneDescription"),
    milestoneCtaLabel: getClean("milestoneCtaLabel"),
    milestoneCtaUrl: getClean("milestoneCtaUrl"),
    milestoneGalleryItemId: getClean("milestoneGalleryItemId"),

    ctaEyebrow: getClean("ctaEyebrow"),
    ctaHeading: getClean("ctaHeading"),
    ctaDescription: getClean("ctaDescription"),
    ctaButton1Label: getClean("ctaButton1Label"),
    ctaButton1Url: getClean("ctaButton1Url"),
    ctaButton2Label: getClean("ctaButton2Label"),
    ctaButton2Url: getClean("ctaButton2Url"),
    ctaButton3Label: getClean("ctaButton3Label"),
    ctaButton3Url: getClean("ctaButton3Url"),

    seoTitle: getClean("seoTitle"),
    seoDescription: getClean("seoDescription"),
    seoOgGalleryItemId: getClean("seoOgGalleryItemId"),
  };

  const parsed = HomepageContentSchema.safeParse(rawData);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message || "Validation error" };
  }

  try {
    await prisma.homepageContent.upsert({
      where: { id: "singleton" },
      update: parsed.data,
      create: {
        id: "singleton",
        ...parsed.data,
      },
    });

    revalidatePath("/");
    revalidatePath("/admin/homepage");
    revalidatePath("/admin");

    return { success: true };
  } catch (err: unknown) {
    console.error("Failed to update homepage content:", err);
    const message = err instanceof Error ? err.message : "Failed to save homepage content";
    return { success: false, error: message };
  }
}
