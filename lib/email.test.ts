import { describe, it, expect } from "vitest";
import { isValidEmail } from "./email";

describe("isValidEmail", () => {
  it("accepts a standard address", () => {
    expect(isValidEmail("user@example.com")).toBe(true);
  });

  it("accepts an address with subdomains and plus tags", () => {
    expect(isValidEmail("first.last+tag@mail.example.co.uk")).toBe(true);
  });

  it("trims surrounding whitespace before validating", () => {
    expect(isValidEmail("  user@example.com  ")).toBe(true);
  });

  it("accepts uppercase input (normalized to lowercase)", () => {
    expect(isValidEmail("USER@EXAMPLE.COM")).toBe(true);
  });

  it("rejects an empty string", () => {
    expect(isValidEmail("")).toBe(false);
  });

  it("rejects a whitespace-only string", () => {
    expect(isValidEmail("   ")).toBe(false);
  });

  it("rejects input missing an @", () => {
    expect(isValidEmail("userexample.com")).toBe(false);
  });

  it("rejects input missing a domain dot", () => {
    expect(isValidEmail("user@example")).toBe(false);
  });

  it("rejects input with internal whitespace", () => {
    expect(isValidEmail("user name@example.com")).toBe(false);
  });

  it("rejects input with multiple @ signs", () => {
    expect(isValidEmail("user@@example.com")).toBe(false);
  });
});
