"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export interface SubmissionResponse {
  success: boolean;
  message?: string;
  error?: string;
}

// -------------------------------------------------------------
// HELPER: Honeypot Anti-Spam Check
// -------------------------------------------------------------
function isSpamSubmission(formData: FormData): boolean {
  // If the hidden honeypot field is filled out by an automated bot
  const honeypot = formData.get("bot_field") || formData.get("website_hp");
  return typeof honeypot === "string" && honeypot.trim().length > 0;
}

// -------------------------------------------------------------
// 1. CONTACT SUBMISSION
// -------------------------------------------------------------

const ContactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name (minimum 2 characters).").max(100, "Name cannot exceed 100 characters."),
  email: z.string().trim().email("Please enter a valid email address.").max(150, "Email cannot exceed 150 characters."),
  phone: z.string().trim().max(30, "Phone cannot exceed 30 characters.").optional(),
  subject: z.string().trim().min(2, "Subject is required (minimum 2 characters).").max(150, "Subject cannot exceed 150 characters."),
  message: z.string().trim().min(10, "Message must be at least 10 characters.").max(3000, "Message cannot exceed 3000 characters."),
});

export async function submitContactAction(formData: FormData): Promise<SubmissionResponse> {
  try {
    if (isSpamSubmission(formData)) {
      return { success: true, message: "Thank you! Your message has been received." };
    }

    const raw = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone") || undefined,
      subject: formData.get("subject"),
      message: formData.get("message"),
    };

    const parsed = ContactSchema.safeParse(raw);
    if (!parsed.success) {
      return { success: false, error: parsed.error.issues[0].message };
    }

    if (!process.env.DATABASE_URL) {
      return {
        success: false,
        error: "Database connection is unavailable. Please email info@westhillcommunitycentre.ca directly.",
      };
    }

    await prisma.contactSubmission.create({
      data: {
        name: parsed.data.name,
        email: parsed.data.email.toLowerCase(),
        phone: parsed.data.phone || null,
        subject: parsed.data.subject,
        message: parsed.data.message,
      },
    });

    revalidatePath("/admin/inbox");
    return {
      success: true,
      message: "Thank you! Your message has been received and routed to our team. We will be in touch shortly.",
    };
  } catch (error) {
    const errMessage = error instanceof Error ? error.message : "Database error";
    console.error("submitContactAction failed:", errMessage);
    return {
      success: false,
      error: "An unexpected database error occurred while submitting your message. Please try again or email us directly.",
    };
  }
}

// -------------------------------------------------------------
// 2. VOLUNTEER APPLICATION
// -------------------------------------------------------------

const VolunteerSchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your full name (minimum 2 characters).").max(100, "Name cannot exceed 100 characters."),
  email: z.string().trim().email("Please enter a valid email address.").max(150, "Email cannot exceed 150 characters."),
  phone: z.string().trim().min(7, "Please provide a contact phone number (minimum 7 characters).").max(30, "Phone cannot exceed 30 characters."),
  roles: z.string().trim().min(1, "Please select at least one area of interest.").max(200, "Role selection is too long."),
  availability: z.string().trim().min(2, "Please indicate your weekly availability.").max(300, "Availability details cannot exceed 300 characters."),
  experience: z.string().trim().max(3000, "Experience details cannot exceed 3000 characters.").optional(),
  interests: z.string().trim().max(1000, "Interests cannot exceed 1000 characters.").optional(),
});

