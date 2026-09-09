import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

// Guards the perf win from making the landing page a server component: its
// ~170 lines of static copy must not re-enter the client bundle by way of a
// `'use client'` directive or a function prop (which an RSC can't serialize).
const read = (rel: string) =>
  readFileSync(join(process.cwd(), rel), "utf8");

describe("LandingPage stays a server component", () => {
  const source = read("components/LandingPage.tsx");

  it("has no 'use client' directive", () => {
    expect(source).not.toMatch(/["']use client["']/);
  });

  it("passes no onClick function across the RSC boundary", () => {
    expect(source).not.toContain("onClick:");
    expect(source).not.toContain("window.open(");
  });

  it("delegates the light-mode effect to the ForceLightMode client island", () => {
    expect(source).toContain("<ForceLightMode />");
    expect(source).not.toContain("useEffect");

    const island = read("components/ForceLightMode.tsx");
    expect(island).toMatch(/^["']use client["'];/);
    expect(island).toContain('classList.remove("dark")');
  });

  it("opens the whitepaper via an external href in a new tab", () => {
    expect(source).toMatch(
      /text: "Read Whitepaper",\s*href: WHITEPAPERS\.predictionMarket,\s*external: true/
    );

    const featureSection = read("components/landing/FeatureSection.tsx");
    expect(featureSection).toContain("external?: boolean");
    expect(featureSection).toMatch(
      /actionButton\.external\s*\?\s*\{ target: "_blank", rel: "noopener noreferrer" \}/
    );
  });
});
