import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import { getPublishedResources, getSiteMediaSlot } from "@/lib/queries";

import { getCanonicalUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Community Resources & Downloads",
  description:
    "Download community guides, program schedules, volunteer intake packages, and essential civic resources for Scarborough families.",
  alternates: {
    canonical: getCanonicalUrl("/resources"),
  },
  openGraph: {
    title: "Community Resources & Downloads | West Hill Community Centre",
    description:
      "Download community guides, program schedules, volunteer intake packages, and essential civic resources for Scarborough families.",
    url: getCanonicalUrl("/resources"),
  },
};

export default async function ResourcesPage() {
  const [
    allResources,
    housingMedia,
    employmentMedia,
    familyMedia,
    youthMedia,
    seniorsMedia,
    healthMedia,
  ] = await Promise.all([
    getPublishedResources(),
    getSiteMediaSlot("resources-hub-housing"),
    getSiteMediaSlot("resources-hub-employment"),
    getSiteMediaSlot("resources-hub-family"),
    getSiteMediaSlot("resources-hub-youth"),
    getSiteMediaSlot("resources-hub-seniors"),
    getSiteMediaSlot("resources-hub-health"),
  ]);

  const downloadItems = allResources.filter(
    (r) => (r.category || "").toLowerCase() === "downloads" || r.resourceType === "DOCUMENT" || r.resourceType === "GUIDE"
  );

  const connectionItems = allResources.filter(
    (r) => (r.category || "").toLowerCase() === "community connections" || r.resourceType === "EXTERNAL_LINK"
  );

  return (
    <>
      <PageHero
        title="Community Resources"
        subtitle="Helping residents connect with local services, opportunities, support programs, and important community information."
      />

      <section className="section" aria-label="Community Resources Hub">
        <div className="container">
          <div className="section-header active" style={{ marginBottom: "50px", opacity: 1, transform: "none" }}>
            <h2>Support Services & Opportunities Hub</h2>
            <p>
              Explore resources, workshops, and support programs curated to empower individuals, families, youth, and seniors in Scarborough-West Hill.
            </p>
          </div>

          {/* Hub Categories Grid */}
          <div className="resources-grid">
            {/* Category 1: Housing Support */}
            <div className="resource-hub-card active" style={{ opacity: 1, transform: "none" }}>
              <div className="resource-card-image" style={{ height: "200px", position: "relative", overflow: "hidden" }}>
                <Image
                  src={housingMedia.mediaUrl}
                  alt={housingMedia.altText}
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  style={{ objectFit: "cover" }}
                />
                <span className="resource-card-badge">
                  <i className="fas fa-house-chimney"></i> Housing
                </span>
              </div>
              <div className="resource-card-content">
                <h3>Housing Support</h3>
                <p>Access assistance for housing placement, tenant rights, emergency shelter, and affordable programs.</p>
                <ul className="resource-checklist">
                  <li><i className="fas fa-check-circle"></i> Housing referrals and application support</li>
                  <li><i className="fas fa-check-circle"></i> Tenant rights and legal resource advocacy</li>
                  <li><i className="fas fa-check-circle"></i> Emergency housing placement assistance</li>
                  <li><i className="fas fa-check-circle"></i> Community housing program coordination</li>
                </ul>
                <div className="resource-card-actions">
                  <Link href="/contact" className="btn btn-blue">
                    Connect with Support
                  </Link>
                </div>
              </div>
            </div>

            {/* Category 2: Employment & Career Resources */}
            <div className="resource-hub-card active" style={{ opacity: 1, transform: "none" }}>
              <div className="resource-card-image" style={{ height: "200px", position: "relative", overflow: "hidden" }}>
                <Image
                  src={employmentMedia.mediaUrl}
                  alt={employmentMedia.altText}
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  style={{ objectFit: "cover" }}
                />
                <span className="resource-card-badge">
                  <i className="fas fa-briefcase"></i> Careers
                </span>
              </div>
              <div className="resource-card-content">
                <h3>Employment & Career</h3>
                <p>Get connected with search assistance, resume development, interview prep, and skills training.</p>
                <ul className="resource-checklist">
                  <li><i className="fas fa-check-circle"></i> Employment guidance and counseling</li>
                  <li><i className="fas fa-check-circle"></i> Resume writing and review workshops</li>
                  <li><i className="fas fa-check-circle"></i> Local job search and board databases</li>
                  <li><i className="fas fa-check-circle"></i> Skill building and training opportunities</li>
                </ul>
                <div className="resource-card-actions">
                  <Link href="/contact" className="btn btn-blue">
                    Access Employment Help
                  </Link>
                </div>
              </div>
            </div>

            {/* Category 3: Family & Children Services */}
            <div className="resource-hub-card active" style={{ opacity: 1, transform: "none" }}>
              <div className="resource-card-image" style={{ height: "200px", position: "relative", overflow: "hidden" }}>
                <Image
                  src={familyMedia.mediaUrl}
                  alt={familyMedia.altText}
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  style={{ objectFit: "cover" }}
                />
                <span className="resource-card-badge">
                  <i className="fas fa-child-reaching"></i> Families
                </span>
              </div>
              <div className="resource-card-content">
                <h3>Family & Children Services</h3>
                <p>Comprehensive resources for parenting supports, childcare navigation, and family wellness.</p>
                <ul className="resource-checklist">
                  <li><i className="fas fa-check-circle"></i> Parenting workshops and support networks</li>
                  <li><i className="fas fa-check-circle"></i> Local childcare and daycare navigation</li>
                  <li><i className="fas fa-check-circle"></i> Early childhood development circles</li>
                  <li><i className="fas fa-check-circle"></i> Family health and counseling referrals</li>
                </ul>
                <div className="resource-card-actions">
                  <Link href="/contact" className="btn btn-blue">
                    Access Family Support
                  </Link>
                </div>
              </div>
            </div>

            {/* Category 4: Youth Opportunities */}
            <div className="resource-hub-card active" style={{ opacity: 1, transform: "none" }}>
              <div className="resource-card-image" style={{ height: "200px", position: "relative", overflow: "hidden" }}>
                <Image
                  src={youthMedia.mediaUrl}
                  alt={youthMedia.altText}
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  style={{ objectFit: "cover" }}
                />
                <span className="resource-card-badge">
                  <i className="fas fa-graduation-cap"></i> Youth
                </span>
              </div>
              <div className="resource-card-content">
                <h3>Youth Opportunities</h3>
                <p>Connecting Scarborough youth to volunteer hours, leadership programs, and career mentorship.</p>
                <ul className="resource-checklist">
                  <li><i className="fas fa-check-circle"></i> Leadership programs and student councils</li>
                  <li><i className="fas fa-check-circle"></i> High school volunteer hours tracking</li>
                  <li><i className="fas fa-check-circle"></i> Career mentorship and tutor circles</li>
                  <li><i className="fas fa-check-circle"></i> Recreation and team building events</li>
                </ul>
                <div className="resource-card-actions">
                  <Link href="/contact" className="btn btn-blue">
                    Explore Youth Programs
                  </Link>
                </div>
              </div>
            </div>

            {/* Category 5: Seniors Resources */}
            <div className="resource-hub-card active" style={{ opacity: 1, transform: "none" }}>
              <div className="resource-card-image" style={{ height: "200px", position: "relative", overflow: "hidden" }}>
                <Image
                  src={seniorsMedia.mediaUrl}
                  alt={seniorsMedia.altText}
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  style={{ objectFit: "cover" }}
                />
                <span className="resource-card-badge">
                  <i className="fas fa-person-cane"></i> Seniors
                </span>
              </div>
              <div className="resource-card-content">
                <h3>Seniors Resources</h3>
                <p>Programs designed to support wellness, community engagement, and social support for older adults.</p>
                <ul className="resource-checklist">
                  <li><i className="fas fa-check-circle"></i> Seniors social club and daily activities</li>
                  <li><i className="fas fa-check-circle"></i> Computer and smartphone tech clinics</li>
                  <li><i className="fas fa-check-circle"></i> Guided fitness and wellness workshops</li>
                  <li><i className="fas fa-check-circle"></i> Free annual tax assistance services</li>
                </ul>
                <div className="resource-card-actions">
                  <Link href="/contact" className="btn btn-blue">
                    Explore Seniors Programs
                  </Link>
                </div>
              </div>
            </div>

            {/* Category 6: Health & Wellness Resources */}
            <div className="resource-hub-card active" style={{ opacity: 1, transform: "none" }}>
              <div className="resource-card-image" style={{ height: "200px", position: "relative", overflow: "hidden" }}>
                <Image
                  src={healthMedia.mediaUrl}
                  alt={healthMedia.altText}
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  style={{ objectFit: "cover" }}
                />
                <span className="resource-card-badge">
                  <i className="fas fa-heart-pulse"></i> Health
                </span>
              </div>
              <div className="resource-card-content">
                <h3>Health & Wellness</h3>
                <p>Access physical wellness services, mental health counseling referrals, and public health guidelines.</p>
                <ul className="resource-checklist">
                  <li><i className="fas fa-check-circle"></i> Mental health guidance and connections</li>
                  <li><i className="fas fa-check-circle"></i> Local community clinic and medical directories</li>
                  <li><i className="fas fa-check-circle"></i> Community safety and wellness programs</li>
                  <li><i className="fas fa-check-circle"></i> Public health informational workshops</li>
                </ul>
                <div className="resource-card-actions">
                  <Link href="/contact" className="btn btn-blue">
                    Access Health Support
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* FORMS & DOWNLOADS SECTION */}
          <div className="downloads-section active" style={{ opacity: 1, transform: "none" }}>
            <div style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto 30px" }}>
              <h3 style={{ color: "var(--wh-blue-primary)", fontFamily: "var(--wh-font-primary)", fontSize: "1.6rem", marginBottom: "10px" }}>
                Forms & Document Downloads
              </h3>
              <p style={{ fontSize: "0.95rem", lineHeight: 1.6, color: "var(--wh-text-body)" }}>
                Download registration packets, calendars, handbooks, and flyers to help guide your participation in West Hill events.
              </p>
            </div>

            <div className="downloads-grid">
              {downloadItems.map((doc) => {
                const isComingSoon = doc.url === "#" || doc.fileSize === "Coming Soon";
                const isDirectDownload = doc.url.startsWith("/assets/documents") || doc.url.endsWith(".pdf");
                const isInternalLink = doc.url.startsWith("/") && !isDirectDownload;

                return (
                  <div key={doc.id} className="download-doc-card">
                    <div className="download-doc-info">
                      <div className="download-doc-icon" style={{ opacity: isComingSoon ? 0.5 : 1 }}>
                        <i className={doc.icon || "fas fa-file-pdf"}></i>
                      </div>
                      <div className="download-doc-details">
                        <h4>{doc.title}</h4>
                        <p>{doc.fileSize || (doc.description ? doc.description.substring(0, 40) + "..." : "Document Info")}</p>
                      </div>
                    </div>

                    {isComingSoon ? (
                      <button
                        className="download-doc-btn"
                        disabled
                        style={{ opacity: 0.5, cursor: "not-allowed" }}
                        aria-label={`${doc.title} Coming Soon`}
                      >
                        <i className="fas fa-clock"></i>
                      </button>
                    ) : isDirectDownload ? (
                      <a
                        href={doc.url}
                        className="download-doc-btn"
                        download
                        aria-label={`Download ${doc.title}`}
                        style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", textDecoration: "none" }}
                      >
                        <i className="fas fa-download"></i>
                      </a>
                    ) : isInternalLink ? (
                      <Link href={doc.url} className="download-doc-btn" aria-label={`View ${doc.title}`}>
                        <i className="fas fa-arrow-right"></i>
                      </Link>
                    ) : (
                      <a
                        href={doc.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="download-doc-btn"
                        aria-label={`Visit ${doc.title}`}
                        style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", textDecoration: "none" }}
                      >
                        <i className="fas fa-external-link-alt"></i>
                      </a>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* External Helpful links Section */}
          {connectionItems.length > 0 && (
            <div className="section-alt standard-card-container" style={{ marginTop: "50px" }}>
              <h3 style={{ color: "var(--wh-blue-primary)", fontSize: "1.6rem", marginBottom: "25px", textAlign: "center", fontFamily: "var(--wh-font-primary)" }}>
                Helpful Community Connections
              </h3>
              <p style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto 40px", lineHeight: 1.6 }}>
                If you need assistance beyond our current offerings, check out these local Scarborough and Toronto services:
              </p>

              <div className="grid-3" style={{ gap: "30px" }}>
                {connectionItems.map((conn) => (
                  <div
                    key={conn.id}
                    style={{
                      backgroundColor: "var(--wh-bg-white)",
                      padding: "25px",
                      borderRadius: "var(--wh-radius-md)",
                      border: "1px solid rgba(15, 59, 106, 0.04)",
                    }}
                  >
                    <h4 style={{ color: "var(--wh-blue-primary)", marginBottom: "12px", fontFamily: "var(--wh-font-primary)", fontSize: "1.15rem" }}>
                      <i className={conn.icon || "fas fa-landmark"} style={{ color: "var(--wh-orange-accent)", marginRight: "8px" }}></i> {conn.title}
                    </h4>
                    {conn.description && (
                      <p style={{ fontSize: "0.9rem", lineHeight: 1.5, marginBottom: "15px", color: "var(--wh-text-body)" }}>
                        {conn.description}
                      </p>
                    )}
                    <a
                      href={conn.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--wh-blue-primary)" }}
                    >
                      Visit Website <i className="fas fa-external-link-alt" style={{ fontSize: "0.75rem" }}></i>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

