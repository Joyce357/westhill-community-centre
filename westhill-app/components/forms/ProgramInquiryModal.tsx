"use client";

import { useState } from "react";
import { submitProgramInquiryAction } from "@/app/actions/submissions";

interface ProgramInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  programTitle: string;
  programId?: string;
}

export default function ProgramInquiryModal({
  isOpen,
  onClose,
  programTitle,
  programId,
}: ProgramInquiryModalProps) {
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    const formData = new FormData(e.currentTarget);
    const result = await submitProgramInquiryAction(formData);

    if (result.success) {
      setSuccessMessage(result.message || "Your inquiry has been submitted.");
    } else {
      setErrorMessage(result.error || "Failed to submit inquiry.");
    }
    setLoading(false);
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(19, 61, 95, 0.6)",
        backdropFilter: "blur(3px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 100,
        padding: "20px",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "var(--wh-radius-lg)",
          maxWidth: "520px",
          width: "100%",
          boxShadow: "var(--wh-shadow-hover)",
          border: "1px solid var(--wh-pale-sky)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            padding: "18px 24px",
            borderBottom: "1px solid var(--wh-pale-sky)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "var(--wh-warm-white)",
          }}
        >
          <div>
            <h3 style={{ margin: 0, fontSize: "1.15rem", color: "var(--wh-navy)", fontWeight: 700 }}>
              Program Inquiry & Intake
            </h3>
            <span style={{ fontSize: "0.82rem", color: "var(--wh-community-green)", fontWeight: 600 }}>
              {programTitle}
            </span>
          </div>
          <button
            onClick={onClose}
            style={{ background: "none", border: "none", fontSize: "1.3rem", cursor: "pointer", color: "var(--wh-text-muted)" }}
          >
            &times;
          </button>
        </div>

        <div style={{ padding: "24px" }}>
          {successMessage ? (
            <div style={{ textAlign: "center", padding: "20px 0" }}>
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  backgroundColor: "rgba(76, 115, 50, 0.12)",
                  color: "var(--wh-community-green)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.5rem",
                  margin: "0 auto 15px",
                }}
              >
                <i className="fas fa-check"></i>
              </div>
              <h4 style={{ color: "var(--wh-navy)", marginBottom: "8px", fontWeight: 700 }}>Inquiry Received!</h4>
              <p style={{ fontSize: "0.88rem", color: "var(--wh-text-body)", lineHeight: 1.5, marginBottom: "20px" }}>
                {successMessage}
              </p>
              <button onClick={onClose} className="btn btn-primary btn-sm">
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <input type="hidden" name="programId" value={programId || ""} />
              <input type="hidden" name="programTitle" value={programTitle} />

              {errorMessage && (
                <div
                  style={{
                    backgroundColor: "var(--wh-danger-bg)",
                    border: "1px solid var(--wh-danger-border)",
                    color: "var(--wh-danger)",
                    borderRadius: "var(--wh-radius-sm)",
                    padding: "10px",
                    fontSize: "0.85rem",
                    marginBottom: "16px",
                  }}
                >
                  {errorMessage}
                </div>
              )}

              <div style={{ marginBottom: "14px" }}>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--wh-navy)", marginBottom: "6px" }}>
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  required
                  placeholder="e.g. Jeanette Roy"
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    borderRadius: "var(--wh-radius-sm)",
                    border: "1.5px solid var(--wh-pale-sky)",
                    fontSize: "0.9rem",
                    outline: "none",
                  }}
                />
              </div>

              <div className="grid-2" style={{ gap: "12px", marginBottom: "14px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--wh-navy)", marginBottom: "6px" }}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="jeanette@example.com"
                    style={{
                      width: "100%",
                      padding: "10px 12px",
                      borderRadius: "var(--wh-radius-sm)",
                      border: "1.5px solid var(--wh-pale-sky)",
                      fontSize: "0.9rem",
                      outline: "none",
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--wh-navy)", marginBottom: "6px" }}>
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="(416) 555-0199"
                    style={{
                      width: "100%",
                      padding: "10px 12px",
                      borderRadius: "var(--wh-radius-sm)",
                      border: "1.5px solid var(--wh-pale-sky)",
                      fontSize: "0.9rem",
                      outline: "none",
                    }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: "14px" }}>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--wh-navy)", marginBottom: "6px" }}>
                  Participant Age / Grade (if youth)
                </label>
                <input
                  type="text"
                  name="participantAge"
                  placeholder="e.g. Age 14 (Grade 9) or Senior (65+)"
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    borderRadius: "var(--wh-radius-sm)",
                    border: "1.5px solid var(--wh-pale-sky)",
                    fontSize: "0.9rem",
                    outline: "none",
                  }}
                />
              </div>

              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--wh-navy)", marginBottom: "6px" }}>
                  Questions / Specific Support Needs
                </label>
                <textarea
                  name="message"
                  rows={3}
                  placeholder="Any accessibility requirements or specific questions for our coordinators?"
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    borderRadius: "var(--wh-radius-sm)",
                    border: "1.5px solid var(--wh-pale-sky)",
                    fontSize: "0.9rem",
                    outline: "none",
                  }}
                />
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
                <button type="button" onClick={onClose} className="btn btn-outline btn-sm" disabled={loading}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary btn-sm" disabled={loading}>
                  {loading ? "Submitting..." : "Submit Inquiry"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
