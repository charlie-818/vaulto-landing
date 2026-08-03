import { describe, it, expect } from "vitest";
import sitemap from "../app/sitemap";

describe("sitemap", () => {
  const entries = sitemap();

  it("returns at least the static routes", () => {
    expect(entries.length).toBeGreaterThanOrEqual(5);
  });

  it("gives every entry a non-empty changeFrequency", () => {
    for (const entry of entries) {
      expect(entry.changeFrequency).toBeTruthy();
    }
  });

  it("marks the homepage as daily", () => {
    const home = entries.find((e) => e.url === "https://vaulto.fi/");
    expect(home).toBeDefined();
    expect(home?.changeFrequency).toBe("daily");
  });
});
