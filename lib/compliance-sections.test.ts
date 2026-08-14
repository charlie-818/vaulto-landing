import { describe, expect, it } from "vitest";
import { sectionLabel } from "./compliance-sections";

describe("sectionLabel", () => {
  it("maps order 0 to 'Start here'", () => {
    expect(sectionLabel(0)).toBe("Start here");
  });

  it("maps orders 1-6 to 'The five buckets'", () => {
    expect(sectionLabel(1)).toBe("The five buckets");
    expect(sectionLabel(6)).toBe("The five buckets");
  });

  it("returns null for the gap between buckets and foundations", () => {
    expect(sectionLabel(7)).toBeNull();
    expect(sectionLabel(9)).toBeNull();
  });

  it("maps orders 10-11 to 'Foundations & case law'", () => {
    expect(sectionLabel(10)).toBe("Foundations & case law");
    expect(sectionLabel(11)).toBe("Foundations & case law");
  });

  it("maps orders 12-13 to 'Compliance paths'", () => {
    expect(sectionLabel(12)).toBe("Compliance paths");
    expect(sectionLabel(13)).toBe("Compliance paths");
  });

  it("maps orders 14-16 to 'Legislation & jurisdictions'", () => {
    expect(sectionLabel(14)).toBe("Legislation & jurisdictions");
    expect(sectionLabel(16)).toBe("Legislation & jurisdictions");
  });

  it("maps order 17 to 'Staff guidance'", () => {
    expect(sectionLabel(17)).toBe("Staff guidance");
  });

  it("returns null between staff guidance and glossary", () => {
    expect(sectionLabel(18)).toBeNull();
    expect(sectionLabel(19)).toBeNull();
  });

  it("maps order 20 to 'Glossary'", () => {
    expect(sectionLabel(20)).toBe("Glossary");
  });

  it("returns null between glossary and sources", () => {
    expect(sectionLabel(21)).toBeNull();
    expect(sectionLabel(98)).toBeNull();
  });

  it("maps order 99 and above to 'Sources'", () => {
    expect(sectionLabel(99)).toBe("Sources");
    expect(sectionLabel(100)).toBe("Sources");
  });
});
