import { SITE_URL, SITE_NAME, SITE_ADDRESS, SITE_DEFAULT_DESCRIPTION } from "@/lib/site";

export default function JsonLd() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["CommunityCenter", "Organization", "NGO"],
        "@id": `${SITE_URL}/#organization`,
        name: SITE_NAME,
        alternateName: ["West Hill Community Center", "WHCC"],
        url: SITE_URL,
        logo: {
          "@type": "ImageObject",
          url: `${SITE_URL}/images/Westhillcenterlogo.jpeg`,
          caption: SITE_NAME,
        },
        image: `${SITE_URL}/assets/images/og-share.png`,
        description: SITE_DEFAULT_DESCRIPTION,
        address: {
          "@type": "PostalAddress",
          streetAddress: `${SITE_ADDRESS.unit}, ${SITE_ADDRESS.streetAddress}`,
          addressLocality: SITE_ADDRESS.addressLocality,
          addressRegion: SITE_ADDRESS.addressRegion,
          postalCode: SITE_ADDRESS.postalCode,
          addressCountry: SITE_ADDRESS.addressCountry,
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 43.7667,
          longitude: -79.1867,
        },
        areaServed: [
          {
            "@type": "AdministrativeArea",
            name: "Scarborough",
          },
          {
            "@type": "City",
            name: "Toronto",
          },
          {
            "@type": "AdministrativeArea",
            name: "West Hill",
          },
        ],
        isAccessibleForFree: true,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
