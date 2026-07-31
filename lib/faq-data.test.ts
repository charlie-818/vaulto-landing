import { describe, it, expect } from "vitest";
import { buildFaqJsonLd, FAQ_CATEGORIES, SITE_URL } from "./faq-data";

const totalItemCount = FAQ_CATEGORIES.reduce(
  (sum, category) => sum + category.items.length,
  0,
);

describe("buildFaqJsonLd", () => {
  it("returns [FAQPage, BreadcrumbList] in order", () => {
    const [faqPage, breadcrumb] = buildFaqJsonLd();
    expect(faqPage["@type"]).toBe("FAQPage");
    expect(breadcrumb["@type"]).toBe("BreadcrumbList");
  });

  it("emits one mainEntity Question per FAQ item", () => {
    const [faqPage] = buildFaqJsonLd();
    expect(faqPage.mainEntity).toHaveLength(totalItemCount);
    for (const question of faqPage.mainEntity) {
      expect(question["@type"]).toBe("Question");
    }
  });

  it("gives every question a non-empty acceptedAnswer.text (Google FAQ rich-result requirement)", () => {
    const [faqPage] = buildFaqJsonLd();
    for (const question of faqPage.mainEntity) {
      expect(question.acceptedAnswer["@type"]).toBe("Answer");
      expect(question.acceptedAnswer.text.trim().length).toBeGreaterThan(0);
    }
  });

  it("anchors each question url to its on-page id", () => {
    const [faqPage] = buildFaqJsonLd();
    const expectedUrls = FAQ_CATEGORIES.flatMap((category) =>
      category.items.map((item) => `${SITE_URL}/faq#${item.id}`),
    );
    expect(faqPage.mainEntity.map((q) => q.url)).toEqual(expectedUrls);
  });

  it("builds a Home -> FAQ breadcrumb trail", () => {
    const [, breadcrumb] = buildFaqJsonLd();
    expect(breadcrumb.itemListElement).toHaveLength(2);
    expect(breadcrumb.itemListElement.map((entry) => entry.name)).toEqual([
      "Home",
      "FAQ",
    ]);
  });
});
