import { describe, it, expect } from "vitest";
import {
  getCompareSlugs,
  getComparison,
  getAllComparisons,
  buildCompareJsonLd,
} from "./compare";

const EXPECTED_SLUGS = ["equityzen", "forge", "hiive"];

describe("compare content loader", () => {
  it("enumerates every markdown file under content/compare", () => {
    expect(getCompareSlugs()).toEqual(EXPECTED_SLUGS);
  });

  it("returns null for an unknown slug", () => {
    expect(getComparison("nonexistent")).toBeNull();
  });

  it.each(EXPECTED_SLUGS)("parses required frontmatter for %s", (slug) => {
    const comparison = getComparison(slug);
    expect(comparison).not.toBeNull();
    if (!comparison) return;

    expect(comparison.slug).toBe(slug);
    expect(comparison.competitor).toBeTruthy();
    expect(comparison.title).toContain("Vaulto");
    expect(comparison.description.length).toBeGreaterThan(0);
    expect(comparison.updated).toBeTruthy();
    expect(comparison.tagline).toBeTruthy();
    expect(comparison.intro).toBeTruthy();
    expect(comparison.body.length).toBeGreaterThan(0);

    // Comparison table rows are fully populated.
    expect(comparison.rows.length).toBeGreaterThan(0);
    for (const row of comparison.rows) {
      expect(row.feature).toBeTruthy();
      expect(row.vaulto).toBeTruthy();
      expect(row.competitor).toBeTruthy();
    }

    // FAQ pairs are fully populated (feed the JSON-LD).
    expect(comparison.faqs.length).toBeGreaterThan(0);
    for (const faq of comparison.faqs) {
      expect(faq.question).toBeTruthy();
      expect(faq.answer).toBeTruthy();
    }
  });

  it("loads all comparisons sorted by competitor name", () => {
    const all = getAllComparisons();
    expect(all.map((c) => c.slug)).toEqual(EXPECTED_SLUGS);
  });

  it("builds FAQPage + BreadcrumbList JSON-LD mirroring the FAQ helper", () => {
    const comparison = getComparison("forge");
    expect(comparison).not.toBeNull();
    if (!comparison) return;

    const [faqPage, breadcrumb] = buildCompareJsonLd(comparison);
    expect(faqPage["@type"]).toBe("FAQPage");
    expect(faqPage.mainEntity).toHaveLength(comparison.faqs.length);
    expect(faqPage.mainEntity[0].acceptedAnswer.text).toBe(
      comparison.faqs[0].answer,
    );
    expect(breadcrumb["@type"]).toBe("BreadcrumbList");
    expect(breadcrumb.itemListElement).toHaveLength(3);
  });
});
