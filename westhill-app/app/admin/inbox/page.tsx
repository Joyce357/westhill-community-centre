import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import InboxManager, {
  ContactSubmissionItem,
  VolunteerApplicationItem,
  ProgramInquiryItem,
  PartnershipInquiryItem,
  EventRsvpItem,
  NewsletterItem,
} from "@/components/admin/InboxManager";

export default async function AdminInboxPage() {
  await requireAuth();

  let contacts: ContactSubmissionItem[] = [];
  let volunteers: VolunteerApplicationItem[] = [];
  let programInquiries: ProgramInquiryItem[] = [];
  let partnerships: PartnershipInquiryItem[] = [];
  let rsvps: EventRsvpItem[] = [];
  let newsletters: NewsletterItem[] = [];

  try {
    if (process.env.DATABASE_URL) {
      const [c, v, p, part, r, n] = await Promise.all([
        prisma.contactSubmission.findMany({ orderBy: { createdAt: "desc" } }),
        prisma.volunteerApplication.findMany({ orderBy: { createdAt: "desc" } }),
        prisma.programInquiry.findMany({ orderBy: { createdAt: "desc" } }),
        prisma.partnershipInquiry.findMany({ orderBy: { createdAt: "desc" } }),
        prisma.eventRsvp.findMany({ orderBy: { createdAt: "desc" } }),
        prisma.newsletterSubscription.findMany({ orderBy: { createdAt: "desc" } }),
      ]);

      contacts = c;
      volunteers = v;
      programInquiries = p;
      partnerships = part;
      rsvps = r;
      newsletters = n;
    }
  } catch (err) {
    console.warn("Using fallback/empty inbox submissions data:", err);
  }

  return (
    <InboxManager
      contacts={contacts}
      volunteers={volunteers}
      programInquiries={programInquiries}
      partnerships={partnerships}
      rsvps={rsvps}
      newsletters={newsletters}
    />
  );
}
