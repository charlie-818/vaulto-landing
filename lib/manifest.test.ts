import { describe, it, expect } from "vitest";
import manifest from "../app/manifest";

describe("manifest", () => {
  it("identifies the app as Vaulto", () => {
    expect(manifest().name).toBe("Vaulto");
    expect(manifest().short_name).toBe("Vaulto");
  });

  it("is an installable standalone PWA rooted at /", () => {
    expect(manifest().start_url).toBe("/");
    expect(manifest().display).toBe("standalone");
  });

  it("references at least one icon", () => {
    const icons = manifest().icons ?? [];
    expect(icons.length).toBeGreaterThan(0);
    expect(icons.some((icon) => icon.src === "/favicon.png")).toBe(true);
  });
});
