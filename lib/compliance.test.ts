import { describe, it, expect } from "vitest";
import { getCitationMap, linkCitations } from "./compliance";

describe("getCitationMap", () => {
  it("parses [S#] keys and their URLs from 99-sources.md", () => {
    const map = getCitationMap();
    // S1 is the Atkins Project Crypto speech, the first row of the table.
    expect(map.get("S1")).toBe(
      "https://www.sec.gov/newsroom/speeches-statements/atkins-111225-secs-approach-digital-assets-inside-project-crypto"
    );
  });

  it("returns the same cached map on repeated calls", () => {
    expect(getCitationMap()).toBe(getCitationMap());
  });
});

describe("linkCitations", () => {
  it("(a) rewrites a known key to its parsed source URL", () => {
    const url = getCitationMap().get("S1");
    expect(url).toBeTruthy();
    expect(linkCitations("See [S1] for details.", "01-project-crypto-overview")).toBe(
      `See [[S1]](${url}) for details.`
    );
  });

  it("(b) falls back to /compliance/sources for an unknown key", () => {
    const out = linkCitations("Bogus [S9999] ref.", "01-project-crypto-overview");
    expect(out).toBe("Bogus [[S9999]](/compliance/sources) ref.");
    expect(out).toContain("/compliance/sources");
  });

  it("(c) leaves an already-linked [S1](https://x) untouched", () => {
    const input = "Already [S1](https://x) linked.";
    expect(linkCitations(input, "01-project-crypto-overview")).toBe(input);
  });

  it("(d) returns the 99-sources doc unchanged", () => {
    const input = "Bibliography [S1] should not be rewritten here.";
    expect(linkCitations(input, "99-sources")).toBe(input);
  });
});
