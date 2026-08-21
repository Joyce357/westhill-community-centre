"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

const EventSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters."),
  slug: z.string().min(3, "Slug is required."),
  description: z.string().min(10, "Description is required."),
  eventDate: z.string().min(1, "Event date is required."),
  startTime: z.string().min(1, "Start time is required."),
  endTime: z.string().optional().nullable(),
  location: z.string().min(3, "Location is required."),
  category: z.string().min(1, "Category is required."),
  imageUrl: z.string().optional().nullable(),
  flyerUrl: z.string().optional().nullable(),
  rsvpEnabled: z.boolean().default(true),
  isFeatured: z.boolean().default(false),
  isPublished: z.boolean().default(true),
});

function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function createEventAction(formData: FormData) {
  await requireAuth();

  const title = (formData.get("title") as string) || "";
  const rawSlug = (formData.get("slug") as string) || generateSlug(title);

  const raw = {
    title,
    slug: rawSlug,
    description: formData.get("description") as string,
    eventDate: formData.get("eventDate") as string,
    startTime: formData.get("startTime") as string,
    endTime: (formData.get("endTime") as string) || null,
    location: formData.get("location") as string,
    category: (formData.get("category") as string) || "Community Events",
    imageUrl: (formData.get("imageUrl") as string) || "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&q=80&w=600",
    flyerUrl: (formData.get("flyerUrl") as string) || null,
    rsvpEnabled: formData.get("rsvpEnabled") === "on" || formData.get("rsvpEnabled") === "true",
    isFeatured: formData.get("isFeatured") === "on" || formData.get("isFeatured") === "true",
    isPublished: formData.get("isPublished") === "on" || formData.get("isPublished") === "true",
  };

  const parsed = EventSchema.safeParse(raw);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  let finalSlug = parsed.data.slug;
  const existing = await prisma.event.findUnique({ where: { slug: finalSlug } });
  if (existing) {
    finalSlug = `${finalSlug}-${Date.now().toString().slice(-4)}`;
  }

  await prisma.event.create({
    data: {
      ...parsed.data,
      slug: finalSlug,
      eventDate: new Date(parsed.data.eventDate),
    },
  });

  revalidatePath("/");
  revalidatePath("/events");
  revalidatePath("/admin/events");
  revalidatePath("/admin");
  return { success: true };
}

export async function updateEventAction(id: string, formData: FormData) {
  await requireAuth();

  const title = (formData.get("title") as string) || "";
  const rawSlug = (formData.get("slug") as string) || generateSlug(title);

  const raw = {
    title,
    slug: rawSlug,
    description: formData.get("description") as string,
    eventDate: formData.get("eventDate") as string,
    startTime: formData.get("startTime") as string,
    endTime: (formData.get("endTime") as string) || null,
    location: formData.get("location") as string,
    category: (formData.get("category") as string) || "Community Events",
    imageUrl: (formData.get("imageUrl") as string) || "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&q=80&w=600",
    flyerUrl: (formData.get("flyerUrl") as string) || null,
    rsvpEnabled: formData.get("rsvpEnabled") === "on" || formData.get("rsvpEnabled") === "true",
    isFeatured: formData.get("isFeatured") === "on" || formData.get("isFeatured") === "true",
    isPublished: formData.get("isPublished") === "on" || formData.get("isPublished") === "true",
  };

  const parsed = EventSchema.safeParse(raw);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  await prisma.event.update({
    where: { id },
    data: {
      ...parsed.data,
      eventDate: new Date(parsed.data.eventDate),
    },
  });

  revalidatePath("/");
  revalidatePath("/events");
  revalidatePath("/admin/events");
  revalidatePath("/admin");
  return { success: true };
}

export async function toggleEventPublishedAction(id: string, isPublished: boolean) {
  await requireAuth();

  await prisma.event.update({
    where: { id },
    data: { isPublished },
  });

  revalidatePath("/");
  revalidatePath("/events");
  revalidatePath("/admin/events");
  revalidatePath("/admin");
  return { success: true };
}

export async function deleteEventAction(id: string) {
  await requireAuth();

  await prisma.event.delete({
    where: { id },
  });

  revalidatePath("/");
  revalidatePath("/events");
  revalidatePath("/admin/events");
  revalidatePath("/admin");
  return { success: true };
}
