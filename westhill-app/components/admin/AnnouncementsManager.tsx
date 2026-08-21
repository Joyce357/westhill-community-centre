"use client";

import { useState } from "react";
import {
  createAnnouncementAction,
  updateAnnouncementAction,
  toggleAnnouncementActiveAction,
  deleteAnnouncementAction,
} from "@/app/actions/announcements";

interface AnnouncementItem {
  id: string;
  message: string;
  ctaText: string | null;
  ctaUrl: string | null;
  isActive: boolean;
  startsAt: Date | null;
  expiresAt: Date | null;
  createdAt: Date;
}

export default function AnnouncementsManager({
  initialAnnouncements,
}: {
  initialAnnouncements: AnnouncementItem[];
}) {
  const [announcements, setAnnouncements] = useState<AnnouncementItem[]>(initialAnnouncements);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<AnnouncementItem | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleOpenCreate = () => {
    setEditingItem(null);
    setError(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: AnnouncementItem) => {
    setEditingItem(item);
    setError(null);
    setIsModalOpen(true);
  };

  const handleToggleActive = async (id: string, currentStatus: boolean) => {
    setLoading(true);
    const newStatus = !currentStatus;
    const res = await toggleAnnouncementActiveAction(id, newStatus);
    if (res.success) {
      setAnnouncements((prev) =>
        prev.map((a) => (a.id === id ? { ...a, isActive: newStatus } : newStatus ? { ...a, isActive: false } : a))
      );
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to permanently delete this announcement?")) return;
    setLoading(true);
    const res = await deleteAnnouncementAction(id);
    if (res.success) {
      setAnnouncements((prev) => prev.filter((a) => a.id !== id));
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);

    let res;
    if (editingItem) {
      res = await updateAnnouncementAction(editingItem.id, formData);
    } else {
      res = await createAnnouncementAction(formData);
    }

    if (res.success) {
      setIsModalOpen(false);
      window.location.reload();
    } else {
      setError(res.error || "Failed to save announcement.");
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Page Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <div>
          <h1 style={{ fontSize: "1.5rem", color: "var(--wh-navy)", margin: "0 0 4px", fontWeight: 700 }}>
            Announcements & Alert Banner
          </h1>
          <p style={{ fontSize: "0.88rem", color: "var(--wh-text-muted)", margin: 0 }}>
            Manage the top alert banner that appears at the very top of all public pages.
          </p>
        </div>

        <button onClick={handleOpenCreate} className="btn btn-primary btn-sm">
          <i className="fas fa-plus"></i> Create Announcement
        </button>
      </div>

      {/* Announcements List Table Card */}
      <div
        style={{
          backgroundColor: "var(--wh-bg-white)",
          borderRadius: "var(--wh-radius-md)",
          boxShadow: "var(--wh-shadow-soft)",
          border: "1px solid var(--wh-pale-sky)",
          overflow: "hidden",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.88rem" }}>
          <thead>
            <tr style={{ backgroundColor: "var(--wh-warm-white)", borderBottom: "1px solid var(--wh-pale-sky)" }}>
              <th style={{ padding: "14px 20px", color: "var(--wh-navy)", fontWeight: 600 }}>Message</th>
              <th style={{ padding: "14px 20px", color: "var(--wh-navy)", fontWeight: 600 }}>CTA Button</th>
              <th style={{ padding: "14px 20px", color: "var(--wh-navy)", fontWeight: 600 }}>Status</th>
              <th style={{ padding: "14px 20px", color: "var(--wh-navy)", fontWeight: 600, textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {announcements.length === 0 ? (
              <tr>
                <td colSpan={4} style={{ padding: "30px", textAlign: "center", color: "var(--wh-text-muted)" }}>
                  No announcements created yet. Click &quot;Create Announcement&quot; to add one.
                </td>
              </tr>
            ) : (
              announcements.map((a) => (
                <tr key={a.id} style={{ borderBottom: "1px solid rgba(210, 234, 242, 0.6)" }}>
                  <td style={{ padding: "16px 20px", color: "var(--wh-text-dark)", fontWeight: 500, maxWidth: "360px" }}>
                    {a.message}
                  </td>
                  <td style={{ padding: "16px 20px", color: "var(--wh-text-body)" }}>
                    {a.ctaText ? (
                      <span style={{ backgroundColor: "var(--wh-pale-sky)", color: "var(--wh-navy)", padding: "4px 8px", borderRadius: "4px", fontSize: "0.8rem", fontWeight: 500 }}>
                        {a.ctaText} &rarr; {a.ctaUrl || "/"}
                      </span>
                    ) : (
                      <span style={{ color: "var(--wh-text-muted)", fontStyle: "italic" }}>No link</span>
                    )}
                  </td>
                  <td style={{ padding: "16px 20px" }}>
                    <button
                      onClick={() => handleToggleActive(a.id, a.isActive)}
                      disabled={loading}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        padding: "4px 12px",
                        borderRadius: "var(--wh-radius-full)",
                        fontSize: "0.78rem",
                        fontWeight: 600,
                        border: "none",
                        cursor: "pointer",
                        backgroundColor: a.isActive ? "rgba(76, 115, 50, 0.12)" : "rgba(98, 125, 152, 0.12)",
                        color: a.isActive ? "var(--wh-community-green)" : "var(--wh-text-muted)",
                      }}
                    >
                      <span
                        style={{
                          width: "7px",
                          height: "7px",
                          borderRadius: "50%",
                          backgroundColor: a.isActive ? "var(--wh-community-green)" : "var(--wh-text-muted)",
                        }}
                      ></span>
                      {a.isActive ? "Active (Live)" : "Inactive"}
                    </button>
                  </td>
                  <td style={{ padding: "16px 20px", textAlign: "right" }}>
                    <div style={{ display: "inline-flex", gap: "8px" }}>
                      <button
                        onClick={() => handleOpenEdit(a)}
                        style={{
                          padding: "6px 10px",
                          borderRadius: "var(--wh-radius-sm)",
                          border: "1px solid var(--wh-pale-sky)",
                          backgroundColor: "var(--wh-bg-white)",
                          color: "var(--wh-navy)",
                          cursor: "pointer",
                          fontSize: "0.8rem",
                          fontWeight: 500,
                        }}
                      >
                        <i className="fas fa-pen"></i> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(a.id)}
                        style={{
                          padding: "6px 10px",
                          borderRadius: "var(--wh-radius-sm)",
                          border: "1px solid var(--wh-danger-border)",
                          backgroundColor: "var(--wh-danger-bg)",
                          color: "var(--wh-danger)",
                          cursor: "pointer",
                          fontSize: "0.8rem",
                          fontWeight: 500,
                        }}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Dialog */}
      {isModalOpen && (
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
              <h3 style={{ margin: 0, fontSize: "1.15rem", color: "var(--wh-navy)", fontWeight: 700 }}>
                {editingItem ? "Edit Announcement" : "Create Announcement"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                style={{ background: "none", border: "none", fontSize: "1.2rem", cursor: "pointer", color: "var(--wh-text-muted)" }}
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleSubmit} style={{ padding: "24px" }}>
              {error && (
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
                  {error}
                </div>
              )}

              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--wh-navy)", marginBottom: "6px" }}>
                  Announcement Message *
                </label>
                <textarea
                  name="message"
                  required
                  rows={3}
                  defaultValue={editingItem?.message || ""}
                  placeholder="e.g. Summer Youth Programs registration is now open!"
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "var(--wh-radius-sm)",
                    border: "1.5px solid var(--wh-pale-sky)",
                    fontSize: "0.9rem",
                    outline: "none",
                  }}
                />
              </div>

              <div className="grid-2" style={{ gap: "12px", marginBottom: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--wh-navy)", marginBottom: "6px" }}>
                    CTA Button Text
                  </label>
                  <input
                    type="text"
                    name="ctaText"
                    defaultValue={editingItem?.ctaText || ""}
                    placeholder="e.g. Register today"
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
                    CTA Link URL
                  </label>
                  <input
                    type="text"
                    name="ctaUrl"
                    defaultValue={editingItem?.ctaUrl || ""}
                    placeholder="e.g. /programs"
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

              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", fontSize: "0.9rem", fontWeight: 600, color: "var(--wh-navy)" }}>
                  <input
                    type="checkbox"
                    name="isActive"
                    defaultChecked={editingItem ? editingItem.isActive : true}
                  />
                  <span>Publish as Active Announcement Banner</span>
                </label>
                <p style={{ fontSize: "0.75rem", color: "var(--wh-text-muted)", margin: "4px 0 0 24px" }}>
                  Activating this will automatically display it at the top of the public website.
                </p>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="btn btn-outline btn-sm"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary btn-sm" disabled={loading}>
                  {loading ? "Saving..." : editingItem ? "Update Announcement" : "Publish Announcement"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
