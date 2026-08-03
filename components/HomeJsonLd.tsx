import { homeWebApplicationJsonLdString } from "@/lib/homeJsonLd";

/**
 * Emits WebApplication/FinanceApplication JSON-LD for the home page so the
 * product is eligible for app-style rich results.
 */
export function HomeJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: homeWebApplicationJsonLdString() }}
    />
  );
}
