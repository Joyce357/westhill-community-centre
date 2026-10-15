"use client";

import { useState } from "react";
import MediaUploader from "@/components/admin/MediaUploader";
import {
  createProgramAction,
  updateProgramAction,
  toggleProgramPublishedAction,
  deleteProgramAction,
} from "@/app/actions/programs";

interface ProgramItem {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  categoryId: string;
  category: { id: string; name: string };
  displayLabel: string | null;
  icon: string | null;
  imageUrl: string | null;
  schedule: string | null;
  eligibility: string | null;
  location: string | null;
  registrationInfo: string | null;
  isFeatured: boolean;
  isPublished: boolean;
  displayOrder: number;
}

interface CategoryItem {
  id: string;
  name: string;
}

export default function ProgramsManager({
  initialPrograms,
  categories,
}: {
  initialPrograms: ProgramItem[];
  categories: CategoryItem[];
}) {
  const [programs, setPrograms] = useState<ProgramItem[]>(initialPrograms);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ProgramItem | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>("ALL");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const filteredPrograms =
    filterCategory === "ALL"
      ? programs
      : programs.filter((p) => p.categoryId === filterCategory);

  const handleOpenCreate = () => {
    setEditingItem(null);
    setError(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (prog: ProgramItem) => {
    setEditingItem(prog);
    setError(null);
    setIsModalOpen(true);
  };

  const handleTogglePublish = async (id: string, currentStatus: boolean) => {
    setLoading(true);
    const newStatus = !currentStatus;
    const res = await toggleProgramPublishedAction(id, newStatus);
    if (res.success) {
      setPrograms((prev) =>
        prev.map((p) => (p.id === id ? { ...p, isPublished: newStatus } : p))
      );
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to permanently delete this program?")) return;
    setLoading(true);
    const res = await deleteProgramAction(id);
    if (res.success) {
      setPrograms((prev) => prev.filter((p) => p.id !== id));
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
      res = await updateProgramAction(editingItem.id, formData);
    } else {
      res = await createProgramAction(formData);
    }

    if (res.success) {
      setIsModalOpen(false);
      window.location.reload();
    } else {
      setError(res.error || "Failed to save program.");
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
            Programs & Services Management
          </h1>
          <p style={{ fontSize: "0.88rem", color: "var(--wh-text-muted)", margin: 0 }}>
            Create, update, or publish programs displayed on the public /programs directory and homepage.
          </p>
        </div>

        <button onClick={handleOpenCreate} className="btn btn-primary btn-sm">
          <i className="fas fa-plus"></i> Add New Program
        </button>
      </div>

      {/* Filter Tabs */}
      <div
        style={{
          display: "flex",
          gap: "8px",
          marginBottom: "20px",
          overflowX: "auto",
          paddingBottom: "4px",
        }}
      >
        <button
          onClick={() => setFilterCategory("ALL")}
          style={{
            padding: "6px 14px",
            borderRadius: "var(--wh-radius-full)",
            fontSize: "0.82rem",
            fontWeight: 600,
            border: "none",
            cursor: "pointer",
            backgroundColor: filterCategory === "ALL" ? "var(--wh-navy)" : "var(--wh-bg-white)",
            color: filterCategory === "ALL" ? "white" : "var(--wh-text-body)",
            boxShadow: "var(--wh-shadow-soft)",
          }}
        >
          All Programs ({programs.length})
        </button>
        {categories.map((cat) => {
          const count = programs.filter((p) => p.categoryId === cat.id).length;
          return (
            <button
              key={cat.id}
              onClick={() => setFilterCategory(cat.id)}
              style={{
                padding: "6px 14px",
                borderRadius: "var(--wh-radius-full)",
                fontSize: "0.82rem",
                fontWeight: 600,
                border: "none",
                cursor: "pointer",
                backgroundColor: filterCategory === cat.id ? "var(--wh-navy)" : "var(--wh-bg-white)",
                color: filterCategory === cat.id ? "white" : "var(--wh-text-body)",
                boxShadow: "var(--wh-shadow-soft)",
              }}
            >
              {cat.name} ({count})
            </button>
          );
        })}
      </div>

      {/* Programs Table */}
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
              <th style={{ padding: "14px 20px", color: "var(--wh-navy)", fontWeight: 600 }}>Program</th>
              <th style={{ padding: "14px 20px", color: "var(--wh-navy)", fontWeight: 600 }}>Category</th>
              <th style={{ padding: "14px 20px", color: "var(--wh-navy)", fontWeight: 600 }}>Schedule</th>
              <th style={{ padding: "14px 20px", color: "var(--wh-navy)", fontWeight: 600 }}>Status</th>
              <th style={{ padding: "14px 20px", color: "var(--wh-navy)", fontWeight: 600, textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPrograms.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ padding: "30px", textAlign: "center", color: "var(--wh-text-muted)" }}>
                  No programs found in this category. Click &quot;Add New Program&quot; to create one.
                </td>
              </tr>
            ) : (
              filteredPrograms.map((prog) => (
                <tr key={prog.id} style={{ borderBottom: "1px solid rgba(210, 234, 242, 0.6)" }}>
                  <td style={{ padding: "16px 20px" }}>
                    <div style={{ fontWeight: 600, color: "var(--wh-navy)", marginBottom: "4px" }}>
                      {prog.title}
                      {prog.isFeatured && (
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
                      {prog.displayLabel && (
                        <span
                          style={{
                            marginLeft: "8px",
                            backgroundColor: "rgba(15, 59, 106, 0.1)",
                            color: "var(--wh-navy)",
                            fontSize: "0.7rem",
                            padding: "2px 6px",
                            borderRadius: "4px",
                            fontWeight: 600,
                          }}
                        >
                          {prog.displayLabel}
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: "0.78rem", color: "var(--wh-text-muted)", maxWidth: "340px" }}>
                      {prog.shortDescription}
                    </div>
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
                      {prog.category.name}
                    </span>
                  </td>
                  <td style={{ padding: "16px 20px", color: "var(--wh-text-body)", fontSize: "0.82rem" }}>
                    {prog.schedule || "Flexible / Drop-in"}
                  </td>
                  <td style={{ padding: "16px 20px" }}>
                    <button
                      onClick={() => handleTogglePublish(prog.id, prog.isPublished)}
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
                        backgroundColor: prog.isPublished ? "rgba(76, 115, 50, 0.12)" : "rgba(98, 125, 152, 0.12)",
                        color: prog.isPublished ? "var(--wh-community-green)" : "var(--wh-text-muted)",
                      }}
                    >
                      <span
                        style={{
                          width: "7px",
                          height: "7px",
                          borderRadius: "50%",
                          backgroundColor: prog.isPublished ? "var(--wh-community-green)" : "var(--wh-text-muted)",
                        }}
                      ></span>
                      {prog.isPublished ? "Published" : "Draft"}
                    </button>
                  </td>
                  <td style={{ padding: "16px 20px", textAlign: "right" }}>
                    <div style={{ display: "inline-flex", gap: "8px" }}>
                      <button
                        onClick={() => handleOpenEdit(prog)}
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
                        onClick={() => handleDelete(prog.id)}
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
                {editingItem ? `Edit Program: ${editingItem.title}` : "Add New Program"}
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
                    Program Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    required
                    defaultValue={editingItem?.title || ""}
                    placeholder="e.g. Youth Development & Leadership"
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
                  <select
                    name="categoryId"
                    required
                    defaultValue={editingItem?.categoryId || categories[0]?.id || ""}
                    style={{
                      width: "100%",
                      padding: "10px",
                      borderRadius: "var(--wh-radius-sm)",
                      border: "1.5px solid var(--wh-pale-sky)",
                      fontSize: "0.9rem",
                      backgroundColor: "white",
                    }}
                  >
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--wh-navy)", marginBottom: "4px" }}>
                  Display Label (Optional)
                </label>
                <p style={{ fontSize: "0.78rem", color: "var(--wh-text-muted)", marginBottom: "6px" }}>
                  Optional short badge displayed on the public program card. Leave blank for no badge.
                </p>
                <input
                  type="text"
                  name="displayLabel"
                  defaultValue={editingItem?.displayLabel || ""}
                  placeholder="e.g. Drop-In, Registration Open (leave blank for no badge)"
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
                  Short Summary (Cards & Previews) *
                </label>
                <textarea
                  name="shortDescription"
                  required
                  rows={2}
                  defaultValue={editingItem?.shortDescription || ""}
                  placeholder="Concise 1-2 sentence description for program cards"
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
                  Full Description
                </label>
                <textarea
                  name="fullDescription"
                  rows={3}
                  defaultValue={editingItem?.fullDescription || ""}
                  placeholder="Detailed description of activities, offerings, and background"
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "var(--wh-radius-sm)",
                    border: "1.5px solid var(--wh-pale-sky)",
                    fontSize: "0.9rem",
                  }}
                />
              </div>

              <div className="grid-2" style={{ gap: "16px", marginBottom: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--wh-navy)", marginBottom: "6px" }}>
                    Schedule / Operating Hours
                  </label>
                  <input
                    type="text"
                    name="schedule"
                    defaultValue={editingItem?.schedule || ""}
                    placeholder="Only enter a verified schedule"
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
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    defaultValue={editingItem?.location || ""}
                    placeholder="Only enter a verified location"
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
                <div>
                  <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--wh-navy)", marginBottom: "6px" }}>
                    Registration Information
                  </label>
                  <input
                    type="text"
                    name="registrationInfo"
                    defaultValue={editingItem?.registrationInfo || ""}
                    placeholder="e.g. Free drop-in"
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
                  Icon Class (FontAwesome)
                </label>
                <input
                  type="text"
                  name="icon"
                  defaultValue={editingItem?.icon || "fas fa-folder"}
                  placeholder="e.g. fas fa-laptop-code"
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "var(--wh-radius-sm)",
                    border: "1.5px solid var(--wh-pale-sky)",
                    fontSize: "0.9rem",
                  }}
                />
              </div>

              {/* Media Uploader for Program Cover Photo */}
              <MediaUploader
                name="imageUrl"
                defaultValue={editingItem?.imageUrl || "/images/hero_community.png"}
                acceptedTypes="image-only"
                label="Program Cover Image"
                helperText="Upload JPG, PNG, or WebP cover image, or paste an existing URL / local asset path."
              />

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
                  <span>Feature on Homepage</span>
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
                  {loading ? "Saving..." : editingItem ? "Update Program" : "Create Program"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
