import { describe, it, expect } from "vitest";
import { buildArticleLd, parseGuide, slugFromFilename } from "./guides";

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

describe("buildArticleLd", () => {
  const withEntities = `---
title: How to Buy SpaceX Stock Before the IPO
description: A practical guide.
company: SpaceX
sector: Aerospace
date: 2026-01-15
updated: 2026-06-01
---

# How to Buy SpaceX Stock Before the IPO

Body.
`;

  const withoutEntities = `---
title: Understanding Pre-IPO Investing
description: The basics.
date: 2026-01-15
---

# Understanding Pre-IPO Investing

Body.
`;

  const url = "https://vaulto.fi/guides/how-to-buy-spacex-stock-pre-ipo";

  it("always includes the core Article fields", () => {
    const ld = buildArticleLd(parseGuide("x.md", withEntities), url);
    expect(ld["@context"]).toBe("https://schema.org");
    expect(ld["@type"]).toBe("Article");
    expect(ld.headline).toBe("How to Buy SpaceX Stock Before the IPO");
    expect(ld.mainEntityOfPage).toEqual({ "@type": "WebPage", "@id": url });
  });

  it("enriches with about/articleSection when company+sector are present", () => {
    const ld = buildArticleLd(parseGuide("x.md", withEntities), url);
    expect(ld.about).toEqual({ "@type": "Organization", name: "SpaceX" });
    expect(ld.articleSection).toBe("Aerospace");
    expect(ld.inLanguage).toBe("en");
    expect(ld.keywords).toContain("how to buy SpaceX pre-IPO");
    expect(ld.keywords).toContain("Aerospace");
  });

  it("omits the enrichment keys cleanly when company/sector are absent", () => {
    const ld = buildArticleLd(parseGuide("y.md", withoutEntities), url);
    expect(ld).not.toHaveProperty("about");
    expect(ld).not.toHaveProperty("articleSection");
    expect(ld).not.toHaveProperty("inLanguage");
    expect(ld).not.toHaveProperty("keywords");
  });
});
