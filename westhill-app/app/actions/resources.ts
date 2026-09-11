"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

const ResourceItemSchema = z.object({
  title: z.string().min(2, "Title is required (minimum 2 characters)."),
  description: z.string().optional().nullable(),
  resourceType: z.enum(["DOCUMENT", "EXTERNAL_LINK", "GUIDE"]).default("DOCUMENT"),
  url: z.string().min(1, "URL or document file path is required."),
  fileSize: z.string().optional().nullable(),
  category: z.string().optional().nullable().default("Downloads"),
  icon: z.string().optional().nullable().default("fas fa-file-pdf"),
  displayOrder: z.coerce.number().default(0),
  isPublished: z.boolean().default(true),
});

export async function createResourceAction(formData: FormData) {
  await requireAuth();

  const raw = {
    title: formData.get("title") as string,
    description: (formData.get("description") as string) || null,
    resourceType: (formData.get("resourceType") as string) || "DOCUMENT",
    url: formData.get("url") as string,
    fileSize: (formData.get("fileSize") as string) || null,
    category: (formData.get("category") as string) || "Downloads",
    icon: (formData.get("icon") as string) || "fas fa-file-pdf",
    displayOrder: formData.get("displayOrder") || 0,
    isPublished: formData.get("isPublished") === "on" || formData.get("isPublished") === "true",
  };

  const parsed = ResourceItemSchema.safeParse(raw);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  await prisma.resourceItem.create({
    data: {
      title: parsed.data.title,
      description: parsed.data.description,
      resourceType: parsed.data.resourceType,
      url: parsed.data.url,
      fileSize: parsed.data.fileSize,
      category: parsed.data.category,
      icon: parsed.data.icon,
      displayOrder: parsed.data.displayOrder,
      isPublished: parsed.data.isPublished,
    },
  });

  revalidatePath("/resources");
  revalidatePath("/admin/resources");
  revalidatePath("/admin");
  return { success: true };
}

export async function updateResourceAction(id: string, formData: FormData) {
  await requireAuth();

  const raw = {
    title: formData.get("title") as string,
    description: (formData.get("description") as string) || null,
    resourceType: (formData.get("resourceType") as string) || "DOCUMENT",
    url: formData.get("url") as string,
    fileSize: (formData.get("fileSize") as string) || null,
    category: (formData.get("category") as string) || "Downloads",
    icon: (formData.get("icon") as string) || "fas fa-file-pdf",
    displayOrder: formData.get("displayOrder") || 0,
    isPublished: formData.get("isPublished") === "on" || formData.get("isPublished") === "true",
  };

  const parsed = ResourceItemSchema.safeParse(raw);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  await prisma.resourceItem.update({
    where: { id },
    data: {
      title: parsed.data.title,
      description: parsed.data.description,
      resourceType: parsed.data.resourceType,
      url: parsed.data.url,
      fileSize: parsed.data.fileSize,
      category: parsed.data.category,
      icon: parsed.data.icon,
      displayOrder: parsed.data.displayOrder,
      isPublished: parsed.data.isPublished,
    },
  });

  revalidatePath("/resources");
  revalidatePath("/admin/resources");
  revalidatePath("/admin");
  return { success: true };
}

export async function toggleResourcePublishedAction(id: string, isPublished: boolean) {
  await requireAuth();

  await prisma.resourceItem.update({
    where: { id },
    data: { isPublished },
  });

  revalidatePath("/resources");
  revalidatePath("/admin/resources");
  revalidatePath("/admin");
  return { success: true };
}

export async function updateResourceOrderAction(id: string, displayOrder: number) {
  await requireAuth();

  await prisma.resourceItem.update({
    where: { id },
    data: { displayOrder },
  });

  revalidatePath("/resources");
  revalidatePath("/admin/resources");
  revalidatePath("/admin");
  return { success: true };
}

export async function deleteResourceAction(id: string) {
  await requireAuth();

  await prisma.resourceItem.delete({
    where: { id },
  });

  revalidatePath("/resources");
  revalidatePath("/admin/resources");
  revalidatePath("/admin");
  return { success: true };
}
