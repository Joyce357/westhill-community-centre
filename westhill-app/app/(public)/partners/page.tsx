import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import PartnershipForm from "@/components/forms/PartnershipForm";
import { getSiteSettings, getPublishedPartners } from "@/lib/queries";

import { getCanonicalUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Partners & Community Builders",
  description:
    "Explore community partnerships, sponsorship opportunities, and grassroots collaborations building a stronger East Scarborough.",
  alternates: {
    canonical: getCanonicalUrl("/partners"),
  },
  openGraph: {
    title: "Partners & Community Builders | West Hill Community Centre",
    description:
      "Explore community partnerships, sponsorship opportunities, and grassroots collaborations building a stronger East Scarborough.",
    url: getCanonicalUrl("/partners"),
  },
};

export default async function PartnersPage() {
  const [settings, partners] = await Promise.all([
    getSiteSettings(),
    getPublishedPartners(),
  ]);

  return (
    <>
      <PageHero
        title="Community Builders & Partners"
        subtitle="Collaboration drives our mission. Together with grassroots groups, corporate sponsors, and local service providers, we build a thriving Scarborough."
      />

      <section className="section" aria-label="Community Builders Overview">
        <div className="container">
          <div className="section-header active" style={{ opacity: 1, transform: "none" }}>
            <h2>Partnering for Greater Impact</h2>
            <p>
              West Hill Community Centre actively partners with local service agencies, healthcare teams, school boards, and philanthropic sponsors to deliver vital programming.
            </p>
          </div>

          {/* Strategic Sponsorship Levels and Real Form */}
          <div className="grid-2" style={{ gap: "45px", marginBottom: "60px", alignItems: "start" }}>
            <div
              className="standard-card-container"
              style={{
                backgroundColor: "var(--wh-bg-white)",
                border: "1px solid var(--wh-pale-sky)",
                boxShadow: "var(--wh-shadow-soft)",
              }}
            >
              <h3 style={{ color: "var(--wh-navy)", marginBottom: "20px", fontFamily: "var(--wh-font-primary)", fontSize: "1.4rem", fontWeight: 700 }}>
                Sponsorship Opportunities
              </h3>
              <p style={{ fontSize: "0.92rem", lineHeight: 1.6, marginBottom: "25px", color: "var(--wh-text-body)" }}>
                Invest directly in community empowerment. Sponsoring our annual events or dedicated program lines delivers tangible benefits to Scarborough residents:
              </p>

              <div style={{ marginBottom: "20px" }}>
                <h4 style={{ color: "var(--wh-navy)", fontSize: "1.15rem", marginBottom: "8px", fontWeight: 700 }}>
                  <i className="fas fa-medal" style={{ color: "var(--wh-sun-gold)", marginRight: "8px" }}></i> Cornerstone Partner
                </h4>
                <p style={{ fontSize: "0.92rem", lineHeight: 1.5, color: "var(--wh-text-body)", marginLeft: "25px" }}>
                  Provides foundational support for our full facility operations, community tech hub stations, and major annual celebrations (e.g., West Hill Day).
                </p>
              </div>

              <div style={{ marginBottom: "20px" }}>
                <h4 style={{ color: "var(--wh-navy)", fontSize: "1.15rem", marginBottom: "8px", fontWeight: 700 }}>
                  <i className="fas fa-medal" style={{ color: "#A0AEC0", marginRight: "8px" }}></i> Community Builder
                </h4>
                <p style={{ fontSize: "0.92rem", lineHeight: 1.5, color: "var(--wh-text-body)", marginLeft: "25px" }}>
                  Sponsors housing counseling guides, family settlement support kits, and parent tutoring supplies.
                </p>
              </div>

              <div style={{ marginBottom: "28px" }}>
                <h4 style={{ color: "var(--wh-community-green)", fontSize: "1.15rem", marginBottom: "8px", fontWeight: 700 }}>
                  <i className="fas fa-medal" style={{ color: "var(--wh-community-orange)", marginRight: "8px" }}></i> Youth Advocate Level
                </h4>
                <p style={{ fontSize: "0.92rem", lineHeight: 1.5, color: "var(--wh-text-body)", marginLeft: "25px" }}>
                  Sponsors educational field trips, mentorship materials, and athletic supplies for youth leadership participants.
                </p>
              </div>

              <div style={{ backgroundColor: "var(--wh-bg-soft)", padding: "18px", borderRadius: "var(--wh-radius-sm)", border: "1px solid var(--wh-pale-sky)" }}>
                <div style={{ fontSize: "0.88rem", marginBottom: "8px" }}>
                  <strong>Partnership Desk:</strong>{" "}
                  <a href={`mailto:${settings.primaryEmail}`} style={{ color: "var(--wh-navy)", fontWeight: 600 }}>
                    {settings.primaryEmail}
                  </a>
                </div>
                <div style={{ fontSize: "0.88rem" }}>
                  <strong>Office Phone:</strong>{" "}
                  <a href={`tel:${settings.phone.replace(/[^0-9]/g, "")}`} style={{ color: "var(--wh-navy)", fontWeight: 600 }}>
                    {settings.phone}
                  </a>
                </div>
              </div>
            </div>

            {/* Real Interactive Partnership Proposal Form */}
            <div>
              <PartnershipForm />
            </div>
          </div>

          {/* Dedicated Community Partners Showcase Section */}
          {partners.length > 0 && (
            <div className="section-alt standard-card-container" style={{ marginTop: "20px" }}>
              <div style={{ textAlign: "center", maxWidth: "750px", margin: "0 auto 35px" }}>
                <h3 style={{ color: "var(--wh-navy)", fontSize: "1.6rem", marginBottom: "12px", fontFamily: "var(--wh-font-primary)", fontWeight: 700 }}>
                  Our Community Partners & Collaborators
                </h3>
                <p style={{ fontSize: "0.95rem", lineHeight: 1.6, color: "var(--wh-text-body)" }}>
                  We are proud to collaborate with educational institutions, healthcare leaders, philanthropic foundations, and community builders across Scarborough.
                </p>
              </div>

              <div className="grid-3" style={{ gap: "25px" }}>
                {partners.map((partner) => (
                  <div
                    key={partner.id}
                    style={{
                      backgroundColor: "var(--wh-bg-white)",
                      borderRadius: "var(--wh-radius-md)",
                      border: "1px solid var(--wh-pale-sky)",
                      padding: "24px",
                      boxShadow: "var(--wh-shadow-soft)",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px", gap: "8px" }}>
                        <span
                          style={{
                            fontSize: "0.75rem",
                            fontWeight: 600,
                            padding: "3px 10px",
                            borderRadius: "var(--wh-radius-full)",
                            backgroundColor: "rgba(101, 175, 218, 0.15)",
                            color: "var(--wh-navy)",
                          }}
                        >
                          {partner.tier || "Community Partner"}
                        </span>
                        {partner.isFeatured && (
                          <span
                            style={{
                              fontSize: "0.72rem",
                              fontWeight: 700,
                              color: "var(--wh-sun-gold)",
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "4px",
                            }}
                          >
                            <i className="fas fa-star"></i> Featured
                          </span>
                        )}
                      </div>

                      <h4 style={{ color: "var(--wh-navy)", fontSize: "1.1rem", marginBottom: "8px", fontWeight: 700, fontFamily: "var(--wh-font-primary)" }}>
                        {partner.name}
                      </h4>

                      {partner.description && (
                        <p style={{ fontSize: "0.88rem", lineHeight: 1.5, color: "var(--wh-text-body)", marginBottom: "16px" }}>
                          {partner.description}
                        </p>
                      )}
                    </div>

                    {partner.websiteUrl && (
                      <div style={{ paddingTop: "12px", borderTop: "1px solid rgba(210, 234, 242, 0.6)" }}>
                        <a
                          href={partner.websiteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            fontSize: "0.85rem",
                            fontWeight: 600,
                            color: "var(--wh-sky-blue)",
                            textDecoration: "none",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "6px",
                          }}
                        >
                          Visit Organization <i className="fas fa-external-link-alt" style={{ fontSize: "0.75rem" }}></i>
                        </a>
                      </div>
                    )}
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

