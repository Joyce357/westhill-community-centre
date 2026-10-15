import Link from "next/link";
import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function AdminDashboardPage() {
  const session = await requireAuth();

  // Query real stats from database with fallback
  const now = new Date();

  let totalPrograms = 10;
  let publishedPrograms = 10;
  let totalEvents = 5;
  let upcomingEvents = 4;
  let totalUnreadSubmissions = 0;
  let activeAnnouncement: { message: string } | null = { message: "Summer Youth Programs registration is now open!" };
  let recentPrograms: Array<{ id: string; title: string; isFeatured: boolean; isPublished: boolean; category: { name: string } }> = [
    { id: "seniors-support", title: "West Hill Seniors Program", isFeatured: true, isPublished: true, category: { name: "Support Services" } },
    { id: "youth-leadership", title: "Youth Development & Leadership", isFeatured: true, isPublished: true, category: { name: "Youth Services" } },
    { id: "women-family", title: "Women’s Wellness Program", isFeatured: false, isPublished: true, category: { name: "Family Services" } },
  ];
  let recentEvents: Array<{ id: string; title: string; eventDate: Date; startTime: string; isPublished: boolean }> = [
    { id: "westhill-day", title: "West Hill Day: Celebrating Community Together", eventDate: new Date("2026-06-20"), startTime: "11:00 AM", isPublished: true },
    { id: "job-fair", title: "Community Job Fair & Networking", eventDate: new Date("2026-06-22"), startTime: "10:00 AM", isPublished: true },
  ];

  try {
    if (process.env.DATABASE_URL) {
      const [
        tp,
        pp,
        te,
        ue,
        aa,
        rp,
        re,
        unContact,
        unVol,
        unProg,
        unPart,
        unRsvp,
      ] = await Promise.all([
        prisma.program.count(),
        prisma.program.count({ where: { isPublished: true } }),
        prisma.event.count(),
        prisma.event.count({ where: { eventDate: { gte: now }, isPublished: true } }),
        prisma.announcement.findFirst({ where: { isActive: true } }),
        prisma.program.findMany({
          orderBy: { updatedAt: "desc" },
          take: 5,
          include: { category: true },
        }),
        prisma.event.findMany({
          orderBy: { eventDate: "asc" },
          take: 5,
        }),
        prisma.contactSubmission.count({ where: { status: "UNREAD" } }),
        prisma.volunteerApplication.count({ where: { status: "UNREAD" } }),
        prisma.programInquiry.count({ where: { status: "UNREAD" } }),
        prisma.partnershipInquiry.count({ where: { status: "UNREAD" } }),
        prisma.eventRsvp.count({ where: { status: "UNREAD" } }),
      ]);
      totalPrograms = tp;
      publishedPrograms = pp;
      totalEvents = te;
      upcomingEvents = ue;
      activeAnnouncement = aa;
      recentPrograms = rp;
      recentEvents = re;
      totalUnreadSubmissions = unContact + unVol + unProg + unPart + unRsvp;
    }
  } catch (err) {
    console.warn("Using initial catalog stats:", err);
  }

  return (
    <div>
      {/* Welcome Banner */}
      <div
        style={{
          backgroundColor: "var(--wh-navy)",
          borderRadius: "var(--wh-radius-md)",
          padding: "24px 30px",
          color: "white",
          marginBottom: "28px",
          boxShadow: "var(--wh-shadow-soft)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        <div>
          <h1 style={{ color: "white", fontSize: "1.55rem", marginBottom: "6px", fontWeight: 700 }}>
            Welcome back, {session.name}
          </h1>
          <p style={{ color: "var(--wh-pale-sky)", fontSize: "0.92rem", margin: 0 }}>
            Manage programs, events, announcements, and organization details across the West Hill public website.
          </p>
        </div>

        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <Link
            href="/admin/inbox"
            className="btn btn-primary"
            style={{ padding: "8px 16px", fontSize: "0.85rem" }}
          >
            <i className="fas fa-inbox" style={{ marginRight: "6px" }}></i> View Inbox ({totalUnreadSubmissions})
          </Link>
          <Link
            href="/admin/events"
            className="btn btn-outline-white"
            style={{ padding: "8px 16px", fontSize: "0.85rem" }}
          >
            <i className="fas fa-plus" style={{ marginRight: "6px" }}></i> Add Event
          </Link>
        </div>
      </div>

      {/* Metrics Cards Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px",
          marginBottom: "32px",
        }}
      >
        {/* Metric 1: Inboxes */}
        <div
          style={{
            backgroundColor: "var(--wh-bg-white)",
            borderRadius: "var(--wh-radius-md)",
            padding: "22px",
            border: "1px solid var(--wh-pale-sky)",
            boxShadow: "var(--wh-shadow-soft)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
            <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--wh-text-muted)" }}>
              Inbox Submissions
            </span>
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "var(--wh-radius-sm)",
                backgroundColor: totalUnreadSubmissions > 0 ? "rgba(244, 175, 37, 0.15)" : "rgba(101, 175, 218, 0.15)",
                color: totalUnreadSubmissions > 0 ? "var(--wh-sun-gold)" : "var(--wh-sky-blue)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <i className="fas fa-inbox"></i>
            </div>
          </div>
          <div style={{ fontSize: "1.8rem", fontWeight: 700, color: "var(--wh-navy)" }}>
            {totalUnreadSubmissions}
          </div>
          <div style={{ fontSize: "0.78rem", color: "var(--wh-text-muted)", marginTop: "4px" }}>
            <Link href="/admin/inbox" style={{ color: "var(--wh-navy)", fontWeight: 600 }}>
              Review new messages &rarr;
            </Link>
          </div>
        </div>

        {/* Metric 2: Programs */}
        <div
          style={{
            backgroundColor: "var(--wh-bg-white)",
            borderRadius: "var(--wh-radius-md)",
            padding: "22px",
            border: "1px solid var(--wh-pale-sky)",
            boxShadow: "var(--wh-shadow-soft)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
            <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--wh-text-muted)" }}>
              Published Programs
            </span>
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "var(--wh-radius-sm)",
                backgroundColor: "rgba(76, 115, 50, 0.12)",
                color: "var(--wh-community-green)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <i className="fas fa-hand-holding-hand"></i>
            </div>
          </div>
          <div style={{ fontSize: "1.8rem", fontWeight: 700, color: "var(--wh-navy)" }}>
            {publishedPrograms}
          </div>
          <div style={{ fontSize: "0.78rem", color: "var(--wh-text-muted)", marginTop: "4px" }}>
            {totalPrograms} total in catalog
          </div>
        </div>

        {/* Metric 3: Events */}
        <div
          style={{
            backgroundColor: "var(--wh-bg-white)",
            borderRadius: "var(--wh-radius-md)",
            padding: "22px",
            border: "1px solid var(--wh-pale-sky)",
            boxShadow: "var(--wh-shadow-soft)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
            <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--wh-text-muted)" }}>
              Upcoming Events
            </span>
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "var(--wh-radius-sm)",
                backgroundColor: "rgba(101, 175, 218, 0.15)",
                color: "var(--wh-sky-blue)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <i className="fas fa-calendar-check"></i>
            </div>
          </div>
          <div style={{ fontSize: "1.8rem", fontWeight: 700, color: "var(--wh-navy)" }}>
            {upcomingEvents}
          </div>
          <div style={{ fontSize: "0.78rem", color: "var(--wh-text-muted)", marginTop: "4px" }}>
            {totalEvents} total scheduled
          </div>
        </div>

        {/* Metric 4: Top Announcement */}
        <div
          style={{
            backgroundColor: "var(--wh-bg-white)",
            borderRadius: "var(--wh-radius-md)",
            padding: "22px",
            border: "1px solid var(--wh-pale-sky)",
            boxShadow: "var(--wh-shadow-soft)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
            <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--wh-text-muted)" }}>
              Top Announcement
            </span>
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "var(--wh-radius-sm)",
                backgroundColor: activeAnnouncement ? "rgba(244, 175, 37, 0.15)" : "rgba(98, 125, 152, 0.1)",
                color: activeAnnouncement ? "var(--wh-sun-gold)" : "var(--wh-text-muted)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <i className="fas fa-bullhorn"></i>
            </div>
          </div>
          <div
            style={{
              fontSize: "0.95rem",
              fontWeight: 700,
              color: activeAnnouncement ? "var(--wh-community-green)" : "var(--wh-text-muted)",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <span
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: activeAnnouncement ? "var(--wh-community-green)" : "var(--wh-text-muted)",
              }}
            ></span>
            {activeAnnouncement ? "Active Live" : "None Active"}
          </div>
          <div
            style={{
              fontSize: "0.78rem",
              color: "var(--wh-text-muted)",
              marginTop: "6px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {activeAnnouncement ? activeAnnouncement.message : "No alert currently displayed"}
          </div>
        </div>
      </div>

      {/* Quick Action Navigation Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "16px",
          marginBottom: "32px",
        }}
      >
        <Link
          href="/admin/inbox"
          style={{
            backgroundColor: "var(--wh-bg-white)",
            padding: "18px 20px",
            borderRadius: "var(--wh-radius-md)",
            border: "1px solid var(--wh-pale-sky)",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "14px",
            boxShadow: "var(--wh-shadow-soft)",
            transition: "var(--wh-transition)",
          }}
        >
          <div style={{ width: "42px", height: "42px", borderRadius: "var(--wh-radius-sm)", backgroundColor: "rgba(19, 61, 95, 0.08)", color: "var(--wh-navy)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem" }}>
            <i className="fas fa-inbox"></i>
          </div>
          <div>
            <h4 style={{ fontSize: "0.95rem", color: "var(--wh-navy)", margin: 0, fontWeight: 600 }}>Inboxes</h4>
            <span style={{ fontSize: "0.78rem", color: "var(--wh-text-muted)" }}>View incoming submissions</span>
          </div>
        </Link>

        <Link
          href="/admin/announcements"
          style={{
            backgroundColor: "var(--wh-bg-white)",
            padding: "18px 20px",
            borderRadius: "var(--wh-radius-md)",
            border: "1px solid var(--wh-pale-sky)",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "14px",
            boxShadow: "var(--wh-shadow-soft)",
            transition: "var(--wh-transition)",
          }}
        >
          <div style={{ width: "42px", height: "42px", borderRadius: "var(--wh-radius-sm)", backgroundColor: "rgba(244, 175, 37, 0.15)", color: "var(--wh-sun-gold)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem" }}>
            <i className="fas fa-bullhorn"></i>
          </div>
          <div>
            <h4 style={{ fontSize: "0.95rem", color: "var(--wh-navy)", margin: 0, fontWeight: 600 }}>Announcements</h4>
            <span style={{ fontSize: "0.78rem", color: "var(--wh-text-muted)" }}>Manage top banner alert</span>
          </div>
        </Link>

        <Link
          href="/admin/homepage"
          style={{
            backgroundColor: "var(--wh-bg-white)",
            padding: "18px 20px",
            borderRadius: "var(--wh-radius-md)",
            border: "1px solid var(--wh-pale-sky)",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "14px",
            boxShadow: "var(--wh-shadow-soft)",
            transition: "var(--wh-transition)",
          }}
        >
          <div style={{ width: "42px", height: "42px", borderRadius: "var(--wh-radius-sm)", backgroundColor: "rgba(12, 40, 63, 0.12)", color: "var(--wh-navy)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem" }}>
            <i className="fas fa-house"></i>
          </div>
          <div>
            <h4 style={{ fontSize: "0.95rem", color: "var(--wh-navy)", margin: 0, fontWeight: 600 }}>Homepage</h4>
            <span style={{ fontSize: "0.78rem", color: "var(--wh-text-muted)" }}>Hero, welcome & photography</span>
          </div>
        </Link>

        <Link
          href="/admin/programs"
          style={{
            backgroundColor: "var(--wh-bg-white)",
            padding: "18px 20px",
            borderRadius: "var(--wh-radius-md)",
            border: "1px solid var(--wh-pale-sky)",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "14px",
            boxShadow: "var(--wh-shadow-soft)",
            transition: "var(--wh-transition)",
          }}
        >
          <div style={{ width: "42px", height: "42px", borderRadius: "var(--wh-radius-sm)", backgroundColor: "rgba(76, 115, 50, 0.12)", color: "var(--wh-community-green)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem" }}>
            <i className="fas fa-hand-holding-hand"></i>
          </div>
          <div>
            <h4 style={{ fontSize: "0.95rem", color: "var(--wh-navy)", margin: 0, fontWeight: 600 }}>Programs</h4>
            <span style={{ fontSize: "0.78rem", color: "var(--wh-text-muted)" }}>Add or edit programs</span>
          </div>
        </Link>

        <Link
          href="/admin/events"
          style={{
            backgroundColor: "var(--wh-bg-white)",
            padding: "18px 20px",
            borderRadius: "var(--wh-radius-md)",
            border: "1px solid var(--wh-pale-sky)",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "14px",
            boxShadow: "var(--wh-shadow-soft)",
            transition: "var(--wh-transition)",
          }}
        >
          <div style={{ width: "42px", height: "42px", borderRadius: "var(--wh-radius-sm)", backgroundColor: "rgba(101, 175, 218, 0.15)", color: "var(--wh-sky-blue)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem" }}>
            <i className="fas fa-calendar-days"></i>
          </div>
          <div>
            <h4 style={{ fontSize: "0.95rem", color: "var(--wh-navy)", margin: 0, fontWeight: 600 }}>Events</h4>
            <span style={{ fontSize: "0.78rem", color: "var(--wh-text-muted)" }}>Schedule events & RSVPs</span>
          </div>
        </Link>

        <Link
          href="/admin/gallery"
          style={{
            backgroundColor: "var(--wh-bg-white)",
            padding: "18px 20px",
            borderRadius: "var(--wh-radius-md)",
            border: "1px solid var(--wh-pale-sky)",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "14px",
            boxShadow: "var(--wh-shadow-soft)",
            transition: "var(--wh-transition)",
          }}
        >
          <div style={{ width: "42px", height: "42px", borderRadius: "var(--wh-radius-sm)", backgroundColor: "rgba(244, 175, 37, 0.15)", color: "var(--wh-sun-gold)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem" }}>
            <i className="fas fa-images"></i>
          </div>
          <div>
            <h4 style={{ fontSize: "0.95rem", color: "var(--wh-navy)", margin: 0, fontWeight: 600 }}>Gallery</h4>
            <span style={{ fontSize: "0.78rem", color: "var(--wh-text-muted)" }}>Photos & video highlights</span>
          </div>
        </Link>

        <Link
          href="/admin/resources"
          style={{
            backgroundColor: "var(--wh-bg-white)",
            padding: "18px 20px",
            borderRadius: "var(--wh-radius-md)",
            border: "1px solid var(--wh-pale-sky)",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "14px",
            boxShadow: "var(--wh-shadow-soft)",
            transition: "var(--wh-transition)",
          }}
        >
          <div style={{ width: "42px", height: "42px", borderRadius: "var(--wh-radius-sm)", backgroundColor: "rgba(101, 175, 218, 0.15)", color: "var(--wh-sky-blue)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem" }}>
            <i className="fas fa-folder-open"></i>
          </div>
          <div>
            <h4 style={{ fontSize: "0.95rem", color: "var(--wh-navy)", margin: 0, fontWeight: 600 }}>Resources</h4>
            <span style={{ fontSize: "0.78rem", color: "var(--wh-text-muted)" }}>Downloads & connections</span>
          </div>
        </Link>

        <Link
          href="/admin/partners"
          style={{
            backgroundColor: "var(--wh-bg-white)",
            padding: "18px 20px",
            borderRadius: "var(--wh-radius-md)",
            border: "1px solid var(--wh-pale-sky)",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "14px",
            boxShadow: "var(--wh-shadow-soft)",
            transition: "var(--wh-transition)",
          }}
        >
          <div style={{ width: "42px", height: "42px", borderRadius: "var(--wh-radius-sm)", backgroundColor: "rgba(76, 115, 50, 0.12)", color: "var(--wh-community-green)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem" }}>
            <i className="fas fa-handshake"></i>
          </div>
          <div>
            <h4 style={{ fontSize: "0.95rem", color: "var(--wh-navy)", margin: 0, fontWeight: 600 }}>Partners</h4>
            <span style={{ fontSize: "0.78rem", color: "var(--wh-text-muted)" }}>Community builders</span>
          </div>
        </Link>

        <Link
          href="/admin/settings"
          style={{
            backgroundColor: "var(--wh-bg-white)",
            padding: "18px 20px",
            borderRadius: "var(--wh-radius-md)",
            border: "1px solid var(--wh-pale-sky)",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "14px",
            boxShadow: "var(--wh-shadow-soft)",
            transition: "var(--wh-transition)",
          }}
        >
          <div style={{ width: "42px", height: "42px", borderRadius: "var(--wh-radius-sm)", backgroundColor: "rgba(19, 61, 95, 0.08)", color: "var(--wh-navy)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem" }}>
            <i className="fas fa-sliders"></i>
          </div>
          <div>
            <h4 style={{ fontSize: "0.95rem", color: "var(--wh-navy)", margin: 0, fontWeight: 600 }}>Site Settings</h4>
            <span style={{ fontSize: "0.78rem", color: "var(--wh-text-muted)" }}>Contact & facility info</span>
          </div>
        </Link>
      </div>

      {/* Dual Recent Content Tables */}
      <div className="grid-2" style={{ gap: "28px", alignItems: "start" }}>
        {/* Recent Programs */}
        <div
          style={{
            backgroundColor: "var(--wh-bg-white)",
            borderRadius: "var(--wh-radius-md)",
            padding: "24px",
            border: "1px solid var(--wh-pale-sky)",
            boxShadow: "var(--wh-shadow-soft)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px" }}>
            <h3 style={{ fontSize: "1.05rem", color: "var(--wh-navy)", margin: 0, fontWeight: 700 }}>
              Recent Programs
            </h3>
            <Link href="/admin/programs" style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--wh-community-green)" }}>
              View All &rarr;
            </Link>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {recentPrograms.map((prog) => (
              <div
                key={prog.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "10px 14px",
                  borderRadius: "var(--wh-radius-sm)",
                  backgroundColor: "var(--wh-warm-white)",
                  gap: "10px",
                  border: "1px solid rgba(210, 234, 242, 0.6)",
                }}
              >
                <div>
                  <div style={{ fontSize: "0.88rem", fontWeight: 600, color: "var(--wh-navy)" }}>
                    {prog.title}
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "var(--wh-text-muted)" }}>
                    {prog.category.name} &bull; {prog.isFeatured ? "Featured" : "Standard"}
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span
                    style={{
                      fontSize: "0.72rem",
                      fontWeight: 600,
                      padding: "2px 8px",
                      borderRadius: "var(--wh-radius-full)",
                      backgroundColor: prog.isPublished ? "rgba(76, 115, 50, 0.12)" : "rgba(98, 125, 152, 0.12)",
                      color: prog.isPublished ? "var(--wh-community-green)" : "var(--wh-text-muted)",
                    }}
                  >
                    {prog.isPublished ? "Published" : "Draft"}
                  </span>
                  <Link
                    href={`/admin/programs`}
                    style={{ fontSize: "0.78rem", color: "var(--wh-navy)", padding: "4px" }}
                  >
                    <i className="fas fa-pen"></i>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        <div
          style={{
            backgroundColor: "var(--wh-bg-white)",
            borderRadius: "var(--wh-radius-md)",
            padding: "24px",
            border: "1px solid var(--wh-pale-sky)",
            boxShadow: "var(--wh-shadow-soft)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px" }}>
            <h3 style={{ fontSize: "1.05rem", color: "var(--wh-navy)", margin: 0, fontWeight: 700 }}>
              Scheduled Events
            </h3>
            <Link href="/admin/events" style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--wh-community-green)" }}>
              View All &rarr;
            </Link>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {recentEvents.map((ev) => (
              <div
                key={ev.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "10px 14px",
                  borderRadius: "var(--wh-radius-sm)",
                  backgroundColor: "var(--wh-warm-white)",
                  gap: "10px",
                  border: "1px solid rgba(210, 234, 242, 0.6)",
                }}
              >
                <div>
                  <div style={{ fontSize: "0.88rem", fontWeight: 600, color: "var(--wh-navy)" }}>
                    {ev.title}
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "var(--wh-text-muted)" }}>
                    {new Date(ev.eventDate).toLocaleDateString("en-CA", { month: "short", day: "numeric", year: "numeric" })} &bull; {ev.startTime}
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span
                    style={{
                      fontSize: "0.72rem",
                      fontWeight: 600,
                      padding: "2px 8px",
                      borderRadius: "var(--wh-radius-full)",
                      backgroundColor: ev.isPublished ? "rgba(76, 115, 50, 0.12)" : "rgba(98, 125, 152, 0.12)",
                      color: ev.isPublished ? "var(--wh-community-green)" : "var(--wh-text-muted)",
                    }}
                  >
                    {ev.isPublished ? "Published" : "Draft"}
                  </span>
                  <Link
                    href={`/admin/events`}
                    style={{ fontSize: "0.78rem", color: "var(--wh-navy)", padding: "4px" }}
                  >
                    <i className="fas fa-pen"></i>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
