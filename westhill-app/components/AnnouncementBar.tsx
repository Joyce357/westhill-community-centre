"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface AnnouncementBarProps {
  message?: string;
  ctaText?: string;
  ctaLink?: string;
  tag?: string;
}

export default function AnnouncementBar({
  message = "Summer Youth Programs registration is now open!",
  ctaText = "Register today",
  ctaLink = "/programs",
  tag = "Alert",
}: AnnouncementBarProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen || !message || pathname.startsWith("/admin")) return null;

  return (
    <div className="announcement-bar" id="announcement-bar-elt">
      <div className="container bar-container">
        <span className="bar-tag">{tag}</span>
        <span className="bar-message">
          {message}{" "}
          {ctaLink && (
            <Link href={ctaLink} className="bar-link">
              {ctaText}
            </Link>
          )}
        </span>
        <button
          className="bar-close"
          aria-label="Close announcement"
          onClick={() => setIsOpen(false)}
        >
          <i className="fas fa-times"></i>
        </button>
      </div>
    </div>
  );
}
