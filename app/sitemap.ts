import type { MetadataRoute } from "next";
import { getComplianceSlugs } from "@/lib/compliance";
import { getReportSlugs } from "@/lib/reports";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://vaulto.fi";
  const docSlugs = getComplianceSlugs();
  const reportSlugs = getReportSlugs();
  return [
    { url: `${base}/`, priority: 1.0 },
    { url: `${base}/faq`, priority: 0.8 },
    { url: `${base}/transparency`, priority: 0.8 },
    { url: `${base}/compliance`, priority: 0.8 },
    { url: `${base}/reports`, priority: 0.8 },
    ...reportSlugs.map((slug) => ({
      url: `${base}/reports/${slug}`,
      priority: 0.7,
    })),
    ...docSlugs.map((slug) => ({
      url: `${base}/compliance/${slug}`,
      priority: 0.6,
    })),
  ];
}
