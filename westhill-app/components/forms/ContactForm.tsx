"use client";

import { useState } from "react";
import { submitContactAction } from "@/app/actions/submissions";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    const formData = new FormData(e.currentTarget);
    const result = await submitContactAction(formData);

    if (result.success) {
      setSuccessMessage(result.message || "Your message has been received.");
      e.currentTarget.reset();
    } else {
      setErrorMessage(result.error || "Failed to submit message.");
    }
    setLoading(false);
  };

  return (
    <div
      style={{
        backgroundColor: "var(--wh-bg-white)",
        borderRadius: "var(--wh-radius-lg)",
        padding: "35px",
        border: "1px solid var(--wh-pale-sky)",
        boxShadow: "var(--wh-shadow-soft)",
      }}
    >
      <h3
        style={{
          fontSize: "1.3rem",
          color: "var(--wh-navy)",
          marginBottom: "12px",
          fontFamily: "var(--wh-font-primary)",
          fontWeight: 700,
        }}
      >
        <i className="fas fa-paper-plane" style={{ marginRight: "10px", color: "var(--wh-community-green)" }}></i>
        Send Us a Message
      </h3>
      <p style={{ fontSize: "0.9rem", color: "var(--wh-text-body)", marginBottom: "22px", lineHeight: 1.5 }}>
        Have questions about programs, events, or community space? Fill out the form below and our staff team will reply to you directly.
      </p>

      {successMessage && (
        <div
          style={{
            padding: "16px",
            backgroundColor: "rgba(76, 115, 50, 0.12)",
            border: "1px solid rgba(76, 115, 50, 0.3)",
            color: "var(--wh-community-green)",
            borderRadius: "var(--wh-radius-sm)",
            fontSize: "0.9rem",
            fontWeight: 600,
            marginBottom: "20px",
            display: "flex",
            alignItems: "flex-start",
            gap: "10px",
          }}
        >
          <i className="fas fa-check-circle" style={{ marginTop: "3px" }}></i>
          <span>{successMessage}</span>
        </div>
      )}

      {errorMessage && (
        <div
          style={{
            padding: "16px",
            backgroundColor: "var(--wh-danger-bg)",
            border: "1px solid var(--wh-danger-border)",
            color: "var(--wh-danger)",
            borderRadius: "var(--wh-radius-sm)",
            fontSize: "0.9rem",
            marginBottom: "20px",
            display: "flex",
            alignItems: "flex-start",
            gap: "10px",
          }}
        >
          <i className="fas fa-exclamation-circle" style={{ marginTop: "3px" }}></i>
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid-2" style={{ gap: "16px", marginBottom: "16px" }}>
          <div>
            <label
              htmlFor="contact-name"
              style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--wh-navy)", marginBottom: "6px" }}
            >
              Full Name *
            </label>
            <input
              type="text"
              id="contact-name"
              name="name"
              required
              placeholder="e.g. Maya Lin"
              style={{
                width: "100%",
                padding: "11px 14px",
                borderRadius: "var(--wh-radius-sm)",
                border: "1.5px solid var(--wh-pale-sky)",
                fontSize: "0.92rem",
                outline: "none",
              }}
            />
          </div>

          <div>
            <label
              htmlFor="contact-email"
              style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--wh-navy)", marginBottom: "6px" }}
            >
              Email Address *
            </label>
            <input
              type="email"
              id="contact-email"
              name="email"
              required
              placeholder="e.g. maya@example.com"
              style={{
                width: "100%",
                padding: "11px 14px",
                borderRadius: "var(--wh-radius-sm)",
                border: "1.5px solid var(--wh-pale-sky)",
                fontSize: "0.92rem",
                outline: "none",
              }}
            />
          </div>
        </div>

        <div className="grid-2" style={{ gap: "16px", marginBottom: "16px" }}>
          <div>
            <label
              htmlFor="contact-phone"
              style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--wh-navy)", marginBottom: "6px" }}
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="contact-phone"
              name="phone"
              placeholder="e.g. (416) 555-0123"
              style={{
                width: "100%",
                padding: "11px 14px",
                borderRadius: "var(--wh-radius-sm)",
                border: "1.5px solid var(--wh-pale-sky)",
                fontSize: "0.92rem",
                outline: "none",
              }}
            />
          </div>

          <div>
            <label
              htmlFor="contact-subject"
              style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--wh-navy)", marginBottom: "6px" }}
            >
              Subject *
            </label>
            <input
              type="text"
              id="contact-subject"
              name="subject"
              required
              placeholder="e.g. Program inquiry"
              style={{
                width: "100%",
                padding: "11px 14px",
                borderRadius: "var(--wh-radius-sm)",
                border: "1.5px solid var(--wh-pale-sky)",
                fontSize: "0.92rem",
                outline: "none",
              }}
            />
          </div>
        </div>

        <div style={{ marginBottom: "22px" }}>
          <label
            htmlFor="contact-message"
            style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--wh-navy)", marginBottom: "6px" }}
          >
            Message *
          </label>
          <textarea
            id="contact-message"
            name="message"
            required
            rows={4}
            placeholder="How can our community team assist you?"
            style={{
              width: "100%",
              padding: "12px 14px",
              borderRadius: "var(--wh-radius-sm)",
              border: "1.5px solid var(--wh-pale-sky)",
              fontSize: "0.92rem",
              outline: "none",
              resize: "vertical",
            }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary"
          style={{ width: "100%", padding: "12px", fontSize: "0.95rem", display: "inline-flex", justifyContent: "center", alignItems: "center", gap: "8px" }}
        >
          {loading ? (
            <>
              <i className="fas fa-spinner fa-spin"></i> Submitting Message...
            </>
          ) : (
            <>
              <i className="fas fa-paper-plane"></i> Send Message to West Hill
            </>
          )}
        </button>
      </form>
    </div>
  );
}
