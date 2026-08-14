import { describe, it, expect } from "vitest";
import { getAllGuides } from "./guides";

/**
 * Integrity tests against the real shipped `content/guides/*.md` corpus.
 * getAllGuides() feeds the <title>/meta description/OG tags in
 * app/guides/[slug]/page.tsx and the /guides index, so an empty title or
 * description, a bad date, or a duplicate slug/order would ship silently.
 * No mocks: these read the actual files from disk.
 */
describe("guides content corpus", () => {
  const guides = getAllGuides();

  it("ships at least one guide", () => {
    expect(guides.length).toBeGreaterThan(0);
  });

  it("every guide has SEO-usable metadata", () => {
    for (const g of guides) {
      expect(g.title.trim().length, `${g.slug} title`).toBeGreaterThan(0);
      expect(
        g.description.trim().length,
        `${g.slug} description`
      ).toBeGreaterThan(0);
    }
  });

  it("every guide has valid, ordered ISO dates", () => {
    for (const g of guides) {
      expect(g.date, `${g.slug} date`).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(g.updated, `${g.slug} updated`).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(g.updated >= g.date, `${g.slug} updated >= date`).toBe(true);
    }
  });

  it("has unique slugs", () => {
    expect(new Set(guides.map((g) => g.slug)).size).toBe(guides.length);
  });

  it("has unique orders", () => {
    expect(new Set(guides.map((g) => g.order)).size).toBe(guides.length);
  });
});
