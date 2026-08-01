import { describe, it, expect } from "vitest";
import { formatCount } from "./social-stats";

describe("formatCount", () => {
  it("shows raw values below 1000", () => {
    expect(formatCount(0)).toBe("0");
    expect(formatCount(5)).toBe("5");
    expect(formatCount(500)).toBe("500");
    expect(formatCount(999)).toBe("999");
  });

  it("uses one decimal in the K range below 10k", () => {
    expect(formatCount(1000)).toBe("1.0K");
    expect(formatCount(1500)).toBe("1.5K");
    expect(formatCount(9999)).toBe("10.0K");
  });

  it("drops the decimal at or above 10k", () => {
    expect(formatCount(10000)).toBe("10K");
    expect(formatCount(12000)).toBe("12K");
    expect(formatCount(10495)).toBe("10K");
    expect(formatCount(999999)).toBe("1000K");
  });

  it("uses one decimal in the M range", () => {
    expect(formatCount(1_000_000)).toBe("1.0M");
    expect(formatCount(1_200_000)).toBe("1.2M");
    expect(formatCount(2_500_000)).toBe("2.5M");
  });
});
