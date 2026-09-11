"use client";

import { useState } from "react";
import {
  createResourceAction,
  updateResourceAction,
  toggleResourcePublishedAction,
  deleteResourceAction,
} from "@/app/actions/resources";

export interface ResourceItemData {
  id: string;
  title: string;
  description: string | null;
  resourceType: "DOCUMENT" | "EXTERNAL_LINK" | "GUIDE";
  url: string;
  fileSize: string | null;
  category: string | null;
  icon: string | null;
  displayOrder: number;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export default function ResourcesManager({
  initialItems,
}: {
  initialItems: ResourceItemData[];
}) {
  const [items, setItems] = useState<ResourceItemData[]>(initialItems);
  const [filterCategory, setFilterCategory] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ResourceItemData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const categories = ["ALL", ...Array.from(new Set(items.map((i) => i.category || "Downloads")))];

  const filteredItems = items.filter((item) => {
    const itemCat = item.category || "Downloads";
    const matchesCategory = filterCategory === "ALL" || itemCat === filterCategory;
    const matchesSearch =
      searchQuery.trim() === "" ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
      item.url.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleOpenCreate = () => {
    setEditingItem(null);
    setError(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: ResourceItemData) => {
    setEditingItem(item);
    setError(null);
    setIsModalOpen(true);
  };

  const handleTogglePublish = async (id: string, currentStatus: boolean) => {
    setLoading(true);
    const newStatus = !currentStatus;
    const res = await toggleResourcePublishedAction(id, newStatus);
    if (res.success) {
      setItems((prev) =>
        prev.map((i) => (i.id === id ? { ...i, isPublished: newStatus } : i))
      );
      setSuccessMessage(`Resource is now ${newStatus ? "published" : "hidden (draft)"}.`);
      setTimeout(() => setSuccessMessage(null), 3000);
    } else {
      setError("Failed to update resource publication status.");
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to permanently delete this resource?")) return;
    setLoading(true);
    const res = await deleteResourceAction(id);
    if (res.success) {
      setItems((prev) => prev.filter((i) => i.id !== id));
      setSuccessMessage("Resource deleted.");
      setTimeout(() => setSuccessMessage(null), 3000);
    } else {
      setError("Failed to delete resource.");
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
      res = await updateResourceAction(editingItem.id, formData);
    } else {
      res = await createResourceAction(formData);
    }

    if (res.success) {
      setIsModalOpen(false);
      window.location.reload();
    } else {
      setError(res.error || "Failed to save resource.");
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
            Community Resources & Downloads
          </h1>
          <p style={{ fontSize: "0.88rem", color: "var(--wh-text-muted)", margin: 0 }}>
            Manage downloadable handbook PDFs, registration guides, and external community directory links.
          </p>
        </div>

        <button onClick={handleOpenCreate} className="btn btn-primary btn-sm">
          <i className="fas fa-plus"></i> Add Resource
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

      {/* Filter and Search Bar */}
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
        <div style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap" }}>
          <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--wh-navy)" }}>Section:</span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              style={{
                padding: "6px 12px",
                borderRadius: "var(--wh-radius-full)",
                fontSize: "0.78rem",
                fontWeight: 600,
                border: "none",
                cursor: "pointer",
                backgroundColor: filterCategory === cat ? "var(--wh-navy)" : "var(--wh-warm-white)",
                color: filterCategory === cat ? "white" : "var(--wh-text-muted)",
                transition: "var(--wh-transition)",
              }}
            >
              {cat === "ALL" ? `All (${items.length})` : cat}
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
            placeholder="Search by title, description, URL..."
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

      {/* Resources Table Card */}
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
              <th style={{ padding: "14px 20px", color: "var(--wh-navy)", fontWeight: 600 }}>Resource / Document</th>
              <th style={{ padding: "14px 20px", color: "var(--wh-navy)", fontWeight: 600 }}>Section / Category</th>
              <th style={{ padding: "14px 20px", color: "var(--wh-navy)", fontWeight: 600 }}>Type & Details</th>
              <th style={{ padding: "14px 20px", color: "var(--wh-navy)", fontWeight: 600 }}>Status</th>
              <th style={{ padding: "14px 20px", color: "var(--wh-navy)", fontWeight: 600, textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ padding: "30px", textAlign: "center", color: "var(--wh-text-muted)" }}>
                  No resources found matching your current filter.
                </td>
              </tr>
            ) : (
              filteredItems.map((item) => (
                <tr key={item.id} style={{ borderBottom: "1px solid rgba(210, 234, 242, 0.6)" }}>
                  {/* Title & Description */}
                  <td style={{ padding: "16px 20px", color: "var(--wh-text-dark)", maxWidth: "300px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <div
                        style={{
                          width: "34px",
                          height: "34px",
                          borderRadius: "var(--wh-radius-sm)",
                          backgroundColor: item.resourceType === "DOCUMENT" ? "rgba(220, 38, 38, 0.1)" : "rgba(101, 175, 218, 0.15)",
                          color: item.resourceType === "DOCUMENT" ? "#DC2626" : "var(--wh-navy)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "1rem",
                          flexShrink: 0,
                        }}
                      >
                        <i className={item.icon || "fas fa-file"}></i>
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, color: "var(--wh-navy)" }}>{item.title}</div>
                        {item.description && (
                          <div style={{ fontSize: "0.76rem", color: "var(--wh-text-muted)", marginTop: "2px" }}>
                            {item.description}
                          </div>
                        )}
                        <div style={{ fontSize: "0.72rem", color: "var(--wh-text-muted)", marginTop: "2px" }}>
                          <code>{item.url}</code>
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td style={{ padding: "16px 20px" }}>
                    <span
                      style={{
                        backgroundColor: "var(--wh-warm-white)",
                        border: "1px solid var(--wh-pale-sky)",
                        color: "var(--wh-navy)",
                        padding: "3px 8px",
                        borderRadius: "4px",
                        fontSize: "0.78rem",
                        fontWeight: 600,
                      }}
                    >
                      {item.category || "Downloads"}
                    </span>
                  </td>

                  {/* Type & File Info */}
                  <td style={{ padding: "16px 20px" }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                      <span
                        style={{
                          fontSize: "0.72rem",
                          fontWeight: 700,
                          textTransform: "uppercase",
                          color: item.resourceType === "DOCUMENT" ? "#B91C1C" : "var(--wh-community-green)",
                        }}
                      >
                        {item.resourceType === "DOCUMENT" ? "PDF Document" : item.resourceType === "EXTERNAL_LINK" ? "External Website" : "Internal Guide"}
                      </span>
                      {item.fileSize && (
                        <span style={{ fontSize: "0.75rem", color: "var(--wh-text-muted)" }}>
                          {item.fileSize}
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Published Toggle */}
                  <td style={{ padding: "16px 20px" }}>
                    <button
                      onClick={() => handleTogglePublish(item.id, item.isPublished)}
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
                        backgroundColor: item.isPublished ? "rgba(76, 115, 50, 0.12)" : "rgba(98, 125, 152, 0.12)",
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
                  </td>

                  {/* Actions */}
                  <td style={{ padding: "16px 20px", textAlign: "right" }}>
                    <div style={{ display: "inline-flex", gap: "8px" }}>
                      <button
                        onClick={() => handleOpenEdit(item)}
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
                        onClick={() => handleDelete(item.id)}
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
                {editingItem ? "Edit Resource" : "Add New Resource"}
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

              {/* Title */}
              <div style={{ marginBottom: "14px" }}>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--wh-navy)", marginBottom: "4px" }}>
                  Resource Title *
                </label>
                <input
                  type="text"
                  name="title"
                  required
                  defaultValue={editingItem?.title || ""}
                  placeholder="e.g. Volunteer Handbook"
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

              {/* Description */}
              <div style={{ marginBottom: "14px" }}>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--wh-navy)", marginBottom: "4px" }}>
                  Description / Subtitle
                </label>
                <textarea
                  name="description"
                  rows={2}
                  defaultValue={editingItem?.description || ""}
                  placeholder="e.g. Official guide and volunteer orientation packet for West Hill Community Centre."
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

              {/* Resource Type & Category */}
              <div className="grid-2" style={{ gap: "12px", marginBottom: "14px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--wh-navy)", marginBottom: "4px" }}>
                    Resource Type *
                  </label>
                  <select
                    name="resourceType"
                    defaultValue={editingItem?.resourceType || "DOCUMENT"}
                    style={{
                      width: "100%",
                      padding: "9px 12px",
                      borderRadius: "var(--wh-radius-sm)",
                      border: "1.5px solid var(--wh-pale-sky)",
                      fontSize: "0.9rem",
                      outline: "none",
                    }}
                  >
                    <option value="DOCUMENT">Downloadable Document (PDF)</option>
                    <option value="EXTERNAL_LINK">External Website Link</option>
                    <option value="GUIDE">Internal Page Guide Link</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--wh-navy)", marginBottom: "4px" }}>
                    Section Category
                  </label>
                  <input
                    type="text"
                    name="category"
                    defaultValue={editingItem?.category || "Downloads"}
                    placeholder="e.g. Downloads or Community Connections"
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

              {/* URL / Path */}
              <div style={{ marginBottom: "14px" }}>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--wh-navy)", marginBottom: "4px" }}>
                  URL or Document File Path *
                </label>
                <input
                  type="text"
                  name="url"
                  required
                  defaultValue={editingItem?.url || ""}
                  placeholder="e.g. /assets/documents/Volunteer-Handbook-West-Hill-Community-Centre.pdf"
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

              {/* File Info & Icon */}
              <div className="grid-2" style={{ gap: "12px", marginBottom: "14px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--wh-navy)", marginBottom: "4px" }}>
                    File Size / Info Tag
                  </label>
                  <input
                    type="text"
                    name="fileSize"
                    defaultValue={editingItem?.fileSize || ""}
                    placeholder="e.g. PDF | 153 KB | Official Guide"
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

                <div>
                  <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--wh-navy)", marginBottom: "4px" }}>
                    FontAwesome Icon Class
                  </label>
                  <input
                    type="text"
                    name="icon"
                    defaultValue={editingItem?.icon || "fas fa-file-pdf"}
                    placeholder="e.g. fas fa-file-pdf or fas fa-landmark"
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

              {/* Display Order & Published */}
              <div className="grid-2" style={{ gap: "12px", marginBottom: "20px", alignItems: "center" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--wh-navy)", marginBottom: "4px" }}>
                    Display Order
                  </label>
                  <input
                    type="number"
                    name="displayOrder"
                    defaultValue={editingItem?.displayOrder ?? 0}
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

                <div style={{ paddingTop: "18px" }}>
                  <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", fontSize: "0.9rem", fontWeight: 600, color: "var(--wh-navy)" }}>
                    <input
                      type="checkbox"
                      name="isPublished"
                      defaultChecked={editingItem ? editingItem.isPublished : true}
                    />
                    <span>Published</span>
                  </label>
                </div>
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
                  {loading ? "Saving..." : editingItem ? "Update Resource" : "Save Resource"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
