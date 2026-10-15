"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { logoutAction } from "@/app/actions/auth";

interface AdminSidebarProps {
  userName: string;
  userEmail: string;
}

export default function AdminSidebar({ userName, userEmail }: AdminSidebarProps) {
  const pathname = usePathname();

  if (pathname === "/admin/login") return null;

  const navItems = [
    { label: "Dashboard", href: "/admin", icon: "fas fa-gauge" },
    { label: "Inbox & Submissions", href: "/admin/inbox", icon: "fas fa-inbox" },
    { label: "Homepage", href: "/admin/homepage", icon: "fas fa-house" },
    { label: "Announcements", href: "/admin/announcements", icon: "fas fa-bullhorn" },
    { label: "Programs", href: "/admin/programs", icon: "fas fa-hand-holding-hand" },
    { label: "Events", href: "/admin/events", icon: "fas fa-calendar-days" },
    { label: "Gallery", href: "/admin/gallery", icon: "fas fa-images" },
    { label: "Site Media", href: "/admin/site-media", icon: "fas fa-photo-film" },
    { label: "Resources", href: "/admin/resources", icon: "fas fa-folder-open" },
    { label: "Partners", href: "/admin/partners", icon: "fas fa-handshake" },
    { label: "Site Settings", href: "/admin/settings", icon: "fas fa-sliders" },
  ];

  return (
    <aside
      style={{
        width: "260px",
        backgroundColor: "var(--wh-navy)",
        color: "var(--wh-bg-white)",
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        position: "sticky",
        top: 0,
        zIndex: 40,
        borderRight: "1px solid rgba(255, 255, 255, 0.08)",
      }}
    >
      {/* Sidebar Brand */}
      <div
        style={{
          padding: "22px 20px",
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          backgroundColor: "#0C283F",
        }}
      >
        <Link href="/admin" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
          <Image
            src="/images/Westhillcenterlogo.jpeg"
            alt="West Hill Logo"
            width={140}
            height={38}
            style={{ height: "32px", width: "auto", objectFit: "contain", borderRadius: "4px" }}
          />
          <span
            style={{
              fontSize: "0.72rem",
              backgroundColor: "var(--wh-community-green)",
              color: "white",
              padding: "2px 8px",
              borderRadius: "var(--wh-radius-full)",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}
          >
            CMS
          </span>
        </Link>
      </div>

      {/* Navigation Groups */}
      <div style={{ flex: 1, padding: "20px 12px", overflowY: "auto" }}>
        <div
          style={{
            fontSize: "0.68rem",
            textTransform: "uppercase",
            letterSpacing: "1px",
            color: "var(--wh-pale-sky)",
            padding: "0 12px 10px",
            fontWeight: 700,
            opacity: 0.85,
          }}
        >
          Website Management
        </div>

        <nav style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "10px 14px",
                  borderRadius: "var(--wh-radius-sm)",
                  color: isActive ? "#FFFFFF" : "var(--wh-pale-sky)",
                  backgroundColor: isActive ? "var(--wh-community-green)" : "transparent",
                  fontWeight: isActive ? 600 : 500,
                  fontSize: "0.9rem",
                  textDecoration: "none",
                  transition: "var(--wh-transition)",
                }}
              >
                <i
                  className={item.icon}
                  style={{
                    width: "18px",
                    textAlign: "center",
                    color: isActive ? "var(--wh-sun-gold)" : "inherit",
                  }}
                ></i>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer User Profile & Actions */}
      <div
        style={{
          padding: "16px",
          borderTop: "1px solid rgba(255, 255, 255, 0.08)",
          backgroundColor: "#0C283F",
        }}
      >
        <div style={{ marginBottom: "12px", display: "flex", alignItems: "center", gap: "10px" }}>
          <div
            style={{
              width: "34px",
              height: "34px",
              borderRadius: "50%",
              backgroundColor: "var(--wh-leaf-green)",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
              fontSize: "0.85rem",
            }}
          >
            {userName.charAt(0).toUpperCase()}
          </div>
          <div style={{ overflow: "hidden" }}>
            <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "white", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>
              {userName}
            </div>
            <div style={{ fontSize: "0.72rem", color: "var(--wh-pale-sky)", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap", opacity: 0.85 }}>
              {userEmail}
            </div>
          </div>
        </div>

        <div style={{ display: "flex", gap: "8px" }}>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              flex: 1,
              textAlign: "center",
              fontSize: "0.78rem",
              padding: "7px 4px",
              backgroundColor: "rgba(210, 234, 242, 0.12)",
              color: "var(--wh-pale-sky)",
              borderRadius: "var(--wh-radius-sm)",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "5px",
              fontWeight: 500,
            }}
          >
            <i className="fas fa-external-link-alt" style={{ fontSize: "0.7rem" }}></i> View Site
          </a>

          <form action={logoutAction} style={{ flex: 1 }}>
            <button
              type="submit"
              style={{
                width: "100%",
                padding: "7px 4px",
                backgroundColor: "rgba(220, 38, 38, 0.15)",
                color: "#FCA5A5",
                border: "1px solid rgba(220, 38, 38, 0.3)",
                borderRadius: "var(--wh-radius-sm)",
                fontSize: "0.78rem",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "5px",
                fontWeight: 600,
              }}
            >
              <i className="fas fa-sign-out-alt"></i> Sign Out
            </button>
          </form>
        </div>
      </div>
    </aside>
  );
}
