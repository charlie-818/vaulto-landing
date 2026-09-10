import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

// Source-level guard for the self-hosted font setup. The post-build check
// (scripts/check-self-hosted-fonts.mjs) verifies the emitted assets; this test
// keeps the Google Fonts @import from creeping back into the source.
const ROOT = join(__dirname, "..");
const read = (p: string) => readFileSync(join(ROOT, p), "utf8");

describe("self-hosted fonts", () => {
  it("globals.css does not @import Google Fonts", () => {
    expect(read("app/globals.css")).not.toContain("fonts.googleapis.com");
  });

  it("layout loads Inter and Space Grotesk through next/font/google", () => {
    const layout = read("app/layout.tsx");
    expect(layout).toMatch(/from "next\/font\/google"/);
    expect(layout).toContain('variable: "--font-inter"');
    expect(layout).toContain('variable: "--font-space-grotesk"');
  });

  it("tailwind font families point at the next/font CSS variables", () => {
    const tw = read("tailwind.config.ts");
    expect(tw).toContain('"var(--font-inter)"');
    expect(tw).toContain('"var(--font-space-grotesk)"');
    expect(tw).not.toContain('"Inter"');
  });

  it("no source file hardcodes the 'Space Grotesk' family name", () => {
    // next/font emits a hashed family name, so a literal 'Space Grotesk' would
    // silently fall through to the system fallback.
    for (const p of [
      "app/globals.css",
      "components/landing/CompanyMarquee.tsx",
      "components/transparency/AddressPill.tsx",
    ]) {
      expect(read(p), p).not.toMatch(/['"]Space Grotesk['"]/);
    }
  });
});
