import type { Metadata } from "next";
import { Poppins, Inter, Plus_Jakarta_Sans } from "next/font/google";
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

const plusJakartaSans = Plus_Jakarta_Sans({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

import { SITE_URL, SITE_NAME, SITE_DEFAULT_DESCRIPTION } from "@/lib/site";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "West Hill Community Centre | Connecting Communities, Supporting Families",
    template: "%s | West Hill Community Centre",
  },
  description: SITE_DEFAULT_DESCRIPTION,
  keywords: [
    "West Hill Community Centre",
    "West Hill Community Center",
    "community centre West Hill Scarborough",
    "community programs West Hill",
    "community centre Scarborough",
    "Scarborough youth programs",
    "seniors support Scarborough",
    "East Toronto community centre",
  ],
  authors: [{ name: SITE_NAME }],
  openGraph: {
    title: "West Hill Community Centre | Connecting Communities, Supporting Families",
    description: SITE_DEFAULT_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [
      {
        url: "/assets/images/og-share.png",
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
    locale: "en_CA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "West Hill Community Centre | Connecting Communities, Supporting Families",
    description: SITE_DEFAULT_DESCRIPTION,
    images: ["/assets/images/og-share.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable} ${plusJakartaSans.variable}`}>
      <body>
        <JsonLd />
        {children}
      </body>
    </html>
  );
}

