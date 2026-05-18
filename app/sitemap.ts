import type { MetadataRoute } from "next";
import { getComplianceSlugs } from "@/lib/compliance";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://vaulto.fi";
  const docSlugs = getComplianceSlugs();
  return [
    { url: `${base}/`, priority: 1.0 },
    { url: `${base}/compliance`, priority: 0.8 },
    ...docSlugs.map((slug) => ({
      url: `${base}/compliance/${slug}`,
      priority: 0.6,
    })),
  ];
}
