import { describe, it, expect } from "vitest";
import { GET } from "./route";
import { getGuideSlugs } from "@/lib/guides";

const GUIDES_URL = "https://vaulto.fi/guides";

describe("GET /llms.txt", () => {
  it("includes a Guides section", async () => {
    const text = await GET().text();
    expect(text).toContain("## Guides");
  });

  it("lists a bullet linking to every guide slug", async () => {
    const text = await GET().text();
    const slugs = getGuideSlugs();
    expect(slugs.length).toBeGreaterThan(0);
    for (const slug of slugs) {
      expect(text).toContain(`(${GUIDES_URL}/${slug})`);
    }
  });

  it("includes the SpaceX pre-IPO guide slug", async () => {
    const text = await GET().text();
    expect(text).toContain("how-to-buy-spacex-stock-pre-ipo");
  });

  it("adds a Guides entry under Key pages", async () => {
    const text = await GET().text();
    expect(text).toContain(`[Guides](${GUIDES_URL})`);
  });
});
