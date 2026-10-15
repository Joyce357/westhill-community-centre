/**
 * Centralized site configuration for West Hill Community Centre
 * Used for production SEO, Canonical URLs, Open Graph, and Structured Data
 */

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://westhillcommunitycentre.ca"
).replace(/\/$/, "");

export const SITE_NAME = "West Hill Community Centre";

export const SITE_TAGLINE = "Connecting Communities, Supporting Families in Scarborough";

export const SITE_DEFAULT_DESCRIPTION =
  "West Hill Community Centre empowers East Toronto and Scarborough families, youth, seniors, and newcomers through barrier-free community wellness, recreational initiatives, and neighbourhood leadership.";

export const SITE_ADDRESS = {
  streetAddress: "4234 Lawrence Avenue East",
  unit: "Unit 4",
  fullAddress: "Unit 4, 4234 Lawrence Ave East, Scarborough, ON M1E 4R4",
  addressLocality: "Scarborough",
  addressRegion: "ON",
  postalCode: "M1E 4R4",
  addressCountry: "CA",
};

export function getCanonicalUrl(path: string = ""): string {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${cleanPath === "/" ? "" : cleanPath}`;
}
