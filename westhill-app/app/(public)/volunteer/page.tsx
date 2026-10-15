import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import VolunteerForm from "@/components/forms/VolunteerForm";
import { getSiteSettings } from "@/lib/queries";

import { getCanonicalUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Volunteer Opportunities & Civic Service",
  description:
    "Join our volunteer family in East Scarborough. Opportunities for youth mentors, recreation facilitators, senior lunch assistants, and food distribution helpers.",
  alternates: {
    canonical: getCanonicalUrl("/volunteer"),
  },
  openGraph: {
    title: "Volunteer Opportunities & Civic Service | West Hill Community Centre",
    description:
      "Join our volunteer family in East Scarborough. Opportunities for youth mentors, recreation facilitators, senior lunch assistants, and food distribution helpers.",
    url: getCanonicalUrl("/volunteer"),
  },
};

export default async function VolunteerPage() {
  const settings = await getSiteSettings();
  const volEmail = settings.volunteerEmail || "volunteer@westhillcommunity.org";

  return (
    <>
      <PageHero
        title="Volunteer With Us"
        subtitle="Make a lasting difference in Scarborough. Build meaningful relationships, gain resume-ready experience, and give back to your community."
      />

      <section className="section" aria-label="Volunteer Positions">
        <div className="container">
          <div className="section-header active" style={{ opacity: 1, transform: "none" }}>
            <h2>Current Volunteer Opportunities</h2>
            <p>We are actively looking for compassionate, energetic community members to join our team in these key roles.</p>
          </div>

          <div className="grid-3" style={{ gap: "30px", marginBottom: "60px" }}>
            {/* Role 1 */}
            <div
              style={{
                backgroundColor: "var(--wh-bg-white)",
                borderRadius: "var(--wh-radius-md)",
                border: "1px solid var(--wh-pale-sky)",
                padding: "28px",
                boxShadow: "var(--wh-shadow-soft)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--wh-font-primary)",
                  fontSize: "0.72rem",
                  backgroundColor: "var(--wh-pale-sky)",
                  padding: "4px 12px",
                  borderRadius: "var(--wh-radius-full)",
                  width: "fit-content",
                  marginBottom: "15px",
                  fontWeight: 700,
                  color: "var(--wh-navy)",
                }}
              >
                YOUTH DEVELOPMENT & LEADERSHIP
              </span>
              <h3 style={{ color: "var(--wh-navy)", marginBottom: "12px", fontSize: "1.25rem", fontWeight: 700 }}>
                Youth Mentorship & Leadership Tutor
              </h3>
              <p style={{ fontSize: "0.9rem", lineHeight: 1.5, color: "var(--wh-text-body)", marginBottom: "20px", flexGrow: 1 }}>
                Provide after-school homework support, mentor high school students in STEM / math, or guide leadership workshops on weekday afternoons.
              </p>
              <a href="#volunteer-application" className="btn btn-secondary" style={{ padding: "10px 18px", fontSize: "0.82rem", textAlign: "center" }}>
                Apply to Volunteer
              </a>
            </div>

            {/* Role 2 */}
            <div
              style={{
                backgroundColor: "var(--wh-bg-white)",
                borderRadius: "var(--wh-radius-md)",
                border: "1px solid var(--wh-pale-sky)",
                padding: "28px",
                boxShadow: "var(--wh-shadow-soft)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--wh-font-primary)",
                  fontSize: "0.72rem",
                  backgroundColor: "rgba(76, 115, 50, 0.12)",
                  padding: "4px 12px",
                  borderRadius: "var(--wh-radius-full)",
                  width: "fit-content",
                  marginBottom: "15px",
                  fontWeight: 700,
                  color: "var(--wh-community-green)",
                }}
              >
                SENIORS WELLNESS
              </span>
              <h3 style={{ color: "var(--wh-navy)", marginBottom: "12px", fontSize: "1.25rem", fontWeight: 700 }}>
                Seniors Social Facilitator
              </h3>
              <p style={{ fontSize: "0.9rem", lineHeight: 1.5, color: "var(--wh-text-body)", marginBottom: "20px", flexGrow: 1 }}>
                Assist with cooking lunches, hosting active board game tables, managing book clubs, or doing wellness calls to seniors in Morningside-West Hill.
              </p>
              <a href="#volunteer-application" className="btn btn-secondary" style={{ padding: "10px 18px", fontSize: "0.82rem", textAlign: "center" }}>
                Apply to Volunteer
              </a>
            </div>

            {/* Role 3 */}
            <div
              style={{
                backgroundColor: "var(--wh-bg-white)",
                borderRadius: "var(--wh-radius-md)",
                border: "1px solid var(--wh-pale-sky)",
                padding: "28px",
                boxShadow: "var(--wh-shadow-soft)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--wh-font-primary)",
                  fontSize: "0.72rem",
                  backgroundColor: "rgba(246, 142, 35, 0.12)",
                  padding: "4px 12px",
                  borderRadius: "var(--wh-radius-full)",
                  width: "fit-content",
                  marginBottom: "15px",
                  fontWeight: 700,
                  color: "var(--wh-community-orange)",
                }}
              >
                FOOD DRIVES
              </span>
              <h3 style={{ color: "var(--wh-navy)", marginBottom: "12px", fontSize: "1.25rem", fontWeight: 700 }}>
                Food Security Sorter
              </h3>
              <p style={{ fontSize: "0.9rem", lineHeight: 1.5, color: "var(--wh-text-body)", marginBottom: "20px", flexGrow: 1 }}>
                Help sort incoming local community food donations, package weekly grocery hampers, and assist with sorting fresh produce for families facing crisis.
              </p>
              <a href="#volunteer-application" className="btn btn-secondary" style={{ padding: "10px 18px", fontSize: "0.82rem", textAlign: "center" }}>
                Apply to Volunteer
              </a>
            </div>
          </div>

          {/* Volunteer Application & Requirements Section */}
          <div className="section-alt standard-card-container" id="volunteer-application" style={{ border: "1px solid var(--wh-pale-sky)" }}>
            <div className="grid-2" style={{ gap: "50px", alignItems: "start" }}>
              {/* Left Column: Requirements & Direct Coordinator Info */}
              <div>
                <h3 style={{ color: "var(--wh-navy)", fontSize: "1.8rem", marginBottom: "20px", fontWeight: 700 }}>
                  Requirements & Training
                </h3>
                <p style={{ lineHeight: 1.6, marginBottom: "16px", color: "var(--wh-text-body)" }}>
                  To ensure the safety of our program participants (especially youth and seniors), all volunteers are required to complete a training orientation and clear a standard Vulnerable Sector Police Check.
                </p>
                <p style={{ lineHeight: 1.6, marginBottom: "20px", color: "var(--wh-text-body)" }}>
                  For questions regarding community service hour letters for TDSB high school students or college placements, please contact our volunteer coordinator directly at{" "}
                  <strong>{volEmail}</strong>.
                </p>
                <div
                  style={{
                    backgroundColor: "var(--wh-bg-white)",
                    borderRadius: "var(--wh-radius-md)",
                    padding: "20px",
                    border: "1px solid var(--wh-pale-sky)",
                    marginBottom: "20px",
                  }}
                >
                  <h4 style={{ fontSize: "1.05rem", color: "var(--wh-navy)", marginBottom: "10px", fontFamily: "var(--wh-font-primary)", fontWeight: 700 }}>
                    <i className="fas fa-certificate" style={{ color: "var(--wh-sun-gold)", marginRight: "8px" }}></i> Training & Support
                  </h4>
                  <p style={{ fontSize: "0.88rem", lineHeight: 1.5, color: "var(--wh-text-body)", margin: 0 }}>
                    We provide full orientation training, volunteer badges, formal reference letters, and volunteer appreciation banquets twice a year!
                  </p>
                </div>

                <div
                  style={{
                    backgroundColor: "var(--wh-bg-white)",
                    borderRadius: "var(--wh-radius-md)",
                    padding: "20px",
                    border: "1px solid var(--wh-pale-sky)",
                  }}
                >
                  <div style={{ fontSize: "0.88rem", marginBottom: "8px" }}>
                    <strong>Direct Volunteer Desk:</strong>{" "}
                    <a href={`mailto:${volEmail}`} style={{ color: "var(--wh-navy)", fontWeight: 600 }}>
                      {volEmail}
                    </a>
                  </div>
                  <div style={{ fontSize: "0.88rem" }}>
                    <strong>Direct Telephone:</strong>{" "}
                    <a href={`tel:${settings.phone.replace(/[^0-9]/g, "")}`} style={{ color: "var(--wh-navy)", fontWeight: 600 }}>
                      {settings.phone}
                    </a>
                  </div>
                </div>
              </div>

              {/* Right Column: Real Interactive Volunteer Application Form */}
              <div>
                <VolunteerForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
