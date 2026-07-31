import type { MetadataRoute } from "next";
import { getComplianceSlugs } from "@/lib/compliance";
import { getGuideSlugs } from "@/lib/guides";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://vaulto.fi";
  const docSlugs = getComplianceSlugs();
  const guideSlugs = getGuideSlugs();
  return [
    { url: `${base}/`, priority: 1.0 },
    { url: `${base}/faq`, priority: 0.8 },
    { url: `${base}/transparency`, priority: 0.8 },
    { url: `${base}/compliance`, priority: 0.8 },
    { url: `${base}/guides`, priority: 0.8 },
    ...guideSlugs.map((slug) => ({
      url: `${base}/guides/${slug}`,
      priority: 0.7,
    })),
    ...docSlugs.map((slug) => ({
      url: `${base}/compliance/${slug}`,
      priority: 0.6,
    })),
  ];
}
