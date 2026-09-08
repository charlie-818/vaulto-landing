import { describe, it, expect } from "vitest";
import {
  getAllGuides,
  parseGuide,
  relatedGuides,
  slugFromFilename,
  type Guide,
} from "./guides";

describe("slugFromFilename", () => {
  it("strips the .md extension", () => {
    expect(slugFromFilename("how-to-buy-spacex-stock-pre-ipo.md")).toBe(
      "how-to-buy-spacex-stock-pre-ipo"
    );
  });

  it("strips the .mdx extension case-insensitively", () => {
    expect(slugFromFilename("Guide.MDX")).toBe("guide");
  });

  it("trims and lowercases", () => {
    expect(slugFromFilename("  Some-Guide.md  ")).toBe("some-guide");
  });
});

describe("parseGuide", () => {
  const raw = `---
title: How to Buy SpaceX Stock Before the IPO
description: A practical guide.
company: SpaceX
sector: Aerospace
date: 2026-01-15
updated: 2026-06-01
order: 1
---

# How to Buy SpaceX Stock Before the IPO

Body paragraph.
`;

  it("derives the slug from the filename", () => {
    const guide = parseGuide("how-to-buy-spacex-stock-pre-ipo.md", raw);
    expect(guide.slug).toBe("how-to-buy-spacex-stock-pre-ipo");
  });

  it("reads frontmatter fields", () => {
    const guide = parseGuide("x.md", raw);
    expect(guide.title).toBe("How to Buy SpaceX Stock Before the IPO");
    expect(guide.description).toBe("A practical guide.");
    expect(guide.company).toBe("SpaceX");
    expect(guide.sector).toBe("Aerospace");
    expect(guide.date).toBe("2026-01-15");
    expect(guide.updated).toBe("2026-06-01");
    expect(guide.order).toBe(1);
  });

  it("separates frontmatter from the body", () => {
    const guide = parseGuide("x.md", raw);
    expect(guide.body.startsWith("# How to Buy SpaceX")).toBe(true);
    expect(guide.body).not.toContain("---");
    expect(guide.body).toContain("Body paragraph.");
  });

  it("falls back to the first heading when title frontmatter is missing", () => {
    const noTitle = `---
description: No title here.
---

# Derived Heading Title

Text.
`;
    const guide = parseGuide("derived.md", noTitle);
    expect(guide.title).toBe("Derived Heading Title");
  });

  it("falls back to the slug when neither title nor heading exist", () => {
    const guide = parseGuide("bare-slug.md", "just body text\n");
    expect(guide.title).toBe("bare-slug");
  });

  it("defaults updated to date and order to a large number", () => {
    const guide = parseGuide("y.md", `---\ndate: 2026-03-03\n---\n\nBody.\n`);
    expect(guide.updated).toBe("2026-03-03");
    expect(guide.order).toBe(9999);
  });
});

describe("relatedGuides", () => {
  const guide = (slug: string, sector?: string): Guide => ({
    slug,
    title: `Title ${slug}`,
    description: "",
    sector,
    date: "2026-01-01",
    updated: "2026-01-01",
    order: 1,
    body: "",
  });

  // Display order as `getAllGuides` returns it: ai-a shares "b"'s topic.
  const corpus: Guide[] = [
    guide("ai-a", "Artificial Intelligence"),
    guide("space-b", "Aerospace"),
    guide("bio-c", "Biotech"),
    guide("ai-d", "Artificial Intelligence"),
  ];

  it("never returns the current guide", () => {
    for (const g of corpus) {
      const slugs = relatedGuides(g.slug, corpus, { count: 10 }).map(
        (r) => r.slug
      );
      expect(slugs).not.toContain(g.slug);
    }
  });

  it("returns min(count, corpus - 1) guides", () => {
    expect(relatedGuides("ai-a", corpus, { count: 3 })).toHaveLength(3);
    expect(relatedGuides("ai-a", corpus, { count: 10 })).toHaveLength(3);
    expect(relatedGuides("ai-a", corpus, { count: 1 })).toHaveLength(1);
  });

  it("defaults to three guides", () => {
    expect(relatedGuides("ai-a", corpus)).toHaveLength(3);
  });

  it("prefers guides sharing the current topic", () => {
    expect(relatedGuides("ai-a", corpus, { count: 1 }).map((g) => g.slug)).toEqual([
      "ai-d",
    ]);
  });

  it("falls back to display order once topic matches run out", () => {
    expect(relatedGuides("ai-a", corpus, { count: 3 }).map((g) => g.slug)).toEqual([
      "ai-d",
      "space-b",
      "bio-c",
    ]);
  });

  it("keeps display order when the current guide has no topic", () => {
    const untagged = [guide("plain", undefined), ...corpus];
    expect(relatedGuides("plain", untagged, { count: 4 }).map((g) => g.slug)).toEqual(
      ["ai-a", "space-b", "bio-c", "ai-d"]
    );
  });

  it("is deterministic for a fixed input order", () => {
    const first = relatedGuides("space-b", corpus).map((g) => g.slug);
    const second = relatedGuides("space-b", corpus).map((g) => g.slug);
    expect(second).toEqual(first);
  });

  it("returns [] for a one-guide corpus", () => {
    expect(relatedGuides("ai-a", [guide("ai-a", "Artificial Intelligence")])).toEqual(
      []
    );
  });

  it("returns [] for an unknown slug against an empty corpus", () => {
    expect(relatedGuides("missing", [])).toEqual([]);
  });

  it("only returns slugs that exist in the real guide corpus", () => {
    const all = getAllGuides();
    expect(all.length).toBeGreaterThan(1);
    const knownSlugs = new Set(all.map((g) => g.slug));

    for (const g of all) {
      const related = relatedGuides(g.slug, all);
      expect(related.length).toBe(Math.min(3, all.length - 1));
      for (const r of related) {
        expect(knownSlugs.has(r.slug)).toBe(true);
        expect(r.slug).not.toBe(g.slug);
      }
    }
  });
});
