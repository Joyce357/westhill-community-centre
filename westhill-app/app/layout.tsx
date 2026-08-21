import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  weight: ["500", "600", "700"],
  subsets: ["latin"],
  variable: "--wh-font-primary",
  display: "swap",
});

const inter = Inter({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--wh-font-secondary",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://westhillcommunitycentre.ca"),
  title: "West Hill Community Centre | Connecting Communities, Supporting Families",
  description:
    "West Hill Community Centre brings people together through community programs, family support services, youth development initiatives, and local advocacy in Scarborough.",
  keywords: [
    "community centre",
    "Scarborough",
    "West Hill",
    "youth programs",
    "seniors support",
    "community services",
    "nonprofit",
    "family support",
    "employment aid",
    "housing referrals",
    "volunteer",
    "advocacy",
  ],
  authors: [{ name: "West Hill Community Centre" }],
  openGraph: {
    title: "West Hill Community Centre | Connecting Communities, Supporting Families",
    description:
      "West Hill Community Centre brings people together through community programs, family support services, youth development initiatives, and local advocacy in Scarborough.",
    url: "https://westhillcommunitycentre.ca",
    siteName: "West Hill Community Centre",
    images: [
      {
        url: "/assets/images/og-share.png",
        width: 1200,
        height: 630,
        alt: "West Hill Community Centre",
      },
    ],
    locale: "en_CA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "West Hill Community Centre | Connecting Communities, Supporting Families",
    description:
      "West Hill Community Centre brings people together through community programs, family support services, youth development initiatives, and local advocacy in Scarborough.",
    images: ["/assets/images/og-share.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
