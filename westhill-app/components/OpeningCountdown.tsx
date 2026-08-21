"use client";

import { useState, useEffect } from "react";

export default function OpeningCountdown() {
  const [timeLeft, setTimeLeft] = useState<{
    days: string;
    hours: string;
    mins: string;
    isPast: boolean;
  } | null>(null);

  useEffect(() => {
    const targetDate = new Date("2026-06-09T10:00:00-04:00").getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        setTimeLeft({ days: "00", hours: "00", mins: "00", isPast: true });
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const mins = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

      setTimeLeft({
        days: days.toString().padStart(2, "0"),
        hours: hours.toString().padStart(2, "0"),
        mins: mins.toString().padStart(2, "0"),
        isPast: false,
      });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 60000);
    return () => clearInterval(interval);
  }, []);

  if (!timeLeft) return null;

  if (timeLeft.isPast) {
    return (
      <div id="opening-countdown-elt" style={{ textAlign: "center" }}>
        <h4>Welcome!</h4>
        <p style={{ color: "var(--wh-orange-accent)", fontWeight: 600, marginTop: "15px" }}>
          The West Hill Community Centre is now officially open!
        </p>
      </div>
    );
  }

  return (
    <div id="opening-countdown-elt" style={{ display: "flex", gap: "20px", justifyContent: "center" }}>
      <div className="countdown-box" style={{ textAlign: "center" }}>
        <span id="countdown-days" style={{ fontSize: "2rem", fontWeight: 700, color: "var(--wh-blue-primary)" }}>
          {timeLeft.days}
        </span>
        <span style={{ display: "block", fontSize: "0.8rem", color: "var(--wh-text-muted)", textTransform: "uppercase" }}>
          Days
        </span>
      </div>
      <div className="countdown-box" style={{ textAlign: "center" }}>
        <span id="countdown-hours" style={{ fontSize: "2rem", fontWeight: 700, color: "var(--wh-blue-primary)" }}>
          {timeLeft.hours}
        </span>
        <span style={{ display: "block", fontSize: "0.8rem", color: "var(--wh-text-muted)", textTransform: "uppercase" }}>
          Hours
        </span>
      </div>
      <div className="countdown-box" style={{ textAlign: "center" }}>
        <span id="countdown-mins" style={{ fontSize: "2rem", fontWeight: 700, color: "var(--wh-blue-primary)" }}>
          {timeLeft.mins}
        </span>
        <span style={{ display: "block", fontSize: "0.8rem", color: "var(--wh-text-muted)", textTransform: "uppercase" }}>
          Mins
        </span>
      </div>
    </div>
  );
}
