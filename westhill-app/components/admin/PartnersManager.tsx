"use client";

import { useState } from "react";
import {
  createPartnerAction,
  updatePartnerAction,
  togglePartnerPublishedAction,
  togglePartnerFeaturedAction,
  deletePartnerAction,
} from "@/app/actions/partners";

export interface PartnerData {
  id: string;
  name: string;
  description: string | null;
  logoUrl: string | null;
  websiteUrl: string | null;
  tier: string | null;
  category: string | null;
  displayOrder: number;
  isFeatured: boolean;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export default function PartnersManager({
  initialItems,
}: {
  initialItems: PartnerData[];
}) {
  const [items, setItems] = useState<PartnerData[]>(initialItems);
  const [filterCategory, setFilterCategory] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<PartnerData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const categories = [
    "ALL",
    ...Array.from(new Set(items.map((i) => i.tier || i.category || "Community Partner"))),
  ];

  const filteredItems = items.filter((item) => {
    const itemTier = item.tier || item.category || "Community Partner";
    const matchesCategory = filterCategory === "ALL" || itemTier === filterCategory;
    const matchesSearch =
      searchQuery.trim() === "" ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.websiteUrl && item.websiteUrl.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.tier && item.tier.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.category && item.category.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleOpenCreate = () => {
    setEditingItem(null);
    setError(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: PartnerData) => {
    setEditingItem(item);
    setError(null);
    setIsModalOpen(true);
  };

  const handleTogglePublish = async (id: string, currentStatus: boolean) => {
    setLoading(true);
    const newStatus = !currentStatus;
    const res = await togglePartnerPublishedAction(id, newStatus);
    if (res.success) {
      setItems((prev) =>
        prev.map((i) => (i.id === id ? { ...i, isPublished: newStatus } : i))
      );
      setSuccessMessage(`Partner is now ${newStatus ? "published live" : "hidden (draft)"}.`);
      setTimeout(() => setSuccessMessage(null), 3000);
    } else {
      setError("Failed to update partner publication status.");
    }
    setLoading(false);
  };

  const handleToggleFeatured = async (id: string, currentStatus: boolean) => {
    setLoading(true);
    const newStatus = !currentStatus;
    const res = await togglePartnerFeaturedAction(id, newStatus);
    if (res.success) {
      setItems((prev) =>
        prev.map((i) => (i.id === id ? { ...i, isFeatured: newStatus } : i))
      );
      setSuccessMessage(`Partner is now ${newStatus ? "marked as featured" : "unfeatured"}.`);
      setTimeout(() => setSuccessMessage(null), 3000);
    } else {
      setError("Failed to update partner featured status.");
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to permanently delete this partner organization?")) return;
    setLoading(true);
    const res = await deletePartnerAction(id);
    if (res.success) {
      setItems((prev) => prev.filter((i) => i.id !== id));
      setSuccessMessage("Partner organization deleted.");
      setTimeout(() => setSuccessMessage(null), 3000);
    } else {
      setError("Failed to delete partner.");
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
      res = await updatePartnerAction(editingItem.id, formData);
    } else {
      res = await createPartnerAction(formData);
    }

    if (res.success) {
      setIsModalOpen(false);
      window.location.reload();
    } else {
      setError(res.error || "Failed to save partner organization.");
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
            Community Builders & Partners
          </h1>
          <p style={{ fontSize: "0.88rem", color: "var(--wh-text-muted)", margin: 0 }}>
            Manage institutional partners, sponsors, school boards, and community organizations collaborating with West Hill.
          </p>
        </div>

        <button onClick={handleOpenCreate} className="btn btn-primary btn-sm">
          <i className="fas fa-plus"></i> Add Partner
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
          <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--wh-navy)" }}>Tier / Category:</span>
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
            placeholder="Search partners by name, tier, URL..."
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

      {/* Partners Table Card */}
      <div
        style={{
          backgroundColor: "var(--wh-bg-white)",
          borderRadius: "var(--wh-radius-md)",
          boxShadow: "var(--wh-shadow-soft)",
          border: "1px solid var(--wh-pale-sky)",
          overflow: "hidden",
        }}
      >
        {filteredItems.length === 0 ? (
          <div style={{ padding: "40px 20px", textAlign: "center", color: "var(--wh-text-muted)" }}>
            <i className="fas fa-handshake" style={{ fontSize: "2.5rem", marginBottom: "12px", opacity: 0.4 }}></i>
            <p style={{ margin: 0, fontSize: "0.95rem" }}>No partner organizations found matching the criteria.</p>
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.88rem" }}>
              <thead>
                <tr
                  style={{
                    backgroundColor: "var(--wh-warm-white)",
                    borderBottom: "1.5px solid var(--wh-pale-sky)",
                    color: "var(--wh-navy)",
                  }}
                >
                  <th style={{ padding: "12px 16px", fontWeight: 700, width: "60px" }}>Order</th>
                  <th style={{ padding: "12px 16px", fontWeight: 700 }}>Organization</th>
                  <th style={{ padding: "12px 16px", fontWeight: 700 }}>Tier / Category</th>
                  <th style={{ padding: "12px 16px", fontWeight: 700 }}>Website Link</th>
                  <th style={{ padding: "12px 16px", fontWeight: 700 }}>Featured</th>
                  <th style={{ padding: "12px 16px", fontWeight: 700 }}>Status</th>
                  <th style={{ padding: "12px 16px", fontWeight: 700, textAlign: "right" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((item) => (
                  <tr
                    key={item.id}
                    style={{
                      borderBottom: "1px solid var(--wh-pale-sky)",
                      transition: "background-color 0.15s ease",
                    }}
                  >
                    {/* Order */}
                    <td style={{ padding: "14px 16px", fontWeight: 700, color: "var(--wh-text-muted)" }}>
                      #{item.displayOrder}
                    </td>

                    {/* Organization Name & Description */}
                    <td style={{ padding: "14px 16px", maxWidth: "260px" }}>
                      <div style={{ fontWeight: 600, color: "var(--wh-navy)", fontSize: "0.92rem", marginBottom: "3px" }}>
                        {item.name}
                      </div>
                      {item.description && (
                        <div
                          style={{
                            fontSize: "0.78rem",
                            color: "var(--wh-text-muted)",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            maxWidth: "260px",
                          }}
                        >
                          {item.description}
                        </div>
                      )}
                    </td>

                    {/* Tier / Category */}
                    <td style={{ padding: "14px 16px" }}>
                      <span
                        style={{
                          fontSize: "0.75rem",
                          fontWeight: 600,
                          padding: "3px 10px",
                          borderRadius: "var(--wh-radius-full)",
                          backgroundColor: "rgba(101, 175, 218, 0.15)",
                          color: "var(--wh-navy)",
                        }}
                      >
                        {item.tier || "Community Partner"}
                      </span>
                      {item.category && (
                        <div style={{ fontSize: "0.72rem", color: "var(--wh-text-muted)", marginTop: "4px" }}>
                          {item.category}
                        </div>
                      )}
                    </td>

                    {/* Website Link */}
                    <td style={{ padding: "14px 16px" }}>
                      {item.websiteUrl ? (
                        <a
                          href={item.websiteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            fontSize: "0.82rem",
                            color: "var(--wh-sky-blue)",
                            textDecoration: "none",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "5px",
                          }}
                        >
                          <span>Visit Site</span>
                          <i className="fas fa-external-link-alt" style={{ fontSize: "0.72rem" }}></i>
                        </a>
                      ) : (
                        <span style={{ fontSize: "0.78rem", color: "var(--wh-text-muted)" }}>None</span>
                      )}
                    </td>

                    {/* Featured */}
                    <td style={{ padding: "14px 16px" }}>
                      <button
                        onClick={() => handleToggleFeatured(item.id, item.isFeatured)}
                        disabled={loading}
                        style={{
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          fontSize: "0.88rem",
                          color: item.isFeatured ? "var(--wh-sun-gold)" : "var(--wh-text-muted)",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "5px",
                        }}
                        title={item.isFeatured ? "Click to unfeature" : "Click to feature"}
                      >
                        <i className={item.isFeatured ? "fas fa-star" : "far fa-star"}></i>
                        <span style={{ fontSize: "0.75rem", fontWeight: 600 }}>
                          {item.isFeatured ? "Featured" : "Standard"}
                        </span>
                      </button>
                    </td>

                    {/* Status Toggle */}
                    <td style={{ padding: "14px 16px" }}>
                      <button
                        onClick={() => handleTogglePublish(item.id, item.isPublished)}
                        disabled={loading}
                        style={{
                          padding: "4px 10px",
                          borderRadius: "var(--wh-radius-full)",
                          fontSize: "0.75rem",
                          fontWeight: 600,
                          border: "none",
                          cursor: "pointer",
                          backgroundColor: item.isPublished ? "rgba(76, 115, 50, 0.12)" : "rgba(98, 125, 152, 0.15)",
                          color: item.isPublished ? "var(--wh-community-green)" : "var(--wh-text-muted)",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "6px",
                        }}
                      >
                        <span
                          style={{
                            width: "6px",
                            height: "6px",
                            borderRadius: "50%",
                            backgroundColor: item.isPublished ? "var(--wh-community-green)" : "var(--wh-text-muted)",
                          }}
                        ></span>
                        {item.isPublished ? "Published" : "Draft (Hidden)"}
                      </button>
                    </td>

                    {/* Actions */}
                    <td style={{ padding: "14px 16px", textAlign: "right" }}>
                      <div style={{ display: "inline-flex", gap: "8px" }}>
                        <button
                          onClick={() => handleOpenEdit(item)}
                          className="btn btn-outline btn-sm"
                          style={{ padding: "5px 10px", fontSize: "0.78rem" }}
                        >
                          <i className="fas fa-edit"></i> Edit
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          disabled={loading}
                          style={{
                            padding: "5px 10px",
                            borderRadius: "var(--wh-radius-sm)",
                            fontSize: "0.78rem",
                            border: "1px solid rgba(220, 38, 38, 0.3)",
                            backgroundColor: "rgba(220, 38, 38, 0.08)",
                            color: "var(--wh-danger)",
                            cursor: "pointer",
                          }}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(15, 59, 106, 0.6)",
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: "20px",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "var(--wh-radius-lg)",
              maxWidth: "600px",
              width: "100%",
              maxHeight: "90vh",
              overflowY: "auto",
              boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
            }}
          >
            {/* Modal Header */}
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
                {editingItem ? "Edit Partner Organization" : "Add Partner Organization"}
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

              {/* Organization Name */}
              <div style={{ marginBottom: "14px" }}>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--wh-navy)", marginBottom: "4px" }}>
                  Organization Name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  defaultValue={editingItem?.name || ""}
                  placeholder="e.g. Toronto District School Board (TDSB)"
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
                  Description / Collaboration Scope
                </label>
                <textarea
                  name="description"
                  rows={3}
                  defaultValue={editingItem?.description || ""}
                  placeholder="e.g. Collaborating on educational programs, youth tutoring, and community workshops."
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

              {/* Tier & Category */}
              <div className="grid-2" style={{ gap: "12px", marginBottom: "14px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--wh-navy)", marginBottom: "4px" }}>
                    Sponsorship Tier / Level
                  </label>
                  <select
                    name="tier"
                    defaultValue={editingItem?.tier || "Community Builder"}
                    style={{
                      width: "100%",
                      padding: "9px 12px",
                      borderRadius: "var(--wh-radius-sm)",
                      border: "1.5px solid var(--wh-pale-sky)",
                      fontSize: "0.9rem",
                      outline: "none",
                    }}
                  >
                    <option value="Cornerstone Partner">Cornerstone Partner</option>
                    <option value="Community Builder">Community Builder</option>
                    <option value="Youth Advocate">Youth Advocate</option>
                    <option value="Community Partner">Community Partner</option>
                    <option value="Institutional Collaborator">Institutional Collaborator</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--wh-navy)", marginBottom: "4px" }}>
                    Sector Category
                  </label>
                  <input
                    type="text"
                    name="category"
                    defaultValue={editingItem?.category || "Education"}
                    placeholder="e.g. Education, Health & Wellness, Recreation"
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

              {/* Website URL */}
              <div style={{ marginBottom: "14px" }}>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--wh-navy)", marginBottom: "4px" }}>
                  Website URL
                </label>
                <input
                  type="url"
                  name="websiteUrl"
                  defaultValue={editingItem?.websiteUrl || ""}
                  placeholder="e.g. https://www.tdsb.on.ca"
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

              {/* Logo URL / Path */}
              <div style={{ marginBottom: "14px" }}>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--wh-navy)", marginBottom: "4px" }}>
                  Logo URL / Image Path
                </label>
                <input
                  type="text"
                  name="logoUrl"
                  defaultValue={editingItem?.logoUrl || ""}
                  placeholder="e.g. /images/partners/tdsb.png or https://..."
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

              {/* Display Order, Featured & Published */}
              <div className="grid-3" style={{ gap: "12px", marginBottom: "20px", alignItems: "center" }}>
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
                  <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.88rem", fontWeight: 600, cursor: "pointer", color: "var(--wh-navy)" }}>
                    <input
                      type="checkbox"
                      name="isFeatured"
                      defaultChecked={editingItem ? editingItem.isFeatured : false}
                      style={{ width: "16px", height: "16px", cursor: "pointer" }}
                    />
                    Featured Partner
                  </label>
                </div>

                <div style={{ paddingTop: "18px" }}>
                  <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.88rem", fontWeight: 600, cursor: "pointer", color: "var(--wh-navy)" }}>
                    <input
                      type="checkbox"
                      name="isPublished"
                      defaultChecked={editingItem ? editingItem.isPublished : true}
                      style={{ width: "16px", height: "16px", cursor: "pointer" }}
                    />
                    Published Live
                  </label>
                </div>
              </div>

              {/* Modal Actions */}
              <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "24px" }}>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="btn btn-outline"
                  style={{ padding: "8px 16px" }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary"
                  style={{ padding: "8px 18px", display: "inline-flex", alignItems: "center", gap: "6px" }}
                >
                  {loading ? (
                    <>
                      <i className="fas fa-spinner fa-spin"></i> Saving...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-check"></i> Save Partner
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
