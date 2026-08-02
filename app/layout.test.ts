import { describe, it, expect } from "vitest";
import { viewport } from "./layout";

describe("root viewport", () => {
  it("does not disable pinch-to-zoom (WCAG 1.4.4)", () => {
    // maximumScale must be unset or allow meaningful zoom (>= 5)
    expect(
      viewport.maximumScale === undefined || Number(viewport.maximumScale) >= 5
    ).toBe(true);
  });

  it("does not force userScalable off", () => {
    expect(viewport.userScalable).not.toBe(false);
  });

  it("keeps the responsive width, initial scale, and viewport fit", () => {
    expect(viewport.width).toBe("device-width");
    expect(viewport.initialScale).toBe(1);
    expect(viewport.viewportFit).toBe("cover");
  });
});
