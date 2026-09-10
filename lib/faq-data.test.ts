import { describe, it, expect } from "vitest";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { FAQ_CATEGORIES } from "./faq-data";

const GUIDES_DIR = join(process.cwd(), "content", "guides");
const ALL_ITEMS = FAQ_CATEGORIES.flatMap((category) => category.items);
const ALL_LINKS = ALL_ITEMS.flatMap((item) => item.links ?? []);

describe("faq-data guide links", () => {
  it("resolves every /guides/<slug> href to a content/guides/<slug>.md file", () => {
    const guideLinks = ALL_LINKS.filter((link) => link.href.startsWith("/guides/"));
    expect(guideLinks.length).toBeGreaterThan(0);
    for (const link of guideLinks) {
      const slug = link.href.slice("/guides/".length);
      expect(slug, `bad guide slug in href ${link.href}`).toMatch(/^[a-z0-9-]+$/);
      expect(
        existsSync(join(GUIDES_DIR, `${slug}.md`)),
        `${link.href} has no matching content/guides/${slug}.md`
      ).toBe(true);
    }
  });

  it("links what-can-i-trade to at least 3 company guides plus the guides index", () => {
    const item = ALL_ITEMS.find((entry) => entry.id === "what-can-i-trade");
    expect(item).toBeDefined();
    const links = item?.links ?? [];
    const guideLinks = links.filter((link) => link.href.startsWith("/guides/"));
    expect(guideLinks.length).toBeGreaterThanOrEqual(3);
    expect(links.some((link) => link.href === "/guides")).toBe(true);
    for (const link of guideLinks) {
      expect(link.external).toBeFalsy();
    }
  });
});
