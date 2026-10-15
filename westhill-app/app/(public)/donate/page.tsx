import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import DonationCalculator from "@/components/DonationCalculator";

import { getCanonicalUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Support Our Community & Programs",
  description:
    "Support West Hill Community Centre. Your charitable contribution funds free youth recreation, seniors nourishment, family assistance, and local leadership programs in Scarborough.",
  alternates: {
    canonical: getCanonicalUrl("/donate"),
  },
  openGraph: {
    title: "Support Our Community & Programs | West Hill Community Centre",
    description:
      "Support West Hill Community Centre. Your charitable contribution funds free youth recreation, seniors nourishment, family assistance, and local leadership programs in Scarborough.",
    url: getCanonicalUrl("/donate"),
  },
};

export default function DonatePage() {
  return (
    <>
      <PageHero
        title="Support Our Community"
        subtitle="Your contributions support the ongoing growth and vitality of West Hill by funding free community programs."
      />

      <section className="section" aria-label="Donations and Support">
        <div className="container">
          <div className="grid-2" style={{ gap: "50px", marginBottom: "70px", alignItems: "start" }}>
            <div className="active" style={{ opacity: 1, transform: "none" }}>
              <h2 style={{ color: "var(--wh-blue-primary)", marginBottom: "20px", fontSize: "2rem" }}>
                How Your Support Helps
              </h2>
              <p style={{ marginBottom: "18px", lineHeight: 1.7, fontSize: "1.05rem" }}>
                West Hill Community Centre is committed to providing free, accessible, and high-quality programs. 100% of your tax-deductible donations directly fund local services such as youth mentoring supplies, settlement kits, seniors outing transport, and food insecurity support.
              </p>
              <p style={{ marginBottom: "25px", lineHeight: 1.7, fontSize: "1.05rem" }}>
                By investing in the Centre, you are enabling residents to connect, belong, and thrive together. Check out the calculator on the right to see the direct impact of different donation amounts.
              </p>

              <div
                style={{
                  backgroundColor: "var(--wh-bg-soft)",
                  borderRadius: "var(--wh-radius-lg)",
                  padding: "35px",
                  border: "1px solid rgba(15, 59, 106, 0.05)",
                }}
              >
                <h3
                  style={{
                    color: "var(--wh-blue-primary)",
                    fontSize: "1.25rem",
                    marginBottom: "15px",
                    fontFamily: "var(--wh-font-primary)",
                  }}
                >
                  Other Ways to Give
                </h3>
                <div style={{ marginBottom: "20px" }}>
                  <h4 style={{ fontSize: "1rem", color: "var(--wh-green-primary)", marginBottom: "5px" }}>
                    <i className="fas fa-envelope-open-text" style={{ marginRight: "8px" }}></i> By Mail (Cheque)
                  </h4>
                  <p style={{ fontSize: "0.9rem", color: "var(--wh-text-body)", lineHeight: 1.5, marginLeft: "25px" }}>
                    Please make cheques payable to &quot;West Hill Community Centre&quot; and mail to:{" "}
                    <strong>Unit 4, 4234 Lawrence Ave East, Scarborough, ON M1E 4R4</strong>.
                  </p>
                </div>
                <div>
                  <h4 style={{ fontSize: "1rem", color: "var(--wh-green-primary)", marginBottom: "5px" }}>
                    <i className="fas fa-handshake-angle" style={{ marginRight: "8px" }}></i> Corporate Sponsorship
                  </h4>
                  <p style={{ fontSize: "0.9rem", color: "var(--wh-text-body)", lineHeight: 1.5, marginLeft: "25px" }}>
                    If you are an organization or business looking to establish a matching grant or program sponsorship, please view our{" "}
                    <Link href="/partners" style={{ fontWeight: 600, textDecoration: "underline" }}>
                      Community Partners page
                    </Link>.
                  </p>
                </div>
              </div>
            </div>

            <div className="active" style={{ opacity: 1, transform: "none" }}>
              <DonationCalculator />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
