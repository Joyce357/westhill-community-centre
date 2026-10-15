"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ProgramInquirySection from "@/components/forms/ProgramInquirySection";
import type { ProgramItem } from "@/lib/data";

interface ProgramsDirectoryViewProps {
  programs: ProgramItem[];
  settingsAddress: string;
  grandOpeningMedia?: { mediaUrl: string; altText: string };
}

export default function ProgramsDirectoryView({
  programs,
  settingsAddress,
  grandOpeningMedia,
}: ProgramsDirectoryViewProps) {
  const [activeFilter, setActiveFilter] = useState<"all" | "ongoing" | "initiatives" | "partners" | "archives">("all");
  const [showInquiryForm, setShowInquiryForm] = useState(false);

  const initiativeSlugs = ["employment-resume", "community-engagement", "community-advocacy"];
  const partnerSlugs = ["benefits-support", "housing-support"];

  const ongoingPrograms = (programs || []).filter(
    (p) => !initiativeSlugs.includes(p.slug || "") && !partnerSlugs.includes(p.slug || "")
  );
  const initiativePrograms = (programs || []).filter((p) => initiativeSlugs.includes(p.slug || ""));
  const partnerDbPrograms = (programs || []).filter((p) => partnerSlugs.includes(p.slug || ""));

  return (
    <>
      {/* =====================================================================
          HERO BANNER (Deep Midnight Navy with Directory Metadata)
          ===================================================================== */}
      <section className="civic-prog-hero" aria-label="Programs Directory Banner">
        <div className="civic-container">
          <div style={{ maxWidth: "860px" }}>
            <div
              className="civic-eyebrow-pill"
              style={{
                backgroundColor: "rgba(25, 56, 92, 0.9)",
                color: "var(--civic-tertiary-fixed)",
                marginBottom: "16px",
              }}
            >
              <span
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  backgroundColor: "var(--civic-tertiary-mustard)",
                  display: "inline-block",
                }}
              ></span>
              <span>WEST HILL COMMUNITY CENTRE • SCARBOROUGH DIRECTORY</span>
            </div>

            <h1 className="civic-heading-hero">
              Programs &amp;{" "}
              <span style={{ color: "var(--civic-tertiary-mustard)" }}>Community Services</span>
            </h1>

            <p
              className="civic-body-lg"
              style={{
                color: "var(--civic-primary-fixed-dim)",
                marginTop: "14px",
                marginBottom: "20px",
              }}
            >
              A flexible, community-centred directory of all ongoing, seasonal, and partner-delivered initiatives happening at the Centre. All programs are open to Scarborough and East Toronto residents with barrier-free access.
            </p>

            {/* Quick Status Tags */}
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center" }}>
              <span className="civic-pill-badge" style={{ backgroundColor: "var(--civic-secondary)", color: "#FFFFFF" }}>
                <i className="fas fa-universal-access"></i> AODA Barrier-Free Intake
              </span>
              <span className="civic-pill-badge" style={{ backgroundColor: "rgba(25, 56, 92, 0.8)", color: "var(--civic-primary-fixed)" }}>
                <i className="fas fa-check-circle"></i> Zero fees for general neighbourhood programs
              </span>
              <span className="civic-pill-badge" style={{ backgroundColor: "rgba(25, 56, 92, 0.8)", color: "var(--civic-primary-fixed)" }}>
                <i className="fas fa-location-dot"></i> Ward 25 Scarborough-Guildwood
              </span>
            </div>
          </div>

          {/* Interactive Category Filter Bar */}
          <div className="civic-prog-filter-bar">
            <div className="civic-filter-btns">
              <button
                type="button"
                className={`civic-filter-btn ${activeFilter === "all" ? "active" : ""}`}
                onClick={() => setActiveFilter("all")}
              >
                All Programs
              </button>
              <button
                type="button"
                className={`civic-filter-btn ${activeFilter === "ongoing" ? "active" : ""}`}
                onClick={() => setActiveFilter("ongoing")}
              >
                Ongoing Programs
              </button>
              <button
                type="button"
                className={`civic-filter-btn ${activeFilter === "initiatives" ? "active" : ""}`}
                onClick={() => setActiveFilter("initiatives")}
              >
                Community Initiatives
              </button>
              <button
                type="button"
                className={`civic-filter-btn ${activeFilter === "partners" ? "active" : ""}`}
                onClick={() => setActiveFilter("partners")}
              >
                Partner Services
              </button>
              <button
                type="button"
                className={`civic-filter-btn ${activeFilter === "archives" ? "active" : ""}`}
                onClick={() => setActiveFilter("archives")}
              >
                Past Highlights
              </button>
            </div>

            {/* Status Legend */}
            <div style={{ display: "flex", alignItems: "center", gap: "16px", color: "var(--civic-primary-fixed-dim)", fontSize: "12px", fontWeight: 700 }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "var(--civic-secondary-container)" }}></span>
                Current
              </span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "var(--civic-tertiary-mustard)" }}></span>
                Upcoming
              </span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#74777F" }}></span>
                Concluded
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          1. ONGOING PROGRAMS (Crisp Light Sand #FAF9F5)
          ===================================================================== */}
      {(activeFilter === "all" || activeFilter === "ongoing") && (
        <section className="civic-section-sand" id="ongoing" aria-label="Ongoing Programs">
          <div className="civic-container">
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "space-between",
                gap: "20px",
                flexWrap: "wrap",
                marginBottom: "36px",
              }}
            >
              <div>
                <span className="civic-eyebrow" style={{ color: "var(--civic-secondary)", marginBottom: "8px" }}>
                  <i className="fas fa-calendar-week"></i> WEEKLY &amp; MONTHLY ROUTINE
                </span>
                <h2 className="civic-heading-lg" style={{ margin: "6px 0 0" }}>
                  Ongoing Programs
                </h2>
              </div>
              <p className="civic-body-sm" style={{ color: "var(--civic-on-surface-variant)", maxWidth: "460px", margin: 0 }}>
                Consistent, weekly sessions run directly by West Hill staff and resident volunteer mentors. Drop-ins welcome unless noted.
              </p>
            </div>

            {/* Grid of Compact Cards dynamically from Neon CMS */}
            <div className="civic-card-grid-3">
              {ongoingPrograms.map((p) => (
                <article key={p.id} className="civic-program-card" id={p.slug}>
                  <div className="civic-program-card-media">
                    <Image
                      src={p.image || "/images/Education on Housing oportunities.jpeg"}
                      alt={p.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 380px"
                      style={{ objectFit: "cover" }}
                    />
                    <span className="civic-program-card-tag civic-pill-navy">
                      {p.category || "Ongoing Program"}
                    </span>
                    <div
                      style={{
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                        zIndex: 2,
                        display: "flex",
                        gap: "6px",
                        alignItems: "center",
                      }}
                    >
                      <span
                        className="civic-pill-badge civic-pill-green"
                        style={{ fontSize: "11px", fontWeight: 700, padding: "3px 8px", borderRadius: "4px" }}
                      >
                        Active
                      </span>
                      {p.displayLabel ? (
                        <span
                          className="civic-pill-badge civic-pill-gold"
                          style={{ fontSize: "11px", fontWeight: 700, padding: "3px 8px", borderRadius: "4px" }}
                        >
                          {p.displayLabel}
                        </span>
                      ) : null}
                    </div>
                  </div>
                  <div className="civic-program-card-body">
                    <div>
                      <div className="civic-program-card-sublabel">{p.category || "Community Program"}</div>
                      <h3 className="civic-program-card-title">{p.title}</h3>
                      <p className="civic-program-card-desc">{p.description}</p>
                    </div>
                    {p.schedule || p.location ? (
                      <div style={{ background: "var(--civic-surface-low)", padding: "10px", borderRadius: "6px", marginTop: "10px" }}>
                        {p.schedule && (
                          <div style={{ fontSize: "12px", color: "var(--civic-primary)", fontWeight: 600, display: "flex", alignItems: "center", gap: "6px", marginBottom: p.location ? "4px" : "0" }}>
                            <i className="fas fa-clock" style={{ color: "var(--civic-secondary)" }}></i>
                            <span>{p.schedule}</span>
                          </div>
                        )}
                        {p.location && (
                          <div style={{ fontSize: "12px", color: "var(--civic-on-surface-variant)", display: "flex", alignItems: "center", gap: "6px" }}>
                            <i className="fas fa-location-dot" style={{ color: "var(--civic-secondary)" }}></i>
                            <span>{p.location}</span>
                          </div>
                        )}
                      </div>
                    ) : null}
                    <div style={{ marginTop: "14px" }}>
                      <button
                        type="button"
                        onClick={() => setShowInquiryForm(true)}
                        className="civic-btn-navy"
                        style={{ width: "100%", justifyContent: "center", fontSize: "13px", padding: "8px" }}
                      >
                        Inquire / Drop-in
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* =====================================================================
          2. COMMUNITY INITIATIVES (Warm Off-White Surface #F4F4F0)
          ===================================================================== */}
      {(activeFilter === "all" || activeFilter === "initiatives") && (
        <section className="civic-section-sand-low" id="initiatives" aria-label="Community Initiatives">
          <div className="civic-container">
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "space-between",
                gap: "20px",
                flexWrap: "wrap",
                marginBottom: "36px",
              }}
            >
              <div>
                <span className="civic-eyebrow" style={{ color: "var(--civic-tertiary-mustard)", marginBottom: "8px" }}>
                  <i className="fas fa-bullhorn"></i> GRASSROOTS &amp; SEASONAL EVENTS
                </span>
                <h2 className="civic-heading-lg" style={{ margin: "6px 0 0" }}>
                  Community Initiatives
                </h2>
              </div>
              <p className="civic-body-sm" style={{ color: "var(--civic-on-surface-variant)", maxWidth: "460px", margin: 0 }}>
                Action-oriented campaigns and seasonal pop-ups co-designed with neighbourhood resident circles to meet urgent needs.
              </p>
            </div>

            <div className="civic-card-grid-3">
              {/* Initiative 1: Job Fair */}
              <div
                style={{
                  background: "#FFFFFF",
                  border: "1px solid var(--civic-border)",
                  borderRadius: "10px",
                  padding: "24px",
                  position: "relative",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "4px", backgroundColor: "var(--civic-tertiary-mustard)" }}></div>
                <div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
                    <span className="civic-pill-badge civic-pill-gold">
                      Community Initiative
                    </span>
                    <span className="civic-eyebrow" style={{ color: "var(--civic-on-surface-variant)" }}>
                      Employment
                    </span>
                  </div>
                  <h3 className="civic-heading-sm" style={{ color: "var(--civic-primary)", marginBottom: "10px" }}>
                    West Hill Community Job Fair
                  </h3>
                  <p className="civic-body-sm" style={{ color: "var(--civic-on-surface-variant)", marginBottom: "18px" }}>
                    Connecting local job seekers with employment opportunities and community resources.
                  </p>
                  <div style={{ background: "var(--civic-surface-container)", padding: "12px 14px", borderRadius: "6px", marginBottom: "20px" }}>
                    <div style={{ fontSize: "11px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--civic-secondary)" }}>
                      Powered by West Hill Community Association
                    </div>
                    <div style={{ fontSize: "12.5px", color: "var(--civic-on-surface-variant)", marginTop: "2px" }}>
                      Community employment initiative organized to support local job seekers.
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "14px", borderTop: "1px solid var(--civic-surface-container)" }}>
                  <span style={{ fontSize: "12px", color: "var(--civic-on-surface-variant)" }}></span>
                  <Link href="/events" className="civic-btn-gold" style={{ fontSize: "12.5px", padding: "7px 16px" }}>
                    <span>Inquire / Register</span>
                    <i className="fas fa-arrow-right"></i>
                  </Link>
                </div>
              </div>

              {/* Initiative 2: Summer Camp & Youth Programs */}
              <div
                style={{
                  background: "#FFFFFF",
                  border: "1px solid var(--civic-border)",
                  borderRadius: "10px",
                  padding: "24px",
                  position: "relative",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "4px", backgroundColor: "var(--civic-secondary)" }}></div>
                <div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
                    <span className="civic-pill-badge civic-pill-green">
                      Seasonal Program
                    </span>
                    <span className="civic-eyebrow" style={{ color: "var(--civic-on-surface-variant)" }}>
                      Youth Programming
                    </span>
                  </div>
                  <h3 className="civic-heading-sm" style={{ color: "var(--civic-primary)", marginBottom: "10px" }}>
                    Summer Camp &amp; Youth Programs
                  </h3>
                  <p className="civic-body-sm" style={{ color: "var(--civic-on-surface-variant)", marginBottom: "18px" }}>
                    Summer recreation, community activities, and engaging programs designed for neighbourhood youth.
                  </p>
                  <div style={{ background: "var(--civic-surface-container)", padding: "12px 14px", borderRadius: "6px", marginBottom: "20px" }}>
                    <div style={{ fontSize: "11px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--civic-primary)" }}>
                      Program Information
                    </div>
                    <div style={{ fontSize: "12.5px", color: "var(--civic-on-surface-variant)", marginTop: "2px" }}>
                      Contact the centre for upcoming summer session schedules and intake.
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "14px", borderTop: "1px solid var(--civic-surface-container)" }}>
                  <span style={{ fontSize: "12px", color: "var(--civic-on-surface-variant)" }}></span>
                  <button
                    type="button"
                    onClick={() => setShowInquiryForm(true)}
                    className="civic-btn-gold"
                    style={{ fontSize: "12.5px", padding: "7px 16px" }}
                  >
                    <span>Inquire About Camp</span>
                    <i className="fas fa-arrow-right"></i>
                  </button>
                </div>
              </div>

              {/* Initiative 3: Community Food Share & Fresh Market */}
              <div
                style={{
                  background: "#FFFFFF",
                  border: "1px solid var(--civic-border)",
                  borderRadius: "10px",
                  padding: "24px",
                  position: "relative",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "4px", backgroundColor: "var(--civic-primary-navy)" }}></div>
                <div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
                    <span className="civic-pill-badge civic-pill-navy">
                      Bi-Weekly Routine
                    </span>
                    <span className="civic-eyebrow" style={{ color: "var(--civic-on-surface-variant)" }}>
                      Community Pantry
                    </span>
                  </div>
                  <h3 className="civic-heading-sm" style={{ color: "var(--civic-primary)", marginBottom: "10px" }}>
                    Community Food Share &amp; Fresh Market
                  </h3>
                  <p className="civic-body-sm" style={{ color: "var(--civic-on-surface-variant)", marginBottom: "18px" }}>
                    Dignified, choice-based fresh farm produce and dry staple pantry boxes provided in collaboration with local urban growers and suppliers.
                  </p>
                  <div style={{ background: "var(--civic-surface-container)", padding: "12px 14px", borderRadius: "6px", marginBottom: "20px" }}>
                    <div style={{ fontSize: "11px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--civic-secondary)" }}>
                      Schedule &amp; Location
                    </div>
                    <div style={{ fontSize: "12.5px", color: "var(--civic-on-surface-variant)", marginTop: "2px" }}>
                      Every 2nd Saturday • Centre Courtyard
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "14px", borderTop: "1px solid var(--civic-surface-container)" }}>
                  <span style={{ fontSize: "12px", color: "var(--civic-on-surface-variant)" }}>No ID Required</span>
                  <Link href="/contact" className="civic-btn-navy" style={{ fontSize: "12.5px", padding: "7px 16px" }}>
                    <span>Market Hours</span>
                    <i className="fas fa-arrow-right"></i>
                  </Link>
                </div>
              </div>

              {/* Dynamic Initiative Programs from Neon CMS */}
              {initiativePrograms.map((p) => (
                <div
                  key={p.id}
                  id={p.slug}
                  style={{
                    background: "#FFFFFF",
                    border: "1px solid var(--civic-border)",
                    borderRadius: "10px",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ position: "relative", height: "160px", width: "100%" }}>
                    <Image
                      src={p.image || "/images/community_advocacy.png"}
                      alt={p.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 400px"
                      style={{ objectFit: "cover" }}
                    />
                    <div style={{ position: "absolute", top: "10px", right: "10px", display: "flex", gap: "6px" }}>
                      <span className="civic-pill-badge civic-pill-gold">Active</span>
                      {p.displayLabel ? (
                        <span className="civic-pill-badge civic-pill-navy">{p.displayLabel}</span>
                      ) : null}
                    </div>
                  </div>
                  <div style={{ padding: "20px", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <div>
                      <span className="civic-eyebrow" style={{ color: "var(--civic-secondary)", marginBottom: "4px" }}>
                        {p.category || "Initiative"}
                      </span>
                      <h3 className="civic-heading-sm" style={{ color: "var(--civic-primary)", margin: "4px 0 8px" }}>
                        {p.title}
                      </h3>
                      <p className="civic-body-sm" style={{ color: "var(--civic-on-surface-variant)", marginBottom: "14px" }}>
                        {p.description}
                      </p>
                      {p.schedule && (
                        <div style={{ fontSize: "12px", color: "var(--civic-primary)", fontWeight: 600, marginBottom: "8px" }}>
                          <i className="fas fa-clock" style={{ color: "var(--civic-secondary)", marginRight: "6px" }}></i>
                          {p.schedule}
                        </div>
                      )}
                    </div>
                    <div style={{ paddingTop: "12px", borderTop: "1px solid var(--civic-surface-container)" }}>
                      <button
                        type="button"
                        onClick={() => setShowInquiryForm(true)}
                        className="civic-btn-gold"
                        style={{ width: "100%", justifyContent: "center", fontSize: "12.5px", padding: "7px 16px" }}
                      >
                        <span>Participate / Inquire</span>
                        <i className="fas fa-arrow-right"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* =====================================================================
          3. PARTNER PROGRAMS & SERVICES (Clean Structured Sand #FAF9F5)
          ===================================================================== */}
      {(activeFilter === "all" || activeFilter === "partners") && (
        <section className="civic-section-sand" id="partners" aria-label="Partner Programs & Services">
          <div className="civic-container">
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "space-between",
                gap: "20px",
                flexWrap: "wrap",
                marginBottom: "36px",
              }}
            >
              <div>
                <span className="civic-eyebrow" style={{ color: "var(--civic-primary)", marginBottom: "8px" }}>
                  <i className="fas fa-handshake"></i> SCARBOROUGH INSTITUTIONAL ALLIANCES
                </span>
                <h2 className="civic-heading-lg" style={{ margin: "6px 0 0" }}>
                  Partner Programs &amp; Services
                </h2>
              </div>
              <p className="civic-body-sm" style={{ color: "var(--civic-on-surface-variant)", maxWidth: "460px", margin: 0 }}>
                Specialized services delivered directly inside West Hill Community Centre through formal agreements with trusted civic providers.
              </p>
            </div>

            <div className="civic-card-grid-3">
              {/* Partner Card 1: Dental Care */}
              <div
                style={{
                  background: "#FFFFFF",
                  border: "1px solid var(--civic-border)",
                  borderRadius: "10px",
                  padding: "24px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                    <i className="fas fa-tooth" style={{ color: "var(--civic-secondary)", fontSize: "20px" }}></i>
                    <span className="civic-eyebrow" style={{ color: "var(--civic-on-surface-variant)" }}>
                      Community Partner Support
                    </span>
                  </div>
                  <h3 className="civic-heading-sm" style={{ color: "var(--civic-primary)", marginBottom: "10px" }}>
                    Dental Care &amp; Benefits Support
                  </h3>
                  <p className="civic-body-sm" style={{ color: "var(--civic-on-surface-variant)", marginBottom: "16px" }}>
                    Information and assistance for eligible residents navigating government dental benefit programs and health supports.
                  </p>
                  <ul style={{ listStyle: "none", padding: 0, margin: "0 0 20px 0", display: "flex", flexDirection: "column", gap: "8px" }}>
                    <li style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "var(--civic-on-surface-variant)" }}>
                      <i className="fas fa-check" style={{ color: "var(--civic-secondary)" }}></i> Canada Dental Care Plan support
                    </li>
                    <li style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "var(--civic-on-surface-variant)" }}>
                      <i className="fas fa-check" style={{ color: "var(--civic-secondary)" }}></i> Application &amp; eligibility navigation
                    </li>
                    <li style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "var(--civic-on-surface-variant)" }}>
                      <i className="fas fa-check" style={{ color: "var(--civic-secondary)" }}></i> Community resource connections
                    </li>
                  </ul>
                </div>
                <Link href="/resources" className="civic-btn-navy" style={{ width: "100%", justifyContent: "center" }}>
                  <span>View Benefits Resources</span>
                  <i className="fas fa-arrow-right"></i>
                </Link>
              </div>

              {/* Partner Card 2: Toronto Public Library Programming */}
              <div
                style={{
                  background: "#FFFFFF",
                  border: "1px solid var(--civic-border)",
                  borderRadius: "10px",
                  padding: "24px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                    <i className="fas fa-book" style={{ color: "var(--civic-tertiary-mustard)", fontSize: "20px" }}></i>
                    <span className="civic-eyebrow" style={{ color: "var(--civic-on-surface-variant)" }}>
                      Toronto Public Library
                    </span>
                  </div>
                  <h3 className="civic-heading-sm" style={{ color: "var(--civic-primary)", marginBottom: "10px" }}>
                    Toronto Public Library Programming
                  </h3>
                  <p className="civic-body-sm" style={{ color: "var(--civic-on-surface-variant)", marginBottom: "16px" }}>
                    Collaborative community programming hosted at West Hill Community Centre in partnership with Toronto Public Library.
                  </p>
                  <ul style={{ listStyle: "none", padding: 0, margin: "0 0 20px 0", display: "flex", flexDirection: "column", gap: "8px" }}>
                    <li style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "var(--civic-on-surface-variant)" }}>
                      <i className="fas fa-check" style={{ color: "var(--civic-secondary)" }}></i> 3D printing demonstrations
                    </li>
                    <li style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "var(--civic-on-surface-variant)" }}>
                      <i className="fas fa-check" style={{ color: "var(--civic-secondary)" }}></i> Digital learning &amp; skills activities
                    </li>
                    <li style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "var(--civic-on-surface-variant)" }}>
                      <i className="fas fa-check" style={{ color: "var(--civic-secondary)" }}></i> Library resource access &amp; navigation
                    </li>
                  </ul>
                </div>
                <Link href="/resources" className="civic-btn-navy" style={{ width: "100%", justifyContent: "center" }}>
                  <span>Inquire About Library Programs</span>
                  <i className="fas fa-arrow-right"></i>
                </Link>
              </div>

              {/* Partner Card 3: Legal Clinic */}
              <div
                style={{
                  background: "#FFFFFF",
                  border: "1px solid var(--civic-border)",
                  borderRadius: "10px",
                  padding: "24px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                    <i className="fas fa-scale-balanced" style={{ color: "var(--civic-primary)", fontSize: "20px" }}></i>
                    <span className="civic-eyebrow" style={{ color: "var(--civic-on-surface-variant)" }}>
                      East Toronto Community Legal
                    </span>
                  </div>
                  <h3 className="civic-heading-sm" style={{ color: "var(--civic-primary)", marginBottom: "10px" }}>
                    Legal Aid &amp; Tenant Rights Clinic
                  </h3>
                  <p className="civic-body-sm" style={{ color: "var(--civic-on-surface-variant)", marginBottom: "16px" }}>
                    Confidential legal consultations for tenant rights defense, landlord disputes, social assistance appeals, and basic immigration inquiries.
                  </p>
                  <ul style={{ listStyle: "none", padding: 0, margin: "0 0 20px 0", display: "flex", flexDirection: "column", gap: "8px" }}>
                    <li style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "var(--civic-on-surface-variant)" }}>
                      <i className="fas fa-check" style={{ color: "var(--civic-secondary)" }}></i> Free summary legal advice
                    </li>
                    <li style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "var(--civic-on-surface-variant)" }}>
                      <i className="fas fa-check" style={{ color: "var(--civic-secondary)" }}></i> Landlord &amp; Tenant Board navigation
                    </li>
                    <li style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "var(--civic-on-surface-variant)" }}>
                      <i className="fas fa-check" style={{ color: "var(--civic-secondary)" }}></i> Confidential intake rooms
                    </li>
                  </ul>
                </div>
                <Link href="/contact" className="civic-btn-navy" style={{ width: "100%", justifyContent: "center" }}>
                  <span>Request Intake Details</span>
                  <i className="fas fa-arrow-right"></i>
                </Link>
              </div>

              {/* Dynamic Partner Programs from Neon CMS */}
              {partnerDbPrograms.map((p) => (
                <div
                  key={p.id}
                  id={p.slug}
                  style={{
                    background: "#FFFFFF",
                    border: "1px solid var(--civic-border)",
                    borderRadius: "10px",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ position: "relative", height: "160px", width: "100%" }}>
                    <Image
                      src={p.image || "/images/housing_support.png"}
                      alt={p.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 400px"
                      style={{ objectFit: "cover" }}
                    />
                    <div style={{ position: "absolute", top: "10px", right: "10px", display: "flex", gap: "6px" }}>
                      <span className="civic-pill-badge civic-pill-navy">Partner Service</span>
                      {p.displayLabel ? (
                        <span className="civic-pill-badge civic-pill-gold">{p.displayLabel}</span>
                      ) : null}
                    </div>
                  </div>
                  <div style={{ padding: "20px", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <div>
                      <span className="civic-eyebrow" style={{ color: "var(--civic-primary)", marginBottom: "4px" }}>
                        {p.category || "Community Support"}
                      </span>
                      <h3 className="civic-heading-sm" style={{ color: "var(--civic-primary)", margin: "4px 0 8px" }}>
                        {p.title}
                      </h3>
                      <p className="civic-body-sm" style={{ color: "var(--civic-on-surface-variant)", marginBottom: "14px" }}>
                        {p.description}
                      </p>
                      {p.schedule && (
                        <div style={{ fontSize: "12px", color: "var(--civic-primary)", fontWeight: 600, marginBottom: "8px" }}>
                          <i className="fas fa-calendar-check" style={{ color: "var(--civic-secondary)", marginRight: "6px" }}></i>
                          {p.schedule}
                        </div>
                      )}
                    </div>
                    <div style={{ paddingTop: "12px", borderTop: "1px solid var(--civic-surface-container)" }}>
                      <button
                        type="button"
                        onClick={() => setShowInquiryForm(true)}
                        className="civic-btn-navy"
                        style={{ width: "100%", justifyContent: "center", fontSize: "12.5px", padding: "7px 16px" }}
                      >
                        <span>Request Access</span>
                        <i className="fas fa-arrow-right"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* =====================================================================
          4. PAST HIGHLIGHTS (Deep Midnight Navy Full-Bleed Section)
          ===================================================================== */}
      {(activeFilter === "all" || activeFilter === "archives") && (
        <section className="civic-section-navy" id="archives" aria-label="Community Milestones & Archives">
          <div className="civic-container">
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "space-between",
                gap: "20px",
                flexWrap: "wrap",
                marginBottom: "36px",
              }}
            >
              <div>
                <span className="civic-eyebrow" style={{ color: "var(--civic-tertiary-fixed)", marginBottom: "8px" }}>
                  <i className="fas fa-clock-rotate-left"></i> COMMUNITY MILESTONES &amp; ARCHIVES
                </span>
                <h2 className="civic-heading-lg" style={{ color: "#FFFFFF", margin: "6px 0 0" }}>
                  Past Highlights
                </h2>
              </div>
              <p className="civic-body-sm" style={{ color: "var(--civic-primary-fixed-dim)", maxWidth: "460px", margin: 0 }}>
                A retrospective look at completed initiatives, past seasonal celebrations, and landmark neighbourhood achievements at West Hill.
              </p>
            </div>

            <div className="civic-card-grid-3">
              {/* Archive 1: Grand Opening */}
              <div
                style={{
                  background: "var(--civic-primary-container)",
                  borderRadius: "10px",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                }}
              >
                <div style={{ position: "relative", height: "180px", width: "100%" }}>
                  <Image
                    src={grandOpeningMedia?.mediaUrl || "/assets/images/westhillcenterOpening/WhatsApp Image 2026-06-09 at 11.10.49 PM (2).jpeg"}
                    alt={grandOpeningMedia?.altText || "Official Grand Opening ceremony"}
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    style={{ objectFit: "cover" }}
                  />
                  <span className="civic-program-card-tag" style={{ background: "rgba(0, 34, 67, 0.9)", color: "#FFFFFF" }}>
                    June 9, 2026
                  </span>
                </div>
                <div style={{ padding: "20px", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div>
                    <div className="civic-eyebrow" style={{ color: "var(--civic-primary-fixed-dim)", marginBottom: "6px" }}>
                      Civic Milestone
                    </div>
                    <h3 className="civic-heading-sm" style={{ color: "#FFFFFF", marginBottom: "8px" }}>
                      Grand Opening &amp; Ribbon Cutting
                    </h3>
                    <p className="civic-body-sm" style={{ color: "var(--civic-primary-fixed-dim)", marginBottom: "16px" }}>
                      Celebrating the full activation of the 4234 Lawrence East facility with over 600 neighbourhood neighbours, elders, and local partners.
                    </p>
                  </div>
                  <Link href="/gallery" className="civic-program-card-action" style={{ color: "var(--civic-tertiary-fixed)" }}>
                    <span>View Archived Photo Album</span>
                    <i className="fas fa-arrow-right"></i>
                  </Link>
                </div>
              </div>

              {/* Archive 2: Coat & Care Drive */}
              <div
                style={{
                  background: "var(--civic-primary-container)",
                  borderRadius: "10px",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                }}
              >
                <div style={{ position: "relative", height: "180px", width: "100%" }}>
                  <Image
                    src="/assets/images/westhillcenterOpening/WhatsApp Image 2026-06-09 at 11.10.51 PM (4).jpeg"
                    alt="Community donation and care distribution"
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    style={{ objectFit: "cover" }}
                  />
                  <span className="civic-program-card-tag" style={{ background: "rgba(0, 34, 67, 0.9)", color: "#FFFFFF" }}>
                    November 2025
                  </span>
                </div>
                <div style={{ padding: "20px", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div>
                    <div className="civic-eyebrow" style={{ color: "var(--civic-primary-fixed-dim)", marginBottom: "6px" }}>
                      Relief Drive
                    </div>
                    <h3 className="civic-heading-sm" style={{ color: "#FFFFFF", marginBottom: "8px" }}>
                      Winter Warmth Coat &amp; Care Drive
                    </h3>
                    <p className="civic-body-sm" style={{ color: "var(--civic-primary-fixed-dim)", marginBottom: "16px" }}>
                      Distributed over 450 new winter jackets, insulated boots, and thermals to newly arrived families and local schoolchildren.
                    </p>
                  </div>
                  <Link href="/gallery" className="civic-program-card-action" style={{ color: "var(--civic-tertiary-fixed)" }}>
                    <span>View Drive Summary &amp; Photos</span>
                    <i className="fas fa-arrow-right"></i>
                  </Link>
                </div>
              </div>

              {/* Archive 3: Tech Sprint & Hackathon */}
              <div
                style={{
                  background: "var(--civic-primary-container)",
                  borderRadius: "10px",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                }}
              >
                <div style={{ position: "relative", height: "180px", width: "100%" }}>
                  <Image
                    src="/images/Youth Award.jpeg"
                    alt="Youth tech hackathon and recognition"
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    style={{ objectFit: "cover" }}
                  />
                  <span className="civic-program-card-tag" style={{ background: "rgba(0, 34, 67, 0.9)", color: "#FFFFFF" }}>
                    February 2026
                  </span>
                </div>
                <div style={{ padding: "20px", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div>
                    <div className="civic-eyebrow" style={{ color: "var(--civic-primary-fixed-dim)", marginBottom: "6px" }}>
                      Youth Showcase
                    </div>
                    <h3 className="civic-heading-sm" style={{ color: "#FFFFFF", marginBottom: "8px" }}>
                      Youth Tech Sprint &amp; Innovation
                    </h3>
                    <p className="civic-body-sm" style={{ color: "var(--civic-primary-fixed-dim)", marginBottom: "16px" }}>
                      Weekend design and digital clinic where 12 teams of Scarborough youth created digital tools addressing local food and transit access.
                    </p>
                  </div>
                  <Link href="/events" className="civic-program-card-action" style={{ color: "var(--civic-tertiary-fixed)" }}>
                    <span>See Showcase Highlights</span>
                    <i className="fas fa-arrow-right"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* =====================================================================
          5. PROGRAM CO-CREATION CALLOUT & INQUIRY FORM
          ===================================================================== */}
      <section className="civic-section-sand" id="inquire" aria-label="Program Co-Creation & Intake">
        <div className="civic-container">
          <div
            style={{
              background: "var(--civic-surface-container)",
              borderRadius: "12px",
              padding: "clamp(20px, 4vw, 40px)",
              border: "1px solid var(--civic-border)",
              boxShadow: "0 4px 16px rgba(25, 56, 92, 0.04)",
              marginBottom: showInquiryForm ? "40px" : "0",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "32px", flexWrap: "wrap" }}>
              <div style={{ maxWidth: "680px" }}>
                <span className="civic-eyebrow" style={{ color: "var(--civic-secondary)", marginBottom: "6px" }}>
                  GRASSROOTS INCUBATION
                </span>
                <h2 className="civic-heading-lg" style={{ margin: "6px 0 10px" }}>
                  Have an idea for a program or want to host a service at the Centre?
                </h2>
                <p className="civic-body-md" style={{ color: "var(--civic-on-surface-variant)", margin: 0 }}>
                  West Hill Community Centre operates on open community co-design at {settingsAddress || "Unit 4, 4234 Lawrence Ave East"}. We provide space, outreach support, and equipment for resident-led workshops and non-profit collectives.
                </p>
              </div>

              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", flexShrink: 0 }}>
                <button
                  type="button"
                  onClick={() => setShowInquiryForm(!showInquiryForm)}
                  className="civic-btn-navy"
                >
                  <i className="fas fa-file-pen"></i>
                  <span>{showInquiryForm ? "Hide Inquiry Form" : "Submit Program Proposal"}</span>
                </button>
                <Link href="/contact" className="civic-btn-outline">
                  <i className="fas fa-comments"></i>
                  <span>Contact Centre Team</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Integrated Working Inquiry Form */}
          {showInquiryForm && (
            <div style={{ maxWidth: "760px", margin: "0 auto" }}>
              <ProgramInquirySection />
            </div>
          )}
        </div>
      </section>
    </>
  );
}
