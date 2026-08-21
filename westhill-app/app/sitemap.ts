import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://westhillcommunitycentre.ca";

  const routes = [
    "",
    "/about",
    "/partners",
    "/programs",
    "/events",
    "/gallery",
    "/resources",
    "/contact",
    "/volunteer",
    "/donate",
    "/privacy",
    "/terms",
    "/accessibility",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" || route === "/events" || route === "/programs" ? "weekly" : "monthly",
    priority: route === "" ? 1.0 : route === "/programs" || route === "/events" ? 0.8 : 0.6,
  }));
}
