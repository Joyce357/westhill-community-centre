"use client";

import { useState } from "react";
import { submitEventRsvpAction } from "@/app/actions/submissions";

interface EventRsvpModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventTitle: string;
  eventId?: string;
}

export default function EventRsvpModal({
  isOpen,
  onClose,
  eventTitle,
  eventId,
}: EventRsvpModalProps) {
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
    const result = await submitEventRsvpAction(formData);

    if (result.success) {
      setSuccessMessage(result.message || "Your RSVP has been confirmed!");
    } else {
      setErrorMessage(result.error || "Failed to confirm RSVP.");
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
          maxWidth: "500px",
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
              RSVP for Event
            </h3>
            <span style={{ fontSize: "0.82rem", color: "var(--wh-community-green)", fontWeight: 600 }}>
              {eventTitle}
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
                <i className="fas fa-calendar-check"></i>
              </div>
              <h4 style={{ color: "var(--wh-navy)", marginBottom: "8px", fontWeight: 700 }}>RSVP Confirmed!</h4>
              <p style={{ fontSize: "0.88rem", color: "var(--wh-text-body)", lineHeight: 1.5, marginBottom: "20px" }}>
                {successMessage}
              </p>
              <button onClick={onClose} className="btn btn-primary btn-sm">
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <input type="hidden" name="eventId" value={eventId || ""} />
              <input type="hidden" name="eventTitle" value={eventTitle} />

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
                  Your Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  required
                  placeholder="e.g. Tariq Vance"
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
                    placeholder="tariq@example.com"
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
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="(416) 555-0155"
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
                  Number of Attendees *
                </label>
                <select
                  name="attendeesCount"
                  defaultValue="1"
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    borderRadius: "var(--wh-radius-sm)",
                    border: "1.5px solid var(--wh-pale-sky)",
                    fontSize: "0.9rem",
                    backgroundColor: "white",
                    outline: "none",
                  }}
                >
                  <option value="1">1 Person</option>
                  <option value="2">2 People</option>
                  <option value="3">3 People</option>
                  <option value="4">4 People</option>
                  <option value="5">5+ (Family/Group)</option>
                </select>
              </div>

              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--wh-navy)", marginBottom: "6px" }}>
                  Special Notes or Dietary Requirements (if applicable)
                </label>
                <textarea
                  name="specialNotes"
                  rows={2}
                  placeholder="e.g. Wheelchair seating required, halal lunch request"
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
                  {loading ? "Confirming..." : "Confirm RSVP"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
