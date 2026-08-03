import { describe, it, expect } from "vitest";
import {
  buildGuideListJsonLd,
  parseGuide,
  slugFromFilename,
  SITE_URL,
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

describe("buildGuideListJsonLd", () => {
  const guide = (slug: string, title: string, description: string): Guide => ({
    slug,
    title,
    description,
    date: "2026-01-01",
    updated: "2026-01-01",
    order: 1,
    body: "",
  });

  const guides: Guide[] = [
    guide("how-to-buy-spacex-stock-pre-ipo", "How to Buy SpaceX Stock", "SpaceX guide."),
    guide("how-to-buy-openai-stock-pre-ipo", "How to Buy OpenAI Stock", "OpenAI guide."),
    guide("how-to-buy-anthropic-stock-pre-ipo", "How to Buy Anthropic Stock", "Anthropic guide."),
  ];

  it("returns a schema.org ItemList", () => {
    const jsonLd = buildGuideListJsonLd(guides) as Record<string, unknown>;
    expect(jsonLd["@context"]).toBe("https://schema.org");
    expect(jsonLd["@type"]).toBe("ItemList");
  });

  it("sets numberOfItems to the input length", () => {
    const jsonLd = buildGuideListJsonLd(guides) as Record<string, unknown>;
    expect(jsonLd.numberOfItems).toBe(guides.length);
    expect(buildGuideListJsonLd([]) as Record<string, unknown>).toMatchObject({
      numberOfItems: 0,
      itemListElement: [],
    });
  });

  it("enriches each ListItem with position, url, name, and description", () => {
    const jsonLd = buildGuideListJsonLd(guides) as {
      itemListElement: Array<Record<string, unknown>>;
    };
    expect(jsonLd.itemListElement).toHaveLength(guides.length);
    jsonLd.itemListElement.forEach((item, i) => {
      const g = guides[i];
      expect(item["@type"]).toBe("ListItem");
      expect(item.position).toBe(i + 1);
      expect(item.url).toBe(`${SITE_URL}/guides/${g.slug}`);
      expect(item.name).toBe(g.title);
      expect(item.description).toBe(g.description);
    });
  });
});
