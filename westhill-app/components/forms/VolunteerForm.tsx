"use client";

import { useState } from "react";
import { submitVolunteerAction } from "@/app/actions/submissions";

export default function VolunteerForm() {
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    const formData = new FormData(e.currentTarget);
    const result = await submitVolunteerAction(formData);

    if (result.success) {
      setSuccessMessage(result.message || "Your volunteer application has been submitted.");
      e.currentTarget.reset();
    } else {
      setErrorMessage(result.error || "Failed to submit application.");
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
          fontSize: "1.4rem",
          marginBottom: "12px",
          fontFamily: "var(--wh-font-primary)",
          fontWeight: 700,
        }}
      >
        <i className="fas fa-hand-holding-heart" style={{ marginRight: "10px", color: "var(--wh-community-green)" }}></i>
        Volunteer Application Form
      </h3>
      <p style={{ fontSize: "0.88rem", color: "var(--wh-text-body)", lineHeight: 1.5, marginBottom: "24px" }}>
        Join our team of Scarborough changemakers! Fill out the application below to register your interest for upcoming orientation cycles.
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
              htmlFor="vol-name"
              style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--wh-navy)", marginBottom: "6px" }}
            >
              Full Name *
            </label>
            <input
              type="text"
              id="vol-name"
              name="fullName"
              required
              placeholder="e.g. Samuel O'Connor"
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
              htmlFor="vol-email"
              style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--wh-navy)", marginBottom: "6px" }}
            >
              Email Address *
            </label>
            <input
              type="email"
              id="vol-email"
              name="email"
              required
              placeholder="e.g. samuel@example.com"
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
              htmlFor="vol-phone"
              style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--wh-navy)", marginBottom: "6px" }}
            >
              Phone Number *
            </label>
            <input
              type="tel"
              id="vol-phone"
              name="phone"
              required
              placeholder="e.g. (416) 555-0188"
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
              htmlFor="vol-roles"
              style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--wh-navy)", marginBottom: "6px" }}
            >
              Areas of Interest *
            </label>
            <select
              id="vol-roles"
              name="roles"
              required
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
              <option value="Youth Homework & Mentorship">Youth Homework & Mentorship</option>
              <option value="Seniors Wellness & Social Program">Seniors Wellness & Social Program</option>
              <option value="Food Security & Pantry Hamper Sorter">Food Security & Pantry Hamper Sorter</option>
              <option value="Community Events & Welcome Desk">Community Events & Welcome Desk</option>
              <option value="General Volunteer / Flexible">General Volunteer / Flexible</option>
            </select>
          </div>
        </div>

        <div style={{ marginBottom: "16px" }}>
          <label
            htmlFor="vol-availability"
            style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--wh-navy)", marginBottom: "6px" }}
          >
            Weekly Availability *
          </label>
          <input
            type="text"
            id="vol-availability"
            name="availability"
            required
            placeholder="e.g. Tuesdays & Thursdays after 3:30 PM, or Saturday mornings"
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

        <div style={{ marginBottom: "22px" }}>
          <label
            htmlFor="vol-experience"
            style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--wh-navy)", marginBottom: "6px" }}
          >
            Relevant Experience or High School Service Hours Info
          </label>
          <textarea
            id="vol-experience"
            name="experience"
            rows={3}
            placeholder="Tell us briefly about past volunteer work, student placement hours needed, or skills you bring!"
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
              <i className="fas fa-spinner fa-spin"></i> Submitting Application...
            </>
          ) : (
            <>
              <i className="fas fa-paper-plane"></i> Submit Volunteer Application
            </>
          )}
        </button>
      </form>
    </div>
  );
}
