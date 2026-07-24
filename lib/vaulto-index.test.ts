import { describe, it, expect } from "vitest";
import {
  toChartPoints,
  type IndexHistoryPoint,
  DEFAULT_CHART_WIDTH,
  DEFAULT_CHART_HEIGHT,
  DEFAULT_CHART_PADDING,
} from "./vaulto-index";

const OPTS = { width: 100, height: 100, padding: 10 };

describe("toChartPoints", () => {
  it("returns empty geometry for an empty history", () => {
    const geo = toChartPoints([], OPTS);
    expect(geo.points).toEqual([]);
    expect(geo.path).toBe("");
    expect(geo.min).toBe(0);
    expect(geo.max).toBe(0);
  });

  it("returns empty geometry when every value is a gap (null)", () => {
    const history: IndexHistoryPoint[] = [
      { t: "2026-07-01", v: null },
      { t: "2026-07-02", v: null },
    ];
    const geo = toChartPoints(history, OPTS);
    expect(geo.points).toEqual([]);
    expect(geo.path).toBe("");
  });

  it("draws a single point flat at the vertical centre", () => {
    const history: IndexHistoryPoint[] = [{ t: "2026-07-01", v: 1000 }];
    const geo = toChartPoints(history, OPTS);
    expect(geo.points).toHaveLength(1);
    // x centred, y at the middle of the inner box (span === 0).
    expect(geo.points[0]).toEqual({ x: 50, y: 50 });
    expect(geo.path).toBe("M 50 50");
    expect(geo.min).toBe(1000);
    expect(geo.max).toBe(1000);
  });

  it("maps a rising series across the full width, high value near the top", () => {
    const history: IndexHistoryPoint[] = [
      { t: "2026-07-01", v: 1000 },
      { t: "2026-07-02", v: 1100 },
      { t: "2026-07-03", v: 1200 },
    ];
    const geo = toChartPoints(history, OPTS);
    expect(geo.min).toBe(1000);
    expect(geo.max).toBe(1200);
    // First point pinned to the left padding, last to the right edge.
    expect(geo.points[0].x).toBe(10);
    expect(geo.points[2].x).toBe(90);
    // Lowest value sits at the bottom, highest at the top (SVG y grows down).
    expect(geo.points[0].y).toBe(90);
    expect(geo.points[2].y).toBe(10);
    // Path starts with a move then line-tos.
    expect(geo.path.startsWith("M 10 90")).toBe(true);
    expect(geo.path).toContain("L");
  });

  it("breaks the line across a gap and keeps time proportional", () => {
    const history: IndexHistoryPoint[] = [
      { t: "2026-07-01", v: 1000 },
      { t: "2026-07-02", v: null },
      { t: "2026-07-03", v: 1200 },
    ];
    const geo = toChartPoints(history, OPTS);
    // Only the two finite points are plotted.
    expect(geo.points).toHaveLength(2);
    // The gap leaves the middle x-slot empty: index 0 → x=10, index 2 → x=90.
    expect(geo.points[0].x).toBe(10);
    expect(geo.points[1].x).toBe(90);
    // Two separate sub-paths — each finite run starts with its own "M".
    expect((geo.path.match(/M/g) ?? [])).toHaveLength(2);
    expect(geo.path).not.toContain("L");
  });

  it("ignores non-finite (NaN/Infinity) values like gaps", () => {
    const history: IndexHistoryPoint[] = [
      { t: "2026-07-01", v: Number.NaN },
      { t: "2026-07-02", v: 1000 },
      { t: "2026-07-03", v: Number.POSITIVE_INFINITY },
    ];
    const geo = toChartPoints(history, OPTS);
    expect(geo.points).toHaveLength(1);
    expect(geo.min).toBe(1000);
    expect(geo.max).toBe(1000);
  });

  it("falls back to default dimensions when none are supplied", () => {
    const history: IndexHistoryPoint[] = [
      { t: "2026-07-01", v: 1000 },
      { t: "2026-07-02", v: 2000 },
    ];
    const geo = toChartPoints(history);
    expect(geo.points[0].x).toBe(DEFAULT_CHART_PADDING);
    expect(geo.points[1].x).toBe(DEFAULT_CHART_WIDTH - DEFAULT_CHART_PADDING);
    // Top of the inner box for the max value.
    expect(geo.points[1].y).toBe(DEFAULT_CHART_PADDING);
    expect(geo.points[0].y).toBe(DEFAULT_CHART_HEIGHT - DEFAULT_CHART_PADDING);
  });
});
