import { getActiveAnnouncement } from "@/lib/queries";
import AnnouncementBar from "./AnnouncementBar";

export default async function AnnouncementBannerServer() {
  const announcement = await getActiveAnnouncement();

  if (!announcement || !announcement.isActive) {
    return null;
  }

  return (
    <AnnouncementBar
      message={announcement.message}
      ctaText={announcement.ctaText || undefined}
      ctaLink={announcement.ctaUrl || undefined}
    />
  );
}
