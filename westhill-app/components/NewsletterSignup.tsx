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
      setSuccessMessage(result.message || "Thank you for subscribing to West Hill Community Centre updates!");
      e.currentTarget.reset();
    } else {
      setErrorMessage(result.error || "Failed to subscribe. Please try again.");
    }
    setLoading(false);
  };

  return (
    <section className="civic-newsletter-strip" aria-label="Newsletter Signup">
      <div className="civic-container">
        <div className="civic-newsletter-inner">
          <div className="civic-newsletter-text">
            <div className="civic-newsletter-icon" aria-hidden="true">
              <i className="fas fa-envelope-open-text"></i>
            </div>
            <div>
              <h3 className="civic-newsletter-title">Stay Connected to West Hill Updates</h3>
              <p className="civic-newsletter-desc">
                Receive our monthly calendar of free workshops, community drop-ins, and neighbourhood events.
              </p>
            </div>
          </div>

          <div className="civic-newsletter-form-wrap">
            {successMessage ? (
              <div className="civic-newsletter-success" role="status">
                <i className="fas fa-check-circle"></i>
                <span>{successMessage}</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="civic-newsletter-form">
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Enter your email address"
                  className="civic-newsletter-input"
                  aria-label="Email address for newsletter"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="civic-btn-gold"
                  style={{ flexShrink: 0 }}
                >
                  {loading ? (
                    <>
                      <i className="fas fa-spinner fa-spin"></i> Subscribing...
                    </>
                  ) : (
                    <>
                      <span>Subscribe</span>
                      <i className="fas fa-arrow-right"></i>
                    </>
                  )}
                </button>
              </form>
            )}

            {errorMessage && (
              <p className="civic-newsletter-error" role="alert">
                <i className="fas fa-exclamation-circle"></i> {errorMessage}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
