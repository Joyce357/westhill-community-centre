"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
        setAboutDropdownOpen(false);
      }
    };
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileMenuOpen]);

  const closeMenus = () => {
    setMobileMenuOpen(false);
    setAboutDropdownOpen(false);
  };

  const isAboutActive = pathname === "/about" || pathname === "/partners";

  if (pathname.startsWith("/admin")) return null;

  return (
    <header id="masthead" className={`civic-header ${isScrolled ? "scrolled" : ""}`}>
      <div className="civic-container header-container">
        <Link href="/" className="logo" aria-label="West Hill Community Centre Home" onClick={closeMenus}>
          <Image
            src="/images/Westhillcenterlogo.jpeg"
            alt="West Hill Community Centre Logo"
            width={180}
            height={50}
            priority
            style={{ width: "auto", height: "45px", objectFit: "contain" }}
          />
        </Link>

        <button
          className="mobile-toggle"
          aria-controls="primary-navigation"
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle navigation menu"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <i className={`fas ${mobileMenuOpen ? "fa-times" : "fa-bars"}`}></i>
        </button>

        <nav id="primary-navigation">
          <ul className={`nav-menu ${mobileMenuOpen ? "open" : ""}`}>
            <li>
              <Link
                href="/"
                className={`nav-link ${pathname === "/" ? "active" : ""}`}
                onClick={closeMenus}
              >
                Home
              </Link>
            </li>
            <li className="dropdown">
              <button
                type="button"
                className={`nav-link dropdown-toggle ${isAboutActive ? "active" : ""} ${aboutDropdownOpen ? "active-toggle" : ""}`}
                aria-haspopup="true"
                aria-expanded={aboutDropdownOpen}
                onClick={() => setAboutDropdownOpen(!aboutDropdownOpen)}
              >
                About <i className="fas fa-chevron-down dropdown-caret"></i>
              </button>
              <ul className={`dropdown-menu ${aboutDropdownOpen ? "open" : ""}`}>
                <li>
                  <Link
                    href="/about"
                    className={pathname === "/about" ? "active" : ""}
                    onClick={closeMenus}
                  >
                    Our Story
                  </Link>
                </li>
                <li>
                  <Link
                    href="/partners"
                    className={pathname === "/partners" ? "active" : ""}
                    onClick={closeMenus}
                  >
                    Community Builders
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link
                href="/programs"
                className={`nav-link ${pathname === "/programs" ? "active" : ""}`}
                onClick={closeMenus}
              >
                Programs
              </Link>
            </li>
            <li>
              <Link
                href="/events"
                className={`nav-link ${pathname === "/events" ? "active" : ""}`}
                onClick={closeMenus}
              >
                Events
              </Link>
            </li>
            <li>
              <Link
                href="/gallery"
                className={`nav-link ${pathname === "/gallery" ? "active" : ""}`}
                onClick={closeMenus}
              >
                Gallery
              </Link>
            </li>
            <li>
              <Link
                href="/resources"
                className={`nav-link ${pathname === "/resources" ? "active" : ""}`}
                onClick={closeMenus}
              >
                Resources
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className={`nav-link ${pathname === "/contact" ? "active" : ""}`}
                onClick={closeMenus}
              >
                Contact
              </Link>
            </li>
            {/* Mobile CTAs inside the drawer */}
            <li className="mobile-cta-item">
              <Link
                href="/volunteer"
                className={`btn btn-outline mobile-nav-btn ${pathname === "/volunteer" ? "active" : ""}`}
                onClick={closeMenus}
              >
                Get Involved
              </Link>
            </li>
            <li className="mobile-cta-item">
              <Link
                href="/donate"
                className={`btn btn-secondary mobile-nav-btn ${pathname === "/donate" ? "active" : ""}`}
                onClick={closeMenus}
              >
                Donate
              </Link>
            </li>
          </ul>
        </nav>

        <div className="header-ctas">
          <Link
            href="/volunteer"
            className={`btn btn-outline header-cta ${pathname === "/volunteer" ? "active" : ""}`}
          >
            Get Involved
          </Link>
          <Link
            href="/donate"
            className={`btn btn-secondary header-cta ${pathname === "/donate" ? "active" : ""}`}
          >
            Donate
          </Link>
        </div>
      </div>
    </header>
  );
}
