import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async redirects() {
    return [
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/about.html", destination: "/about", permanent: true },
      { source: "/partners.html", destination: "/partners", permanent: true },
      { source: "/programs.html", destination: "/programs", permanent: true },
      { source: "/events.html", destination: "/events", permanent: true },
      { source: "/gallery.html", destination: "/gallery", permanent: true },
      { source: "/resources.html", destination: "/resources", permanent: true },
      { source: "/contact.html", destination: "/contact", permanent: true },
      { source: "/volunteer.html", destination: "/volunteer", permanent: true },
      { source: "/donate.html", destination: "/donate", permanent: true },
      { source: "/privacy.html", destination: "/privacy", permanent: true },
      { source: "/terms.html", destination: "/terms", permanent: true },
      { source: "/accessibility.html", destination: "/accessibility", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;
