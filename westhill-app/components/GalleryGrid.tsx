"use client";

import { useState, useEffect, useRef } from "react";
import { GalleryMediaItem } from "@/lib/data";

interface GalleryGridProps {
  media: GalleryMediaItem[];
}

export default function GalleryGrid({ media }: GalleryGridProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const videoRefs = useRef<{ [key: number]: HTMLVideoElement | null }>({});

  const isOpen = lightboxIndex !== null;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") {
        setLightboxIndex(null);
      } else if (e.key === "ArrowLeft") {
        setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : media.length - 1));
      } else if (e.key === "ArrowRight") {
        setLightboxIndex((prev) => (prev !== null && prev < media.length - 1 ? prev + 1 : 0));
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, media.length]);

  const activeMedia = lightboxIndex !== null ? media[lightboxIndex] : null;

  return (
    <div className="gallery-page-wrapper">
      {/* Section Header */}
      <div className="gallery-page-header">
        <h2 className="gallery-page-title">Grand Opening Ceremony 2026</h2>
        <a
          href="#gallery-grid-elt"
          className="gallery-view-all-link"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById("gallery-grid-elt")?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          View All &rarr;
        </a>
      </div>

      {/* Thin Divider */}
      <hr className="gallery-divider" />

      {/* 4-col desktop / 3-col tablet / 2-col small-tablet / 1-col mobile */}
      <div className="gallery-album-grid gallery-album-grid--4col" id="gallery-grid-elt">
        {media.map((item, index) => (
          <div
            key={index}
            className="gallery-album-item"
            role="button"
            tabIndex={0}
            aria-label={`View larger version of ${item.title}`}
            onClick={() => setLightboxIndex(index)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                setLightboxIndex(index);
              }
            }}
            onMouseEnter={() => {
              if (item.type === "video" && videoRefs.current[index]) {
                videoRefs.current[index]?.play().catch(() => {});
              }
            }}
            onMouseLeave={() => {
              if (item.type === "video" && videoRefs.current[index]) {
                videoRefs.current[index]?.pause();
                if (videoRefs.current[index]) {
                  videoRefs.current[index]!.currentTime = 0;
                }
              }
            }}
          >
            <div className="gallery-album-item-img-wrapper">
              {item.type === "video" ? (
                <>
                  <video
                    ref={(el) => {
                      videoRefs.current[index] = el;
                    }}
                    src={item.src}
                    muted
                    loop
                    playsInline
                  />
                  <div className="video-play-overlay">
                    <i className="fas fa-play"></i>
                  </div>
                </>
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={item.src} alt={item.title} loading="lazy" />
              )}
            </div>
            <div className="gallery-album-item-caption">
              <h4>{item.title}</h4>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {isOpen && activeMedia && (
        <div
          className="lightbox open"
          role="dialog"
          aria-modal="true"
          aria-label="Image Viewer"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setLightboxIndex(null);
            }
          }}
        >
          <div className="lightbox-content">
            <button
              className="lightbox-close"
              aria-label="Close image viewer"
              onClick={() => setLightboxIndex(null)}
            >
              <i className="fas fa-times"></i>
            </button>
            <button
              className="lightbox-nav lightbox-prev"
              aria-label="Previous image"
              onClick={() =>
                setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : media.length - 1))
              }
            >
              <i className="fas fa-chevron-left"></i>
            </button>

            {activeMedia.type === "video" ? (
              <video
                src={activeMedia.src}
                controls
                autoPlay
                className="lightbox-img"
                style={{ maxWidth: "100%", maxHeight: "75vh" }}
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={activeMedia.src}
                alt={activeMedia.title}
                className="lightbox-img"
              />
            )}

            <div className="lightbox-caption">{activeMedia.title}</div>

            <button
              className="lightbox-nav lightbox-next"
              aria-label="Next image"
              onClick={() =>
                setLightboxIndex((prev) => (prev !== null && prev < media.length - 1 ? prev + 1 : 0))
              }
            >
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
