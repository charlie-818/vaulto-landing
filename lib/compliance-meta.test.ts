import { describe, it, expect } from "vitest";
import { deriveTitle, deriveOrder } from "./compliance";

describe("deriveTitle", () => {
  it("prefers a TITLE_OVERRIDES map hit over the body", () => {
    // Override wins even when the body carries a different H1.
    expect(deriveTitle("README", "# Some Other Heading\n")).toBe(
      "Knowledge Base Index"
    );
    expect(
      deriveTitle("02-bucket-digital-commodities", "# Ignored\n")
    ).toBe("Commodities");
    expect(
      deriveTitle("06-bucket-stablecoins", "no heading here")
    ).toBe("Stablecoins");
  });

  it("extracts the first H1 from the body", () => {
    expect(deriveTitle("10-foundations-howey-reves", "# Howey & Reves\n")).toBe(
      "Howey & Reves"
    );
  });

  it("extracts an H1 that is not on the first line", () => {
    const body = "Some intro text\n\n# Real Heading\n\nMore text\n";
    expect(deriveTitle("14-fit21-and-legislation", body)).toBe("Real Heading");
  });

  it("strips an em-dash subtitle from the H1", () => {
    expect(
      deriveTitle("11-key-enforcement-cases", "# Enforcement — A Field Guide\n")
    ).toBe("Enforcement");
  });

  it("strips everything after the first em-dash and trims", () => {
    expect(
      deriveTitle("x", "# Title   —   subtitle — with — dashes\n")
    ).toBe("Title");
  });

  it("falls back to the slug when the body has no H1", () => {
    expect(deriveTitle("17-no-action-letters", "just body text\n")).toBe(
      "17-no-action-letters"
    );
  });

  it("does not treat an H2 as an H1", () => {
    expect(deriveTitle("bare", "## Not An H1\n")).toBe("bare");
  });
});

describe("deriveOrder", () => {
  it("reads a numbered filename prefix", () => {
    expect(deriveOrder("00-quickstart-builders")).toBe(0);
    expect(deriveOrder("06-bucket-stablecoins")).toBe(6);
    expect(deriveOrder("10-foundations-howey-reves")).toBe(10);
    expect(deriveOrder("99-sources")).toBe(99);
  });

  it("special-cases README to -1", () => {
    expect(deriveOrder("README")).toBe(-1);
  });

  it("defaults unnumbered slugs to 9999", () => {
    expect(deriveOrder("glossary")).toBe(9999);
    expect(deriveOrder("some-unnumbered-slug")).toBe(9999);
  });

  it("prefers a numeric prefix over the README special-case", () => {
    // A numbered prefix is matched before README is ever considered.
    expect(deriveOrder("20-glossary")).toBe(20);
  });
});
