"use client";

import { useState } from "react";
import { submitProgramInquiryAction } from "@/app/actions/submissions";

export default function ProgramInquirySection() {
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    const formData = new FormData(e.currentTarget);
    const result = await submitProgramInquiryAction(formData);

    if (result.success) {
      setSuccessMessage(result.message || "Your inquiry has been submitted.");
      e.currentTarget.reset();
    } else {
      setErrorMessage(result.error || "Failed to submit inquiry.");
    }
    setLoading(false);
  };

  return (
    <div
      style={{
        backgroundColor: "var(--wh-bg-white)",
        borderRadius: "var(--wh-radius-md)",
        padding: "30px",
        border: "1px solid var(--wh-pale-sky)",
        boxShadow: "var(--wh-shadow-soft)",
      }}
    >
      <h4
        style={{
          color: "var(--wh-navy)",
          marginBottom: "10px",
          fontFamily: "var(--wh-font-primary)",
          fontSize: "1.25rem",
          fontWeight: 700,
        }}
      >
        <i className="fas fa-hand-holding-hand" style={{ marginRight: "8px", color: "var(--wh-community-green)" }}></i>
        Program Registration & Intake
      </h4>
      <p style={{ fontSize: "0.88rem", marginBottom: "20px", color: "var(--wh-text-body)", lineHeight: 1.5 }}>
        Want to enroll in a program or need assistance with intake? Fill out the quick form below:
      </p>

      {successMessage && (
        <div
          style={{
            padding: "14px",
            backgroundColor: "rgba(76, 115, 50, 0.12)",
            border: "1px solid rgba(76, 115, 50, 0.3)",
            color: "var(--wh-community-green)",
            borderRadius: "var(--wh-radius-sm)",
            fontSize: "0.88rem",
            fontWeight: 600,
            marginBottom: "16px",
          }}
        >
          <i className="fas fa-check-circle" style={{ marginRight: "6px" }}></i>
          {successMessage}
        </div>
      )}

      {errorMessage && (
        <div
          style={{
            padding: "14px",
            backgroundColor: "var(--wh-danger-bg)",
            border: "1px solid var(--wh-danger-border)",
            color: "var(--wh-danger)",
            borderRadius: "var(--wh-radius-sm)",
            fontSize: "0.88rem",
            marginBottom: "16px",
          }}
        >
          <i className="fas fa-exclamation-circle" style={{ marginRight: "6px" }}></i>
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "12px" }}>
          <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "var(--wh-navy)", marginBottom: "4px" }}>
            Program of Interest *
          </label>
          <select
            name="programTitle"
            required
            style={{
              width: "100%",
              padding: "9px 12px",
              borderRadius: "var(--wh-radius-sm)",
              border: "1.5px solid var(--wh-pale-sky)",
              fontSize: "0.88rem",
              backgroundColor: "white",
              outline: "none",
            }}
          >
            <option value="General Program Inquiry">General Program Inquiry / Guidance</option>
            <option value="West Hill Seniors Program">West Hill Seniors Program</option>
            <option value="Women’s Wellness Program">Women’s Wellness Program</option>
            <option value="Summer Camp & Youth Programs">Summer Camp &amp; Youth Programs</option>
            <option value="West Hill Community Job Fair">West Hill Community Job Fair</option>
            <option value="Dental Care & Benefits Support">Dental Care &amp; Benefits Support</option>
            <option value="Toronto Public Library Programming">Toronto Public Library Programming</option>
          </select>
        </div>

        <div className="grid-2" style={{ gap: "10px", marginBottom: "12px" }}>
          <div>
            <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "var(--wh-navy)", marginBottom: "4px" }}>
              Full Name *
            </label>
            <input
              type="text"
              name="fullName"
              required
              placeholder="e.g. Alicia Gomez"
              style={{
                width: "100%",
                padding: "9px 12px",
                borderRadius: "var(--wh-radius-sm)",
                border: "1.5px solid var(--wh-pale-sky)",
                fontSize: "0.88rem",
                outline: "none",
              }}
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "var(--wh-navy)", marginBottom: "4px" }}>
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              required
              placeholder="e.g. alicia@example.com"
              style={{
                width: "100%",
                padding: "9px 12px",
                borderRadius: "var(--wh-radius-sm)",
                border: "1.5px solid var(--wh-pale-sky)",
                fontSize: "0.88rem",
                outline: "none",
              }}
            />
          </div>
        </div>

        <div className="grid-2" style={{ gap: "10px", marginBottom: "12px" }}>
          <div>
            <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "var(--wh-navy)", marginBottom: "4px" }}>
              Phone Number *
            </label>
            <input
              type="tel"
              name="phone"
              required
              placeholder="(416) 555-0133"
              style={{
                width: "100%",
                padding: "9px 12px",
                borderRadius: "var(--wh-radius-sm)",
                border: "1.5px solid var(--wh-pale-sky)",
                fontSize: "0.88rem",
                outline: "none",
              }}
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "var(--wh-navy)", marginBottom: "4px" }}>
              Age / Grade (if youth)
            </label>
            <input
              type="text"
              name="participantAge"
              placeholder="e.g. 15 yrs / Grade 10"
              style={{
                width: "100%",
                padding: "9px 12px",
                borderRadius: "var(--wh-radius-sm)",
                border: "1.5px solid var(--wh-pale-sky)",
                fontSize: "0.88rem",
                outline: "none",
              }}
            />
          </div>
        </div>

        <div style={{ marginBottom: "16px" }}>
          <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "var(--wh-navy)", marginBottom: "4px" }}>
            Questions / Special Needs
          </label>
          <textarea
            name="message"
            rows={2}
            placeholder="Any specific questions or support requirements?"
            style={{
              width: "100%",
              padding: "9px 12px",
              borderRadius: "var(--wh-radius-sm)",
              border: "1.5px solid var(--wh-pale-sky)",
              fontSize: "0.88rem",
              outline: "none",
              resize: "vertical",
            }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary"
          style={{ width: "100%", padding: "10px", fontSize: "0.88rem" }}
        >
          {loading ? "Submitting Inquiry..." : "Submit Registration Inquiry"}
        </button>
      </form>
    </div>
  );
}
