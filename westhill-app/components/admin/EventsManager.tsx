"use client";

import { useState } from "react";
import MediaUploader from "@/components/admin/MediaUploader";
import {
  createEventAction,
  updateEventAction,
  toggleEventPublishedAction,
  deleteEventAction,
} from "@/app/actions/events";

interface EventItem {
  id: string;
  slug: string;
  title: string;
  description: string;
  eventDate: Date;
  startTime: string;
  endTime: string | null;
  location: string;
  category: string;
  imageUrl: string | null;
  flyerUrl: string | null;
  rsvpEnabled: boolean;
  isFeatured: boolean;
  isPublished: boolean;
}

export default function EventsManager({
  initialEvents,
}: {
  initialEvents: EventItem[];
}) {
  const [events, setEvents] = useState<EventItem[]>(initialEvents);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<EventItem | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleOpenCreate = () => {
    setEditingItem(null);
    setError(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (ev: EventItem) => {
    setEditingItem(ev);
    setError(null);
    setIsModalOpen(true);
  };

  const handleTogglePublish = async (id: string, currentStatus: boolean) => {
    setLoading(true);
    const newStatus = !currentStatus;
    const res = await toggleEventPublishedAction(id, newStatus);
    if (res.success) {
      setEvents((prev) =>
        prev.map((e) => (e.id === id ? { ...e, isPublished: newStatus } : e))
      );
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to permanently delete this event?")) return;
    setLoading(true);
    const res = await deleteEventAction(id);
    if (res.success) {
      setEvents((prev) => prev.filter((e) => e.id !== id));
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
      res = await updateEventAction(editingItem.id, formData);
    } else {
      res = await createEventAction(formData);
    }

    if (res.success) {
      setIsModalOpen(false);
      window.location.reload();
    } else {
      setError(res.error || "Failed to save event.");
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
            Events & Calendar Management
          </h1>
          <p style={{ fontSize: "0.88rem", color: "var(--wh-text-muted)", margin: 0 }}>
            Schedule and publish community events for the /events calendar and upcoming events grids.
          </p>
        </div>

        <button onClick={handleOpenCreate} className="btn btn-primary btn-sm">
          <i className="fas fa-plus"></i> Add New Event
        </button>
      </div>

      {/* Events Table */}
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
              <th style={{ padding: "14px 20px", color: "var(--wh-navy)", fontWeight: 600 }}>Event Title</th>
              <th style={{ padding: "14px 20px", color: "var(--wh-navy)", fontWeight: 600 }}>Date & Time</th>
              <th style={{ padding: "14px 20px", color: "var(--wh-navy)", fontWeight: 600 }}>Location</th>
              <th style={{ padding: "14px 20px", color: "var(--wh-navy)", fontWeight: 600 }}>Category</th>
              <th style={{ padding: "14px 20px", color: "var(--wh-navy)", fontWeight: 600 }}>Status</th>
              <th style={{ padding: "14px 20px", color: "var(--wh-navy)", fontWeight: 600, textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ padding: "30px", textAlign: "center", color: "var(--wh-text-muted)" }}>
                  No events created yet. Click &quot;Add New Event&quot; to schedule one.
                </td>
              </tr>
            ) : (
              events.map((ev) => {
                const d = new Date(ev.eventDate);
                const formattedDate = d.toLocaleDateString("en-CA", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                });

                return (
                  <tr key={ev.id} style={{ borderBottom: "1px solid rgba(210, 234, 242, 0.6)" }}>
                    <td style={{ padding: "16px 20px" }}>
                      <div style={{ fontWeight: 600, color: "var(--wh-navy)", marginBottom: "4px" }}>
                        {ev.title}
                        {ev.isFeatured && (
                          <span
                            style={{
                              marginLeft: "8px",
                              backgroundColor: "rgba(244, 175, 37, 0.15)",
                              color: "#B45309",
                              fontSize: "0.7rem",
                              padding: "2px 6px",
                              borderRadius: "4px",
                              fontWeight: 700,
                            }}
                          >
                            FEATURED
                          </span>
                        )}
                      </div>
                      <div style={{ fontSize: "0.78rem", color: "var(--wh-text-muted)", maxWidth: "300px" }}>
                        {ev.description.substring(0, 80)}...
                      </div>
                    </td>
                    <td style={{ padding: "16px 20px", color: "var(--wh-text-body)" }}>
                      <div style={{ fontWeight: 600, color: "var(--wh-navy)" }}>{formattedDate}</div>
                      <div style={{ fontSize: "0.78rem", color: "var(--wh-text-muted)" }}>
                        {ev.startTime} {ev.endTime ? `- ${ev.endTime}` : ""}
                      </div>
                    </td>
                    <td style={{ padding: "16px 20px", color: "var(--wh-text-body)", fontSize: "0.82rem" }}>
                      {ev.location}
                    </td>
                    <td style={{ padding: "16px 20px" }}>
                      <span
                        style={{
                          backgroundColor: "var(--wh-pale-sky)",
                          color: "var(--wh-navy)",
                          padding: "4px 8px",
                          borderRadius: "4px",
                          fontSize: "0.8rem",
                          fontWeight: 500,
                        }}
                      >
                        {ev.category}
                      </span>
                    </td>
                    <td style={{ padding: "16px 20px" }}>
                      <button
                        onClick={() => handleTogglePublish(ev.id, ev.isPublished)}
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
                          backgroundColor: ev.isPublished ? "rgba(76, 115, 50, 0.12)" : "rgba(98, 125, 152, 0.12)",
                          color: ev.isPublished ? "var(--wh-community-green)" : "var(--wh-text-muted)",
                        }}
                      >
                        <span
                          style={{
                            width: "7px",
                            height: "7px",
                            borderRadius: "50%",
                            backgroundColor: ev.isPublished ? "var(--wh-community-green)" : "var(--wh-text-muted)",
                          }}
                        ></span>
                        {ev.isPublished ? "Published" : "Draft"}
                      </button>
                    </td>
                    <td style={{ padding: "16px 20px", textAlign: "right" }}>
                      <div style={{ display: "inline-flex", gap: "8px" }}>
                        <button
                          onClick={() => handleOpenEdit(ev)}
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
                          onClick={() => handleDelete(ev.id)}
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
                );
              })
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
              maxWidth: "680px",
              width: "100%",
              maxHeight: "90vh",
              overflowY: "auto",
              boxShadow: "var(--wh-shadow-hover)",
            }}
          >
            <div
              style={{
                padding: "18px 24px",
                borderBottom: "1px solid var(--wh-pale-sky)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                position: "sticky",
                top: 0,
                backgroundColor: "var(--wh-warm-white)",
                zIndex: 10,
              }}
            >
              <h3 style={{ margin: 0, fontSize: "1.15rem", color: "var(--wh-navy)", fontWeight: 700 }}>
                {editingItem ? `Edit Event: ${editingItem.title}` : "Add New Event"}
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

              <div className="grid-2" style={{ gap: "16px", marginBottom: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--wh-navy)", marginBottom: "6px" }}>
                    Event Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    required
                    defaultValue={editingItem?.title || ""}
                    placeholder="e.g. West Hill Day: Celebrating Community"
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
                    Category *
                  </label>
                  <input
                    type="text"
                    name="category"
                    required
                    defaultValue={editingItem?.category || "Community"}
                    placeholder="e.g. Community, Youth, Seniors, Employment"
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

              <div className="grid-3" style={{ gap: "16px", marginBottom: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--wh-navy)", marginBottom: "6px" }}>
                    Event Date *
                  </label>
                  <input
                    type="date"
                    name="eventDate"
                    required
                    defaultValue={
                      editingItem
                        ? new Date(editingItem.eventDate).toISOString().split("T")[0]
                        : ""
                    }
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
                    Start Time *
                  </label>
                  <input
                    type="text"
                    name="startTime"
                    required
                    defaultValue={editingItem?.startTime || "10:00 AM"}
                    placeholder="e.g. 10:00 AM"
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
                    End Time
                  </label>
                  <input
                    type="text"
                    name="endTime"
                    defaultValue={editingItem?.endTime || "2:00 PM"}
                    placeholder="e.g. 2:00 PM"
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

              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--wh-navy)", marginBottom: "6px" }}>
                  Location *
                </label>
                <input
                  type="text"
                  name="location"
                  required
                  defaultValue={editingItem?.location || "Main Hall & Courtyard, 4234 Lawrence Ave E"}
                  placeholder="e.g. Main Hall & Courtyard, 4234 Lawrence Ave E"
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "var(--wh-radius-sm)",
                    border: "1.5px solid var(--wh-pale-sky)",
                    fontSize: "0.9rem",
                  }}
                />
              </div>

              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--wh-navy)", marginBottom: "6px" }}>
                  Description *
                </label>
                <textarea
                  name="description"
                  required
                  rows={3}
                  defaultValue={editingItem?.description || ""}
                  placeholder="Full details about the event, activities, and schedule"
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "var(--wh-radius-sm)",
                    border: "1.5px solid var(--wh-pale-sky)",
                    fontSize: "0.9rem",
                  }}
                />
              </div>

              {/* Media Uploader for Event Image */}
              <MediaUploader
                name="imageUrl"
                defaultValue={editingItem?.imageUrl || "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&q=80&w=600"}
                acceptedTypes="image-only"
                label="Event Cover Image"
                helperText="Upload JPG, PNG, or WebP cover image, or paste an existing URL / local asset path."
              />

              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--wh-navy)", marginBottom: "6px" }}>
                  Downloadable Flyer URL
                </label>
                <input
                  type="text"
                  name="flyerUrl"
                  defaultValue={editingItem?.flyerUrl || ""}
                  placeholder="Optional PDF flyer link"
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "var(--wh-radius-sm)",
                    border: "1.5px solid var(--wh-pale-sky)",
                    fontSize: "0.9rem",
                  }}
                />
              </div>

              <div style={{ display: "flex", gap: "20px", marginBottom: "20px", flexWrap: "wrap" }}>
                <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", fontSize: "0.9rem", fontWeight: 600, color: "var(--wh-navy)" }}>
                  <input
                    type="checkbox"
                    name="isPublished"
                    defaultChecked={editingItem ? editingItem.isPublished : true}
                  />
                  <span>Published on Website</span>
                </label>

                <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", fontSize: "0.9rem", fontWeight: 600, color: "var(--wh-navy)" }}>
                  <input
                    type="checkbox"
                    name="isFeatured"
                    defaultChecked={editingItem ? editingItem.isFeatured : false}
                  />
                  <span>Feature as Upcoming Highlight</span>
                </label>

                <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", fontSize: "0.9rem", fontWeight: 600, color: "var(--wh-navy)" }}>
                  <input
                    type="checkbox"
                    name="rsvpEnabled"
                    defaultChecked={editingItem ? editingItem.rsvpEnabled : true}
                  />
                  <span>Enable Online RSVP</span>
                </label>
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
                  {loading ? "Saving..." : editingItem ? "Update Event" : "Create Event"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
