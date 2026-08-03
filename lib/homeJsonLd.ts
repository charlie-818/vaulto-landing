import { PLATFORM_URL } from "@/lib/config";

/**
 * WebApplication (FinanceApplication) JSON-LD describing the Vaulto product
 * itself, for app-style rich results and entity linkage on the home page.
 * Companion to the sitewide Organization/WebSite structured data.
 */
export function homeWebApplicationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Vaulto",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    url: PLATFORM_URL,
    featureList: [
      "Trade tokenized pre-IPO private company stocks",
      "Prediction-market-derived pricing from real-time Polymarket odds",
      "Build custom baskets of private company exposure",
      "On-chain settlement and self-custody",
    ],
  } as const;
}

/** Serialized JSON-LD string emitted inside the ld+json script tag. */
export function homeWebApplicationJsonLdString(): string {
  return JSON.stringify(homeWebApplicationJsonLd());
}
