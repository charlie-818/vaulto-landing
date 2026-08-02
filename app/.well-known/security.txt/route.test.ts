import { describe, it, expect } from "vitest";
import { GET } from "./route";

describe("GET /.well-known/security.txt", () => {
  it("serves the body as text/plain", async () => {
    const res = GET();
    expect(res.headers.get("content-type")).toMatch(/^text\/plain/);
  });

  it("includes the required RFC 9116 fields", async () => {
    const res = GET();
    const body = await res.text();
    expect(body).toContain("Contact:");
    expect(body).toContain("Expires:");
    expect(body).toContain("Preferred-Languages: en");
  });

  it("advertises a future Expires date", async () => {
    const res = GET();
    const body = await res.text();
    const match = body.match(/Expires:\s*(.+)/);
    expect(match).not.toBeNull();
    const expires = new Date(match![1].trim());
    expect(expires.getTime()).toBeGreaterThan(Date.parse("2026-08-02T00:00:00.000Z"));
  });
});
