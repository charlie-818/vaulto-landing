import { describe, it, expect } from "vitest";
import {
  buildComplianceIndexJsonLd,
  getAllComplianceDocs,
  SITE_URL,
} from "./compliance";

describe("buildComplianceIndexJsonLd", () => {
  const [collectionPage, breadcrumb] = buildComplianceIndexJsonLd();
  const itemList = collectionPage.hasPart;

  it("emits a CollectionPage wrapping an ItemList", () => {
    expect(collectionPage["@context"]).toBe("https://schema.org");
    expect(collectionPage["@type"]).toBe("CollectionPage");
    expect(itemList["@type"]).toBe("ItemList");
  });

  it("enumerates every compliance doc", () => {
    expect(itemList.itemListElement.length).toBe(getAllComplianceDocs().length);
    expect(itemList.itemListElement.length).toBeGreaterThan(0);
  });

  it("uses absolute /compliance/<slug> URLs and doc titles", () => {
    const docs = getAllComplianceDocs();
    itemList.itemListElement.forEach((el, i) => {
      expect(el["@type"]).toBe("ListItem");
      expect(el.url.startsWith(`${SITE_URL}/compliance/`)).toBe(true);
      expect(el.url).toBe(`${SITE_URL}/compliance/${docs[i].slug}`);
      expect(el.name).toBe(docs[i].title);
    });
  });

  it("assigns 1-indexed, contiguous positions", () => {
    itemList.itemListElement.forEach((el, i) => {
      expect(el.position).toBe(i + 1);
    });
  });

  it("emits a Home -> Compliance BreadcrumbList", () => {
    expect(breadcrumb["@type"]).toBe("BreadcrumbList");
    expect(breadcrumb.itemListElement).toEqual([
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      {
        "@type": "ListItem",
        position: 2,
        name: "Compliance",
        item: `${SITE_URL}/compliance`,
      },
    ]);
  });
});
