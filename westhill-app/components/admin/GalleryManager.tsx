"use client";

import { useState } from "react";
import {
  createGalleryItemAction,
  updateGalleryItemAction,
  toggleGalleryItemPublishedAction,
  deleteGalleryItemAction,
} from "@/app/actions/gallery";

export interface GalleryItemData {
  id: string;
  title: string;
  mediaType: "IMAGE" | "VIDEO";
  mediaUrl: string;
  thumbnailUrl: string | null;
  altText: string | null;
  category: string | null;
  displayOrder: number;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export default function GalleryManager({
  initialItems,
}: {
  initialItems: GalleryItemData[];
}) {
  const [items, setItems] = useState<GalleryItemData[]>(initialItems);
  const [filterType, setFilterType] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItemData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const filteredItems = items.filter((item) => {
    const matchesType = filterType === "ALL" || item.mediaType === filterType;
    const matchesSearch =
      searchQuery.trim() === "" ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.mediaUrl.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const handleOpenCreate = () => {
    setEditingItem(null);
    setError(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: GalleryItemData) => {
    setEditingItem(item);
    setError(null);
    setIsModalOpen(true);
  };

  const handleTogglePublish = async (id: string, currentStatus: boolean) => {
    setLoading(true);
    const newStatus = !currentStatus;
    const res = await toggleGalleryItemPublishedAction(id, newStatus);
    if (res.success) {
      setItems((prev) =>
        prev.map((i) => (i.id === id ? { ...i, isPublished: newStatus } : i))
      );
      setSuccessMessage(`Item is now ${newStatus ? "published" : "hidden (draft)"}.`);
      setTimeout(() => setSuccessMessage(null), 3000);
    } else {
      setError("Failed to update published status.");
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to permanently delete this gallery item?")) return;
    setLoading(true);
    const res = await deleteGalleryItemAction(id);
    if (res.success) {
      setItems((prev) => prev.filter((i) => i.id !== id));
      setSuccessMessage("Gallery item deleted.");
      setTimeout(() => setSuccessMessage(null), 3000);
    } else {
      setError("Failed to delete gallery item.");
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
      res = await updateGalleryItemAction(editingItem.id, formData);
    } else {
      res = await createGalleryItemAction(formData);
    }

    if (res.success) {
      setIsModalOpen(false);
      window.location.reload();
    } else {
      setError(res.error || "Failed to save gallery item.");
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
            Community Gallery Manager
          </h1>
          <p style={{ fontSize: "0.88rem", color: "var(--wh-text-muted)", margin: 0 }}>
            Manage photos, ceremony highlights, and video showcases displayed on the public Gallery page.
          </p>
        </div>

        <button onClick={handleOpenCreate} className="btn btn-primary btn-sm">
          <i className="fas fa-plus"></i> Add Gallery Item
        </button>
      </div>

      {/* Success / Error Alerts */}
      {successMessage && (
        <div
          style={{
            backgroundColor: "rgba(76, 115, 50, 0.12)",
            border: "1px solid rgba(76, 115, 50, 0.3)",
            color: "var(--wh-community-green)",
            borderRadius: "var(--wh-radius-sm)",
            padding: "10px 14px",
            fontSize: "0.85rem",
            fontWeight: 600,
            marginBottom: "16px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <i className="fas fa-check-circle"></i> {successMessage}
        </div>
      )}

      {error && (
        <div
          style={{
            backgroundColor: "var(--wh-danger-bg)",
            border: "1px solid var(--wh-danger-border)",
            color: "var(--wh-danger)",
            borderRadius: "var(--wh-radius-sm)",
            padding: "10px 14px",
            fontSize: "0.85rem",
            marginBottom: "16px",
          }}
        >
          {error}
        </div>
      )}

      {/* Controls Bar: Filter & Search */}
      <div
        style={{
          backgroundColor: "var(--wh-bg-white)",
          padding: "16px 20px",
          borderRadius: "var(--wh-radius-md)",
          boxShadow: "var(--wh-shadow-soft)",
          border: "1px solid var(--wh-pale-sky)",
          marginBottom: "20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "14px",
        }}
      >
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--wh-navy)" }}>Filter:</span>
          {(["ALL", "IMAGE", "VIDEO"] as const).map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              style={{
                padding: "6px 12px",
                borderRadius: "var(--wh-radius-full)",
                fontSize: "0.78rem",
                fontWeight: 600,
                border: "none",
                cursor: "pointer",
                backgroundColor: filterType === type ? "var(--wh-navy)" : "var(--wh-warm-white)",
                color: filterType === type ? "white" : "var(--wh-text-muted)",
                transition: "var(--wh-transition)",
              }}
            >
              {type === "ALL" ? `All (${items.length})` : type === "IMAGE" ? "Photos" : "Videos"}
            </button>
          ))}
        </div>

        <div style={{ position: "relative", minWidth: "260px" }}>
          <i
            className="fas fa-search"
            style={{
              position: "absolute",
              left: "12px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "var(--wh-text-muted)",
              fontSize: "0.85rem",
            }}
          ></i>
          <input
            type="text"
            placeholder="Search by caption or URL..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: "100%",
              padding: "8px 12px 8px 34px",
              borderRadius: "var(--wh-radius-sm)",
              border: "1.5px solid var(--wh-pale-sky)",
              fontSize: "0.85rem",
              outline: "none",
            }}
          />
        </div>
      </div>

      {/* Gallery Items Grid View */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: "18px",
        }}
      >
        {filteredItems.length === 0 ? (
          <div
            style={{
              gridColumn: "1 / -1",
              padding: "40px 20px",
              textAlign: "center",
              backgroundColor: "var(--wh-bg-white)",
              borderRadius: "var(--wh-radius-md)",
              border: "1px dashed var(--wh-pale-sky)",
              color: "var(--wh-text-muted)",
            }}
          >
            No gallery items match your current filter.
          </div>
        ) : (
          filteredItems.map((item) => (
            <div
              key={item.id}
              style={{
                backgroundColor: "var(--wh-bg-white)",
                borderRadius: "var(--wh-radius-md)",
                border: "1px solid var(--wh-pale-sky)",
                boxShadow: "var(--wh-shadow-soft)",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                transition: "var(--wh-transition)",
              }}
            >
              {/* Media Preview Box */}
              <div
                style={{
                  position: "relative",
                  height: "160px",
                  backgroundColor: "#0C283F",
                  overflow: "hidden",
                }}
              >
                {item.mediaType === "VIDEO" ? (
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "rgba(19, 61, 95, 0.9)",
                      color: "white",
                    }}
                  >
                    <div
                      style={{
                        width: "44px",
                        height: "44px",
                        borderRadius: "50%",
                        backgroundColor: "var(--wh-sun-gold)",
                        color: "var(--wh-navy)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "1.1rem",
                        marginBottom: "6px",
                      }}
                    >
                      <i className="fas fa-play"></i>
                    </div>
                    <span style={{ fontSize: "0.75rem", fontWeight: 600 }}>MP4 Video</span>
                  </div>
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.mediaUrl}
                    alt={item.altText || item.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                )}

                {/* Badge for Type */}
                <span
                  style={{
                    position: "absolute",
                    top: "8px",
                    left: "8px",
                    padding: "3px 8px",
                    borderRadius: "4px",
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    backgroundColor: item.mediaType === "VIDEO" ? "var(--wh-sun-gold)" : "var(--wh-sky-blue)",
                    color: "var(--wh-navy)",
                  }}
                >
                  <i className={item.mediaType === "VIDEO" ? "fas fa-video" : "fas fa-image"} style={{ marginRight: "4px" }}></i>
                  {item.mediaType}
                </span>

                {/* Order Badge */}
                <span
                  style={{
                    position: "absolute",
                    top: "8px",
                    right: "8px",
                    padding: "3px 8px",
                    borderRadius: "4px",
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    backgroundColor: "rgba(0, 0, 0, 0.6)",
                    color: "white",
                  }}
                >
                  #{item.displayOrder}
                </span>
              </div>

              {/* Item Info */}
              <div style={{ padding: "14px 16px", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <h4
                    style={{
                      fontSize: "0.92rem",
                      color: "var(--wh-navy)",
                      fontWeight: 600,
                      margin: "0 0 6px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                    title={item.title}
                  >
                    {item.title}
                  </h4>
                  <p
                    style={{
                      fontSize: "0.75rem",
                      color: "var(--wh-text-muted)",
                      margin: "0 0 12px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                    title={item.mediaUrl}
                  >
                    {item.mediaUrl}
                  </p>
                </div>

                {/* Actions Footer */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingTop: "10px",
                    borderTop: "1px solid var(--wh-pale-sky)",
                  }}
                >
                  <button
                    onClick={() => handleTogglePublish(item.id, item.isPublished)}
                    disabled={loading}
                    style={{
                      border: "none",
                      background: "none",
                      cursor: "pointer",
                      fontSize: "0.78rem",
                      fontWeight: 600,
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                      color: item.isPublished ? "var(--wh-community-green)" : "var(--wh-text-muted)",
                    }}
                  >
                    <span
                      style={{
                        width: "7px",
                        height: "7px",
                        borderRadius: "50%",
                        backgroundColor: item.isPublished ? "var(--wh-community-green)" : "var(--wh-text-muted)",
                      }}
                    ></span>
                    {item.isPublished ? "Published" : "Draft"}
                  </button>

                  <div style={{ display: "flex", gap: "6px" }}>
                    <button
                      onClick={() => handleOpenEdit(item)}
                      style={{
                        padding: "4px 8px",
                        borderRadius: "4px",
                        border: "1px solid var(--wh-pale-sky)",
                        backgroundColor: "var(--wh-bg-white)",
                        color: "var(--wh-navy)",
                        cursor: "pointer",
                        fontSize: "0.78rem",
                        fontWeight: 600,
                      }}
                    >
                      <i className="fas fa-pen"></i> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      style={{
                        padding: "4px 8px",
                        borderRadius: "4px",
                        border: "1px solid var(--wh-danger-border)",
                        backgroundColor: "var(--wh-danger-bg)",
                        color: "var(--wh-danger)",
                        cursor: "pointer",
                        fontSize: "0.78rem",
                        fontWeight: 600,
                      }}
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal Dialog for Add / Edit */}
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
              maxWidth: "560px",
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
                {editingItem ? "Edit Gallery Item" : "Add New Gallery Media"}
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

              {/* Title / Caption */}
              <div style={{ marginBottom: "14px" }}>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--wh-navy)", marginBottom: "4px" }}>
                  Title / Caption *
                </label>
                <input
                  type="text"
                  name="title"
                  required
                  defaultValue={editingItem?.title || ""}
                  placeholder="e.g. Grand Opening Ceremony 2026 - Ribbon Cutting"
                  style={{
                    width: "100%",
                    padding: "9px 12px",
                    borderRadius: "var(--wh-radius-sm)",
                    border: "1.5px solid var(--wh-pale-sky)",
                    fontSize: "0.9rem",
                    outline: "none",
                  }}
                />
              </div>

              {/* Media Type & Display Order */}
              <div className="grid-2" style={{ gap: "12px", marginBottom: "14px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--wh-navy)", marginBottom: "4px" }}>
                    Media Type *
                  </label>
                  <select
                    name="mediaType"
                    defaultValue={editingItem?.mediaType || "IMAGE"}
                    style={{
                      width: "100%",
                      padding: "9px 12px",
                      borderRadius: "var(--wh-radius-sm)",
                      border: "1.5px solid var(--wh-pale-sky)",
                      fontSize: "0.9rem",
                      outline: "none",
                    }}
                  >
                    <option value="IMAGE">Image (Photo)</option>
                    <option value="VIDEO">Video (.mp4)</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--wh-navy)", marginBottom: "4px" }}>
                    Display Order
                  </label>
                  <input
                    type="number"
                    name="displayOrder"
                    defaultValue={editingItem?.displayOrder ?? 0}
                    placeholder="0"
                    style={{
                      width: "100%",
                      padding: "9px 12px",
                      borderRadius: "var(--wh-radius-sm)",
                      border: "1.5px solid var(--wh-pale-sky)",
                      fontSize: "0.9rem",
                      outline: "none",
                    }}
                  />
                </div>
              </div>

              {/* Media URL / Path */}
              <div style={{ marginBottom: "14px" }}>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--wh-navy)", marginBottom: "4px" }}>
                  Media URL or File Path *
                </label>
                <input
                  type="text"
                  name="mediaUrl"
                  required
                  defaultValue={editingItem?.mediaUrl || ""}
                  placeholder="e.g. /assets/images/westhillcenterOpening/Ribbon Cutting.jpeg"
                  style={{
                    width: "100%",
                    padding: "9px 12px",
                    borderRadius: "var(--wh-radius-sm)",
                    border: "1.5px solid var(--wh-pale-sky)",
                    fontSize: "0.9rem",
                    outline: "none",
                  }}
                />
                <span style={{ fontSize: "0.74rem", color: "var(--wh-text-muted)" }}>
                  Enter a local asset path (e.g. <code>/images/...</code>) or hosted media URL.
                </span>
              </div>

              {/* Optional Alt Text */}
              <div style={{ marginBottom: "14px" }}>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--wh-navy)", marginBottom: "4px" }}>
                  Accessibility Alt Text
                </label>
                <input
                  type="text"
                  name="altText"
                  defaultValue={editingItem?.altText || ""}
                  placeholder="e.g. Local dignitaries and community leaders cutting the ceremonial ribbon"
                  style={{
                    width: "100%",
                    padding: "9px 12px",
                    borderRadius: "var(--wh-radius-sm)",
                    border: "1.5px solid var(--wh-pale-sky)",
                    fontSize: "0.9rem",
                    outline: "none",
                  }}
                />
              </div>

              {/* Published Toggle */}
              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", fontSize: "0.9rem", fontWeight: 600, color: "var(--wh-navy)" }}>
                  <input
                    type="checkbox"
                    name="isPublished"
                    defaultChecked={editingItem ? editingItem.isPublished : true}
                  />
                  <span>Published (Visible on public Gallery)</span>
                </label>
              </div>

              {/* Buttons */}
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
                  {loading ? "Saving..." : editingItem ? "Update Gallery Item" : "Save Gallery Item"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
