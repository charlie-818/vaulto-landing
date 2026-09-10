import { describe, it, expect } from "vitest";
import { getAllGuides, getGuide, getGuideSlugs, parseGuide, slugFromFilename } from "./guides";
import sitemap from "../app/sitemap";
import { generateStaticParams } from "../app/guides/[slug]/page";

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

describe("content/guides", () => {
  const slug = "how-to-buy-neuralink-stock-pre-ipo";

  it("getGuideSlugs includes the Neuralink guide", () => {
    expect(getGuideSlugs()).toContain(slug);
  });

  it("getAllGuides picks up the Neuralink guide with its frontmatter", () => {
    const guide = getAllGuides().find((g) => g.slug === slug);
    expect(guide).toBeDefined();
    expect(guide?.company).toBe("Neuralink");
    expect(guide?.title).toBe("How to Buy Neuralink Stock Before the IPO");
    expect(guide?.description).not.toBe("");
  });

  it("interlinks to the SpaceX and OpenAI guides", () => {
    const guide = getGuide(slug);
    expect(guide?.body).toContain("/guides/how-to-buy-spacex-stock-pre-ipo");
    expect(guide?.body).toContain("/guides/how-to-buy-openai-stock-pre-ipo");
  });

  it("generateStaticParams emits the Neuralink slug", () => {
    expect(generateStaticParams()).toContainEqual({ slug });
  });

  it("sitemap includes the Neuralink guide URL", () => {
    const urls = sitemap().map((entry) => entry.url);
    expect(urls).toContain(`https://vaulto.fi/guides/${slug}`);
  });
});
