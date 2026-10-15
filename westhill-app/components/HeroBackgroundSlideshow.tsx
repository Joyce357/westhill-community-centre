"use client";

import { useState, useEffect, useRef, useCallback, useSyncExternalStore } from "react";
import Image from "next/image";

function subscribeReducedMotion(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

export interface HeroSlideItem {
  mediaUrl: string;
  altText: string;
}

interface HeroBackgroundSlideshowProps {
  slides: HeroSlideItem[];
}

export default function HeroBackgroundSlideshow({ slides }: HeroBackgroundSlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const prefersReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );
  const touchStartXRef = useRef<number | null>(null);

  const safeSlides = slides && slides.length > 0 ? slides : [
    {
      mediaUrl: "/assets/images/westhillcenterOpening/WhatsApp Image 2026-06-09 at 11.10.49 PM (6).jpeg",
      altText: "West Hill Community Centre storefront entrance with community members and opening balloon display",
    },
  ];

  const totalSlides = safeSlides.length;

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  // Auto-advance timer (5.5s interval), pauses on hover or reduced-motion
  useEffect(() => {
    if (totalSlides <= 1 || isPaused || prefersReducedMotion) return;

    const timer = setInterval(() => {
      goToNext();
    }, 5500);

    return () => clearInterval(timer);
  }, [totalSlides, isPaused, prefersReducedMotion, goToNext]);

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartXRef.current - touchEndX;

    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        goToNext();
      } else {
        goToPrev();
      }
    }
    touchStartXRef.current = null;
  };

  return (
    <div
      className="civic-hero-slideshow-wrap"
      aria-roledescription="carousel"
      aria-label="Community highlights gallery"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background Slides */}
      <div className="civic-hero-slides-layer" aria-live="polite">
        {safeSlides.map((slide, idx) => {
          const isActive = idx === currentIndex;
          return (
            <div
              key={`${slide.mediaUrl}-${idx}`}
              className={`civic-hero-slide-item ${isActive ? "active" : ""}`}
              aria-hidden={!isActive}
              style={{
                opacity: isActive ? 1 : 0,
                transition: prefersReducedMotion
                  ? "none"
                  : "opacity 1200ms cubic-bezier(0.4, 0, 0.2, 1)",
                zIndex: isActive ? 1 : 0,
              }}
            >
              <Image
                src={slide.mediaUrl}
                alt={slide.altText}
                fill
                priority={idx === 0}
                loading={idx === 0 ? "eager" : "lazy"}
                sizes="100vw"
                className="civic-hero-slide-img"
              />
            </div>
          );
        })}
      </div>

      {/* Floating Modern Slide Controls (Only show if multiple slides) */}
      {totalSlides > 1 && (
        <div
          className="civic-hero-slideshow-nav"
          role="group"
          aria-label="Slideshow navigation"
        >
          <button
            type="button"
            className="civic-hero-nav-arrow"
            onClick={goToPrev}
            aria-label="Previous slide"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <div className="civic-hero-dots-group" role="tablist" aria-label="Slide selector">
            {safeSlides.map((_, idx) => {
              const isActive = idx === currentIndex;
              return (
                <button
                  key={idx}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-label={`Go to slide ${idx + 1} of ${totalSlides}`}
                  className={`civic-hero-dot ${isActive ? "active" : ""}`}
                  onClick={() => setCurrentIndex(idx)}
                />
              );
            })}
          </div>

          <button
            type="button"
            className="civic-hero-nav-arrow"
            onClick={goToNext}
            aria-label="Next slide"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
