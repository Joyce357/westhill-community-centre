"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { submitNewsletterAction } from "@/app/actions/submissions";

export default function NewsletterSignup() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (pathname.startsWith("/admin")) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    const formData = new FormData(e.currentTarget);
    const result = await submitNewsletterAction(formData);

    if (result.success) {
      setSuccessMessage(result.message || "Thank you for subscribing!");
      e.currentTarget.reset();
    } else {
      setErrorMessage(result.error || "Failed to subscribe.");
    }
    setLoading(false);
  };

  return (
    <section className="newsletter" aria-label="Newsletter Signup">
      <div className="container newsletter-content">
        <div className="newsletter-text">
          <h3>Stay Connected With West Hill</h3>
          <p>
            Receive monthly updates about programs, events, volunteer opportunities, and community announcements.
          </p>
        </div>
        <div className="newsletter-form">
          {successMessage ? (
            <div
              style={{
                backgroundColor: "rgba(76, 115, 50, 0.25)",
                border: "1px solid rgba(76, 115, 50, 0.5)",
                borderRadius: "var(--wh-radius-sm)",
                padding: "12px 18px",
                color: "white",
                fontSize: "0.9rem",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontWeight: 600,
              }}
            >
              <i className="fas fa-check-circle" style={{ color: "var(--wh-fresh-leaf)" }}></i>
              <span>{successMessage}</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Enter your email address"
                  style={{
                    flex: "1 1 240px",
                    padding: "12px 16px",
                    borderRadius: "var(--wh-radius-sm)",
                    border: "1px solid rgba(255, 255, 255, 0.3)",
                    backgroundColor: "rgba(255, 255, 255, 0.15)",
                    color: "white",
                    fontSize: "0.92rem",
                    outline: "none",
                  }}
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary"
                  style={{
                    padding: "12px 22px",
                    fontSize: "0.92rem",
                    fontWeight: 600,
                    whiteSpace: "nowrap",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  {loading ? (
                    <>
                      <i className="fas fa-spinner fa-spin"></i> Subscribing...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-paper-plane"></i> Subscribe
                    </>
                  )}
                </button>
              </div>
              {errorMessage && (
                <div style={{ color: "#FCA5A5", fontSize: "0.82rem", marginTop: "8px" }}>
                  {errorMessage}
                </div>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
