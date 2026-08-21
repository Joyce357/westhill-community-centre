import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/forms/ContactForm";
import { getSiteSettings } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Contact Us | West Hill Community Centre",
  description: "Get in touch with West Hill Community Centre. Location, operating hours, phone numbers, and transit directions.",
};

export default async function ContactPage() {
  const settings = await getSiteSettings();

  return (
    <>
      <PageHero
        title="Contact Us"
        subtitle="Reach out to our administrators, program coordinators, or community team directly."
      />

      <section className="section" aria-label="Contact Information">
        <div className="container">
          <div className="grid-2" style={{ gap: "50px", marginBottom: "60px", alignItems: "start" }}>
            {/* Left Column: Real Interactive Form */}
            <div className="active" style={{ opacity: 1, transform: "none" }}>
              <ContactForm />
            </div>

            {/* Right Column: Location, Center Hours, TTC Directions */}
            <div className="active" style={{ opacity: 1, transform: "none" }}>
              <h2 style={{ color: "var(--wh-navy)", marginBottom: "25px", fontSize: "1.8rem", fontWeight: 700 }}>
                Our Location & Inquiries
              </h2>

              {/* Direct Info */}
              <div style={{ marginBottom: "25px" }}>
                <p style={{ fontSize: "1.02rem", marginBottom: "12px", display: "flex", alignItems: "center", gap: "10px" }}>
                  <i className="fas fa-map-marker-alt" style={{ color: "var(--wh-community-orange)", width: "20px" }}></i>
                  <span><strong>Address:</strong> {settings.address}, {settings.locationText}</span>
                </p>
                <p style={{ fontSize: "1.02rem", marginBottom: "12px", display: "flex", alignItems: "center", gap: "10px" }}>
                  <i className="fas fa-phone" style={{ color: "var(--wh-community-orange)", width: "20px" }}></i>
                  <span><strong>Phone:</strong> {settings.phone}</span>
                </p>
                <p style={{ fontSize: "1.02rem", marginBottom: "12px", display: "flex", alignItems: "center", gap: "10px" }}>
                  <i className="fas fa-envelope" style={{ color: "var(--wh-community-orange)", width: "20px" }}></i>
                  <span><strong>Email:</strong> {settings.primaryEmail}</span>
                </p>
              </div>

              {/* Center Hours Card */}
              <div
                style={{
                  backgroundColor: "var(--wh-bg-white)",
                  borderRadius: "var(--wh-radius-md)",
                  padding: "22px",
                  marginBottom: "25px",
                  border: "1px solid var(--wh-pale-sky)",
                  boxShadow: "var(--wh-shadow-soft)",
                }}
              >
                <h3
                  style={{
                    fontSize: "1.1rem",
                    color: "var(--wh-navy)",
                    marginBottom: "12px",
                    fontFamily: "var(--wh-font-primary)",
                    fontWeight: 700,
                  }}
                >
                  <i className="fas fa-clock" style={{ color: "var(--wh-community-green)", marginRight: "8px" }}></i>
                  Center Hours
                </h3>
                <table style={{ width: "100%", fontSize: "0.92rem", borderCollapse: "collapse" }}>
                  <tbody>
                    <tr style={{ borderBottom: "1px solid rgba(210, 234, 242, 0.8)" }}>
                      <td style={{ padding: "6px 0", fontWeight: 600 }}>Mon - Fri</td>
                      <td style={{ padding: "6px 0", textAlign: "right" }}>{settings.hours.weekday}</td>
                    </tr>
                    <tr style={{ borderBottom: "1px solid rgba(210, 234, 242, 0.8)" }}>
                      <td style={{ padding: "6px 0", fontWeight: 600 }}>Saturday</td>
                      <td style={{ padding: "6px 0", textAlign: "right" }}>{settings.hours.saturday}</td>
                    </tr>
                    <tr>
                      <td style={{ padding: "6px 0", fontWeight: 600 }}>Sunday</td>
                      <td style={{ padding: "6px 0", textAlign: "right", color: "var(--wh-text-muted)" }}>{settings.hours.sunday}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* TTC Transit Details */}
              <div
                style={{
                  backgroundColor: "var(--wh-bg-white)",
                  borderRadius: "var(--wh-radius-md)",
                  padding: "22px",
                  marginBottom: "25px",
                  border: "1px solid var(--wh-pale-sky)",
                  boxShadow: "var(--wh-shadow-soft)",
                }}
              >
                <h3
                  style={{
                    fontSize: "1.1rem",
                    color: "var(--wh-navy)",
                    marginBottom: "10px",
                    fontFamily: "var(--wh-font-primary)",
                    fontWeight: 700,
                  }}
                >
                  <i className="fas fa-bus" style={{ color: "var(--wh-sky-blue)", marginRight: "8px" }}></i> Public Transit Directions
                </h3>
                <p style={{ fontSize: "0.88rem", lineHeight: 1.5, color: "var(--wh-text-body)", marginBottom: "8px" }}>
                  <strong>TTC Bus Route 54 (Lawrence East):</strong> Stops directly at Morningside Avenue & Lawrence Avenue East, just a 2-minute walk from our facility doors.
                </p>
                <p style={{ fontSize: "0.88rem", lineHeight: 1.5, color: "var(--wh-text-body)" }}>
                  <strong>TTC Bus Route 86 (Scarborough):</strong> Stops at Morningside Ave. Wheelchair accessible entrance via Lawrence Avenue.
                </p>
              </div>

              {/* Storefront Image */}
              <div
                style={{
                  borderRadius: "var(--wh-radius-md)",
                  overflow: "hidden",
                  border: "1px solid var(--wh-pale-sky)",
                  height: "220px",
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  src="/images/westhill-storefront.jpeg"
                  alt="West Hill Community Centre storefront"
                  fill
                  sizes="(max-width: 768px) 100vw, 500px"
                  style={{
                    objectFit: "cover",
                    filter: "brightness(0.8)",
                  }}
                />
                <div style={{ position: "relative", zIndex: 2, textAlign: "center" }}>
                  <div
                    style={{
                      backgroundColor: "var(--wh-navy)",
                      color: "white",
                      padding: "6px 14px",
                      borderRadius: "var(--wh-radius-sm)",
                      fontSize: "0.82rem",
                      fontWeight: 600,
                      boxShadow: "var(--wh-shadow-soft)",
                      marginBottom: "4px",
                    }}
                  >
                    {settings.orgName}
                  </div>
                  <div
                    style={{
                      color: "var(--wh-sun-gold)",
                      fontSize: "1.8rem",
                      filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.5))",
                    }}
                  >
                    <i className="fas fa-map-pin"></i>
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
