import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Our Story | West Hill Community Centre",
  description:
    "Learn about West Hill Community Centre's mission, history, and community leadership in Scarborough. Supporting families, youth, and seniors.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="Our Story"
        subtitle="A community-led initiative built on years of neighbourhood advocacy, leadership, and family support in Scarborough."
      />

      <section className="section" aria-label="About the Centre">
        <div className="container">
          <div className="grid-2" style={{ gap: "50px", marginBottom: "70px" }}>
            <div className="active" style={{ opacity: 1, transform: "none" }}>
              <h2 style={{ color: "var(--wh-blue-primary)", marginBottom: "20px", fontSize: "2rem" }}>
                A Vision Brought to Life
              </h2>
              <p style={{ marginBottom: "18px", fontSize: "1.05rem", lineHeight: 1.7 }}>
                The West Hill Community Centre is a newly established community hub located at 4234 Lawrence Avenue East. Although the physical facility represents a new chapter, the Centre is built upon a strong foundation of local resident advocacy and neighbourhood leadership that has worked to support Scarborough families for many years.
              </p>
              <p style={{ marginBottom: "18px", fontSize: "1.05rem", lineHeight: 1.7 }}>
                Created to meet the growing need for accessible, free programs in East Scarborough, our Centre brings together youth mentoring, family support services, advocacy programs, and local partnerships under one roof. We strive to provide a positive, welcoming environment where everyone belongs.
              </p>
              <p style={{ fontSize: "1.05rem", lineHeight: 1.7 }}>
                Working alongside local associations, residents, and sponsors, we offer resources that help youth develop leadership skills, enable seniors to maintain vital social connections, and connect families with critical social support networks.
              </p>
            </div>
            <div className="active" style={{ opacity: 1, transform: "none" }}>
              <Image
                src="/images/hero_community.png"
                alt="Diverse community gathering in Scarborough"
                width={600}
                height={400}
                style={{
                  borderRadius: "var(--wh-radius-lg)",
                  boxShadow: "var(--wh-shadow-soft)",
                  width: "100%",
                  height: "auto",
                }}
              />
            </div>
          </div>

          {/* Mission, Vision, Values Block */}
          <div className="section-alt standard-card-container">
            <div className="grid-2" style={{ gap: "40px", marginBottom: "40px", alignItems: "start" }}>
              <div>
                <h3 style={{ color: "var(--wh-blue-primary)", fontSize: "1.6rem", marginBottom: "15px" }}>
                  Our Mission
                </h3>
                <p style={{ fontSize: "1.05rem", lineHeight: 1.6, color: "var(--wh-text-body)" }}>
                  To foster an inclusive, welcoming, and supportive community where residents of all ages can access resources, develop skills, build meaningful relationships, and thrive together.
                </p>
              </div>
              <div>
                <h3 style={{ color: "var(--wh-blue-primary)", fontSize: "1.6rem", marginBottom: "15px" }}>
                  Our Vision
                </h3>
                <p style={{ fontSize: "1.05rem", lineHeight: 1.6, color: "var(--wh-text-body)" }}>
                  A vibrant and connected West Hill community where every resident has the opportunity to belong, contribute, and thrive.
                </p>
              </div>
            </div>

            <h4
              style={{
                color: "var(--wh-blue-primary)",
                fontSize: "1.25rem",
                marginBottom: "25px",
                textAlign: "center",
                borderTop: "1px solid rgba(15, 59, 106, 0.1)",
                paddingTop: "30px",
              }}
            >
              Our Core Values
            </h4>
            <div className="grid-4" style={{ gap: "20px", textAlign: "center" }}>
              <div>
                <h5 style={{ color: "var(--wh-green-primary)", fontSize: "1.1rem", marginBottom: "8px" }}>
                  Inclusion
                </h5>
                <p style={{ fontSize: "0.9rem", color: "var(--wh-text-body)" }}>
                  Everyone belongs and has a place at our table.
                </p>
              </div>
              <div>
                <h5 style={{ color: "var(--wh-green-primary)", fontSize: "1.1rem", marginBottom: "8px" }}>
                  Respect
                </h5>
                <p style={{ fontSize: "0.9rem", color: "var(--wh-text-body)" }}>
                  Every voice matters and contributes to our growth.
                </p>
              </div>
              <div>
                <h5 style={{ color: "var(--wh-green-primary)", fontSize: "1.1rem", marginBottom: "8px" }}>
                  Collaboration
                </h5>
                <p style={{ fontSize: "0.9rem", color: "var(--wh-text-body)" }}>
                  Working together with residents and local partners.
                </p>
              </div>
              <div>
                <h5 style={{ color: "var(--wh-green-primary)", fontSize: "1.1rem", marginBottom: "8px" }}>
                  Empowerment
                </h5>
                <p style={{ fontSize: "0.9rem", color: "var(--wh-text-body)" }}>
                  Supporting residents to reach their full potential.
                </p>
              </div>
            </div>
          </div>

          {/* Leadership Section (Coach John Message) */}
          <div className="grid-2" style={{ gap: "50px", alignItems: "center", marginBottom: "60px", marginTop: "60px" }}>
            <div>
              <Image
                src="/images/coach_john_emore.jpeg"
                alt="Coach John Emore - President of West Hill Community Association"
                width={500}
                height={500}
                style={{
                  borderRadius: "var(--wh-radius-lg)",
                  boxShadow: "var(--wh-shadow-soft)",
                  width: "100%",
                  maxHeight: "480px",
                  objectFit: "cover",
                  objectPosition: "center top",
                }}
              />
            </div>
            <div>
              <h3 style={{ color: "var(--wh-blue-primary)", fontSize: "1.8rem", marginBottom: "15px" }}>
                President&apos;s Message
              </h3>
              <h4 style={{ color: "var(--wh-orange-accent)", fontSize: "1.1rem", fontWeight: 500, marginBottom: "20px" }}>
                Coach John Emore - President, West Hill Community Association
              </h4>
              <div
                style={{
                  fontStyle: "italic",
                  borderLeft: "3px solid var(--wh-orange-accent)",
                  paddingLeft: "20px",
                  marginBottom: "20px",
                  color: "var(--wh-blue-primary)",
                  fontFamily: "var(--wh-font-primary)",
                  fontSize: "1.1rem",
                }}
              >
                &ldquo;West Hill Community Centre was created to be a place where residents can connect, belong, and thrive. Together, we are building opportunities and strengthening our community for generations to come.&rdquo;
              </div>
              <p style={{ marginBottom: "15px", fontSize: "1rem", lineHeight: 1.6 }}>
                Our goal is to ensure that every youth, senior, and family in Scarborough-West Hill has a place to study, find job assistance, share in social recreation, and feel at home. I invite you to visit our new space, register for our programs, or join us as a volunteer.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
