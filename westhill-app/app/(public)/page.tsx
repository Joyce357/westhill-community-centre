import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import HomeCurrentNotice from "@/components/HomeCurrentNotice";
import HeroBackgroundSlideshow from "@/components/HeroBackgroundSlideshow";
import { getHomepageContent, getFeaturedPrograms } from "@/lib/queries";

// ============================================================================
// CIVIC EDITORIAL HOMEPAGE (STITCH SPECIFICATION)
// Backed dynamically by Neon CMS & HomepageContent
// Authentic assets and verified Scarborough civic data
// ============================================================================

export async function generateMetadata(): Promise<Metadata> {
  const { content, media } = await getHomepageContent();
  const title = content.seoTitle || "West Hill Community Centre | Connecting Communities, Supporting Families";
  const description = content.seoDescription || "West Hill Community Centre brings people together through community programs, family support services, youth development initiatives, and local advocacy in Scarborough.";
  const ogImageUrl = media.ogImage?.mediaUrl || "/assets/images/og-share.png";

  return {
    title,
    description,
    alternates: {
      canonical: "https://westhillcommunitycentre.ca",
    },
    openGraph: {
      title,
      description,
      url: "https://westhillcommunitycentre.ca",
      siteName: "West Hill Community Centre",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: media.ogImage?.altText || "West Hill Community Centre",
        },
      ],
      locale: "en_CA",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImageUrl],
    },
  };
}

