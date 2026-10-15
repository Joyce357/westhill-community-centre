import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_URL;

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
