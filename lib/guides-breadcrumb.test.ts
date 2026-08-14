import { describe, it, expect } from "vitest";
import { buildGuidesBreadcrumbJsonLd } from "./guides";

describe("buildGuidesBreadcrumbJsonLd", () => {
  it("builds a Home > Guides BreadcrumbList", () => {
    const b = buildGuidesBreadcrumbJsonLd();
    expect(b["@type"]).toBe("BreadcrumbList");
    expect(b.itemListElement).toHaveLength(2);
    expect(b.itemListElement.map((i) => i.position)).toEqual([1, 2]);
    expect(b.itemListElement[0].item).toBe("https://vaulto.fi/");
    expect(b.itemListElement[1].item).toBe("https://vaulto.fi/guides");
    expect(b.itemListElement.map((i) => i.name)).toEqual(["Home", "Guides"]);
  });
});
