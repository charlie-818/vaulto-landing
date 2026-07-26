import type { MetadataRoute } from "next";
import { getComplianceSlugs } from "@/lib/compliance";
import { getCompareSlugs } from "@/lib/compare";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://vaulto.fi";
  const docSlugs = getComplianceSlugs();
  const compareSlugs = getCompareSlugs();
  return [
    { url: `${base}/`, priority: 1.0 },
    { url: `${base}/faq`, priority: 0.8 },
    { url: `${base}/transparency`, priority: 0.8 },
    { url: `${base}/compliance`, priority: 0.8 },
    { url: `${base}/compare`, priority: 0.8 },
    ...compareSlugs.map((slug) => ({
      url: `${base}/compare/${slug}`,
      priority: 0.7,
    })),
    ...docSlugs.map((slug) => ({
      url: `${base}/compliance/${slug}`,
      priority: 0.6,
    })),
  ];
}
