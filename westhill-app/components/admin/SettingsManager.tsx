"use client";

import { useState } from "react";
import { updateSiteSettingsAction } from "@/app/actions/settings";

interface SiteSettingsData {
  organizationName: string;
  primaryEmail: string;
  volunteerEmail: string | null;
  phone: string;
  streetAddress: string;
  unit: string | null;
  city: string;
  province: string;
  postalCode: string;
  hoursWeekday: string;
  hoursSaturday: string;
  hoursSunday: string;
  facebookUrl: string | null;
  instagramUrl: string | null;
  linkedinUrl: string | null;
  youtubeUrl: string | null;
}

export default function SettingsManager({
  initialSettings,
}: {
  initialSettings: SiteSettingsData;
}) {
  const [settings] = useState<SiteSettingsData>(initialSettings);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const res = await updateSiteSettingsAction(formData);

    if (res.success) {
      setSuccess(true);
      setTimeout(() => setSuccess(false), 4000);
    } else {
      setError(res.error || "Failed to update settings.");
    }
    setLoading(false);
  };

  return (
    <div>
      {/* Page Header */}
      <div style={{ marginBottom: "24px" }}>
        <h1 style={{ fontSize: "1.5rem", color: "var(--wh-navy)", margin: "0 0 4px", fontWeight: 700 }}>
          Site Settings & Organization Profile
        </h1>
        <p style={{ fontSize: "0.88rem", color: "var(--wh-text-muted)", margin: 0 }}>
          Updates here automatically sync across the public website footer, contact pages, and shared headers.
        </p>
      </div>

      <div
        style={{
          backgroundColor: "var(--wh-bg-white)",
          borderRadius: "var(--wh-radius-md)",
          boxShadow: "var(--wh-shadow-soft)",
          border: "1px solid var(--wh-pale-sky)",
          padding: "30px",
          maxWidth: "800px",
        }}
      >
        {success && (
          <div
            style={{
              backgroundColor: "rgba(76, 115, 50, 0.12)",
              border: "1px solid rgba(76, 115, 50, 0.3)",
              color: "var(--wh-community-green)",
              borderRadius: "var(--wh-radius-sm)",
              padding: "12px 16px",
              fontSize: "0.88rem",
              fontWeight: 600,
              marginBottom: "20px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <i className="fas fa-check-circle"></i>
            <span>Site settings updated successfully. Changes are live on the public website.</span>
          </div>
        )}

        {error && (
          <div
            style={{
              backgroundColor: "var(--wh-danger-bg)",
              border: "1px solid var(--wh-danger-border)",
              color: "var(--wh-danger)",
              borderRadius: "var(--wh-radius-sm)",
              padding: "12px 16px",
              fontSize: "0.88rem",
              marginBottom: "20px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <i className="fas fa-exclamation-circle"></i>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Section 1: Basic Org Info */}
          <h3 style={{ fontSize: "1.05rem", color: "var(--wh-navy)", marginBottom: "16px", borderBottom: "1px solid var(--wh-pale-sky)", paddingBottom: "8px", fontWeight: 700 }}>
            General Contact Information
          </h3>

          <div style={{ marginBottom: "16px" }}>
            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--wh-navy)", marginBottom: "6px" }}>
              Organization Name
            </label>
            <input
              type="text"
              name="organizationName"
              required
              defaultValue={settings.organizationName}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "var(--wh-radius-sm)",
                border: "1.5px solid var(--wh-pale-sky)",
                fontSize: "0.9rem",
              }}
            />
          </div>

          <div className="grid-2" style={{ gap: "16px", marginBottom: "24px" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--wh-navy)", marginBottom: "6px" }}>
                Primary Public Email
              </label>
              <input
                type="email"
                name="primaryEmail"
                required
                defaultValue={settings.primaryEmail}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "var(--wh-radius-sm)",
                  border: "1.5px solid var(--wh-pale-sky)",
                  fontSize: "0.9rem",
                }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--wh-navy)", marginBottom: "6px" }}>
                Volunteer Department Email
              </label>
              <input
                type="email"
                name="volunteerEmail"
                defaultValue={settings.volunteerEmail || ""}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "var(--wh-radius-sm)",
                  border: "1.5px solid var(--wh-pale-sky)",
                  fontSize: "0.9rem",
                }}
              />
            </div>
          </div>

          <div style={{ marginBottom: "24px" }}>
            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--wh-navy)", marginBottom: "6px" }}>
              Telephone
            </label>
            <input
              type="text"
              name="phone"
              required
              defaultValue={settings.phone}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "var(--wh-radius-sm)",
                border: "1.5px solid var(--wh-pale-sky)",
                fontSize: "0.9rem",
              }}
            />
          </div>

          {/* Section 2: Address */}
          <h3 style={{ fontSize: "1.05rem", color: "var(--wh-navy)", marginBottom: "16px", borderBottom: "1px solid var(--wh-pale-sky)", paddingBottom: "8px", fontWeight: 700 }}>
            Physical Facility Address
          </h3>

          <div className="grid-2" style={{ gap: "16px", marginBottom: "16px" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--wh-navy)", marginBottom: "6px" }}>
                Street Address
              </label>
              <input
                type="text"
                name="streetAddress"
                required
                defaultValue={settings.streetAddress}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "var(--wh-radius-sm)",
                  border: "1.5px solid var(--wh-pale-sky)",
                  fontSize: "0.9rem",
                }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--wh-navy)", marginBottom: "6px" }}>
                Unit / Suite
              </label>
              <input
                type="text"
                name="unit"
                defaultValue={settings.unit || ""}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "var(--wh-radius-sm)",
                  border: "1.5px solid var(--wh-pale-sky)",
                  fontSize: "0.9rem",
                }}
              />
            </div>
          </div>

          <div className="grid-3" style={{ gap: "16px", marginBottom: "24px" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--wh-navy)", marginBottom: "6px" }}>
                City
              </label>
              <input
                type="text"
                name="city"
                required
                defaultValue={settings.city}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "var(--wh-radius-sm)",
                  border: "1.5px solid var(--wh-pale-sky)",
                  fontSize: "0.9rem",
                }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--wh-navy)", marginBottom: "6px" }}>
                Province
              </label>
              <input
                type="text"
                name="province"
                required
                defaultValue={settings.province}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "var(--wh-radius-sm)",
                  border: "1.5px solid var(--wh-pale-sky)",
                  fontSize: "0.9rem",
                }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--wh-navy)", marginBottom: "6px" }}>
                Postal Code
              </label>
              <input
                type="text"
                name="postalCode"
                required
                defaultValue={settings.postalCode}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "var(--wh-radius-sm)",
                  border: "1.5px solid var(--wh-pale-sky)",
                  fontSize: "0.9rem",
                }}
              />
            </div>
          </div>

          {/* Section 3: Operating Hours */}
          <h3 style={{ fontSize: "1.05rem", color: "var(--wh-navy)", marginBottom: "16px", borderBottom: "1px solid var(--wh-pale-sky)", paddingBottom: "8px", fontWeight: 700 }}>
            Operating Hours
          </h3>

          <div className="grid-3" style={{ gap: "16px", marginBottom: "24px" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--wh-navy)", marginBottom: "6px" }}>
                Monday – Friday
              </label>
              <input
                type="text"
                name="hoursWeekday"
                required
                defaultValue={settings.hoursWeekday}
                placeholder="e.g. 9:00 AM – 6:00 PM"
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "var(--wh-radius-sm)",
                  border: "1.5px solid var(--wh-pale-sky)",
                  fontSize: "0.9rem",
                }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--wh-navy)", marginBottom: "6px" }}>
                Saturday
              </label>
              <input
                type="text"
                name="hoursSaturday"
                required
                defaultValue={settings.hoursSaturday}
                placeholder="e.g. By Program Schedule"
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "var(--wh-radius-sm)",
                  border: "1.5px solid var(--wh-pale-sky)",
                  fontSize: "0.9rem",
                }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--wh-navy)", marginBottom: "6px" }}>
                Sunday
              </label>
              <input
                type="text"
                name="hoursSunday"
                required
                defaultValue={settings.hoursSunday}
                placeholder="e.g. Closed"
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "var(--wh-radius-sm)",
                  border: "1.5px solid var(--wh-pale-sky)",
                  fontSize: "0.9rem",
                }}
              />
            </div>
          </div>

          {/* Section 4: Social Media Links */}
          <h3 style={{ fontSize: "1.05rem", color: "var(--wh-navy)", marginBottom: "16px", borderBottom: "1px solid var(--wh-pale-sky)", paddingBottom: "8px", fontWeight: 700 }}>
            Social Media Channels
          </h3>

          <div className="grid-2" style={{ gap: "16px", marginBottom: "30px" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--wh-navy)", marginBottom: "6px" }}>
                <i className="fab fa-facebook" style={{ marginRight: "6px", color: "var(--wh-sky-blue)" }}></i> Facebook URL
              </label>
              <input
                type="url"
                name="facebookUrl"
                defaultValue={settings.facebookUrl || ""}
                placeholder="https://facebook.com/westhill"
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "var(--wh-radius-sm)",
                  border: "1.5px solid var(--wh-pale-sky)",
                  fontSize: "0.9rem",
                }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--wh-navy)", marginBottom: "6px" }}>
                <i className="fab fa-instagram" style={{ marginRight: "6px", color: "var(--wh-community-orange)" }}></i> Instagram URL
              </label>
              <input
                type="url"
                name="instagramUrl"
                defaultValue={settings.instagramUrl || ""}
                placeholder="https://instagram.com/westhill"
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "var(--wh-radius-sm)",
                  border: "1.5px solid var(--wh-pale-sky)",
                  fontSize: "0.9rem",
                }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--wh-navy)", marginBottom: "6px" }}>
                <i className="fab fa-linkedin" style={{ marginRight: "6px", color: "var(--wh-sky-blue)" }}></i> LinkedIn URL
              </label>
              <input
                type="url"
                name="linkedinUrl"
                defaultValue={settings.linkedinUrl || ""}
                placeholder="https://linkedin.com/company/westhill"
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "var(--wh-radius-sm)",
                  border: "1.5px solid var(--wh-pale-sky)",
                  fontSize: "0.9rem",
                }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--wh-navy)", marginBottom: "6px" }}>
                <i className="fab fa-youtube" style={{ marginRight: "6px", color: "var(--wh-danger)" }}></i> YouTube Channel URL
              </label>
              <input
                type="url"
                name="youtubeUrl"
                defaultValue={settings.youtubeUrl || ""}
                placeholder="https://youtube.com/westhill"
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "var(--wh-radius-sm)",
                  border: "1.5px solid var(--wh-pale-sky)",
                  fontSize: "0.9rem",
                }}
              />
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? (
                <>
                  <i className="fas fa-spinner fa-spin" style={{ marginRight: "6px" }}></i> Saving Settings...
                </>
              ) : (
                <>
                  <i className="fas fa-check" style={{ marginRight: "6px" }}></i> Save Site Settings
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
