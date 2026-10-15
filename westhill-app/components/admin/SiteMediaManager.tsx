"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  updatePlacementAction,
  addHeroSlideAction,
  removeHeroSlideAction,
  reorderHeroSlidesAction,
} from "@/app/actions/siteMedia";

export interface GalleryOption {
  id: string;
  title: string;
  category?: string | null;
  mediaType: string;
  mediaUrl: string;
  thumbnailUrl?: string | null;
  altText?: string | null;
  isPublished?: boolean;
}

export interface SiteMediaPlacementItem {
  id: string;
  slotKey: string;
  page: string;
  label: string;
  galleryItemId: string | null;
  displayOrder: number;
  isActive: boolean;
  galleryItem: {
    id: string;
    title: string;
    mediaUrl: string;
    thumbnailUrl: string | null;
    altText: string | null;
    category: string | null;
    isPublished: boolean;
  } | null;
}

interface SiteMediaManagerProps {
  initialPlacements: SiteMediaPlacementItem[];
  galleryItems: GalleryOption[];
}

export default function SiteMediaManager({
  initialPlacements,
  galleryItems,
}: SiteMediaManagerProps) {
  const [placements, setPlacements] = useState<SiteMediaPlacementItem[]>(initialPlacements);
  const [activeTab, setActiveTab] = useState<string>("all");
  const [isPending, startTransition] = useTransition();
  const [toastMessage, setToastMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  // Gallery picker modal state
  const [pickerModal, setPickerModal] = useState<{
    isOpen: boolean;
    mode: "single" | "add-hero-slide";
    targetPlacementId?: string;
    title: string;
  }>({
    isOpen: false,
    mode: "single",
    title: "",
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const showToast = (text: string, type: "success" | "error" = "success") => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Distinct categories in published gallery
  const categories = Array.from(
    new Set(galleryItems.map((g) => g.category || "General").filter(Boolean))
  );

  const filteredGalleryItems = galleryItems.filter((item) => {
    const matchesSearch =
      !searchQuery ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.category && item.category.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory =
      categoryFilter === "all" || (item.category || "General") === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // Separate hero slides from single-slot placements
  const heroSlides = placements
    .filter((p) => p.slotKey === "homepage-hero-slide")
    .sort((a, b) => a.displayOrder - b.displayOrder);

  const singlePlacements = placements.filter((p) => p.slotKey !== "homepage-hero-slide");

  const pageGroups = Array.from(new Set(singlePlacements.map((p) => p.page)));

  // Handlers
  const openSinglePicker = (placementId: string, label: string) => {
    setSearchQuery("");
    setCategoryFilter("all");
    setPickerModal({
      isOpen: true,
      mode: "single",
      targetPlacementId: placementId,
      title: `Select Image for: ${label}`,
    });
  };

  const openAddHeroPicker = () => {
    setSearchQuery("");
    setCategoryFilter("all");
    setPickerModal({
      isOpen: true,
      mode: "add-hero-slide",
      title: "Add Image to Homepage Hero Slideshow",
    });
  };

  const handleSelectGalleryItem = (galleryItem: GalleryOption) => {
    if (pickerModal.mode === "single" && pickerModal.targetPlacementId) {
      const pId = pickerModal.targetPlacementId;
      startTransition(async () => {
        const res = await updatePlacementAction(pId, galleryItem.id);
        if (res.success) {
          setPlacements((prev) =>
            prev.map((item) =>
              item.id === pId
                ? {
                    ...item,
                    galleryItemId: galleryItem.id,
                    galleryItem: {
                      id: galleryItem.id,
                      title: galleryItem.title,
                      mediaUrl: galleryItem.mediaUrl,
                      thumbnailUrl: galleryItem.thumbnailUrl || null,
                      altText: galleryItem.altText || null,
                      category: galleryItem.category || null,
                      isPublished: galleryItem.isPublished ?? true,
                    },
                  }
                : item
            )
          );
          showToast("Image updated successfully! Public page revalidated.");
        } else {
          showToast(res.error || "Failed to update placement.", "error");
        }
      });
    } else if (pickerModal.mode === "add-hero-slide") {
      startTransition(async () => {
        const res = await addHeroSlideAction(galleryItem.id);
        if (res.success && res.placement) {
          const newPlacementItem: SiteMediaPlacementItem = {
            id: res.placement.id,
            slotKey: "homepage-hero-slide",
            page: "homepage",
            label: res.placement.label,
            galleryItemId: galleryItem.id,
            displayOrder: res.placement.displayOrder,
            isActive: true,
            galleryItem: {
              id: galleryItem.id,
              title: galleryItem.title,
              mediaUrl: galleryItem.mediaUrl,
              thumbnailUrl: galleryItem.thumbnailUrl || null,
              altText: galleryItem.altText || null,
              category: galleryItem.category || null,
              isPublished: galleryItem.isPublished ?? true,
            },
          };
          setPlacements((prev) => [...prev, newPlacementItem]);
          showToast("Added slide to Hero Slideshow! Homepage revalidated.");
        } else {
          showToast(res.error || "Failed to add hero slide.", "error");
        }
      });
    }

    setPickerModal({ isOpen: false, mode: "single", title: "" });
  };

  const handleClearPlacement = (placementId: string) => {
    startTransition(async () => {
      const res = await updatePlacementAction(placementId, null);
      if (res.success) {
        setPlacements((prev) =>
          prev.map((item) =>
            item.id === placementId
              ? { ...item, galleryItemId: null, galleryItem: null }
              : item
          )
        );
        showToast("Image cleared. Placement reverted to default/placeholder.");
      } else {
        showToast(res.error || "Failed to clear placement.", "error");
      }
    });
  };

  const handleRemoveHeroSlide = (slideId: string) => {
    if (heroSlides.length <= 1) {
      if (!confirm("Removing the last slide will leave the hero with fallback default images. Continue?")) {
        return;
      }
    }
    startTransition(async () => {
      const res = await removeHeroSlideAction(slideId);
      if (res.success) {
        setPlacements((prev) => prev.filter((item) => item.id !== slideId));
        showToast("Hero slide removed! Homepage revalidated.");
      } else {
        showToast(res.error || "Failed to remove slide.", "error");
      }
    });
  };

  const handleMoveSlide = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= heroSlides.length) return;

    const newSlides = [...heroSlides];
    const temp = newSlides[index];
    newSlides[index] = newSlides[targetIndex];
    newSlides[targetIndex] = temp;

    const orderedIds = newSlides.map((s) => s.id);

    // Optimistic UI update
    setPlacements((prev) => {
      const nonHero = prev.filter((p) => p.slotKey !== "homepage-hero-slide");
      const updatedHero = newSlides.map((s, idx) => ({
        ...s,
        displayOrder: idx,
        label: `Hero Slide ${idx + 1}`,
      }));
      return [...nonHero, ...updatedHero];
    });

    startTransition(async () => {
      const res = await reorderHeroSlidesAction(orderedIds);
      if (res.success) {
        showToast("Hero slides reordered successfully!");
      } else {
        showToast(res.error || "Failed to reorder slides.", "error");
      }
    });
  };

  const filteredSinglePlacements =
    activeTab === "all"
      ? singlePlacements
      : singlePlacements.filter((p) => p.page.toLowerCase() === activeTab.toLowerCase());

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "10px 0" }}>
      {/* Header Bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "20px",
          flexWrap: "wrap",
          marginBottom: "28px",
          paddingBottom: "20px",
          borderBottom: "1px solid var(--wh-pale-sky)",
        }}
      >
        <div>
          <span
            style={{
              fontSize: "0.75rem",
              fontWeight: 800,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--wh-community-green)",
              backgroundColor: "rgba(76, 115, 50, 0.1)",
              padding: "3px 10px",
              borderRadius: "4px",
              display: "inline-block",
              marginBottom: "8px",
            }}
          >
            GLOBAL MEDIA PLACEMENT SYSTEM
          </span>
          <h1 style={{ color: "var(--wh-navy)", margin: "0 0 6px", fontSize: "1.85rem", fontWeight: 700 }}>
            Site Media Manager
          </h1>
          <p style={{ color: "var(--wh-text-body)", fontSize: "0.95rem", margin: 0, maxWidth: "700px" }}>
            Administratively replace photographs across all public pages without touching code. Select from verified Gallery photos uploaded in <Link href="/admin/gallery" style={{ color: "var(--wh-sky-blue)", fontWeight: 600 }}>Gallery CMS</Link>.
          </p>
        </div>

        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <Link
            href="/admin/gallery"
            className="btn btn-secondary"
            style={{ fontSize: "0.85rem", padding: "9px 16px" }}
          >
            <i className="fas fa-upload" style={{ marginRight: "6px" }}></i>
            Upload Photos in Gallery
          </Link>
          <Link
            href="/"
            target="_blank"
            className="btn btn-primary"
            style={{ fontSize: "0.85rem", padding: "9px 16px" }}
          >
            <i className="fas fa-arrow-up-right-from-square" style={{ marginRight: "6px" }}></i>
            View Live Site
          </Link>
        </div>
      </div>

      {/* Toast alert */}
      {toastMessage && (
        <div
          style={{
            padding: "12px 18px",
            borderRadius: "6px",
            backgroundColor: toastMessage.type === "success" ? "#E8F5E9" : "#FFEBEE",
            color: toastMessage.type === "success" ? "#2E7D32" : "#C62828",
            border: `1px solid ${toastMessage.type === "success" ? "#A5D6A7" : "#FFCDD2"}`,
            marginBottom: "20px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            fontWeight: 600,
            fontSize: "0.9rem",
          }}
        >
          <i className={toastMessage.type === "success" ? "fas fa-check-circle" : "fas fa-exclamation-triangle"}></i>
          <span>{toastMessage.text}</span>
        </div>
      )}

      {/* =====================================================================
          1. HOMEPAGE HERO SLIDESHOW (MULTI-IMAGE MANAGER)
          ===================================================================== */}
      <div
        style={{
          backgroundColor: "var(--wh-bg-white)",
          borderRadius: "var(--wh-radius-md)",
          border: "1.5px solid var(--wh-pale-sky)",
          padding: "24px",
          marginBottom: "36px",
          boxShadow: "var(--wh-shadow-soft)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "14px",
            marginBottom: "16px",
            paddingBottom: "14px",
            borderBottom: "1px solid rgba(210, 234, 242, 0.6)",
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span
                style={{
                  fontSize: "0.72rem",
                  fontWeight: 800,
                  backgroundColor: "rgba(19, 61, 95, 0.1)",
                  color: "var(--wh-navy)",
                  padding: "2px 8px",
                  borderRadius: "3px",
                  textTransform: "uppercase",
                }}
              >
                HOMEPAGE HERO
              </span>
              <h2 style={{ fontSize: "1.3rem", fontWeight: 700, color: "var(--wh-navy)", margin: 0 }}>
                Hero Slideshow Images
              </h2>
            </div>
            <p style={{ fontSize: "0.85rem", color: "var(--wh-text-muted)", margin: "4px 0 0" }}>
              These images automatically rotate with smooth crossfades in the main homepage hero banner. Reorder or add additional photos.
            </p>
          </div>

          <button
            type="button"
            onClick={openAddHeroPicker}
            disabled={isPending}
            className="btn btn-secondary"
            style={{ fontSize: "0.85rem", padding: "8px 16px", display: "inline-flex", alignItems: "center", gap: "6px" }}
          >
            <i className="fas fa-plus"></i>
            <span>Add Slide to Hero</span>
          </button>
        </div>

        {heroSlides.length === 0 ? (
          <div
            style={{
              padding: "30px",
              textAlign: "center",
              backgroundColor: "var(--wh-bg-soft)",
              borderRadius: "6px",
              color: "var(--wh-text-muted)",
              fontSize: "0.9rem",
            }}
          >
            <i className="fas fa-images" style={{ fontSize: "2rem", marginBottom: "8px", display: "block" }}></i>
            No custom slides currently assigned. Using curated authentic opening fallback photos.
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
              gap: "16px",
            }}
          >
            {heroSlides.map((slide, idx) => {
              const item = slide.galleryItem;
              return (
                <div
                  key={slide.id}
                  style={{
                    border: "1px solid var(--wh-pale-sky)",
                    borderRadius: "8px",
                    overflow: "hidden",
                    backgroundColor: "var(--wh-bg-white)",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div style={{ position: "relative", height: "140px", backgroundColor: "#0C283F" }}>
                    {item?.mediaUrl ? (
                      <Image
                        src={item.thumbnailUrl || item.mediaUrl}
                        alt={item.altText || item.title}
                        fill
                        style={{ objectFit: "cover" }}
                        sizes="300px"
                      />
                    ) : (
                      <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "#FFFFFF" }}>
                        <i className="fas fa-image" style={{ fontSize: "2rem" }}></i>
                      </div>
                    )}
                    <span
                      style={{
                        position: "absolute",
                        top: "8px",
                        left: "8px",
                        backgroundColor: "rgba(0, 34, 67, 0.85)",
                        color: "var(--wh-sun-gold)",
                        padding: "2px 8px",
                        borderRadius: "4px",
                        fontSize: "0.72rem",
                        fontWeight: 700,
                        backdropFilter: "blur(4px)",
                      }}
                    >
                      Slide #{idx + 1}
                    </span>
                  </div>

                  <div style={{ padding: "12px", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <div>
                      <div
                        style={{
                          fontSize: "0.85rem",
                          fontWeight: 700,
                          color: "var(--wh-navy)",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {item?.title || "Slide Image"}
                      </div>
                      <div style={{ fontSize: "0.72rem", color: "var(--wh-text-muted)", marginTop: "2px" }}>
                        {item?.category || "Gallery Media"}
                      </div>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginTop: "12px",
                        paddingTop: "8px",
                        borderTop: "1px solid rgba(210, 234, 242, 0.5)",
                      }}
                    >
                      <div style={{ display: "flex", gap: "4px" }}>
                        <button
                          type="button"
                          onClick={() => handleMoveSlide(idx, "up")}
                          disabled={idx === 0 || isPending}
                          title="Move Earlier"
                          style={{
                            width: "28px",
                            height: "28px",
                            borderRadius: "4px",
                            border: "1px solid var(--wh-pale-sky)",
                            backgroundColor: idx === 0 ? "#F5F5F5" : "transparent",
                            cursor: idx === 0 ? "not-allowed" : "pointer",
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "0.75rem",
                            color: "var(--wh-navy)",
                          }}
                        >
                          <i className="fas fa-chevron-left"></i>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleMoveSlide(idx, "down")}
                          disabled={idx === heroSlides.length - 1 || isPending}
                          title="Move Later"
                          style={{
                            width: "28px",
                            height: "28px",
                            borderRadius: "4px",
                            border: "1px solid var(--wh-pale-sky)",
                            backgroundColor: idx === heroSlides.length - 1 ? "#F5F5F5" : "transparent",
                            cursor: idx === heroSlides.length - 1 ? "not-allowed" : "pointer",
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "0.75rem",
                            color: "var(--wh-navy)",
                          }}
                        >
                          <i className="fas fa-chevron-right"></i>
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleRemoveHeroSlide(slide.id)}
                        disabled={isPending}
                        title="Remove Slide"
                        style={{
                          padding: "4px 8px",
                          borderRadius: "4px",
                          border: "1px solid #FFCDD2",
                          backgroundColor: "#FFEBEE",
                          color: "#C62828",
                          fontSize: "0.75rem",
                          fontWeight: 600,
                          cursor: "pointer",
                        }}
                      >
                        <i className="fas fa-trash-alt" style={{ marginRight: "4px" }}></i>
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* =====================================================================
          2. PAGE FILTER TABS & SINGLE PLACEMENT SLOTS
          ===================================================================== */}
      <div style={{ marginBottom: "20px" }}>
        <div style={{ display: "flex", gap: "8px", overflowX: "auto", paddingBottom: "6px" }}>
          <button
            type="button"
            onClick={() => setActiveTab("all")}
            style={{
              padding: "7px 16px",
              borderRadius: "20px",
              fontSize: "0.85rem",
              fontWeight: 700,
              border: "none",
              cursor: "pointer",
              backgroundColor: activeTab === "all" ? "var(--wh-navy)" : "var(--wh-bg-white)",
              color: activeTab === "all" ? "#FFFFFF" : "var(--wh-navy)",
              boxShadow: activeTab === "all" ? "var(--wh-shadow-soft)" : "none",
            }}
          >
            All Pages ({singlePlacements.length})
          </button>
          {pageGroups.map((p) => {
            const count = singlePlacements.filter((item) => item.page === p).length;
            const isActive = activeTab.toLowerCase() === p.toLowerCase();
            return (
              <button
                key={p}
                type="button"
                onClick={() => setActiveTab(p)}
                style={{
                  padding: "7px 16px",
                  borderRadius: "20px",
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  border: "none",
                  cursor: "pointer",
                  textTransform: "capitalize",
                  backgroundColor: isActive ? "var(--wh-navy)" : "var(--wh-bg-white)",
                  color: isActive ? "#FFFFFF" : "var(--wh-navy)",
                  boxShadow: isActive ? "var(--wh-shadow-soft)" : "none",
                }}
              >
                {p} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Placements Cards Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))",
          gap: "20px",
        }}
      >
        {filteredSinglePlacements.map((placement) => {
          const item = placement.galleryItem;
          return (
            <div
              key={placement.id}
              style={{
                backgroundColor: "var(--wh-bg-white)",
                borderRadius: "var(--wh-radius-md)",
                border: "1.5px solid var(--wh-pale-sky)",
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxShadow: "var(--wh-shadow-soft)",
              }}
            >
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                  <span
                    style={{
                      fontSize: "0.72rem",
                      fontWeight: 800,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      padding: "2px 8px",
                      borderRadius: "3px",
                      backgroundColor: "rgba(101, 175, 218, 0.15)",
                      color: "var(--wh-navy)",
                    }}
                  >
                    PAGE: {placement.page}
                  </span>
                  <span style={{ fontSize: "0.72rem", color: "var(--wh-text-muted)" }}>
                    Key: <code>{placement.slotKey}</code>
                  </span>
                </div>

                <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--wh-navy)", margin: "0 0 14px" }}>
                  {placement.label}
                </h3>

                {/* Thumbnail & Status */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
                    padding: "12px",
                    borderRadius: "6px",
                    backgroundColor: "var(--wh-bg-soft)",
                    border: "1px solid rgba(210, 234, 242, 0.8)",
                    marginBottom: "16px",
                  }}
                >
                  <div
                    style={{
                      width: "80px",
                      height: "80px",
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
                    {item?.mediaUrl ? (
                      <Image
                        src={item.thumbnailUrl || item.mediaUrl}
                        alt={item.title || placement.label}
                        fill
                        style={{ objectFit: "cover" }}
                        sizes="80px"
                      />
                    ) : (
                      <div style={{ textAlign: "center", padding: "6px" }}>
                        <i className="fas fa-image" style={{ color: "var(--wh-text-muted)", fontSize: "1.6rem" }}></i>
                        <span style={{ display: "block", fontSize: "0.68rem", color: "var(--wh-text-muted)", marginTop: "4px" }}>
                          Default
                        </span>
                      </div>
                    )}
                  </div>

                  <div style={{ minWidth: 0 }}>
                    <div
                      style={{
                        fontSize: "0.9rem",
                        fontWeight: 600,
                        color: "var(--wh-navy)",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {item ? item.title : "Default Branded Placeholder"}
                    </div>
                    <div style={{ fontSize: "0.78rem", color: "var(--wh-text-muted)", marginTop: "4px" }}>
                      {item ? (
                        <>
                          <span
                            style={{
                              backgroundColor: "rgba(76, 115, 50, 0.12)",
                              color: "var(--wh-community-green)",
                              padding: "2px 6px",
                              borderRadius: "3px",
                              fontWeight: 600,
                            }}
                          >
                            {item.category || "Gallery Photo"}
                          </span>
                        </>
                      ) : (
                        <span style={{ color: "#E65100", fontStyle: "italic" }}>
                          No custom photo assigned. Ready for selection.
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  justifyContent: "flex-end",
                  paddingTop: "12px",
                  borderTop: "1px solid rgba(210, 234, 242, 0.6)",
                }}
              >
                {placement.galleryItemId && (
                  <button
                    type="button"
                    onClick={() => handleClearPlacement(placement.id)}
                    disabled={isPending}
                    style={{
                      padding: "6px 12px",
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      color: "#C62828",
                      backgroundColor: "transparent",
                      border: "1px solid #FFCDD2",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    Clear Photo
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => openSinglePicker(placement.id, placement.label)}
                  disabled={isPending}
                  className="btn btn-secondary"
                  style={{
                    fontSize: "0.82rem",
                    padding: "7px 14px",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <i className="fas fa-photo-film"></i>
                  <span>{placement.galleryItemId ? "Change Photo" : "Select Photo"}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* =====================================================================
          3. GALLERY PICKER MODAL (SELECT FROM PUBLISHED GALLERY)
          ===================================================================== */}
      {pickerModal.isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0, 24, 48, 0.7)",
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 100,
            padding: "20px",
          }}
          onClick={() => setPickerModal({ isOpen: false, mode: "single", title: "" })}
        >
          <div
            style={{
              backgroundColor: "var(--wh-bg-white)",
              borderRadius: "12px",
              maxWidth: "850px",
              width: "100%",
              maxHeight: "85vh",
              display: "flex",
              flexDirection: "column",
              boxShadow: "0 20px 50px rgba(0, 0, 0, 0.3)",
              overflow: "hidden",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div
              style={{
                padding: "18px 24px",
                borderBottom: "1px solid var(--wh-pale-sky)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "var(--wh-bg-soft)",
              }}
            >
              <div>
                <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "var(--wh-navy)", margin: 0 }}>
                  {pickerModal.title}
                </h3>
                <p style={{ fontSize: "0.8rem", color: "var(--wh-text-muted)", margin: "3px 0 0" }}>
                  Pick any published photograph from the West Hill Gallery catalogue.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setPickerModal({ isOpen: false, mode: "single", title: "" })}
                style={{
                  background: "transparent",
                  border: "none",
                  fontSize: "1.2rem",
                  color: "var(--wh-text-muted)",
                  cursor: "pointer",
                }}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>

            {/* Modal Search & Filter Controls */}
            <div
              style={{
                padding: "14px 24px",
                borderBottom: "1px solid var(--wh-pale-sky)",
                display: "flex",
                gap: "12px",
                alignItems: "center",
                flexWrap: "wrap",
                backgroundColor: "var(--wh-bg-white)",
              }}
            >
              <div style={{ flex: 1, minWidth: "220px", position: "relative" }}>
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
                  placeholder="Search photos by title or keyword..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "8px 12px 8px 34px",
                    borderRadius: "6px",
                    border: "1px solid var(--wh-pale-sky)",
                    fontSize: "0.88rem",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                style={{
                  padding: "8px 12px",
                  borderRadius: "6px",
                  border: "1px solid var(--wh-pale-sky)",
                  fontSize: "0.88rem",
                  color: "var(--wh-navy)",
                  backgroundColor: "var(--wh-bg-white)",
                }}
              >
                <option value="all">All Categories ({galleryItems.length})</option>
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Modal Images Grid */}
            <div
              style={{
                padding: "20px 24px",
                overflowY: "auto",
                flex: 1,
              }}
            >
              {filteredGalleryItems.length === 0 ? (
                <div style={{ textAlign: "center", padding: "40px 20px", color: "var(--wh-text-muted)" }}>
                  <i className="fas fa-image" style={{ fontSize: "2.5rem", marginBottom: "10px", display: "block" }}></i>
                  <p style={{ margin: "0 0 10px", fontWeight: 600 }}>No gallery photos match your search.</p>
                  <Link href="/admin/gallery" style={{ color: "var(--wh-sky-blue)", fontSize: "0.85rem" }}>
                    Go to Gallery CMS to upload new images &rarr;
                  </Link>
                </div>
              ) : (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
                    gap: "14px",
                  }}
                >
                  {filteredGalleryItems.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => handleSelectGalleryItem(item)}
                      style={{
                        border: "1.5px solid var(--wh-pale-sky)",
                        borderRadius: "8px",
                        overflow: "hidden",
                        cursor: "pointer",
                        transition: "all 0.15s ease",
                        backgroundColor: "var(--wh-bg-white)",
                        display: "flex",
                        flexDirection: "column",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = "var(--wh-sky-blue)";
                        e.currentTarget.style.boxShadow = "0 6px 14px rgba(101, 175, 218, 0.25)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = "var(--wh-pale-sky)";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    >
                      <div style={{ position: "relative", height: "120px", backgroundColor: "rgba(12, 40, 63, 0.08)" }}>
                        <Image
                          src={item.thumbnailUrl || item.mediaUrl}
                          alt={item.title}
                          fill
                          style={{ objectFit: "cover" }}
                          sizes="200px"
                        />
                      </div>
                      <div style={{ padding: "8px 10px", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                        <div
                          style={{
                            fontSize: "0.8rem",
                            fontWeight: 700,
                            color: "var(--wh-navy)",
                            lineHeight: 1.3,
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}
                        >
                          {item.title}
                        </div>
                        <div style={{ fontSize: "0.7rem", color: "var(--wh-text-muted)", marginTop: "6px" }}>
                          {item.category || "General"}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div
              style={{
                padding: "12px 24px",
                borderTop: "1px solid var(--wh-pale-sky)",
                backgroundColor: "var(--wh-bg-soft)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span style={{ fontSize: "0.8rem", color: "var(--wh-text-muted)" }}>
                Showing {filteredGalleryItems.length} published photos
              </span>
              <button
                type="button"
                onClick={() => setPickerModal({ isOpen: false, mode: "single", title: "" })}
                className="btn btn-outline"
                style={{ fontSize: "0.82rem", padding: "6px 14px" }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
