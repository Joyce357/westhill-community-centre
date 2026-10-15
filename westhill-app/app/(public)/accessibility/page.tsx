import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { SITE_SETTINGS } from "@/lib/data";

import { getCanonicalUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Accessibility Statement & AODA Standards",
  description: "Our commitment to accessibility, barrier-free access, inclusion, and AODA compliance at West Hill Community Centre.",
  alternates: {
    canonical: getCanonicalUrl("/accessibility"),
  },
  openGraph: {
    title: "Accessibility Statement & AODA Standards | West Hill Community Centre",
    description: "Our commitment to accessibility, barrier-free access, inclusion, and AODA compliance at West Hill Community Centre.",
    url: getCanonicalUrl("/accessibility"),
  },
};

export default function AccessibilityPage() {
  return (
    <>
      <PageHero
        title="Accessibility Statement"
        subtitle="Our commitment to providing an inclusive, welcoming, and accessible digital environment for all."
      />

      <section className="section" aria-label="Accessibility Content">
        <div className="container" style={{ maxWidth: "800px", lineHeight: 1.8, color: "var(--wh-text-body)" }}>
          <p style={{ marginBottom: "30px", fontWeight: 500 }}>Last updated: June 9, 2026</p>

          <h2 style={{ color: "var(--wh-blue-primary)", fontSize: "1.5rem", margin: "30px 0 15px", fontFamily: "var(--wh-font-primary)" }}>
            1. Our Commitment
          </h2>
          <p style={{ marginBottom: "20px" }}>
            At West Hill Community Centre, we believe that everyone in our community has the right to live with dignity, equality, comfort, and independence. We are committed to ensuring our physical facility and our website are accessible to individuals of all abilities, in accordance with the Accessibility for Ontarians with Disabilities Act (AODA) and the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards.
          </p>

          <h2 style={{ color: "var(--wh-blue-primary)", fontSize: "1.5rem", margin: "30px 0 15px", fontFamily: "var(--wh-font-primary)" }}>
            2. Digital Accessibility Features
          </h2>
          <p style={{ marginBottom: "20px" }}>
            We have implemented several measures on our website to ensure easy navigation and readability for all visitors, including those using assistive technologies:
          </p>
          <ul style={{ margin: "0 0 20px 20px", listStyleType: "disc" }}>
            <li><strong>Semantic HTML Hierarchy</strong>: Structured headings (<code>&lt;h1&gt;</code>, <code>&lt;h2&gt;</code>, etc.) and semantic elements are used correctly to assist screen readers.</li>
            <li><strong>Keyboard Navigation</strong>: Interactive elements (links, forms, dropdowns) are accessible via standard keyboard inputs.</li>
            <li><strong>Text Contrast</strong>: Text and backgrounds comply with contrast requirements to ensure legibility.</li>
            <li><strong>Alternative Text</strong>: All functional images are configured with descriptive alternative (<code>alt</code>) text tags.</li>
            <li><strong>Responsive Coding</strong>: The website layout scales dynamically to support zooming and smaller display sizes on tablets and mobile screens.</li>
          </ul>

          <h2 style={{ color: "var(--wh-blue-primary)", fontSize: "1.5rem", margin: "30px 0 15px", fontFamily: "var(--wh-font-primary)" }}>
            3. Physical Facility Accessibility
          </h2>
          <p style={{ marginBottom: "20px" }}>
            Our physical community hub located at Unit 4, 4234 Lawrence Ave East is fully equipped to welcome all residents, featuring:
          </p>
          <ul style={{ margin: "0 0 20px 20px", listStyleType: "disc" }}>
            <li>Wheelchair-accessible entryways and dynamic automated doors.</li>
            <li>Accessible washroom facilities.</li>
            <li>Dedicated accessible parking spaces located immediately adjacent to the main unit entrance.</li>
          </ul>

          <h2 style={{ color: "var(--wh-blue-primary)", fontSize: "1.5rem", margin: "30px 0 15px", fontFamily: "var(--wh-font-primary)" }}>
            4. Ongoing Efforts and Feedback
          </h2>
          <p style={{ marginBottom: "20px" }}>
            We continuously work to improve the accessibility of our site and services. If you encounter any barriers or have specific feedback regarding digital or physical accessibility, please let us know so we can address your needs promptly.
          </p>

          <h2 style={{ color: "var(--wh-blue-primary)", fontSize: "1.5rem", margin: "30px 0 15px", fontFamily: "var(--wh-font-primary)" }}>
            5. Contact Us
          </h2>
          <p style={{ marginBottom: "40px" }}>
            For accessibility support, inquiries, or feedback, please contact us at:<br />
            <strong>{SITE_SETTINGS.orgName}</strong><br />
            {SITE_SETTINGS.address}<br />
            Email:{" "}
            <a href={`mailto:${SITE_SETTINGS.primaryEmail}`} style={{ color: "var(--wh-blue-primary)", fontWeight: 600 }}>
              {SITE_SETTINGS.primaryEmail}
            </a><br />
            Phone: {SITE_SETTINGS.phone}
          </p>
        </div>
      </section>
    </>
  );
}