export async function submitVolunteerAction(formData: FormData): Promise<SubmissionResponse> {
  try {
    if (isSpamSubmission(formData)) {
      return { success: true, message: "Thank you! Your application has been received." };
    }

    const raw = {
      fullName: formData.get("fullName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      roles: formData.get("roles"),
      availability: formData.get("availability"),
      experience: formData.get("experience") || undefined,
      interests: formData.get("interests") || undefined,
    };

    const parsed = VolunteerSchema.safeParse(raw);
    if (!parsed.success) {
      return { success: false, error: parsed.error.issues[0].message };
    }

    if (!process.env.DATABASE_URL) {
      return {
        success: false,
        error: "Database connection is unavailable. Please email volunteer@westhillcommunity.org directly.",
      };
    }

    await prisma.volunteerApplication.create({
      data: {
        fullName: parsed.data.fullName,
        email: parsed.data.email.toLowerCase(),
        phone: parsed.data.phone,
        roles: parsed.data.roles,
        availability: parsed.data.availability,
        experience: parsed.data.experience || null,
        interests: parsed.data.interests || null,
      },
    });

    revalidatePath("/admin/inbox");
    return {
      success: true,
      message: "Thank you! Your volunteer application has been submitted. Our volunteer coordinator will review your profile and reach out within 3 business days.",
    };
  } catch (error) {
    const errMessage = error instanceof Error ? error.message : "Database error";
    console.error("submitVolunteerAction failed:", errMessage);
    return {
      success: false,
      error: "An unexpected error occurred while processing your application. Please try again or email our volunteer desk.",
    };
  }
}

// -------------------------------------------------------------
// 3. PROGRAM INQUIRY / REGISTRATION ASSISTANCE
// -------------------------------------------------------------

const ProgramInquirySchema = z.object({
  programId: z.string().trim().max(100).optional(),
  programTitle: z.string().trim().min(1, "Program title is required.").max(200, "Program title cannot exceed 200 characters."),
  fullName: z.string().trim().min(2, "Please enter your full name.").max(100, "Name cannot exceed 100 characters."),
  email: z.string().trim().email("Please enter a valid email address.").max(150, "Email cannot exceed 150 characters."),
  phone: z.string().trim().min(7, "Please enter your phone number (min 7 digits).").max(30, "Phone cannot exceed 30 characters."),
  participantAge: z.string().trim().max(100, "Participant age cannot exceed 100 characters.").optional(),
  message: z.string().trim().max(3000, "Message cannot exceed 3000 characters.").optional(),
});

export async function submitProgramInquiryAction(formData: FormData): Promise<SubmissionResponse> {
  try {
    if (isSpamSubmission(formData)) {
      return { success: true, message: "Thank you! Your inquiry has been registered." };
    }

    const raw = {
      programId: formData.get("programId") || undefined,
      programTitle: formData.get("programTitle"),
      fullName: formData.get("fullName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      participantAge: formData.get("participantAge") || undefined,
      message: formData.get("message") || undefined,
    };

    const parsed = ProgramInquirySchema.safeParse(raw);
    if (!parsed.success) {
      return { success: false, error: parsed.error.issues[0].message };
    }

    if (!process.env.DATABASE_URL) {
      return {
        success: false,
        error: "Database connection is unavailable. Please contact programs@westhillcommunitycentre.ca directly.",
      };
    }

    await prisma.programInquiry.create({
      data: {
        programId: parsed.data.programId || null,
        programTitle: parsed.data.programTitle,
        fullName: parsed.data.fullName,
        email: parsed.data.email.toLowerCase(),
        phone: parsed.data.phone,
        participantAge: parsed.data.participantAge || null,
        message: parsed.data.message || null,
      },
    });

    revalidatePath("/admin/inbox");
    return {
      success: true,
      message: "Thank you! Your program inquiry has been registered. Our program intake coordinator will contact you to confirm registration steps.",
    };
  } catch (error) {
    const errMessage = error instanceof Error ? error.message : "Database error";
    console.error("submitProgramInquiryAction failed:", errMessage);
    return {
      success: false,
      error: "An unexpected error occurred while saving your inquiry. Please try again.",
    };
  }
}

// -------------------------------------------------------------
// 4. PARTNERSHIP PROPOSAL
// -------------------------------------------------------------

const PartnershipSchema = z.object({
  organization: z.string().trim().min(2, "Organization name is required (min 2 characters).").max(150, "Organization name cannot exceed 150 characters."),
  contactPerson: z.string().trim().min(2, "Contact person name is required (min 2 characters).").max(100, "Contact person cannot exceed 100 characters."),
  email: z.string().trim().email("Please enter a valid email address.").max(150, "Email cannot exceed 150 characters."),
  phone: z.string().trim().max(30, "Phone cannot exceed 30 characters.").optional(),
  tierInterest: z.string().trim().max(100).optional(),
  proposalDetails: z.string().trim().min(10, "Please provide brief details about your partnership idea (min 10 characters).").max(4000, "Proposal cannot exceed 4000 characters."),
});

export async function submitPartnershipAction(formData: FormData): Promise<SubmissionResponse> {
  try {
    if (isSpamSubmission(formData)) {
      return { success: true, message: "Thank you! Your proposal has been received." };
    }

    const raw = {
      organization: formData.get("organization"),
      contactPerson: formData.get("contactPerson"),
      email: formData.get("email"),
      phone: formData.get("phone") || undefined,
      tierInterest: formData.get("tierInterest") || undefined,
      proposalDetails: formData.get("proposalDetails"),
    };

    const parsed = PartnershipSchema.safeParse(raw);
    if (!parsed.success) {
      return { success: false, error: parsed.error.issues[0].message };
    }

    if (!process.env.DATABASE_URL) {
      return {
        success: false,
        error: "Database connection is unavailable. Please email partnerships directly.",
      };
    }

    await prisma.partnershipInquiry.create({
      data: {
        organization: parsed.data.organization,
        contactPerson: parsed.data.contactPerson,
        email: parsed.data.email.toLowerCase(),
        phone: parsed.data.phone || null,
        tierInterest: parsed.data.tierInterest || null,
        proposalDetails: parsed.data.proposalDetails,
      },
    });

    revalidatePath("/admin/inbox");
    return {
      success: true,
      message: "Thank you! Your partnership proposal has been submitted. Our community development desk will review your submission and connect with you.",
    };
  } catch (error) {
    const errMessage = error instanceof Error ? error.message : "Database error";
    console.error("submitPartnershipAction failed:", errMessage);
    return {
      success: false,
      error: "An unexpected error occurred while submitting your proposal. Please try again.",
    };
  }
}

// -------------------------------------------------------------
// 5. NEWSLETTER SUBSCRIPTION
// -------------------------------------------------------------

const NewsletterSchema = z.object({
  email: z.string().trim().email("Please enter a valid email address.").max(150, "Email cannot exceed 150 characters."),
});

export async function submitNewsletterAction(formData: FormData): Promise<SubmissionResponse> {
  try {
    if (isSpamSubmission(formData)) {
      return { success: true, message: "Thank you for subscribing!" };
    }

    const raw = { email: formData.get("email") };
    const parsed = NewsletterSchema.safeParse(raw);
    if (!parsed.success) {
      return { success: false, error: parsed.error.issues[0].message };
    }

    const email = parsed.data.email.toLowerCase();

    if (!process.env.DATABASE_URL) {
      return {
        success: false,
        error: "Database connection is unavailable. Please check back shortly.",
      };
    }

    // Check existing subscriber to handle duplicate gracefully
    const existing = await prisma.newsletterSubscription.findUnique({
      where: { email },
    });

    if (existing) {
      if (existing.isActive) {
        return {
          success: true,
          message: "You're already subscribed to West Hill Community Centre updates.",
        };
      } else {
        // Reactivate
        await prisma.newsletterSubscription.update({
          where: { email },
          data: { isActive: true },
        });
        revalidatePath("/admin/inbox");
        return {
          success: true,
          message: "Welcome back! Your subscription has been reactivated.",
        };
      }
    }

    await prisma.newsletterSubscription.create({
      data: { email, isActive: true },
    });

    revalidatePath("/admin/inbox");
    return {
      success: true,
      message: "You have been successfully subscribed to West Hill Community Centre updates!",
    };
  } catch (error) {
    const errMessage = error instanceof Error ? error.message : "Database error";
    console.error("submitNewsletterAction failed:", errMessage);
    return {
      success: false,
      error: "An unexpected error occurred while subscribing. Please try again.",
    };
  }
}

// -------------------------------------------------------------
// 6. EVENT RSVP
// -------------------------------------------------------------

const EventRsvpSchema = z.object({
  eventId: z.string().trim().max(100).optional(),
  eventTitle: z.string().trim().min(1, "Event title is required.").max(200, "Event title cannot exceed 200 characters."),
  fullName: z.string().trim().min(2, "Please enter your full name.").max(100, "Name cannot exceed 100 characters."),
  email: z.string().trim().email("Please enter a valid email address.").max(150, "Email cannot exceed 150 characters."),
  phone: z.string().trim().max(30, "Phone cannot exceed 30 characters.").optional(),
  attendeesCount: z.coerce.number().min(1, "At least 1 attendee required.").max(20, "Maximum 20 attendees per RSVP.").default(1),
  specialNotes: z.string().trim().max(1000, "Special notes cannot exceed 1000 characters.").optional(),
});

export async function submitEventRsvpAction(formData: FormData): Promise<SubmissionResponse> {
  try {
    if (isSpamSubmission(formData)) {
      return { success: true, message: "Your RSVP has been confirmed!" };
    }

    const raw = {
      eventId: formData.get("eventId") || undefined,
      eventTitle: formData.get("eventTitle"),
      fullName: formData.get("fullName"),
      email: formData.get("email"),
      phone: formData.get("phone") || undefined,
      attendeesCount: formData.get("attendeesCount") || 1,
      specialNotes: formData.get("specialNotes") || undefined,
    };

    const parsed = EventRsvpSchema.safeParse(raw);
    if (!parsed.success) {
      return { success: false, error: parsed.error.issues[0].message };
    }

    if (!process.env.DATABASE_URL) {
      return {
        success: false,
        error: "Database connection is unavailable. Please email events@westhillcommunitycentre.ca to RSVP.",
      };
    }

    await prisma.eventRsvp.create({
      data: {
        eventId: parsed.data.eventId || null,
        eventTitle: parsed.data.eventTitle,
        fullName: parsed.data.fullName,
        email: parsed.data.email.toLowerCase(),
        phone: parsed.data.phone || null,
        attendeesCount: parsed.data.attendeesCount,
        specialNotes: parsed.data.specialNotes || null,
      },
    });

    revalidatePath("/admin/inbox");
    return {
      success: true,
      message: "Your RSVP has been confirmed! We look forward to seeing you at West Hill Community Centre.",
    };
  } catch (error) {
    const errMessage = error instanceof Error ? error.message : "Database error";
    console.error("submitEventRsvpAction failed:", errMessage);
    return {
      success: false,
      error: "An unexpected error occurred while saving your RSVP. Please try again.",
    };
  }
}

// -------------------------------------------------------------
// 7. ADMIN INBOX MANAGEMENT ACTIONS
// -------------------------------------------------------------

export async function updateSubmissionStatusAction(
  type: "contact" | "volunteer" | "program" | "partnership" | "rsvp",
  id: string,
  newStatus: "UNREAD" | "READ" | "IN_PROGRESS" | "RESOLVED" | "ARCHIVED"
): Promise<SubmissionResponse> {
  try {
    await requireAuth();

    if (!process.env.DATABASE_URL) {
      return { success: true };
    }

    if (type === "contact") {
      await prisma.contactSubmission.update({ where: { id }, data: { status: newStatus } });
    } else if (type === "volunteer") {
      await prisma.volunteerApplication.update({ where: { id }, data: { status: newStatus } });
    } else if (type === "program") {
      await prisma.programInquiry.update({ where: { id }, data: { status: newStatus } });
    } else if (type === "partnership") {
      await prisma.partnershipInquiry.update({ where: { id }, data: { status: newStatus } });
    } else if (type === "rsvp") {
      await prisma.eventRsvp.update({ where: { id }, data: { status: newStatus } });
    }

    revalidatePath("/admin/inbox");
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    const errMessage = error instanceof Error ? error.message : "Auth or database error";
    console.error("updateSubmissionStatusAction failed:", errMessage);
    return { success: false, error: "Failed to update submission status." };
  }
}

export async function deleteSubmissionAction(
  type: "contact" | "volunteer" | "program" | "partnership" | "newsletter" | "rsvp",
  id: string
): Promise<SubmissionResponse> {
  try {
    await requireAuth();

    if (!process.env.DATABASE_URL) {
      return { success: true };
    }

    if (type === "contact") {
      await prisma.contactSubmission.delete({ where: { id } });
    } else if (type === "volunteer") {
      await prisma.volunteerApplication.delete({ where: { id } });
    } else if (type === "program") {
      await prisma.programInquiry.delete({ where: { id } });
    } else if (type === "partnership") {
      await prisma.partnershipInquiry.delete({ where: { id } });
    } else if (type === "newsletter") {
      await prisma.newsletterSubscription.delete({ where: { id } });
    } else if (type === "rsvp") {
      await prisma.eventRsvp.delete({ where: { id } });
    }

    revalidatePath("/admin/inbox");
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    const errMessage = error instanceof Error ? error.message : "Auth or database error";
    console.error("deleteSubmissionAction failed:", errMessage);
    return { success: false, error: "Failed to delete submission record." };
  }
}
