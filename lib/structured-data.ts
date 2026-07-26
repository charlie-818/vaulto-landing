// Sitewide Organization + WebSite JSON-LD, injected once in app/layout.tsx so it
// applies to every page. Pure builder (no JSX, no I/O) so it stays testable and
// deterministic. Page-specific schema (FAQPage, BreadcrumbList) lives with its
// page — see lib/faq-data.ts buildFaqJsonLd.

import { SOCIAL_URLS } from "@/lib/external-urls";

export const SITE_URL = "https://vaulto.fi";
export const SITE_NAME = "Vaulto";
export const SITE_LOGO = `${SITE_URL}/vaulto-logo-light-v2.png`;

// Public profiles Vaulto controls, used as schema.org `sameAs` so search engines
// can link the Organization entity to its social presence. Deduplicated, stable
// order.
const SAME_AS = [
  SOCIAL_URLS.x,
  SOCIAL_URLS.linkedin,
  SOCIAL_URLS.instagram,
  SOCIAL_URLS.youtube,
  SOCIAL_URLS.github,
];

export type OrganizationJsonLd = {
  "@context": string;
  "@type": "Organization";
  name: string;
  url: string;
  logo: string;
  sameAs: string[];
};

export type WebSiteJsonLd = {
  "@context": string;
  "@type": "WebSite";
  name: string;
  url: string;
  publisher: { "@type": "Organization"; name: string; url: string };
};

// Build Organization + WebSite JSON-LD for the whole site. Returns a tuple of
// schema.org objects ready to JSON.stringify into a single ld+json script.
export function buildSiteJsonLd(): [OrganizationJsonLd, WebSiteJsonLd] {
  const organization: OrganizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: SITE_LOGO,
    sameAs: SAME_AS,
  };

  const website: WebSiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
  };

  return [organization, website];
}
