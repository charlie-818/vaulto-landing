import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, it, expect } from "vitest";

// Raster logos must go through next/image so they get AVIF/WebP negotiation,
// a responsive srcset and intrinsic dimensions (no CLS). SVGs are exempt: the
// optimizer does nothing for them and `dangerouslyAllowSVG` is off.
const SOURCES = [
  "components/landing/LandingFooter.tsx",
  "components/landing/FeatureVisuals.tsx",
  "app/transparency/page.tsx",
];

const read = (file: string) =>
  readFileSync(join(process.cwd(), file), "utf8");

const RASTER_IMG = /<img\b[^>]*\bsrc=["'][^"']*\.(?:png|jpe?g)["']/gi;
const IMAGE_TAG = /<Image\b[\s\S]*?\/>/g;

describe("raster logos are served through next/image", () => {
  for (const file of SOURCES) {
    it(`${file} has no raw <img> pointing at a raster file`, () => {
      const offenders = read(file).match(RASTER_IMG) ?? [];
      expect(offenders).toEqual([]);
    });

    it(`${file} gives every <Image> an explicit width and height`, () => {
      const tags = read(file).match(IMAGE_TAG) ?? [];
      const missing = tags.filter(
        (tag) => !/\bwidth=/.test(tag) || !/\bheight=/.test(tag)
      );
      expect(missing).toEqual([]);
    });
  }

  it("covers the elements the optimizer was meant to pick up", () => {
    const footer = read("components/landing/LandingFooter.tsx");
    const visuals = read("components/landing/FeatureVisuals.tsx");

    expect(footer).toMatch(/<Image[^>]*\/partners\/pitchbook\.png/);
    expect(footer).toMatch(/<Image[^>]*\/partners\/ucla-blue\.png/);
    expect(visuals).toMatch(/<Image[^>]*\/bridge-logo\.png/);
    expect(visuals).toMatch(/<Image[^>]*\/nasdaq-pm-logo-cropped\.png/);
  });
});
