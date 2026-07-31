import { describe, it, expect } from "vitest";
import sitemap from "@/app/sitemap";
import { getGuideSlugs } from "@/lib/guides";
import { getComplianceSlugs } from "@/lib/compliance";

const BASE = "https://vaulto.fi";

describe("sitemap coverage", () => {
  const urls = new Set(sitemap().map((entry) => entry.url));

  it("includes the core static routes", () => {
    for (const route of ["/", "/faq", "/transparency", "/compliance", "/guides"]) {
      expect(urls.has(`${BASE}${route}`)).toBe(true);
    }
  });

  it("has a /guides/<slug> entry for every guide", () => {
    const slugs = getGuideSlugs();
    expect(slugs.length).toBeGreaterThan(0);
    for (const slug of slugs) {
      expect(urls.has(`${BASE}/guides/${slug}`)).toBe(true);
    }
  });

  it("has a /compliance/<slug> entry for every compliance doc", () => {
    const slugs = getComplianceSlugs();
    expect(slugs.length).toBeGreaterThan(0);
    for (const slug of slugs) {
      expect(urls.has(`${BASE}/compliance/${slug}`)).toBe(true);
    }
  });
});
