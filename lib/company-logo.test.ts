import { describe, it, expect } from "vitest";
import { normalize, resolveLogoUrl } from "./company-logo";

describe("normalize", () => {
  it("lowercases and strips non-alphanumerics", () => {
    expect(normalize("Safe-Superintelligence!")).toBe("safesuperintelligence");
  });

  it("keeps digits", () => {
    expect(normalize("Web3 Co")).toBe("web3co");
  });

  it("returns an empty string when nothing alphanumeric remains", () => {
    expect(normalize(" -!@ ")).toBe("");
  });
});

describe("resolveLogoUrl", () => {
  it("resolves a static PNG logo", () => {
    expect(resolveLogoUrl("SpaceX")).toBe("/companies/spacex.png");
  });

  it("resolves a static SVG logo", () => {
    expect(resolveLogoUrl("bytedance")).toBe("/companies/bytedance.svg");
  });

  it("falls back to a Google favicon URL from the domain map", () => {
    expect(resolveLogoUrl("Stripe")).toBe(
      "https://www.google.com/s2/favicons?domain=stripe.com&sz=128"
    );
  });

  it("prefers the static map over the favicon fallback", () => {
    // spacex exists in both maps; static wins.
    expect(resolveLogoUrl("spacex")).toBe("/companies/spacex.png");
  });

  it("returns null for an unknown company", () => {
    expect(resolveLogoUrl("Totally Unknown Co")).toBeNull();
  });
});
