import Link from "next/link";
import Image from "next/image";
import { getSiteSettings } from "@/lib/queries";

export default async function Footer() {
  const settings = await getSiteSettings();

  return (
    <footer id="colophon">
      <div className="container footer-top">
        {/* Column 1: About */}
        <div className="footer-about">
          <div className="footer-logo">
            <Image
              src="/images/Westhillcenterlogo.jpeg"
              alt="West Hill Community Centre Logo"
              width={160}
              height={45}
              style={{ width: "auto", height: "40px", objectFit: "contain" }}
            />
          </div>
          <p>
            {settings.orgName} is a welcoming community hub dedicated to connecting residents, supporting families, promoting inclusion, and creating opportunities for people of all ages.
          </p>
          <div className="social-links" style={{ marginTop: "20px" }}>
            {settings.social?.facebook && (
              <a
                href={settings.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                aria-label="Facebook"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
            )}
            {settings.social?.instagram && (
              <a
                href={settings.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                aria-label="Instagram"
              >
                <i className="fab fa-instagram"></i>
              </a>
            )}
            {settings.social?.linkedin && (
              <a
                href={settings.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                aria-label="LinkedIn"
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
            )}
            {settings.social?.youtube && (
              <a
                href={settings.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                aria-label="YouTube"
              >
                <i className="fab fa-youtube"></i>
              </a>
            )}
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/programs">Programs & Services</Link></li>
            <li><Link href="/events">Events</Link></li>
            <li><Link href="/gallery">Gallery</Link></li>
            <li><Link href="/resources">Community Resources</Link></li>
            <li><Link href="/volunteer">Volunteer Opportunities</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* Column 3: Contact Info */}
        <div className="footer-contact">
          <h4>Contact Us</h4>
          <p style={{ alignItems: "flex-start" }}>
            <i className="fas fa-map-marker-alt" style={{ marginTop: "4px" }}></i>
            <span>
              {settings.orgName}<br />
              {settings.address}<br />
              {settings.locationText}
            </span>
          </p>
          <p>
            <i className="fas fa-phone"></i>
            <span>{settings.phone}</span>
          </p>
          <p>
            <i className="fas fa-envelope"></i>
            <a href={`mailto:${settings.primaryEmail}`} style={{ color: "inherit", textDecoration: "none" }}>
              {settings.primaryEmail}
            </a>
          </p>
        </div>

        {/* Column 4: Hours & Info */}
        <div className="footer-hours">
          <h4>Centre Hours</h4>
          <p>
            <i className="fas fa-clock"></i>
            <span>{settings.hours.weekday}</span>
          </p>
          <p>
            <i className="fas fa-calendar-alt"></i>
            <span>{settings.hours.saturday}</span>
          </p>
          <p>
            <i className="fas fa-ban"></i>
            <span>{settings.hours.sunday}</span>
          </p>

          <div
            className="accessibility-info"
            style={{
              marginTop: "25px",
              borderTop: "1px solid rgba(255, 255, 255, 0.08)",
              paddingTop: "15px",
            }}
          >
            <p
              style={{
                fontSize: "0.85rem",
                marginBottom: "8px",
                color: "#A0AEC0",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <i
                className="fa-solid fa-universal-access"
                style={{ color: "var(--wh-green-primary)", width: "16px", textAlign: "center" }}
              ></i>{" "}
              Accessible Facility
            </p>
            <p
              style={{
                fontSize: "0.85rem",
                marginBottom: "8px",
                color: "#A0AEC0",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <i
                className="fa-solid fa-wheelchair"
                style={{ color: "var(--wh-green-primary)", width: "16px", textAlign: "center" }}
              ></i>{" "}
              Wheelchair Accessible
            </p>
            <p
              style={{
                fontSize: "0.85rem",
                marginBottom: 0,
                color: "#A0AEC0",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <i
                className="fa-solid fa-square-parking"
                style={{ color: "var(--wh-green-primary)", width: "16px", textAlign: "center" }}
              ></i>{" "}
              Free Community Parking
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Footer Bar */}
      <div
        className="footer-bottom-bar"
        style={{
          marginTop: "40px",
          borderTop: "1px solid rgba(255, 255, 255, 0.08)",
          padding: "25px 0 0",
        }}
      >
        <div
          className="container footer-bottom-container"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "15px",
          }}
        >
          <div
            className="footer-bottom-left"
            style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "20px" }}
          >
            <span style={{ color: "#718096", fontSize: "0.85rem" }}>
              &copy; {new Date().getFullYear()} {settings.orgName}. All Rights Reserved.
            </span>
            <div className="bottom-links" style={{ display: "flex", gap: "15px" }}>
              <Link
                href="/privacy"
                style={{ color: "#718096", fontSize: "0.85rem", textDecoration: "none" }}
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                style={{ color: "#718096", fontSize: "0.85rem", textDecoration: "none" }}
              >
                Terms of Use
              </Link>
              <Link
                href="/accessibility"
                style={{ color: "#718096", fontSize: "0.85rem", textDecoration: "none" }}
              >
                Accessibility Statement
              </Link>
            </div>
          </div>
          <div className="footer-bottom-right">
            <span style={{ color: "#718096", fontSize: "0.85rem", fontStyle: "italic" }}>
              Designed for Community Impact.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