export default async function HomePage() {
  const [{ content, media }, featuredProgramRecords] = await Promise.all([
    getHomepageContent(),
    getFeaturedPrograms(),
  ]);

  // Featured + published Program records (Programs CMS), ordered by displayOrder
  const featuredPrograms = featuredProgramRecords.slice(0, 6);

  return (
    <>
      {/* =====================================================================
          1. HERO SECTION (Full-bleed midnight navy with authentic photograph)
          ===================================================================== */}
      <section className="civic-hero-section" aria-label="Welcome to West Hill Community Centre">
        {/* Authentic Auto-Rotating Community Background Slideshow */}
        <HeroBackgroundSlideshow slides={media.heroSlides} />
        <div className="civic-hero-overlay" aria-hidden="true"></div>

        <div className="civic-container">
          <div className="civic-hero-content">
            {/* Eyebrow Pill */}
            <div
              className="civic-eyebrow-pill"
              style={{
                backgroundColor: "rgba(25, 56, 92, 0.9)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                color: "var(--civic-tertiary-fixed)",
                marginBottom: "20px",
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
              <span>{content.heroEyebrow}</span>
            </div>

            {/* Main Headline */}
            <h1 className="civic-heading-hero">
              {content.heroTitle === "A Place to Connect, Belong & Thrive in Scarborough" ? (
                <>
                  A Place to{" "}
                  <span style={{ color: "var(--civic-tertiary-mustard)" }}>Connect, Belong</span>{" "}
                  &amp;{" "}
                  <span style={{ color: "var(--civic-secondary-fixed)" }}>Thrive</span>{" "}
                  in Scarborough
                </>
              ) : (
                content.heroTitle
              )}
            </h1>

            {/* Supporting Narrative */}
            <p
              className="civic-body-lg"
              style={{
                color: "var(--civic-primary-fixed-dim)",
                maxWidth: "680px",
                marginTop: "16px",
                marginBottom: "0",
              }}
            >
              {content.heroDescription}
            </p>

            {/* Action Buttons */}
            <div className="civic-hero-actions">
              <Link href={content.heroPrimaryCtaUrl || "/programs"} className="civic-btn-gold">
                <span>{content.heroPrimaryCtaLabel || "Explore Programs"}</span>
                <i className="fas fa-arrow-right"></i>
              </Link>
              <Link href={content.heroSecondaryCtaUrl || "/events"} className="civic-btn-navy">
                <i className="fas fa-calendar-alt"></i>
                <span>{content.heroSecondaryCtaLabel || "View Events"}</span>
              </Link>
            </div>
          </div>

          {/* 4 Quick Feature Pills Bar */}
          <div className="civic-hero-pills-bar">
            <div className="civic-hero-pill-item">
              <i className="fas fa-location-dot civic-hero-pill-icon" style={{ color: "var(--civic-tertiary-mustard)" }}></i>
              <div className="civic-hero-pill-text">
                <span className="civic-hero-pill-label" style={{ color: "var(--civic-tertiary-fixed)" }}>Active Civic Hub</span>
                <span className="civic-hero-pill-val">Unit 4, 4234 Lawrence Ave E</span>
              </div>
            </div>

            <div className="civic-hero-pill-item">
              <i className="fas fa-hand-holding-heart civic-hero-pill-icon" style={{ color: "var(--civic-secondary-fixed)" }}></i>
              <div className="civic-hero-pill-text">
                <span className="civic-hero-pill-label" style={{ color: "var(--civic-secondary-fixed)" }}>Community Programs</span>
                <span className="civic-hero-pill-val">Free &amp; Subsidized Drop-In</span>
              </div>
            </div>

            <div className="civic-hero-pill-item">
              <i className="fas fa-calendar-check civic-hero-pill-icon" style={{ color: "var(--civic-primary-fixed)" }}></i>
              <div className="civic-hero-pill-text">
                <span className="civic-hero-pill-label" style={{ color: "var(--civic-primary-fixed-dim)" }}>Flexible Access</span>
                <span className="civic-hero-pill-val">Drop-In &amp; Registered</span>
              </div>
            </div>

            <div className="civic-hero-pill-item">
              <i className="fas fa-universal-access civic-hero-pill-icon" style={{ color: "var(--civic-secondary-fixed)" }}></i>
              <div className="civic-hero-pill-text">
                <span className="civic-hero-pill-label" style={{ color: "var(--civic-secondary-fixed)" }}>Certified Space</span>
                <span className="civic-hero-pill-val">AODA Barrier-Free</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          1B. CURRENT NOTICE / WHAT'S HAPPENING (Dynamic Announcement from CMS)
          ===================================================================== */}
      <HomeCurrentNotice />

      {/* =====================================================================
          2. WELCOME / WHO WE ARE SECTION (Warm Sunlit Surface #FAF9F5)
          ===================================================================== */}
      <section className="civic-section-sand" id="welcome-section" aria-label="Welcome and What We Do">
        <div className="civic-container">
          <div className="civic-welcome-grid">
            {/* Left Editorial Content */}
            <div>
              <span className="civic-eyebrow" style={{ color: "var(--civic-secondary)" }}>
                <span
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    backgroundColor: "var(--civic-secondary)",
                    display: "inline-block",
                  }}
                ></span>
                {content.welcomeEyebrow}
              </span>

              <h2 className="civic-heading-lg" style={{ marginTop: "12px", marginBottom: "16px" }}>
                {content.welcomeHeading}
              </h2>

              <p className="civic-body-md" style={{ color: "var(--civic-on-surface-variant)", marginBottom: "24px", lineHeight: 1.65 }}>
                {content.welcomeDescription}
              </p>

              {/* 3 High-Contrast Micro-Feature Cards */}
              <div className="civic-micro-features">
                <div className="civic-micro-feature">
                  <div className="civic-micro-icon" style={{ color: "var(--civic-primary)" }}>
                    <i className="fas fa-users-rays"></i>
                  </div>
                  <div className="civic-micro-content">
                    <h4>Inclusive Sanctuary</h4>
                    <p>Safe, barrier-free multi-use spaces welcoming all cultural backgrounds, abilities, and identities across Scarborough.</p>
                  </div>
                </div>

                <div className="civic-micro-feature">
                  <div className="civic-micro-icon" style={{ color: "var(--civic-secondary)" }}>
                    <i className="fas fa-hands-holding-circle"></i>
                  </div>
                  <div className="civic-micro-content">
                    <h4>Youth &amp; Elder Bridging</h4>
                    <p>Dedicated mentorship circles connecting teens with community elders for mutual learning, cultural traditions, and heritage.</p>
                  </div>
                </div>

                <div className="civic-micro-feature">
                  <div className="civic-micro-icon" style={{ color: "var(--civic-tertiary-mustard)" }}>
                    <i className="fas fa-handshake-angle"></i>
                  </div>
                  <div className="civic-micro-content">
                    <h4>Local Community Care</h4>
                    <p>Responsive grassroots food hampers, wellness navigation, and neighbourhood initiatives driven by local residents.</p>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: "18px" }}>
                <Link
                  href="/about"
                  className="civic-program-card-action"
                  style={{ fontWeight: 700, fontSize: "14px" }}
                >
                  <span>Read our complete story and community charter</span>
                  <i className="fas fa-arrow-right"></i>
                </Link>
              </div>
            </div>

            {/* Right Photographic Column with Approved Overlay Badge */}
            <div className="civic-welcome-media-wrap">
              <div className="civic-welcome-media-frame">
                <Image
                  src={media.welcome.mediaUrl}
                  alt={media.welcome.altText}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 991px) 100vw, 550px"
                />
              </div>

              {/* Image badge: approved wording for the default photo, otherwise the selected Gallery item title */}
              {(media.welcome.isDefault || media.welcome.title) && (
                <div className="civic-welcome-media-badge">
                  <i className="fas fa-users"></i>
                  <span>
                    {media.welcome.isDefault
                      ? "Grand Opening of West Hill Community Centre"
                      : media.welcome.title}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          3. PROGRAMS & COMMUNITY SERVICES (Surface Container Low #F4F4F0)
          ===================================================================== */}
      <section className="civic-section-sand-low" id="programs-section" aria-label="Programs and Community Services">
        <div className="civic-container">
          {/* Section Header */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              gap: "24px",
              flexWrap: "wrap",
              marginBottom: "36px",
            }}
          >
            <div style={{ maxWidth: "680px" }}>
              <span className="civic-eyebrow" style={{ color: "var(--civic-tertiary-mustard)", marginBottom: "8px" }}>
                {content.programsEyebrow}
              </span>
              <h2 className="civic-heading-lg" style={{ margin: "8px 0" }}>
                {content.programsHeading}
              </h2>
              <p className="civic-body-md" style={{ color: "var(--civic-on-surface-variant)", margin: 0 }}>
                {content.programsDescription}
              </p>
            </div>

            <Link href="/programs" className="civic-btn-navy" style={{ flexShrink: 0 }}>
              <span>Explore All Programs</span>
              <i className="fas fa-arrow-right"></i>
            </Link>
          </div>

          {/* Dynamic Editorial Program Cards from Neon CMS */}
          <div className="civic-card-grid-3">
            {featuredPrograms.map((prog) => (
              <article key={prog.id} className="civic-program-card">
                <div className="civic-program-card-media">
                  <Image
                    src={prog.image}
                    alt={prog.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    style={{ objectFit: "cover" }}
                  />
                  <span className="civic-program-card-tag civic-pill-navy">
                    {prog.category || "Community Program"}
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
                    {prog.displayLabel ? (
                      <span
                        className="civic-pill-badge civic-pill-gold"
                        style={{ fontSize: "11px", fontWeight: 700, padding: "3px 8px", borderRadius: "4px" }}
                      >
                        {prog.displayLabel}
                      </span>
                    ) : null}
                  </div>
                </div>
                <div className="civic-program-card-body">
                  <div>
                    <div className="civic-program-card-sublabel">
                      {prog.category || "Neighbourhood Program"}
                    </div>
                    <h3 className="civic-program-card-title">{prog.title}</h3>
                    <p className="civic-program-card-desc">{prog.description}</p>
                  </div>
                  <div className="civic-program-card-footer">
                    <span className="civic-program-card-schedule">
                      {prog.schedule ? (
                        <>
                          <i className="fas fa-clock"></i> {prog.schedule.split(":")[0] || prog.schedule}
                        </>
                      ) : (
                        <>
                          <i className="fas fa-location-dot"></i> {prog.location || "Unit 4, 4234 Lawrence Ave E"}
                        </>
                      )}
                    </span>
                    <Link href={`/programs#${prog.slug}`} className="civic-program-card-action">
                      <span>Learn More</span>
                      <i className="fas fa-arrow-right"></i>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Directory Navigation Anchor */}
          <div style={{ textAlign: "center", marginTop: "44px" }}>
            <Link href="/programs" className="civic-btn-soft">
              <span>View All Programs &amp; Services Directory</span>
              <i className="fas fa-arrow-right"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* =====================================================================
          4. COMMUNITY MILESTONE / PAST HIGHLIGHT (Deep Midnight Navy Band)
          ===================================================================== */}
      <section className="civic-section-navy" aria-label="Community Milestone">
        <div className="civic-container">
          <div style={{ marginBottom: "32px" }}>
            <span
              className="civic-eyebrow-pill"
              style={{
                backgroundColor: "rgba(25, 56, 92, 0.9)",
                color: "var(--civic-tertiary-fixed)",
                marginBottom: "12px",
              }}
            >
              <i className="fas fa-star" style={{ color: "var(--civic-tertiary-mustard)" }}></i>
              <span>{content.milestoneEyebrow}</span>
            </span>
            <h2 className="civic-heading-lg" style={{ color: "#FFFFFF", marginTop: "8px" }}>
              {content.milestoneTitle}
            </h2>
            {content.milestoneDateText && !content.milestoneEyebrow.includes(content.milestoneDateText) && (
              <p className="civic-eyebrow" style={{ color: "var(--civic-tertiary-fixed)", marginTop: "6px" }}>
                <i className="far fa-calendar-alt" style={{ marginRight: "6px" }}></i>
                {content.milestoneDateText}
              </p>
            )}
          </div>

          <div className="civic-milestone-grid">
            {/* Left: Authentic Ceremony Photograph */}
            <div className="civic-milestone-img-wrap">
              <Image
                src={media.milestone.mediaUrl}
                alt={media.milestone.altText}
                fill
                sizes="(max-width: 991px) 100vw, 650px"
                style={{ objectFit: "cover" }}
              />
            </div>

            {/* Right: Narrative Quote and Verified Highlight Stats */}
            <div>
              <div className="civic-milestone-quote-card">
                <span
                  style={{
                    color: "var(--civic-tertiary-mustard)",
                    fontSize: "36px",
                    fontFamily: "serif",
                    lineHeight: 1,
                    display: "block",
                    marginBottom: "4px",
                  }}
                >
                  “
                </span>
                <p className="civic-body-lg" style={{ color: "var(--civic-primary-fixed-dim)", margin: 0 }}>
                  {content.milestoneDescription}
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "16px" }}>
                  <span style={{ width: "28px", height: "2px", backgroundColor: "var(--civic-tertiary-mustard)" }}></span>
                  <span className="civic-eyebrow" style={{ color: "var(--civic-on-primary-container)" }}>
                    A Community Built By Us, For Us
                  </span>
                </div>
              </div>

              <Link
                href={content.milestoneCtaUrl || "/gallery"}
                className="civic-btn-gold"
                style={{ width: "100%", justifyContent: "center" }}
              >
                <span>{content.milestoneCtaLabel || "View Opening Event Photo Album"}</span>
                <i className="fas fa-arrow-right"></i>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          5. GET INVOLVED (Light Warm Sand Surface #FAF9F5)
          ===================================================================== */}
      <section className="civic-section-sand" aria-label="Get Involved Pathways">
        <div className="civic-container">
          <div style={{ textAlign: "center", maxWidth: "680px", margin: "0 auto 48px" }}>
            <span className="civic-eyebrow" style={{ color: "var(--civic-secondary)", marginBottom: "8px" }}>
              {content.ctaEyebrow}
            </span>
            <h2 className="civic-heading-lg" style={{ margin: "8px 0" }}>
              {content.ctaHeading}
            </h2>
            <p className="civic-body-md" style={{ color: "var(--civic-on-surface-variant)", margin: 0 }}>
              {content.ctaDescription}
            </p>
          </div>

          {/* 3 Pathway Cards */}
          <div className="civic-card-grid-3">
            {/* Pathway 1 */}
            <div className="civic-pathway-card">
              <div className="civic-pathway-media">
                <Image
                  src={media.pathway1.mediaUrl}
                  alt={media.pathway1.altText}
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  style={{ objectFit: "cover" }}
                />
                <div className="civic-pathway-icon-pill" style={{ color: "var(--civic-primary)" }}>
                  <i className="fas fa-basketball"></i>
                </div>
              </div>
              <div className="civic-pathway-body">
                <div>
                  <span className="civic-eyebrow" style={{ color: "var(--civic-on-surface-variant)", marginBottom: "6px" }}>
                    Pathway 01
                  </span>
                  <h3 className="civic-heading-sm" style={{ color: "var(--civic-primary)", margin: "4px 0 8px" }}>
                    Explore Programs
                  </h3>
                  <p className="civic-body-sm" style={{ color: "var(--civic-on-surface-variant)", marginBottom: "20px" }}>
                    Join our free sports clinics, youth development labs, seniors lunch club, and after-school academic programs.
                  </p>
                </div>
                <Link href={content.ctaButton1Url || "/programs"} className="civic-btn-soft" style={{ width: "100%", justifyContent: "space-between" }}>
                  <span>{content.ctaButton1Label || "Find Programs"}</span>
                  <i className="fas fa-arrow-right"></i>
                </Link>
              </div>
            </div>

            {/* Pathway 2 */}
            <div className="civic-pathway-card">
              <div className="civic-pathway-media">
                <Image
                  src={media.pathway2.mediaUrl}
                  alt={media.pathway2.altText}
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  style={{ objectFit: "cover" }}
                />
                <div className="civic-pathway-icon-pill" style={{ color: "var(--civic-secondary)" }}>
                  <i className="fas fa-hands-helping"></i>
                </div>
              </div>
              <div className="civic-pathway-body">
                <div>
                  <span className="civic-eyebrow" style={{ color: "var(--civic-on-surface-variant)", marginBottom: "6px" }}>
                    Pathway 02
                  </span>
                  <h3 className="civic-heading-sm" style={{ color: "var(--civic-primary)", margin: "4px 0 8px" }}>
                    Volunteer With Us
                  </h3>
                  <p className="civic-body-sm" style={{ color: "var(--civic-on-surface-variant)", marginBottom: "20px" }}>
                    Lend your time, mentor young leaders, coach athletic activities, or assist with seasonal neighbourhood food distribution events.
                  </p>
                </div>
                <Link href={content.ctaButton2Url || "/volunteer"} className="civic-btn-soft" style={{ width: "100%", justifyContent: "space-between" }}>
                  <span>{content.ctaButton2Label || "Apply to Volunteer"}</span>
                  <i className="fas fa-arrow-right"></i>
                </Link>
              </div>
            </div>

            {/* Pathway 3 */}
            <div className="civic-pathway-card">
              <div className="civic-pathway-media">
                <Image
                  src={media.pathway3.mediaUrl}
                  alt={media.pathway3.altText}
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  style={{ objectFit: "cover" }}
                />
                <div className="civic-pathway-icon-pill" style={{ color: "var(--civic-tertiary-mustard)" }}>
                  <i className="fas fa-handshake"></i>
                </div>
              </div>
              <div className="civic-pathway-body">
                <div>
                  <span className="civic-eyebrow" style={{ color: "var(--civic-on-surface-variant)", marginBottom: "6px" }}>
                    Pathway 03
                  </span>
                  <h3 className="civic-heading-sm" style={{ color: "var(--civic-primary)", margin: "4px 0 8px" }}>
                    Partner &amp; Contact
                  </h3>
                  <p className="civic-body-sm" style={{ color: "var(--civic-on-surface-variant)", marginBottom: "20px" }}>
                    Host a cultural celebration, deliver a community health clinic, book centre space, or collaborate on neighbourhood grant projects.
                  </p>
                </div>
                <Link href={content.ctaButton3Url || "/contact"} className="civic-btn-soft" style={{ width: "100%", justifyContent: "space-between" }}>
                  <span>{content.ctaButton3Label || "Partner With Us"}</span>
                  <i className="fas fa-arrow-right"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
