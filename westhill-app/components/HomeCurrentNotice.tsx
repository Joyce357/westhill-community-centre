import Link from "next/link";
import { getActiveAnnouncement } from "@/lib/queries";

export default async function HomeCurrentNotice() {
  const announcement = await getActiveAnnouncement();

  if (!announcement || !announcement.isActive || !announcement.message) {
    return null;
  }

  return (
    <aside className="civic-home-notice-bar" aria-label="Current Community Notice">
      <div className="civic-container">
        <div className="civic-home-notice-inner">
          <div className="civic-home-notice-lead">
            <span className="civic-notice-pill">
              <span className="civic-notice-dot" aria-hidden="true"></span>
              Current Notice
            </span>
            <p className="civic-notice-text">{announcement.message}</p>
          </div>
          {announcement.ctaUrl && (
            <Link
              href={announcement.ctaUrl}
              className="civic-notice-cta"
            >
              <span>{announcement.ctaText || "Learn More"}</span>
              <i className="fas fa-arrow-right" aria-hidden="true"></i>
            </Link>
          )}
        </div>
      </div>
    </aside>
  );
}
