import { describe, it, expect } from "vitest";
import { getComplianceNavPair } from "./compliance";

describe("getComplianceNavPair", () => {
  const docs = [
    { slug: "README", order: -1, title: "Index" },
    { slug: "quickstart", order: 0, title: "Q" },
    { slug: "glossary", order: 20, title: "G" },
    { slug: "sources", order: 99, title: "S" },
  ];

  it("excludes README so the first real doc has no previous", () => {
    expect(getComplianceNavPair("quickstart", docs).prev).toBeNull();
  });

  it("skips over README/sources when computing next", () => {
    expect(getComplianceNavPair("quickstart", docs).next?.slug).toBe("glossary");
  });

  it("excludes sources so the last real doc has no next", () => {
    expect(getComplianceNavPair("glossary", docs).next).toBeNull();
  });

  it("links back to the previous real doc", () => {
    expect(getComplianceNavPair("glossary", docs).prev?.slug).toBe("quickstart");
  });

  it("returns null neighbors for an unknown slug", () => {
    expect(getComplianceNavPair("does-not-exist", docs)).toEqual({
      prev: null,
      next: null,
    });
  });
});
