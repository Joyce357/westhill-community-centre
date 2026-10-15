"use client";

import { useState } from "react";
import Image from "next/image";

export interface GalleryOption {
  id: string;
  title: string;
  category?: string | null;
  mediaType: string;
  mediaUrl: string;
  thumbnailUrl?: string | null;
  altText?: string | null;
}

interface GalleryItemSelectorProps {
  name: string;
  label: string;
  initialSelectedId?: string | null;
  galleryItems: GalleryOption[];
  helperText?: string;
  defaultFallbackLabel?: string;
}

export default function GalleryItemSelector({
  name,
  label,
  initialSelectedId = null,
  galleryItems = [],
  helperText,
  defaultFallbackLabel = "Default authentic photo",
}: GalleryItemSelectorProps) {
  const [selectedId, setSelectedId] = useState<string | null>(initialSelectedId || null);
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const selectedItem = galleryItems.find((item) => item.id === selectedId);

  const filteredItems = galleryItems.filter((item) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      item.title.toLowerCase().includes(q) ||
      (item.category && item.category.toLowerCase().includes(q))
    );
  });

  return (
    <div style={{ marginBottom: "20px" }}>
      <label
        style={{
          display: "block",
          fontSize: "0.88rem",
          fontWeight: 600,
          color: "var(--wh-navy)",
          marginBottom: "4px",
        }}
      >
        {label}
      </label>
      {helperText && (
        <p style={{ fontSize: "0.8rem", color: "var(--wh-text-muted)", marginBottom: "8px" }}>
          {helperText}
        </p>
      )}

      {/* Hidden input to submit form data */}
      <input type="hidden" name={name} value={selectedId || ""} />

      {/* Selected item preview card */}
      <div
        style={{
          border: "1.5px solid var(--wh-pale-sky)",
          borderRadius: "var(--wh-radius-sm)",
          padding: "12px",
          backgroundColor: "var(--wh-bg-white)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "12px",
          flexWrap: "wrap",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px", minWidth: 0 }}>
          <div
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "4px",
              overflow: "hidden",
              position: "relative",
              backgroundColor: "rgba(12, 40, 63, 0.08)",
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {selectedItem?.mediaUrl ? (
              <Image
                src={selectedItem.thumbnailUrl || selectedItem.mediaUrl}
                alt={selectedItem.title || "Selected Gallery Item"}
                fill
                style={{ objectFit: "cover" }}
                sizes="60px"
              />
            ) : (
              <i className="fas fa-image" style={{ color: "var(--wh-text-muted)", fontSize: "1.4rem" }}></i>
            )}
          </div>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--wh-navy)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {selectedItem ? selectedItem.title : `Using: ${defaultFallbackLabel}`}
            </div>
            <div style={{ fontSize: "0.78rem", color: "var(--wh-text-muted)", display: "flex", gap: "6px", alignItems: "center", marginTop: "2px" }}>
              {selectedItem ? (
                <>
                  <span style={{ backgroundColor: "rgba(101, 175, 218, 0.15)", color: "var(--wh-navy)", padding: "1px 6px", borderRadius: "3px" }}>
                    {selectedItem.category || "Gallery Media"}
                  </span>
                  <span>ID: {selectedItem.id.slice(0, 10)}...</span>
                </>
              ) : (
                <span>No custom selection. Managed dynamically via default.</span>
              )}
            </div>
          </div>
        </div>

        <div style={{ display: "flex", gap: "8px" }}>
          {selectedId && (
            <button
              type="button"
              onClick={() => setSelectedId(null)}
              style={{
                padding: "6px 12px",
                fontSize: "0.8rem",
                color: "var(--wh-danger)",
                backgroundColor: "transparent",
                border: "1px solid var(--wh-danger-border)",
                borderRadius: "var(--wh-radius-sm)",
                cursor: "pointer",
              }}
            >
              Reset to Default
            </button>
          )}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            style={{
              padding: "6px 14px",
              fontSize: "0.82rem",
              fontWeight: 600,
              color: "var(--wh-navy)",
              backgroundColor: "rgba(101, 175, 218, 0.15)",
              border: "1px solid var(--wh-pale-sky)",
              borderRadius: "var(--wh-radius-sm)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <i className={`fas ${isOpen ? "fa-chevron-up" : "fa-images"}`}></i>
            <span>{isOpen ? "Close Selector" : selectedItem ? "Change Image" : "Choose from Gallery"}</span>
          </button>
        </div>
      </div>

      {/* Expandable Gallery Grid */}
      {isOpen && (
        <div
          style={{
            marginTop: "10px",
            border: "1.5px solid var(--wh-navy)",
            borderRadius: "var(--wh-radius-sm)",
            padding: "16px",
            backgroundColor: "#F9FBFC",
            boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px", gap: "10px", flexWrap: "wrap" }}>
            <span style={{ fontSize: "0.84rem", fontWeight: 700, color: "var(--wh-navy)" }}>
              Select a Published Gallery Item ({galleryItems.length} available)
            </span>
            <input
              type="text"
              placeholder="Search by title or album..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                padding: "6px 10px",
                fontSize: "0.8rem",
                borderRadius: "4px",
                border: "1px solid var(--wh-pale-sky)",
                width: "220px",
              }}
            />
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))",
              gap: "10px",
              maxHeight: "320px",
              overflowY: "auto",
              padding: "4px",
            }}
          >
            {filteredItems.map((item) => {
              const isCurrent = item.id === selectedId;
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    setSelectedId(item.id);
                    setIsOpen(false);
                  }}
                  style={{
                    border: isCurrent ? "2px solid var(--wh-sun-gold)" : "1px solid var(--wh-pale-sky)",
                    borderRadius: "4px",
                    overflow: "hidden",
                    cursor: "pointer",
                    backgroundColor: "#FFFFFF",
                    position: "relative",
                    transition: "transform 0.15s ease, border-color 0.15s ease",
                  }}
                  title={item.title}
                >
                  <div style={{ width: "100%", height: "90px", position: "relative", backgroundColor: "#EAEFF4" }}>
                    <Image
                      src={item.thumbnailUrl || item.mediaUrl}
                      alt={item.title || "Gallery thumbnail"}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="130px"
                    />
                    {isCurrent && (
                      <div
                        style={{
                          position: "absolute",
                          top: "4px",
                          right: "4px",
                          backgroundColor: "var(--wh-sun-gold)",
                          color: "var(--wh-navy)",
                          width: "20px",
                          height: "20px",
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "11px",
                          fontWeight: 800,
                        }}
                      >
                        ✓
                      </div>
                    )}
                  </div>
                  <div style={{ padding: "6px 8px" }}>
                    <div
                      style={{
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        color: "var(--wh-navy)",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {item.title}
                    </div>
                    {item.category && (
                      <div
                        style={{
                          fontSize: "0.68rem",
                          color: "var(--wh-text-muted)",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {item.category}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
            {filteredItems.length === 0 && (
              <p style={{ gridColumn: "1 / -1", textAlign: "center", fontSize: "0.85rem", color: "var(--wh-text-muted)", padding: "20px" }}>
                No published gallery items found matching your search.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
