import { describe, it, expect } from "vitest";
import { buildFaqJsonLd, FAQ_CATEGORIES, SITE_URL } from "./faq-data";

describe("buildFaqJsonLd", () => {
  const [faqPage, breadcrumb] = buildFaqJsonLd();

  it("returns a FAQPage followed by a BreadcrumbList", () => {
    expect(faqPage["@type"]).toBe("FAQPage");
    expect(breadcrumb["@type"]).toBe("BreadcrumbList");
  });

  it("flat-maps every category item into mainEntity", () => {
    const totalItems = FAQ_CATEGORIES.reduce(
      (sum, category) => sum + category.items.length,
      0
    );
    expect(faqPage.mainEntity).toHaveLength(totalItems);
  });

  it("reuses each item's answer verbatim in acceptedAnswer.text", () => {
    const items = FAQ_CATEGORIES.flatMap((category) => category.items);
    faqPage.mainEntity.forEach((question, i) => {
      expect(question.acceptedAnswer.text).toBe(items[i].answer);
    });
  });

  it("builds each Question.url as SITE_URL/faq#<item.id>", () => {
    const items = FAQ_CATEGORIES.flatMap((category) => category.items);
    faqPage.mainEntity.forEach((question, i) => {
      expect(question.url).toBe(`${SITE_URL}/faq#${items[i].id}`);
    });
  });

  it("lists Home then FAQ breadcrumb positions", () => {
    expect(breadcrumb.itemListElement).toEqual([
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "FAQ", item: `${SITE_URL}/faq` },
    ]);
  });
});
