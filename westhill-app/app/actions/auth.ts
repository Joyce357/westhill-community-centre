"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { verifyPassword, createSession, logout } from "@/lib/auth";

const LoginSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(1, "Password is required."),
});

export interface ActionResponse {
  success: boolean;
  error?: string;
}

export async function loginAction(
  prevState: ActionResponse | null | FormData,
  formData?: FormData
): Promise<ActionResponse> {
  const actualFormData =
    formData instanceof FormData
      ? formData
      : prevState instanceof FormData
      ? prevState
      : null;

  if (!actualFormData) {
    return { success: false, error: "Invalid form submission." };
  }

  try {
    const rawData = {
      email: actualFormData.get("email"),
      password: actualFormData.get("password"),
    };

    const parsed = LoginSchema.safeParse(rawData);
    if (!parsed.success) {
      return { success: false, error: parsed.error.issues[0].message };
    }

    const { email, password } = parsed.data;
    const cleanEmail = email.toLowerCase().trim();

    let authenticated = false;

    // 1. Try finding user in database
    try {
      if (process.env.DATABASE_URL) {
        const user = await prisma.user.findUnique({
          where: { email: cleanEmail },
        });

        if (user) {
          const isValid = await verifyPassword(password, user.passwordHash);
          if (!isValid) {
            return { success: false, error: "Invalid email or password." };
          }

          await createSession({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
          });

          authenticated = true;
        }
      }
    } catch (dbError) {
      console.warn("Database lookup fallback to bootstrap credentials:", dbError);
    }

    // 2. Development & Initial Bootstrap Administrator check
    if (!authenticated) {
      const bootstrapEmail = (
        process.env.INITIAL_ADMIN_EMAIL || "admin@westhillcommunitycentre.ca"
      )
        .toLowerCase()
        .trim();
      const bootstrapPassword =
        process.env.INITIAL_ADMIN_PASSWORD || "WestHill2026!Admin";

      if (cleanEmail === bootstrapEmail && password === bootstrapPassword) {
        await createSession({
          id: "bootstrap-admin-id",
          name: "West Hill Administrator",
          email: bootstrapEmail,
          role: "ADMIN",
        });

        authenticated = true;
      }
    }

    if (!authenticated) {
      return { success: false, error: "Invalid email or password." };
    }

    // Successfully authenticated: redirect to /admin dashboard
    redirect("/admin");
  } catch (error) {
    // Re-throw redirect errors so Next.js performs navigation
    if (
      error &&
      typeof error === "object" &&
      "digest" in error &&
      String((error as { digest?: unknown }).digest).startsWith("NEXT_REDIRECT")
    ) {
      throw error;
    }
    console.error("Login action error:", error);
    return {
      success: false,
      error: "An unexpected error occurred during sign-in. Please try again.",
    };
  }
}

export async function logoutAction(): Promise<void> {
  await logout();
}
