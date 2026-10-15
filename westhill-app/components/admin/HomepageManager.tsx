"use client";

import { useState } from "react";
import { updateHomepageContentAction } from "@/app/actions/homepage";
import GalleryItemSelector, { GalleryOption } from "@/components/admin/GalleryItemSelector";
import type { HomepageContentData } from "@/lib/queries";

interface HomepageManagerProps {
  initialContent: HomepageContentData;
  galleryItems: GalleryOption[];
}

export default function HomepageManager({
  initialContent,
  galleryItems,
}: HomepageManagerProps) {
  const [activeTab, setActiveTab] = useState<"hero" | "welcome" | "programs" | "milestone" | "cta" | "seo">("hero");
  const [isSaving, setIsSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);
    setStatusMessage(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await updateHomepageContentAction(formData);
      if (res.success) {
        setStatusMessage({ type: "success", text: "Homepage content saved and public site revalidated successfully!" });
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        setStatusMessage({ type: "error", text: res.error || "Failed to save homepage changes." });
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "An unexpected error occurred while saving.";
      setStatusMessage({ type: "error", text: message });
    } finally {
      setIsSaving(false);
    }
  };

  const tabs: Array<{ id: "hero" | "welcome" | "programs" | "milestone" | "cta" | "seo"; label: string; icon: string }> = [
    { id: "hero", label: "Hero Section", icon: "fas fa-image" },
    { id: "welcome", label: "Welcome / About", icon: "fas fa-heart" },
    { id: "programs", label: "Programs Intro", icon: "fas fa-hand-holding-hand" },
    { id: "milestone", label: "Milestone Feature", icon: "fas fa-star" },
    { id: "cta", label: "Final Get Involved CTA", icon: "fas fa-bullhorn" },
    { id: "seo", label: "Homepage SEO", icon: "fas fa-globe" },
  ];

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "24px 20px 60px" }}>
      {/* Header */}
      <div style={{ marginBottom: "28px", display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
            <span style={{ fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--wh-sun-gold)" }}>
              Content Management System
            </span>
          </div>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 700, color: "var(--wh-navy)", margin: 0 }}>
            Homepage Presentation Editor
          </h1>
          <p style={{ fontSize: "0.9rem", color: "var(--wh-text-muted)", marginTop: "6px", maxWidth: "680px" }}>
            Customize editorial copy and select authentic gallery photography for the public homepage. Programs, announcements, and albums remain managed through their respective CMS panels.
          </p>
        </div>

        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "9px 16px",
            backgroundColor: "rgba(101, 175, 218, 0.15)",
            color: "var(--wh-navy)",
            border: "1px solid var(--wh-pale-sky)",
            borderRadius: "var(--wh-radius-sm)",
            fontSize: "0.86rem",
            fontWeight: 600,
            textDecoration: "none",
          }}
        >
          <i className="fas fa-arrow-up-right-from-square"></i>
          <span>View Live Site</span>
        </a>
      </div>

      {/* Status Feedback Banner */}
      {statusMessage && (
        <div
          style={{
            padding: "14px 18px",
            borderRadius: "var(--wh-radius-md)",
            marginBottom: "24px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            backgroundColor: statusMessage.type === "success" ? "var(--wh-success-bg, #E8F5E9)" : "var(--wh-danger-bg, #FFEBEE)",
            border: `1px solid ${statusMessage.type === "success" ? "var(--wh-success-border, #A5D6A7)" : "var(--wh-danger-border, #FFCDD2)"}`,
            color: statusMessage.type === "success" ? "var(--wh-success, #2E7D32)" : "var(--wh-danger, #C62828)",
            fontSize: "0.9rem",
            fontWeight: 600,
          }}
        >
          <i className={`fas ${statusMessage.type === "success" ? "fa-circle-check" : "fa-circle-exclamation"}`}></i>
          <span>{statusMessage.text}</span>
        </div>
      )}

      {/* Tabs Bar */}
      <div
        style={{
          display: "flex",
          gap: "6px",
          borderBottom: "2px solid var(--wh-pale-sky)",
          marginBottom: "24px",
          overflowX: "auto",
          paddingBottom: "2px",
        }}
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 16px",
                fontSize: "0.88rem",
                fontWeight: isActive ? 700 : 500,
                color: isActive ? "var(--wh-navy)" : "var(--wh-text-muted)",
                backgroundColor: isActive ? "var(--wh-bg-white)" : "transparent",
                border: "none",
                borderBottom: isActive ? "3px solid var(--wh-sun-gold)" : "3px solid transparent",
                marginBottom: "-2px",
                borderRadius: "6px 6px 0 0",
                cursor: "pointer",
                whiteSpace: "nowrap",
                transition: "all 0.15s ease",
              }}
            >
              <i className={tab.icon} style={{ color: isActive ? "var(--wh-sun-gold)" : "inherit" }}></i>
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Edit Form */}
      <form onSubmit={handleSubmit}>
        <div
          style={{
            backgroundColor: "var(--wh-bg-white)",
            borderRadius: "var(--wh-radius-lg)",
            border: "1px solid var(--wh-pale-sky)",
            padding: "28px",
            boxShadow: "var(--wh-shadow-soft)",
            marginBottom: "24px",
          }}
        >
          {/* 1. HERO PANEL */}
          <div style={{ display: activeTab === "hero" ? "block" : "none" }}>
            <h2 style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--wh-navy)", marginBottom: "4px" }}>
              Hero Section
            </h2>
            <p style={{ fontSize: "0.85rem", color: "var(--wh-text-muted)", marginBottom: "20px" }}>
              Controls the top full-bleed photograph, headline banner, and action buttons.
            </p>

            <div
              style={{
                padding: "14px 16px",
                backgroundColor: "rgba(101, 175, 218, 0.12)",
                borderRadius: "var(--wh-radius-md)",
                border: "1px solid var(--wh-pale-sky)",
                marginBottom: "20px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "12px",
              }}
            >
              <div>
                <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "var(--wh-navy)", display: "flex", alignItems: "center", gap: "8px" }}>
                  <i className="fas fa-images" style={{ color: "var(--wh-sun-gold)" }}></i>
                  <span>Multi-Image Hero Slideshow Active</span>
                </div>
                <div style={{ fontSize: "0.82rem", color: "var(--wh-text-muted)", marginTop: "3px" }}>
                  The homepage hero now supports multiple rotating slides. Select, reorder, or remove slides in Site Media.
                </div>
              </div>
              <a
                href="/admin/site-media"
                style={{
                  padding: "8px 14px",
                  backgroundColor: "var(--wh-navy)",
                  color: "#FFFFFF",
                  borderRadius: "var(--wh-radius-sm)",
                  textDecoration: "none",
                  fontSize: "0.84rem",
                  fontWeight: 600,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <i className="fas fa-sliders"></i>
                <span>Manage Hero Slides</span>
              </a>
            </div>

            <GalleryItemSelector
              name="heroGalleryItemId"
              label="Primary / Static Fallback Hero Photograph"
              initialSelectedId={initialContent.heroGalleryItemId}
              galleryItems={galleryItems}
              helperText="Primary background photo used when single-image mode is active or as the base presentation record."
              defaultFallbackLabel="Storefront entrance with opening balloon display"
            />

            <div style={{ marginBottom: "18px" }}>
              <label style={{ display: "block", fontSize: "0.86rem", fontWeight: 600, color: "var(--wh-navy)", marginBottom: "4px" }}>
                Eyebrow Pill Text
              </label>
              <input
                type="text"
                name="heroEyebrow"
                defaultValue={initialContent.heroEyebrow}
                placeholder="e.g. Welcome to West Hill Community Centre • Scarborough"
                style={{ width: "100%", padding: "10px 12px", border: "1.5px solid var(--wh-pale-sky)", borderRadius: "var(--wh-radius-sm)", fontSize: "0.9rem" }}
              />
            </div>

            <div style={{ marginBottom: "18px" }}>
              <label style={{ display: "block", fontSize: "0.86rem", fontWeight: 600, color: "var(--wh-navy)", marginBottom: "4px" }}>
                Main Hero Headline (H1)
              </label>
              <input
                type="text"
                name="heroTitle"
                defaultValue={initialContent.heroTitle}
                placeholder="e.g. A Place to Connect, Belong & Thrive in Scarborough"
                style={{ width: "100%", padding: "10px 12px", border: "1.5px solid var(--wh-pale-sky)", borderRadius: "var(--wh-radius-sm)", fontSize: "0.9rem", fontWeight: 600 }}
              />
            </div>

            <div style={{ marginBottom: "22px" }}>
              <label style={{ display: "block", fontSize: "0.86rem", fontWeight: 600, color: "var(--wh-navy)", marginBottom: "4px" }}>
                Supporting Narrative
              </label>
              <textarea
                name="heroDescription"
                defaultValue={initialContent.heroDescription}
                rows={3}
                placeholder="Brief description of West Hill Community Centre mission..."
                style={{ width: "100%", padding: "10px 12px", border: "1.5px solid var(--wh-pale-sky)", borderRadius: "var(--wh-radius-sm)", fontSize: "0.9rem", lineHeight: 1.5 }}
              />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "18px" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.86rem", fontWeight: 600, color: "var(--wh-navy)", marginBottom: "4px" }}>
                  Primary CTA Label
                </label>
                <input
                  type="text"
                  name="heroPrimaryCtaLabel"
                  defaultValue={initialContent.heroPrimaryCtaLabel}
                  placeholder="e.g. Explore Programs"
                  style={{ width: "100%", padding: "10px 12px", border: "1.5px solid var(--wh-pale-sky)", borderRadius: "var(--wh-radius-sm)", fontSize: "0.9rem" }}
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.86rem", fontWeight: 600, color: "var(--wh-navy)", marginBottom: "4px" }}>
                  Primary CTA URL
                </label>
                <input
                  type="text"
                  name="heroPrimaryCtaUrl"
                  defaultValue={initialContent.heroPrimaryCtaUrl}
                  placeholder="e.g. /programs"
                  style={{ width: "100%", padding: "10px 12px", border: "1.5px solid var(--wh-pale-sky)", borderRadius: "var(--wh-radius-sm)", fontSize: "0.9rem" }}
                />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.86rem", fontWeight: 600, color: "var(--wh-navy)", marginBottom: "4px" }}>
                  Secondary CTA Label
                </label>
                <input
                  type="text"
                  name="heroSecondaryCtaLabel"
                  defaultValue={initialContent.heroSecondaryCtaLabel}
                  placeholder="e.g. View Events"
                  style={{ width: "100%", padding: "10px 12px", border: "1.5px solid var(--wh-pale-sky)", borderRadius: "var(--wh-radius-sm)", fontSize: "0.9rem" }}
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.86rem", fontWeight: 600, color: "var(--wh-navy)", marginBottom: "4px" }}>
                  Secondary CTA URL
                </label>
                <input
                  type="text"
                  name="heroSecondaryCtaUrl"
                  defaultValue={initialContent.heroSecondaryCtaUrl}
                  placeholder="e.g. /events"
                  style={{ width: "100%", padding: "10px 12px", border: "1.5px solid var(--wh-pale-sky)", borderRadius: "var(--wh-radius-sm)", fontSize: "0.9rem" }}
                />
              </div>
            </div>
          </div>

          {/* 2. WELCOME PANEL */}
          <div style={{ display: activeTab === "welcome" ? "block" : "none" }}>
            <h2 style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--wh-navy)", marginBottom: "4px" }}>
              Welcome / Who We Are Section
            </h2>
            <p style={{ fontSize: "0.85rem", color: "var(--wh-text-muted)", marginBottom: "20px" }}>
              Controls the editorial intro narrative and community photo on the warm sand surface.
            </p>

            <GalleryItemSelector
              name="welcomeGalleryItemId"
              label="Welcome Community Photograph"
              initialSelectedId={initialContent.welcomeGalleryItemId}
              galleryItems={galleryItems}
              helperText="Select a group or community gathering photo from your Gallery. Updates in /admin/gallery update this placement automatically."
              defaultFallbackLabel="Community members outside centre"
            />

            <div style={{ marginBottom: "18px" }}>
              <label style={{ display: "block", fontSize: "0.86rem", fontWeight: 600, color: "var(--wh-navy)", marginBottom: "4px" }}>
                Eyebrow
              </label>
              <input
                type="text"
                name="welcomeEyebrow"
                defaultValue={initialContent.welcomeEyebrow}
                placeholder="e.g. WHO WE ARE"
                style={{ width: "100%", padding: "10px 12px", border: "1.5px solid var(--wh-pale-sky)", borderRadius: "var(--wh-radius-sm)", fontSize: "0.9rem" }}
              />
            </div>

            <div style={{ marginBottom: "18px" }}>
              <label style={{ display: "block", fontSize: "0.86rem", fontWeight: 600, color: "var(--wh-navy)", marginBottom: "4px" }}>
                Section Heading
              </label>
              <input
                type="text"
                name="welcomeHeading"
                defaultValue={initialContent.welcomeHeading}
                placeholder="e.g. A Welcoming Space for Care, Growth & Connection"
                style={{ width: "100%", padding: "10px 12px", border: "1.5px solid var(--wh-pale-sky)", borderRadius: "var(--wh-radius-sm)", fontSize: "0.9rem", fontWeight: 600 }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.86rem", fontWeight: 600, color: "var(--wh-navy)", marginBottom: "4px" }}>
                Short Description
              </label>
              <textarea
                name="welcomeDescription"
                defaultValue={initialContent.welcomeDescription}
                rows={4}
                placeholder="Introduction narrative about West Hill Community Centre..."
                style={{ width: "100%", padding: "10px 12px", border: "1.5px solid var(--wh-pale-sky)", borderRadius: "var(--wh-radius-sm)", fontSize: "0.9rem", lineHeight: 1.5 }}
              />
            </div>
          </div>

          {/* 3. PROGRAMS INTRO PANEL */}
          <div style={{ display: activeTab === "programs" ? "block" : "none" }}>
            <h2 style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--wh-navy)", marginBottom: "4px" }}>
              Programs & Community Services Section
            </h2>
            <p style={{ fontSize: "0.85rem", color: "var(--wh-text-muted)", marginBottom: "20px" }}>
              Controls the introductory heading and subtitle for the homepage programs showcase.
            </p>

            <div
              style={{
                backgroundColor: "rgba(101, 175, 218, 0.1)",
                border: "1px solid var(--wh-pale-sky)",
                borderRadius: "var(--wh-radius-sm)",
                padding: "14px 16px",
                marginBottom: "20px",
                fontSize: "0.84rem",
                color: "var(--wh-navy)",
                display: "flex",
                gap: "10px",
                alignItems: "center",
              }}
            >
              <i className="fas fa-info-circle" style={{ fontSize: "1.1rem", color: "var(--wh-sky-blue)" }}></i>
              <span>
                <strong>Note:</strong> The individual program cards are populated directly from the <strong>Programs CMS</strong>. Manage titles, images, categories, and Display Labels in <a href="/admin/programs" style={{ color: "var(--wh-navy)", fontWeight: 700 }}>/admin/programs</a>.
              </span>
            </div>

            <div style={{ marginBottom: "18px" }}>
              <label style={{ display: "block", fontSize: "0.86rem", fontWeight: 600, color: "var(--wh-navy)", marginBottom: "4px" }}>
                Section Eyebrow
              </label>
              <input
                type="text"
                name="programsEyebrow"
                defaultValue={initialContent.programsEyebrow}
                placeholder="e.g. WHAT WE OFFER"
                style={{ width: "100%", padding: "10px 12px", border: "1.5px solid var(--wh-pale-sky)", borderRadius: "var(--wh-radius-sm)", fontSize: "0.9rem" }}
              />
            </div>

            <div style={{ marginBottom: "18px" }}>
              <label style={{ display: "block", fontSize: "0.86rem", fontWeight: 600, color: "var(--wh-navy)", marginBottom: "4px" }}>
                Section Heading
              </label>
              <input
                type="text"
                name="programsHeading"
                defaultValue={initialContent.programsHeading}
                placeholder="e.g. Programs & Community Services"
                style={{ width: "100%", padding: "10px 12px", border: "1.5px solid var(--wh-pale-sky)", borderRadius: "var(--wh-radius-sm)", fontSize: "0.9rem", fontWeight: 600 }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.86rem", fontWeight: 600, color: "var(--wh-navy)", marginBottom: "4px" }}>
                Short Supporting Sentence
              </label>
              <input
                type="text"
                name="programsDescription"
                defaultValue={initialContent.programsDescription}
                placeholder="e.g. Explore ongoing programs, seasonal initiatives, and partner-led services..."
                style={{ width: "100%", padding: "10px 12px", border: "1.5px solid var(--wh-pale-sky)", borderRadius: "var(--wh-radius-sm)", fontSize: "0.9rem" }}
              />
            </div>
          </div>

          {/* 4. MILESTONE PANEL */}
          <div style={{ display: activeTab === "milestone" ? "block" : "none" }}>
            <h2 style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--wh-navy)", marginBottom: "4px" }}>
              Community Milestone Feature
            </h2>
            <p style={{ fontSize: "0.85rem", color: "var(--wh-text-muted)", marginBottom: "20px" }}>
              Controls the dark navy milestone banner highlighting historic community milestones (e.g. Grand Opening ceremony).
            </p>

            <GalleryItemSelector
              name="milestoneGalleryItemId"
              label="Milestone Ceremony Photograph"
              initialSelectedId={initialContent.milestoneGalleryItemId}
              galleryItems={galleryItems}
              helperText="Select the ceremonial photograph from your Gallery. Can be updated for future anniversaries or community achievements."
              defaultFallbackLabel="Grand Opening Ribbon Cutting Ceremony"
            />

            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "16px", marginBottom: "18px" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.86rem", fontWeight: 600, color: "var(--wh-navy)", marginBottom: "4px" }}>
                  Milestone Eyebrow
                </label>
                <input
                  type="text"
                  name="milestoneEyebrow"
                  defaultValue={initialContent.milestoneEyebrow}
                  placeholder="e.g. Community Milestone • June 9, 2026"
                  style={{ width: "100%", padding: "10px 12px", border: "1.5px solid var(--wh-pale-sky)", borderRadius: "var(--wh-radius-sm)", fontSize: "0.9rem" }}
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.86rem", fontWeight: 600, color: "var(--wh-navy)", marginBottom: "4px" }}>
                  Date Text
                </label>
                <input
                  type="text"
                  name="milestoneDateText"
                  defaultValue={initialContent.milestoneDateText}
                  placeholder="e.g. June 9, 2026"
                  style={{ width: "100%", padding: "10px 12px", border: "1.5px solid var(--wh-pale-sky)", borderRadius: "var(--wh-radius-sm)", fontSize: "0.9rem" }}
                />
              </div>
            </div>

            <div style={{ marginBottom: "18px" }}>
              <label style={{ display: "block", fontSize: "0.86rem", fontWeight: 600, color: "var(--wh-navy)", marginBottom: "4px" }}>
                Milestone Title
              </label>
              <input
                type="text"
                name="milestoneTitle"
                defaultValue={initialContent.milestoneTitle}
                placeholder="e.g. Grand Opening & Ribbon Cutting Ceremony"
                style={{ width: "100%", padding: "10px 12px", border: "1.5px solid var(--wh-pale-sky)", borderRadius: "var(--wh-radius-sm)", fontSize: "0.9rem", fontWeight: 600 }}
              />
            </div>

            <div style={{ marginBottom: "18px" }}>
              <label style={{ display: "block", fontSize: "0.86rem", fontWeight: 600, color: "var(--wh-navy)", marginBottom: "4px" }}>
                Narrative Quote / Short Description
              </label>
              <textarea
                name="milestoneDescription"
                defaultValue={initialContent.milestoneDescription}
                rows={3}
                placeholder="Quote or description of the milestone..."
                style={{ width: "100%", padding: "10px 12px", border: "1.5px solid var(--wh-pale-sky)", borderRadius: "var(--wh-radius-sm)", fontSize: "0.9rem", lineHeight: 1.5 }}
              />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.86rem", fontWeight: 600, color: "var(--wh-navy)", marginBottom: "4px" }}>
                  CTA Label
                </label>
                <input
                  type="text"
                  name="milestoneCtaLabel"
                  defaultValue={initialContent.milestoneCtaLabel}
                  placeholder="e.g. View Opening Event Photo Album"
                  style={{ width: "100%", padding: "10px 12px", border: "1.5px solid var(--wh-pale-sky)", borderRadius: "var(--wh-radius-sm)", fontSize: "0.9rem" }}
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.86rem", fontWeight: 600, color: "var(--wh-navy)", marginBottom: "4px" }}>
                  CTA URL
                </label>
                <input
                  type="text"
                  name="milestoneCtaUrl"
                  defaultValue={initialContent.milestoneCtaUrl}
                  placeholder="e.g. /gallery"
                  style={{ width: "100%", padding: "10px 12px", border: "1.5px solid var(--wh-pale-sky)", borderRadius: "var(--wh-radius-sm)", fontSize: "0.9rem" }}
                />
              </div>
            </div>
          </div>

          {/* 5. FINAL GET INVOLVED CTA PANEL */}
          <div style={{ display: activeTab === "cta" ? "block" : "none" }}>
            <h2 style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--wh-navy)", marginBottom: "4px" }}>
              Final Get Involved Section
            </h2>
            <p style={{ fontSize: "0.85rem", color: "var(--wh-text-muted)", marginBottom: "20px" }}>
              Controls the call-to-action banner and buttons above the footer.
            </p>

            <div style={{ marginBottom: "18px" }}>
              <label style={{ display: "block", fontSize: "0.86rem", fontWeight: 600, color: "var(--wh-navy)", marginBottom: "4px" }}>
                Eyebrow
              </label>
              <input
                type="text"
                name="ctaEyebrow"
                defaultValue={initialContent.ctaEyebrow}
                placeholder="e.g. JOIN THE MOVEMENT"
                style={{ width: "100%", padding: "10px 12px", border: "1.5px solid var(--wh-pale-sky)", borderRadius: "var(--wh-radius-sm)", fontSize: "0.9rem" }}
              />
            </div>

            <div style={{ marginBottom: "18px" }}>
              <label style={{ display: "block", fontSize: "0.86rem", fontWeight: 600, color: "var(--wh-navy)", marginBottom: "4px" }}>
                Heading
              </label>
              <input
                type="text"
                name="ctaHeading"
                defaultValue={initialContent.ctaHeading}
                placeholder="e.g. Be Part of What’s Happening at West Hill"
                style={{ width: "100%", padding: "10px 12px", border: "1.5px solid var(--wh-pale-sky)", borderRadius: "var(--wh-radius-sm)", fontSize: "0.9rem", fontWeight: 600 }}
              />
            </div>

            <div style={{ marginBottom: "24px" }}>
              <label style={{ display: "block", fontSize: "0.86rem", fontWeight: 600, color: "var(--wh-navy)", marginBottom: "4px" }}>
                Short Description
              </label>
              <textarea
                name="ctaDescription"
                defaultValue={initialContent.ctaDescription}
                rows={2}
                placeholder="Brief invitation to participate..."
                style={{ width: "100%", padding: "10px 12px", border: "1.5px solid var(--wh-pale-sky)", borderRadius: "var(--wh-radius-sm)", fontSize: "0.9rem", lineHeight: 1.5 }}
              />
            </div>

            <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--wh-navy)", marginBottom: "12px" }}>
              Pathway Action Buttons (Up to 3)
            </h3>

            {/* Button 1 */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "14px", padding: "12px", backgroundColor: "#F9FBFC", borderRadius: "6px" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "var(--wh-navy)", marginBottom: "4px" }}>
                  Button 1 Label
                </label>
                <input
                  type="text"
                  name="ctaButton1Label"
                  defaultValue={initialContent.ctaButton1Label}
                  placeholder="e.g. Register for Programs"
                  style={{ width: "100%", padding: "8px 10px", border: "1px solid var(--wh-pale-sky)", borderRadius: "4px", fontSize: "0.86rem" }}
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "var(--wh-navy)", marginBottom: "4px" }}>
                  Button 1 URL
                </label>
                <input
                  type="text"
                  name="ctaButton1Url"
                  defaultValue={initialContent.ctaButton1Url}
                  placeholder="e.g. /programs"
                  style={{ width: "100%", padding: "8px 10px", border: "1px solid var(--wh-pale-sky)", borderRadius: "4px", fontSize: "0.86rem" }}
                />
              </div>
            </div>

            {/* Button 2 */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "14px", padding: "12px", backgroundColor: "#F9FBFC", borderRadius: "6px" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "var(--wh-navy)", marginBottom: "4px" }}>
                  Button 2 Label
                </label>
                <input
                  type="text"
                  name="ctaButton2Label"
                  defaultValue={initialContent.ctaButton2Label}
                  placeholder="e.g. Volunteer with Us"
                  style={{ width: "100%", padding: "8px 10px", border: "1px solid var(--wh-pale-sky)", borderRadius: "4px", fontSize: "0.86rem" }}
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "var(--wh-navy)", marginBottom: "4px" }}>
                  Button 2 URL
                </label>
                <input
                  type="text"
                  name="ctaButton2Url"
                  defaultValue={initialContent.ctaButton2Url}
                  placeholder="e.g. /volunteer"
                  style={{ width: "100%", padding: "8px 10px", border: "1px solid var(--wh-pale-sky)", borderRadius: "4px", fontSize: "0.86rem" }}
                />
              </div>
            </div>

            {/* Button 3 */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", padding: "12px", backgroundColor: "#F9FBFC", borderRadius: "6px" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "var(--wh-navy)", marginBottom: "4px" }}>
                  Button 3 Label
                </label>
                <input
                  type="text"
                  name="ctaButton3Label"
                  defaultValue={initialContent.ctaButton3Label}
                  placeholder="e.g. Partner / Sponsor"
                  style={{ width: "100%", padding: "8px 10px", border: "1px solid var(--wh-pale-sky)", borderRadius: "4px", fontSize: "0.86rem" }}
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "var(--wh-navy)", marginBottom: "4px" }}>
                  Button 3 URL
                </label>
                <input
                  type="text"
                  name="ctaButton3Url"
                  defaultValue={initialContent.ctaButton3Url}
                  placeholder="e.g. /partners"
                  style={{ width: "100%", padding: "8px 10px", border: "1px solid var(--wh-pale-sky)", borderRadius: "4px", fontSize: "0.86rem" }}
                />
              </div>
            </div>
          </div>

          {/* 6. SEO PANEL */}
          <div style={{ display: activeTab === "seo" ? "block" : "none" }}>
            <h2 style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--wh-navy)", marginBottom: "4px" }}>
              Homepage Search Engine Optimization (SEO)
            </h2>
            <p style={{ fontSize: "0.85rem", color: "var(--wh-text-muted)", marginBottom: "20px" }}>
              Configure search engine title, meta description, and social share image preview for the homepage.
            </p>

            <div style={{ marginBottom: "18px" }}>
              <label style={{ display: "block", fontSize: "0.86rem", fontWeight: 600, color: "var(--wh-navy)", marginBottom: "4px" }}>
                Homepage SEO Title
              </label>
              <input
                type="text"
                name="seoTitle"
                defaultValue={initialContent.seoTitle}
                placeholder="e.g. West Hill Community Centre | Connecting Communities, Supporting Families"
                style={{ width: "100%", padding: "10px 12px", border: "1.5px solid var(--wh-pale-sky)", borderRadius: "var(--wh-radius-sm)", fontSize: "0.9rem" }}
              />
              <span style={{ fontSize: "0.76rem", color: "var(--wh-text-muted)", marginTop: "4px", display: "block" }}>
                Recommended length: 50–60 characters. Appears in search results and browser tabs.
              </span>
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", fontSize: "0.86rem", fontWeight: 600, color: "var(--wh-navy)", marginBottom: "4px" }}>
                Homepage Meta Description
              </label>
              <textarea
                name="seoDescription"
                defaultValue={initialContent.seoDescription}
                rows={3}
                placeholder="e.g. West Hill Community Centre brings people together through community programs, family support services..."
                style={{ width: "100%", padding: "10px 12px", border: "1.5px solid var(--wh-pale-sky)", borderRadius: "var(--wh-radius-sm)", fontSize: "0.9rem", lineHeight: 1.5 }}
              />
              <span style={{ fontSize: "0.76rem", color: "var(--wh-text-muted)", marginTop: "4px", display: "block" }}>
                Recommended length: 140–160 characters. Summarizes the community centre in search listings.
              </span>
            </div>

            <GalleryItemSelector
              name="seoOgGalleryItemId"
              label="Social Share / Open Graph Image"
              initialSelectedId={initialContent.seoOgGalleryItemId}
              galleryItems={galleryItems}
              helperText="Optional custom share card image for Facebook, LinkedIn, Twitter/X, and messaging apps. If empty, the default /assets/images/og-share.png is used."
              defaultFallbackLabel="Default branded OG Share card (/assets/images/og-share.png)"
            />
          </div>
        </div>

        {/* Action Toolbar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "16px 20px",
            backgroundColor: "var(--wh-bg-white)",
            borderRadius: "var(--wh-radius-md)",
            border: "1px solid var(--wh-pale-sky)",
            boxShadow: "var(--wh-shadow-soft)",
            position: "sticky",
            bottom: "20px",
            zIndex: 30,
          }}
        >
          <div style={{ fontSize: "0.84rem", color: "var(--wh-text-muted)" }}>
            Changes will take effect immediately across the public homepage.
          </div>

          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <button
              type="submit"
              disabled={isSaving}
              style={{
                padding: "11px 26px",
                backgroundColor: "var(--wh-navy)",
                color: "var(--wh-bg-white)",
                border: "none",
                borderRadius: "var(--wh-radius-sm)",
                fontSize: "0.92rem",
                fontWeight: 700,
                cursor: isSaving ? "not-allowed" : "pointer",
                opacity: isSaving ? 0.7 : 1,
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                transition: "all 0.15s ease",
              }}
            >
              {isSaving ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i>
                  <span>Saving Changes...</span>
                </>
              ) : (
                <>
                  <i className="fas fa-floppy-disk"></i>
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
