import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { SITE_SETTINGS } from "@/lib/data";

export const metadata: Metadata = {
  title: "Privacy Policy | West Hill Community Centre",
  description: "Learn about how West Hill Community Centre collects, protects, and uses your personal information.",
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        title="Privacy Policy"
        subtitle="Your privacy is important to us. Learn how we protect your personal information."
      />

      <section className="section" aria-label="Privacy Policy Content">
        <div className="container" style={{ maxWidth: "800px", lineHeight: 1.8, color: "var(--wh-text-body)" }}>
          <p style={{ marginBottom: "30px", fontWeight: 500 }}>Last updated: June 9, 2026</p>

          <p style={{ marginBottom: "20px" }}>
            West Hill Community Centre (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your personal information when you visit our website or interact with our services, in accordance with the Canadian Personal Information Protection and Electronic Documents Act (PIPEDA) and other applicable privacy legislation.
          </p>

          <h2 style={{ color: "var(--wh-blue-primary)", fontSize: "1.5rem", margin: "30px 0 15px", fontFamily: "var(--wh-font-primary)" }}>
            1. Information We Collect
          </h2>
          <p style={{ marginBottom: "20px" }}>
            We may collect personal information directly from you when you voluntarily provide it to us. This includes:
          </p>
          <ul style={{ margin: "0 0 20px 20px", listStyleType: "disc" }}>
            <li>Contact details such as your name, email address, mailing address, and phone number when you fill out forms on our website (e.g., contact forms, registration sheets, volunteer applications).</li>
            <li>Donation details (e.g., transaction records processed securely via our verified charity payment gateways).</li>
            <li>Newsletter preferences and communications correspondence.</li>
          </ul>

          <h2 style={{ color: "var(--wh-blue-primary)", fontSize: "1.5rem", margin: "30px 0 15px", fontFamily: "var(--wh-font-primary)" }}>
            2. How We Use Your Information
          </h2>
          <p style={{ marginBottom: "20px" }}>
            We use the information we collect for purposes consistent with our community mission, including:
          </p>
          <ul style={{ margin: "0 0 20px 20px", listStyleType: "disc" }}>
            <li>Processing and managing your program registrations, volunteer applications, and community inquiries.</li>
            <li>Processing donations, issuing tax receipts where applicable, and acknowledging community support.</li>
            <li>Sending you updates, newsletters, and announcements about West Hill programs, events, and resources. You can opt out of these communications at any time.</li>
            <li>Improving our website layout, performance, and user experience.</li>
          </ul>

          <h2 style={{ color: "var(--wh-blue-primary)", fontSize: "1.5rem", margin: "30px 0 15px", fontFamily: "var(--wh-font-primary)" }}>
            3. Information Sharing and Disclosure
          </h2>
          <p style={{ marginBottom: "20px" }}>
            We respect your trust and do not sell, trade, rent, or lease your personal information to third parties. We may share information with trusted third-party service providers who assist us in operating our website, conducting our operations, or servicing you, so long as those parties agree to keep this information confidential.
          </p>

          <h2 style={{ color: "var(--wh-blue-primary)", fontSize: "1.5rem", margin: "30px 0 15px", fontFamily: "var(--wh-font-primary)" }}>
            4. Security of Your Information
          </h2>
          <p style={{ marginBottom: "20px" }}>
            We implement a variety of administrative, technical, and physical security measures to maintain the safety of your personal information. When you submit sensitive information via the website, your information is protected both online and offline using industry-standard protocols.
          </p>

          <h2 style={{ color: "var(--wh-blue-primary)", fontSize: "1.5rem", margin: "30px 0 15px", fontFamily: "var(--wh-font-primary)" }}>
            5. Your Rights
          </h2>
          <p style={{ marginBottom: "20px" }}>
            You have the right to request access to the personal information we hold about you, request corrections to any inaccuracies, or request that we delete your personal information, subject to legal and contractual obligations. If you wish to exercise these rights, please contact us at{" "}
            <a href={`mailto:${SITE_SETTINGS.primaryEmail}`} style={{ color: "var(--wh-blue-primary)", fontWeight: 600 }}>
              {SITE_SETTINGS.primaryEmail}
            </a>.
          </p>

          <h2 style={{ color: "var(--wh-blue-primary)", fontSize: "1.5rem", margin: "30px 0 15px", fontFamily: "var(--wh-font-primary)" }}>
            6. Contact Us
          </h2>
          <p style={{ marginBottom: "40px" }}>
            If you have any questions or concerns regarding this Privacy Policy, please contact us at:<br />
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
