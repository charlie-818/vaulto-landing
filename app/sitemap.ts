import type { MetadataRoute } from "next";
import { getComplianceSlugs, getComplianceLastModified } from "@/lib/compliance";
import { FAQ_UPDATED } from "@/lib/faq-data";
import { DEPLOYMENTS_UPDATED } from "@/lib/deployments-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://vaulto.fi";
  const docSlugs = getComplianceSlugs();
  return [
    {
      url: `${base}/`,
      priority: 1.0,
      changeFrequency: "weekly",
    },
    {
      url: `${base}/faq`,
      priority: 0.8,
      lastModified: new Date(FAQ_UPDATED),
      changeFrequency: "monthly",
    },
    {
      url: `${base}/transparency`,
      priority: 0.8,
      lastModified: new Date(DEPLOYMENTS_UPDATED),
      changeFrequency: "monthly",
    },
    {
      url: `${base}/compliance`,
      priority: 0.8,
      changeFrequency: "monthly",
    },
    ...docSlugs.map((slug) => ({
      url: `${base}/compliance/${slug}`,
      priority: 0.6,
      lastModified: getComplianceLastModified(slug),
      changeFrequency: "monthly" as const,
    })),
  ];
}
