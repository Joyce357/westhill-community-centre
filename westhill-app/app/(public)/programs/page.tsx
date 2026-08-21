import Link from "next/link";
import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ProgramsGrid from "@/components/ProgramsGrid";
import ProgramInquirySection from "@/components/forms/ProgramInquirySection";
import { getPublishedPrograms, getSiteSettings } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Programs & Services | West Hill Community Centre",
  description:
    "Explore community-focused initiatives in Scarborough including youth programs, family support, seniors assistance, and career services.",
};

export default async function ProgramsPage() {
  const [programs, settings] = await Promise.all([
    getPublishedPrograms(),
    getSiteSettings(),
  ]);

  return (
    <>
      <PageHero
        title="Programs & Services"
        subtitle="Free, community-focused initiatives supporting Scarborough families, youth, seniors, and career builders."
      />

      <section className="section" id="browse-programs-section" aria-label="Browse Programs">
        <div className="container">
          <div className="section-header active" style={{ opacity: 1, transform: "none" }}>
            <h2>Browse Our Programs</h2>
            <p>Use the tabs below to filter programs by department and discover resources designed to support you.</p>
          </div>

          <ProgramsGrid programs={programs} showFilters={true} />

          {/* Program Registration Info Section */}
          <div className="section-alt standard-card-container" style={{ border: "1px solid var(--wh-pale-sky)" }}>
            <div className="grid-2" style={{ gap: "45px", alignItems: "start" }}>
              <div>
                <h3 style={{ color: "var(--wh-navy)", fontSize: "1.8rem", marginBottom: "20px", fontWeight: 700 }}>
                  How to Join a Program
                </h3>
                <p style={{ marginBottom: "20px", lineHeight: 1.6, color: "var(--wh-text-body)" }}>
                  Whether you&apos;re interested in youth activities, family support services, community events, volunteer opportunities, or community resources, our team is here to help you get connected.
                </p>
                <ul style={{ listStyleType: "none", marginBottom: "25px", paddingLeft: 0 }}>
                  <li style={{ marginBottom: "12px", display: "flex", alignItems: "start", gap: "10px" }}>
                    <i className="fas fa-check" style={{ color: "var(--wh-community-green)", marginTop: "4px" }}></i>
                    <span style={{ color: "var(--wh-text-body)", fontWeight: 500 }}>Visit us at the Centre ({settings.address})</span>
                  </li>
                  <li style={{ marginBottom: "12px", display: "flex", alignItems: "start", gap: "10px" }}>
                    <i className="fas fa-check" style={{ color: "var(--wh-community-green)", marginTop: "4px" }}></i>
                    <span style={{ color: "var(--wh-text-body)", fontWeight: 500 }}>Call our team directly at {settings.phone}</span>
                  </li>
                  <li style={{ marginBottom: "12px", display: "flex", alignItems: "start", gap: "10px" }}>
                    <i className="fas fa-check" style={{ color: "var(--wh-community-green)", marginTop: "4px" }}></i>
                    <span style={{ color: "var(--wh-text-body)", fontWeight: 500 }}>Email our coordinators at {settings.primaryEmail}</span>
                  </li>
                  <li style={{ display: "flex", alignItems: "start", gap: "10px" }}>
                    <i className="fas fa-check" style={{ color: "var(--wh-community-green)", marginTop: "4px" }}></i>
                    <span style={{ color: "var(--wh-text-body)", fontWeight: 500 }}>Attend an upcoming community information session</span>
                  </li>
                </ul>
                <div style={{ display: "flex", gap: "12px" }}>
                  <a href="#browse-programs-section" className="btn btn-secondary btn-sm">
                    View Programs
                  </a>
                  <Link href="/contact" className="btn btn-outline btn-sm" style={{ backgroundColor: "var(--wh-bg-white)" }}>
                    Contact Us
                  </Link>
                </div>
              </div>

              <div>
                <ProgramInquirySection />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
