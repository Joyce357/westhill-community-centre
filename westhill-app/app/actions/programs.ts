"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

const ProgramSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters."),
  slug: z.string().min(3, "Slug is required."),
  categoryId: z.string().min(1, "Please select a category."),
  displayLabel: z.string().optional().nullable(),
  shortDescription: z.string().min(10, "Short description is required."),
  fullDescription: z.string().min(10, "Full description is required."),
  icon: z.string().optional().nullable(),
  imageUrl: z.string().optional().nullable(),
  schedule: z.string().optional().nullable(),
  // NOTE: Program.eligibility remains in the DB schema but is intentionally unused by the admin UI.
  location: z.string().optional().nullable(),
  registrationInfo: z.string().optional().nullable(),
  isFeatured: z.boolean().default(false),
  isPublished: z.boolean().default(true),
  displayOrder: z.number().default(0),
});

function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function createProgramAction(formData: FormData) {
  await requireAuth();

  const title = (formData.get("title") as string) || "";
  const rawSlug = (formData.get("slug") as string) || generateSlug(title);

  const raw = {
    title,
    slug: rawSlug,
    categoryId: formData.get("categoryId") as string,
    displayLabel: ((formData.get("displayLabel") as string) || "").trim() || null,
    shortDescription: formData.get("shortDescription") as string,
    fullDescription: (formData.get("fullDescription") as string) || (formData.get("shortDescription") as string),
    icon: (formData.get("icon") as string) || "fas fa-folder",
    imageUrl: (formData.get("imageUrl") as string) || "/images/hero_community.png",
    schedule: (formData.get("schedule") as string) || null,
    location: (formData.get("location") as string) || null,
    registrationInfo: (formData.get("registrationInfo") as string) || null,
    isFeatured: formData.get("isFeatured") === "on" || formData.get("isFeatured") === "true",
    isPublished: formData.get("isPublished") === "on" || formData.get("isPublished") === "true",
    displayOrder: parseInt((formData.get("displayOrder") as string) || "0", 10),
  };

  const parsed = ProgramSchema.safeParse(raw);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  // Ensure unique slug
  let finalSlug = parsed.data.slug;
  const existing = await prisma.program.findUnique({ where: { slug: finalSlug } });
  if (existing) {
    finalSlug = `${finalSlug}-${Date.now().toString().slice(-4)}`;
  }

  await prisma.program.create({
    data: {
      ...parsed.data,
      slug: finalSlug,
    },
  });

  revalidatePath("/");
  revalidatePath("/programs");
  revalidatePath("/admin/programs");
  revalidatePath("/admin");
  return { success: true };
}

export async function updateProgramAction(id: string, formData: FormData) {
  await requireAuth();

  const title = (formData.get("title") as string) || "";
  const rawSlug = (formData.get("slug") as string) || generateSlug(title);

  const raw = {
    title,
    slug: rawSlug,
    categoryId: formData.get("categoryId") as string,
    displayLabel: ((formData.get("displayLabel") as string) || "").trim() || null,
    shortDescription: formData.get("shortDescription") as string,
    fullDescription: (formData.get("fullDescription") as string) || (formData.get("shortDescription") as string),
    icon: (formData.get("icon") as string) || "fas fa-folder",
    imageUrl: (formData.get("imageUrl") as string) || "/images/hero_community.png",
    schedule: (formData.get("schedule") as string) || null,
    location: (formData.get("location") as string) || null,
    registrationInfo: (formData.get("registrationInfo") as string) || null,
    isFeatured: formData.get("isFeatured") === "on" || formData.get("isFeatured") === "true",
    isPublished: formData.get("isPublished") === "on" || formData.get("isPublished") === "true",
    displayOrder: parseInt((formData.get("displayOrder") as string) || "0", 10),
  };

  const parsed = ProgramSchema.safeParse(raw);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  await prisma.program.update({
    where: { id },
    data: parsed.data,
  });

  revalidatePath("/");
  revalidatePath("/programs");
  revalidatePath("/admin/programs");
  revalidatePath("/admin");
  return { success: true };
}

export async function toggleProgramPublishedAction(id: string, isPublished: boolean) {
  await requireAuth();

  await prisma.program.update({
    where: { id },
    data: { isPublished },
  });

  revalidatePath("/");
  revalidatePath("/programs");
  revalidatePath("/admin/programs");
  revalidatePath("/admin");
  return { success: true };
}

export async function deleteProgramAction(id: string) {
  await requireAuth();

  await prisma.program.delete({
    where: { id },
  });

  revalidatePath("/");
  revalidatePath("/programs");
  revalidatePath("/admin/programs");
  revalidatePath("/admin");
  return { success: true };
}
