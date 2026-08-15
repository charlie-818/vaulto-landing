import { describe, it, expect } from "vitest";
import { truncateAddress } from "./format-address";

describe("truncateAddress", () => {
  const address = "0x1b91BaF3Aa715dFEFb34A05b9dEd8D61a473a202";

  it("truncates a standard 42-char checksummed address", () => {
    expect(truncateAddress(address)).toBe("0x1b91…a202");
  });

  it("starts with the first 6 characters of the input", () => {
    expect(truncateAddress(address).startsWith(address.slice(0, 6))).toBe(true);
  });

  it("ends with the last 4 characters of the input", () => {
    expect(truncateAddress(address).endsWith(address.slice(-4))).toBe(true);
  });

  it("returns '…' for an empty string", () => {
    expect(truncateAddress("")).toBe("…");
  });
});
