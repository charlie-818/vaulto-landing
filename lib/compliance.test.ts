import { describe, it, expect } from "vitest";
import { getComplianceIndexDocs, getAllComplianceDocs } from "./compliance";

describe("getComplianceIndexDocs", () => {
  const docs = getComplianceIndexDocs();
  const slugs = docs.map((d) => d.slug);

  it("excludes the sources appendix", () => {
    expect(slugs).not.toContain("sources");
  });

  it("keeps every non-sources doc from getAllComplianceDocs", () => {
    const expected = getAllComplianceDocs()
      .filter((d) => d.slug !== "sources")
      .map((d) => d.slug);
    expect(slugs).toEqual(expected);
  });

  it("includes the foundations and glossary topics", () => {
    expect(slugs).toContain("glossary");
    expect(slugs).toContain("howey-reves");
  });

  it("surfaces the full content surface (>= 12 docs)", () => {
    expect(docs.length).toBeGreaterThanOrEqual(12);
  });
});
