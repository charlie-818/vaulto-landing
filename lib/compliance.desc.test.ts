import { describe, it, expect } from "vitest";
import {
  deriveDescription,
  resolveDescription,
  getAllComplianceDocs,
} from "./compliance";

describe("deriveDescription", () => {
  it("derives from the first paragraph, skipping the heading and italic metadata line", () => {
    const body = `# Foundations — Howey and Reves

*Last researched: 2026-05-18*

The 2026 Project Crypto interpretation ([S8]) is layered on top of two foundational Supreme Court cases every builder must understand.

## Next section`;
    const desc = deriveDescription(body);
    expect(desc).toBe(
      "The 2026 Project Crypto interpretation is layered on top of two foundational Supreme Court cases every builder must understand."
    );
  });

  it("strips markdown emphasis, links, and inline code", () => {
    const desc = deriveDescription(
      "# H\n\nSee **bold**, _italic_, `code`, and [a link](https://example.com) here."
    );
    expect(desc).toBe("See bold, italic, code, and a link here.");
  });

  it("truncates long paragraphs to <=160 chars on a word boundary with an ellipsis", () => {
    const long = "word ".repeat(80).trim();
    const desc = deriveDescription(`# Title\n\n${long}`);
    expect(desc).toBeTruthy();
    expect(desc!.length).toBeLessThanOrEqual(160);
    expect(desc!.endsWith("…")).toBe(true);
    expect(desc).not.toContain("wor…"); // cut on a word boundary, not mid-word
  });

  it("returns undefined when there is no usable body paragraph", () => {
    expect(deriveDescription("# Only A Heading")).toBeUndefined();
    expect(deriveDescription("")).toBeUndefined();
  });
});

describe("resolveDescription", () => {
  it("keeps a frontmatter description verbatim", () => {
    const body = "# Title\n\nA body paragraph that should be ignored.";
    expect(resolveDescription({ description: "Hand-written summary." }, body)).toBe(
      "Hand-written summary."
    );
  });

  it("falls back to a derived description when frontmatter has none", () => {
    const body = "# Title\n\nDerived body paragraph.";
    expect(resolveDescription({}, body)).toBe("Derived body paragraph.");
  });

  it("ignores a blank frontmatter description and derives instead", () => {
    const body = "# Title\n\nDerived body paragraph.";
    expect(resolveDescription({ description: "" }, body)).toBe(
      "Derived body paragraph."
    );
  });
});

describe("getAllComplianceDocs meta descriptions", () => {
  it("gives every doc a non-empty description of at most 160 chars", () => {
    const docs = getAllComplianceDocs();
    expect(docs.length).toBeGreaterThan(0);
    for (const doc of docs) {
      expect(doc.description, `${doc.slug} description`).toBeTruthy();
      expect(doc.description!.length, `${doc.slug} length`).toBeLessThanOrEqual(
        160
      );
    }
  });
});
