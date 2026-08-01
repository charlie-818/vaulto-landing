import { describe, it, expect } from "vitest";
import {
  rewriteInternalLinks,
  fileSlugToUrlSlug,
  urlSlugToFileSlug,
  deriveOrder,
  deriveTitle,
} from "./compliance";

describe("rewriteInternalLinks", () => {
  it("rewrites a mapped numbered file link and preserves the hash", () => {
    expect(
      rewriteInternalLinks("[a](02-bucket-digital-commodities.md#x)")
    ).toBe("[a](/compliance/commodities#x)");
  });

  it("rewrites README.md to the compliance index", () => {
    expect(rewriteInternalLinks("[home](README.md)")).toBe(
      "[home](/compliance)"
    );
  });

  it("preserves the hash when rewriting README.md", () => {
    expect(rewriteInternalLinks("[home](README.md#top)")).toBe(
      "[home](/compliance#top)"
    );
  });

  it("passes an unmapped slug through unchanged (as its own url slug)", () => {
    expect(rewriteInternalLinks("[x](99-unknown-doc.md)")).toBe(
      "[x](/compliance/99-unknown-doc)"
    );
  });

  it("rewrites links without a hash", () => {
    expect(
      rewriteInternalLinks("see [tools](04-bucket-digital-tools.md)")
    ).toBe("see [tools](/compliance/tools)");
  });

  it("rewrites multiple links in one string", () => {
    const md = "[a](02-bucket-digital-commodities.md) and [b](README.md)";
    expect(rewriteInternalLinks(md)).toBe(
      "[a](/compliance/commodities) and [b](/compliance)"
    );
  });

  it("leaves external and non-.md links untouched", () => {
    const md = "[ext](https://example.com) [rel](/somewhere)";
    expect(rewriteInternalLinks(md)).toBe(md);
  });
});

describe("fileSlugToUrlSlug", () => {
  it("maps a numbered file slug to its clean url slug", () => {
    expect(fileSlugToUrlSlug("11-key-enforcement-cases")).toBe("enforcement");
  });

  it("returns the input unchanged when unmapped", () => {
    expect(fileSlugToUrlSlug("42-not-in-map")).toBe("42-not-in-map");
  });
});

describe("urlSlugToFileSlug", () => {
  it("maps a clean url slug back to its numbered file slug", () => {
    expect(urlSlugToFileSlug("enforcement")).toBe("11-key-enforcement-cases");
  });

  it("returns the input unchanged when unmapped", () => {
    expect(urlSlugToFileSlug("not-in-map")).toBe("not-in-map");
  });

  it("round-trips with fileSlugToUrlSlug", () => {
    const fileSlug = "05-bucket-tokenized-securities";
    expect(urlSlugToFileSlug(fileSlugToUrlSlug(fileSlug))).toBe(fileSlug);
  });
});

describe("deriveOrder", () => {
  it("extracts the leading number from a numbered slug", () => {
    expect(deriveOrder("11-key-enforcement-cases")).toBe(11);
  });

  it("returns -1 for README", () => {
    expect(deriveOrder("README")).toBe(-1);
  });

  it("returns a large fallback for a non-numbered, non-README slug", () => {
    expect(deriveOrder("glossary")).toBe(9999);
  });

  it("parses a zero-padded leading number", () => {
    expect(deriveOrder("00-quickstart-builders")).toBe(0);
  });
});

describe("deriveTitle", () => {
  it("uses a title override when present", () => {
    expect(deriveTitle("02-bucket-digital-commodities", "# Ignored")).toBe(
      "Commodities"
    );
  });

  it("falls back to the first h1 heading", () => {
    expect(deriveTitle("unmapped-slug", "# My Heading\n\nBody.")).toBe(
      "My Heading"
    );
  });

  it("strips an em-dash suffix from the heading", () => {
    expect(
      deriveTitle("unmapped-slug", "# Main Title — subtitle here\n")
    ).toBe("Main Title");
  });

  it("falls back to the slug when no override or heading exists", () => {
    expect(deriveTitle("bare-slug", "just body text\n")).toBe("bare-slug");
  });
});
