import type { MetadataRoute } from "next";
import { getComplianceSlugs } from "@/lib/compliance";
import { getGuideSlugs } from "@/lib/guides";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://vaulto.fi";
  const docSlugs = getComplianceSlugs();
  const guideSlugs = getGuideSlugs();
  return [
    { url: `${base}/`, changeFrequency: "daily", priority: 1.0 },
    { url: `${base}/faq`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/transparency`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/compliance`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/guides`, changeFrequency: "weekly", priority: 0.8 },
    ...guideSlugs.map((slug) => ({
      url: `${base}/guides/${slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...docSlugs.map((slug) => ({
      url: `${base}/compliance/${slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
