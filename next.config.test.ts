import { describe, it, expect } from "vitest";
import nextConfig from "./next.config";

describe("next.config images.remotePatterns", () => {
  const patterns = nextConfig.images?.remotePatterns ?? [];

  it("allows the Google favicon host used by CompanyLogo", () => {
    expect(patterns).toContainEqual(
      expect.objectContaining({ protocol: "https", hostname: "www.google.com" })
    );
  });

  it("has no wildcard entry that would turn /_next/image into an open proxy", () => {
    const hostnames = patterns.map((p) => p.hostname);
    expect(hostnames).not.toContain("**");
    expect(hostnames).not.toContain("*");
    for (const hostname of hostnames) {
      expect(hostname).not.toMatch(/\*/);
    }
  });

  it("only lists explicit HTTPS hosts", () => {
    for (const p of patterns) {
      expect(p.protocol).toBe("https");
    }
  });
});
