"use client";

import { useState } from "react";
import { submitPartnershipAction } from "@/app/actions/submissions";

export default function PartnershipForm() {
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    const formData = new FormData(e.currentTarget);
    const result = await submitPartnershipAction(formData);

    if (result.success) {
      setSuccessMessage(result.message || "Your partnership proposal has been received.");
      e.currentTarget.reset();
    } else {
      setErrorMessage(result.error || "Failed to submit proposal.");
    }
    setLoading(false);
  };

  return (
    <div
      style={{
        backgroundColor: "var(--wh-bg-white)",
        borderRadius: "var(--wh-radius-lg)",
        padding: "35px",
        boxShadow: "var(--wh-shadow-soft)",
        border: "1px solid var(--wh-pale-sky)",
      }}
    >
      <h3
        style={{
          color: "var(--wh-navy)",
          fontSize: "1.35rem",
          marginBottom: "12px",
          fontFamily: "var(--wh-font-primary)",
          fontWeight: 700,
        }}
      >
        <i className="fas fa-handshake" style={{ marginRight: "10px", color: "var(--wh-community-green)" }}></i>
        Become a Community Partner
      </h3>
      <p style={{ fontSize: "0.88rem", color: "var(--wh-text-body)", lineHeight: 1.5, marginBottom: "24px" }}>
        Interested in running cooperative workshops, staff volunteering days, or sponsoring a program line? Submit your details below:
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
              htmlFor="partner-org"
              style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--wh-navy)", marginBottom: "6px" }}
            >
              Organization / Company *
            </label>
            <input
              type="text"
              id="partner-org"
              name="organization"
              required
              placeholder="e.g. Scarborough Community Health Network"
              style={{
                width: "100%",
                padding: "10px 14px",
                borderRadius: "var(--wh-radius-sm)",
                border: "1.5px solid var(--wh-pale-sky)",
                fontSize: "0.92rem",
                outline: "none",
              }}
            />
          </div>

          <div>
            <label
              htmlFor="partner-contact"
              style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--wh-navy)", marginBottom: "6px" }}
            >
              Contact Person *
            </label>
            <input
              type="text"
              id="partner-contact"
              name="contactPerson"
              required
              placeholder="e.g. Elena Rostova"
              style={{
                width: "100%",
                padding: "10px 14px",
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
              htmlFor="partner-email"
              style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--wh-navy)", marginBottom: "6px" }}
            >
              Contact Email *
            </label>
            <input
              type="email"
              id="partner-email"
              name="email"
              required
              placeholder="e.g. elena@organization.ca"
              style={{
                width: "100%",
                padding: "10px 14px",
                borderRadius: "var(--wh-radius-sm)",
                border: "1.5px solid var(--wh-pale-sky)",
                fontSize: "0.92rem",
                outline: "none",
              }}
            />
          </div>

          <div>
            <label
              htmlFor="partner-phone"
              style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--wh-navy)", marginBottom: "6px" }}
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="partner-phone"
              name="phone"
              placeholder="e.g. (416) 555-0144"
              style={{
                width: "100%",
                padding: "10px 14px",
                borderRadius: "var(--wh-radius-sm)",
                border: "1.5px solid var(--wh-pale-sky)",
                fontSize: "0.92rem",
                outline: "none",
              }}
            />
          </div>
        </div>

        <div style={{ marginBottom: "16px" }}>
          <label
            htmlFor="partner-tier"
            style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--wh-navy)", marginBottom: "6px" }}
          >
            Sponsorship Level / Collaboration Type
          </label>
          <select
            id="partner-tier"
            name="tierInterest"
            style={{
              width: "100%",
              padding: "10px 14px",
              borderRadius: "var(--wh-radius-sm)",
              border: "1.5px solid var(--wh-pale-sky)",
              fontSize: "0.92rem",
              backgroundColor: "white",
              outline: "none",
            }}
          >
            <option value="Cornerstone Partner">Cornerstone Partner (Foundational Program Support)</option>
            <option value="Community Builder">Community Builder (Settlement / Housing Kits)</option>
            <option value="Youth Advocate">Youth Advocate (STEM / Youth Leadership Supplies)</option>
            <option value="Workshop Host / Event Partner">Workshop Host / Event Partner</option>
            <option value="General Community Collaboration">General Community Collaboration</option>
          </select>
        </div>

        <div style={{ marginBottom: "22px" }}>
          <label
            htmlFor="partner-details"
            style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--wh-navy)", marginBottom: "6px" }}
          >
            Proposal Summary / Partnership Vision *
          </label>
          <textarea
            id="partner-details"
            name="proposalDetails"
            required
            rows={4}
            placeholder="Tell us about your organization, goals, and how you would like to collaborate with West Hill Community Centre."
            style={{
              width: "100%",
              padding: "10px 14px",
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
              <i className="fas fa-spinner fa-spin"></i> Submitting Proposal...
            </>
          ) : (
            <>
              <i className="fas fa-handshake"></i> Submit Partnership Proposal
            </>
          )}
        </button>
      </form>
    </div>
  );
}
