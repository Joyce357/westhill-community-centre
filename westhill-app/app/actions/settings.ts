"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

const SettingsSchema = z.object({
  organizationName: z.string().min(2, "Organization name is required."),
  primaryEmail: z.string().email("Valid primary email is required."),
  volunteerEmail: z.string().optional().nullable(),
  phone: z.string().min(5, "Phone is required."),
  streetAddress: z.string().min(3, "Street address is required."),
  unit: z.string().optional().nullable(),
  city: z.string().min(2, "City is required."),
  province: z.string().min(2, "Province is required."),
  postalCode: z.string().min(3, "Postal code is required."),
  hoursWeekday: z.string().min(2, "Weekday hours are required."),
  hoursSaturday: z.string().min(2, "Saturday hours are required."),
  hoursSunday: z.string().min(2, "Sunday hours are required."),
  facebookUrl: z.string().optional().nullable(),
  instagramUrl: z.string().optional().nullable(),
  linkedinUrl: z.string().optional().nullable(),
  youtubeUrl: z.string().optional().nullable(),
});

export async function updateSiteSettingsAction(formData: FormData) {
  await requireAuth();

  const raw = {
    organizationName: formData.get("organizationName") as string,
    primaryEmail: formData.get("primaryEmail") as string,
    volunteerEmail: (formData.get("volunteerEmail") as string) || null,
    phone: formData.get("phone") as string,
    streetAddress: formData.get("streetAddress") as string,
    unit: (formData.get("unit") as string) || null,
    city: formData.get("city") as string,
    province: formData.get("province") as string,
    postalCode: formData.get("postalCode") as string,
    hoursWeekday: formData.get("hoursWeekday") as string,
    hoursSaturday: formData.get("hoursSaturday") as string,
    hoursSunday: formData.get("hoursSunday") as string,
    facebookUrl: (formData.get("facebookUrl") as string) || null,
    instagramUrl: (formData.get("instagramUrl") as string) || null,
    linkedinUrl: (formData.get("linkedinUrl") as string) || null,
    youtubeUrl: (formData.get("youtubeUrl") as string) || null,
  };

  const parsed = SettingsSchema.safeParse(raw);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  await prisma.siteSettings.upsert({
    where: { id: "singleton" },
    update: parsed.data,
    create: {
      id: "singleton",
      ...parsed.data,
    },
  });

  revalidatePath("/");
  revalidatePath("/about");
  revalidatePath("/contact");
  revalidatePath("/admin/settings");
  revalidatePath("/admin");
  return { success: true };
}
