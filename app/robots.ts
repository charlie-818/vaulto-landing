import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/faq-data";

// Allow all crawlers — including AI search/retrieval bots (PerplexityBot,
// OAI-SearchBot, anthropic-ai, Google-Extended) — and advertise the sitemap.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
