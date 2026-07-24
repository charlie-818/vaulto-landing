import { describe, expect, it } from "vitest";

import { formatCount } from "@/lib/social-stats";

describe("formatCount", () => {
  it("returns numbers below 1000 as-is", () => {
    expect(formatCount(0)).toBe("0");
    expect(formatCount(5)).toBe("5");
    expect(formatCount(999)).toBe("999");
  });

  it("formats thousands with one decimal below 10K", () => {
    expect(formatCount(1000)).toBe("1.0K");
    expect(formatCount(1234)).toBe("1.2K");
    expect(formatCount(9999)).toBe("10.0K");
  });

  it("formats thousands without decimals from 10K up", () => {
    expect(formatCount(10_000)).toBe("10K");
    expect(formatCount(154_300)).toBe("154K");
    expect(formatCount(999_499)).toBe("999K");
  });

  it("formats millions with one decimal", () => {
    expect(formatCount(1_000_000)).toBe("1.0M");
    expect(formatCount(1_200_000)).toBe("1.2M");
    expect(formatCount(25_750_000)).toBe("25.8M");
  });
});
