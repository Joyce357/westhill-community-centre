import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import EventsManager from "@/components/admin/EventsManager";
import { INITIAL_EVENTS } from "@/lib/data";

interface EventItemType {
  id: string;
  slug: string;
  title: string;
  description: string;
  eventDate: Date;
  startTime: string;
  endTime: string | null;
  location: string;
  category: string;
  imageUrl: string | null;
  flyerUrl: string | null;
  rsvpEnabled: boolean;
  isFeatured: boolean;
  isPublished: boolean;
}

export default async function AdminEventsPage() {
  await requireAuth();

  const fallbackEvents: EventItemType[] = INITIAL_EVENTS.map((e, idx) => ({
    id: e.id,
    slug: e.id,
    title: e.title,
    description: e.description,
    eventDate: new Date(e.date),
    startTime: e.time.split(" - ")[0] || e.time,
    endTime: e.time.split(" - ")[1] || null,
    location: e.location,
    category: e.category,
    imageUrl: e.image,
    flyerUrl: null,
    rsvpEnabled: true,
    isFeatured: idx < 2,
    isPublished: true,
  }));

  let events: EventItemType[] = fallbackEvents;

  try {
    if (process.env.DATABASE_URL) {
      const dbEvents = await prisma.event.findMany({
        orderBy: { eventDate: "asc" },
      });
      if (dbEvents.length > 0) events = dbEvents;
    }
  } catch (err) {
    console.warn("Using fallback events data:", err);
  }

  return <EventsManager initialEvents={events} />;
}
