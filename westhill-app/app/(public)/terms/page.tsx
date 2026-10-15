import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { SITE_SETTINGS } from "@/lib/data";

import { getCanonicalUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms and conditions for visiting West Hill Community Centre website, attending facility programs, and community participation in Scarborough.",
  alternates: {
    canonical: getCanonicalUrl("/terms"),
  },
  openGraph: {
    title: "Terms of Use | West Hill Community Centre",
    description: "Terms and conditions for visiting West Hill Community Centre website, attending facility programs, and community participation in Scarborough.",
    url: getCanonicalUrl("/terms"),
  },
};

export default function TermsPage() {
  return (
    <>
      <PageHero
        title="Terms of Use"
        subtitle="Guidelines and terms for accessing our website and participating in our community services."
      />

      <section className="section" aria-label="Terms of Use Content">
        <div className="container" style={{ maxWidth: "800px", lineHeight: 1.8, color: "var(--wh-text-body)" }}>
          <p style={{ marginBottom: "30px", fontWeight: 500 }}>Last updated: June 9, 2026</p>

          <h2 style={{ color: "var(--wh-blue-primary)", fontSize: "1.5rem", margin: "30px 0 15px", fontFamily: "var(--wh-font-primary)" }}>
            1. Acceptance of Terms
          </h2>
          <p style={{ marginBottom: "20px" }}>
            By accessing and using this website, you accept and agree to be bound by these Terms of Use and our Privacy Policy. If you do not agree to these terms, please do not use this website. These terms apply to all visitors, users, and others who access or use our website.
          </p>

          <h2 style={{ color: "var(--wh-blue-primary)", fontSize: "1.5rem", margin: "30px 0 15px", fontFamily: "var(--wh-font-primary)" }}>
            2. Intellectual Property
          </h2>
          <p style={{ marginBottom: "20px" }}>
            The website and its original content, features, and functionality (including but not limited to information, text, displays, images, logos, graphics, and layout) are owned by West Hill Community Centre and are protected by Canadian and international copyright, trademark, patent, and other intellectual property laws. You may view, download, and print materials from the website for your own personal, non-commercial use only.
          </p>

          <h2 style={{ color: "var(--wh-blue-primary)", fontSize: "1.5rem", margin: "30px 0 15px", fontFamily: "var(--wh-font-primary)" }}>
            3. Prohibited Uses
          </h2>
          <p style={{ marginBottom: "20px" }}>
            You agree to use this website only for lawful purposes. You are prohibited from:
          </p>
          <ul style={{ margin: "0 0 20px 20px", listStyleType: "disc" }}>
            <li>Violating any local, provincial, national, or international law or regulation.</li>
            <li>Transmitting or procuring the sending of any advertising, spam, or promotional material.</li>
            <li>Attempting to interfere with the proper working of the website or bypass any security features.</li>
            <li>Using the website to host, upload, or transmit any material that is harmful, offensive, harassing, or discriminatory.</li>
          </ul>

          <h2 style={{ color: "var(--wh-blue-primary)", fontSize: "1.5rem", margin: "30px 0 15px", fontFamily: "var(--wh-font-primary)" }}>
            4. Third-Party Links
          </h2>
          <p style={{ marginBottom: "20px" }}>
            Our website contains links to third-party websites or services (e.g., government support lines, Toronto Public Library) that are not owned or controlled by West Hill Community Centre. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites. You acknowledge and agree that we shall not be responsible or liable for any damage or loss caused by or in connection with the use of such websites.
          </p>

          <h2 style={{ color: "var(--wh-blue-primary)", fontSize: "1.5rem", margin: "30px 0 15px", fontFamily: "var(--wh-font-primary)" }}>
            5. Disclaimer of Warranties
          </h2>
          <p style={{ marginBottom: "20px" }}>
            This website and all information, content, and materials made available through it are provided on an &quot;as is&quot; and &quot;as available&quot; basis without any warranties of any kind, either express or implied. West Hill Community Centre does not warrant that the website will operate error-free, uninterrupted, or free from viruses or other harmful elements.
          </p>

          <h2 style={{ color: "var(--wh-blue-primary)", fontSize: "1.5rem", margin: "30px 0 15px", fontFamily: "var(--wh-font-primary)" }}>
            6. Limitation of Liability
          </h2>
          <p style={{ marginBottom: "20px" }}>
            In no event shall West Hill Community Centre, its directors, officers, employees, or volunteers be liable for any damages whatsoever (including, without limitation, direct, indirect, incidental, or consequential damages) arising out of the use or inability to use this website, even if we have been advised of the possibility of such damages.
          </p>

          <h2 style={{ color: "var(--wh-blue-primary)", fontSize: "1.5rem", margin: "30px 0 15px", fontFamily: "var(--wh-font-primary)" }}>
            7. Governing Law
          </h2>
          <p style={{ marginBottom: "20px" }}>
            These Terms of Use shall be governed by and construed in accordance with the laws of the Province of Ontario and the federal laws of Canada applicable therein, without regard to conflict of law provisions.
          </p>

          <h2 style={{ color: "var(--wh-blue-primary)", fontSize: "1.5rem", margin: "30px 0 15px", fontFamily: "var(--wh-font-primary)" }}>
            8. Contact Us
          </h2>
          <p style={{ marginBottom: "40px" }}>
            If you have any questions about these Terms of Use, please contact us at:<br />
            <strong>{SITE_SETTINGS.orgName}</strong><br />
            {SITE_SETTINGS.address}<br />
            Email:{" "}
            <a href={`mailto:${SITE_SETTINGS.primaryEmail}`} style={{ color: "var(--wh-blue-primary)", fontWeight: 600 }}>
              {SITE_SETTINGS.primaryEmail}
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
