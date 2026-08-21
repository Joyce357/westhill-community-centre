import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import PartnershipForm from "@/components/forms/PartnershipForm";
import { getSiteSettings } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Partners & Community Builders | West Hill Community Centre",
  description:
    "Explore community partnerships, sponsorship tiers, and collaborative initiatives supporting Scarborough residents.",
};

export default async function PartnersPage() {
  const settings = await getSiteSettings();

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
                  Sponsors educational field trips, mentorship materials, and athletic supplies for youth hub participants.
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
        </div>
      </section>
    </>
  );
}
