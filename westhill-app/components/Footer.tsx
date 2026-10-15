import Link from "next/link";
import Image from "next/image";
import { getSiteSettings } from "@/lib/queries";

export default async function Footer() {
  const settings = await getSiteSettings();

  return (
    <footer id="colophon" className="civic-footer" aria-label="Site footer">
      <div className="civic-container">
        <div className="civic-footer-grid">
          {/* Column 1: Brand & Civic Scope */}
          <div className="civic-footer-brand">
            <Link href="/" className="civic-footer-logo-link" aria-label="West Hill Community Centre Home">
              <Image
                src="/images/Westhillcenterlogo.jpeg"
                alt="West Hill Community Centre Logo"
                width={170}
                height={46}
                style={{ width: "auto", height: "42px", objectFit: "contain", borderRadius: "4px" }}
              />
            </Link>
            <p className="civic-footer-mission">
              Empowering our vibrant Scarborough community through inclusive recreation, cultural programming, youth mentorship, and neighbourhood wellness initiatives.
            </p>
            <div className="civic-footer-scope-badge">
              <i className="fas fa-check-circle"></i>
              <span>Serving Ward 25 Scarborough-Guildwood</span>
            </div>

            <div className="civic-footer-social">
              {settings.social?.facebook && (
                <a
                  href={settings.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="civic-footer-social-link"
                >
                  <i className="fab fa-facebook-f"></i>
                </a>
              )}
              {settings.social?.instagram && (
                <a
                  href={settings.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="civic-footer-social-link"
                >
                  <i className="fab fa-instagram"></i>
                </a>
              )}
              {settings.social?.linkedin && (
                <a
                  href={settings.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="civic-footer-social-link"
                >
                  <i className="fab fa-linkedin-in"></i>
                </a>
              )}
              {settings.social?.youtube && (
                <a
                  href={settings.social.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="civic-footer-social-link"
                >
                  <i className="fab fa-youtube"></i>
                </a>
              )}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="civic-footer-nav-col">
            <h3 className="civic-footer-heading">Quick Links</h3>
            <ul className="civic-footer-links">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/events">Events Calendar</Link></li>
              <li><Link href="/gallery">Photo Gallery</Link></li>
              <li><Link href="/volunteer">Volunteer & Get Involved</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* Column 3: Programs & Services */}
          <div className="civic-footer-nav-col">
            <h3 className="civic-footer-heading">Programs & Services</h3>
            <ul className="civic-footer-links">
              <li><Link href="/programs#seniors-support">West Hill Seniors Program</Link></li>
              <li><Link href="/programs#women-family">Women’s Wellness Program</Link></li>
              <li><Link href="/programs#initiatives">West Hill Community Job Fair</Link></li>
              <li><Link href="/programs#partners">Dental Care & Benefits Support</Link></li>
              <li><Link href="/programs#partners">Toronto Public Library Programming</Link></li>
              <li><Link href="/resources">Community Resources</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact & Location */}
          <div className="civic-footer-contact-col">
            <h3 className="civic-footer-heading">Contact & Location</h3>
            <div className="civic-footer-contact-items">
              <div className="civic-footer-contact-item">
                <i className="fas fa-location-dot"></i>
                <div>
                  <strong>{settings.orgName}</strong>
                  <span>{settings.address}</span>
                </div>
              </div>
              <div className="civic-footer-contact-item">
                <i className="fas fa-phone"></i>
                <a href={`tel:${settings.phone.replace(/[^0-9]/g, "")}`}>{settings.phone}</a>
              </div>
              <div className="civic-footer-contact-item">
                <i className="fas fa-envelope"></i>
                <a href={`mailto:${settings.primaryEmail}`}>{settings.primaryEmail}</a>
              </div>
              <div className="civic-footer-contact-item">
                <i className="fas fa-clock"></i>
                <span>{settings.hours.weekday}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="civic-footer-bottom">
          <p className="civic-footer-copyright">
            &copy; {new Date().getFullYear()} West Hill Community Centre. All rights reserved.
          </p>

          <div className="civic-footer-bottom-badges">
            <span className="civic-footer-aoda-badge">
              <i className="fas fa-universal-access"></i> AODA Accessible Facility
            </span>
            <Link href="/contact">Accessibility Feedback</Link>
            <Link href="/about">Privacy Policy</Link>
            <Link href="/terms">Terms of Use</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
