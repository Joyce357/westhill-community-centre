import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import EventsGrid from "@/components/EventsGrid";
import EventCalendar from "@/components/EventCalendar";
import { getPublishedEvents, getSiteSettings } from "@/lib/queries";

import { getCanonicalUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Events Calendar & Community Gatherings",
  description:
    "Upcoming community events, youth leadership workshops, job fairs, and neighbourhood celebrations at West Hill Community Centre in Scarborough.",
  alternates: {
    canonical: getCanonicalUrl("/events"),
  },
  openGraph: {
    title: "Events Calendar & Community Gatherings | West Hill Community Centre",
    description:
      "Upcoming community events, youth leadership workshops, job fairs, and neighbourhood celebrations at West Hill Community Centre in Scarborough.",
    url: getCanonicalUrl("/events"),
  },
};

export default async function EventsPage() {
  const [events, settings] = await Promise.all([
    getPublishedEvents(),
    getSiteSettings(),
  ]);

  return (
    <>
      <PageHero
        title="Events Calendar"
        subtitle="Connect with neighbours, share skills, and participate in community-led sessions in East Scarborough."
      />

      <section className="section" aria-label="Events Listing">
        <div className="container">
          <div className="section-header active" style={{ opacity: 1, transform: "none" }}>
            <h2>Upcoming Community Events</h2>
            <p>Check out our scheduled neighborhood events and click &quot;View Details&quot; to view program information.</p>
          </div>

          {/* Visual Events Grid */}
          <EventsGrid events={events} />

          {/* Calendar section header */}
          <div className="section-header active" style={{ marginBottom: "40px", opacity: 1, transform: "none" }}>
            <h2>Interactive Monthly Planner</h2>
            <p>Select any highlighted date below to view scheduled activities and support sessions happening that day.</p>
          </div>

          {/* Interactive Calendar */}
          <EventCalendar events={events} />

          {/* RSVP & Attendance Information Section */}
          <div className="section-alt standard-card-container">
            <div className="grid-2" style={{ gap: "40px", alignItems: "center" }}>
              <div>
                <h3 style={{ color: "var(--wh-blue-primary)", fontSize: "1.8rem", marginBottom: "20px" }}>
                  Attending an Event
                </h3>
                <p style={{ lineHeight: 1.6, marginBottom: 20, color: "var(--wh-text-body)" }}>
                  All West Hill Community Centre community events, celebrations, job fairs, and workshops are completely free and open to all Scarborough residents.
                </p>
                <p style={{ fontSize: "0.9rem", color: "var(--wh-text-muted)" }}>
                  <i className="fas fa-info-circle" style={{ color: "var(--wh-orange-accent)", marginRight: "8px" }}></i>
                  Free parking and accessible entrances are available at our Unit 4, 4234 Lawrence Ave East location.
                </p>
              </div>

              <div>
                <div
                  style={{
                    backgroundColor: "var(--wh-bg-white)",
                    borderRadius: "var(--wh-radius-md)",
                    padding: "30px",
                    boxShadow: "var(--wh-shadow-soft)",
                    border: "1px solid rgba(15, 59, 106, 0.05)",
                  }}
                >
                  <h4 style={{ color: "var(--wh-blue-primary)", fontSize: "1.2rem", marginBottom: "12px", fontFamily: "var(--wh-font-primary)" }}>
                    Event Inquiries & Group Registrations
                  </h4>
                  <p style={{ fontSize: "0.88rem", color: "var(--wh-text-body)", marginBottom: "18px", lineHeight: 1.5 }}>
                    To register a community group or confirm specific accessibility accommodations for any scheduled event, please contact our community coordinator:
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "0.88rem" }}>
                    <div>
                      <strong>Email:</strong> <a href={`mailto:${settings.primaryEmail}`} style={{ color: "var(--wh-blue-primary)", fontWeight: 600 }}>{settings.primaryEmail}</a>
                    </div>
                    <div>
                      <strong>Phone:</strong> <a href={`tel:${settings.phone.replace(/[^0-9]/g, "")}`} style={{ color: "var(--wh-blue-primary)", fontWeight: 600 }}>{settings.phone}</a>
                    </div>
                    <div>
                      <strong>Address:</strong> {settings.address}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
