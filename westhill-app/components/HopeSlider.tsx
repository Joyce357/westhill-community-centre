"use client";

import { useState, useEffect } from "react";
import { TESTIMONIALS } from "@/lib/data";

export default function HopeSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="hope-slider-container">
      <div
        className="hope-track"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
          display: "flex",
          transition: "transform 0.6s ease-in-out",
        }}
      >
        {TESTIMONIALS.map((item) => (
          <div
            key={item.id}
            className="hope-slide"
            style={{
              flex: "0 0 100%",
              width: "100%",
              boxSizing: "border-box",
              padding: "20px",
              textAlign: "center",
            }}
          >
            <p
              style={{
                fontSize: "1.15rem",
                fontStyle: "italic",
                lineHeight: 1.7,
                maxWidth: "800px",
                margin: "0 auto 20px",
                color: "var(--wh-text-body)",
              }}
            >
              &ldquo;{item.quote}&rdquo;
            </p>
            <h4
              style={{
                color: "var(--wh-blue-primary)",
                fontFamily: "var(--wh-font-primary)",
                fontSize: "1.05rem",
                marginBottom: "4px",
              }}
            >
              {item.author}
            </h4>
            <span
              style={{
                fontSize: "0.85rem",
                color: "var(--wh-text-muted)",
                fontWeight: 500,
              }}
            >
              {item.role} &bull; {item.program}
            </span>
          </div>
        ))}
      </div>

      <div className="hope-dots" style={{ display: "flex", justifyContent: "center", gap: "8px", marginTop: "20px" }}>
        {TESTIMONIALS.map((_, idx) => (
          <button
            key={idx}
            type="button"
            className={`hope-dot ${idx === currentIndex ? "active" : ""}`}
            aria-label={`Go to testimonial slide ${idx + 1}`}
            onClick={() => setCurrentIndex(idx)}
          />
        ))}
      </div>
    </div>
  );
}
