import { describe, it, expect } from "vitest";
import { NextRequest } from "next/server";
import { middleware } from "../middleware";

function makeRequest(
  url: string,
  headers: Record<string, string> = {}
): NextRequest {
  return new NextRequest(new URL(url, "https://vaulto.com"), { headers });
}

describe("middleware referral cookie", () => {
  it("sets waitlist_ref uppercased for a valid ?ref on '/'", () => {
    const res = middleware(makeRequest("/?ref=abc123"));
    expect(res.cookies.get("waitlist_ref")?.value).toBe("ABC123");
  });

  it("does not set waitlist_ref for a ref that is too long", () => {
    const res = middleware(makeRequest("/?ref=abcdefghijklmnopqrstuvwxyz"));
    expect(res.cookies.get("waitlist_ref")).toBeUndefined();
  });

  it("does not set waitlist_ref for a non-alphanumeric ref", () => {
    const res = middleware(makeRequest("/?ref=abc-123"));
    expect(res.cookies.get("waitlist_ref")).toBeUndefined();
  });

  it("ignores ?ref on a non-home path", () => {
    const res = middleware(makeRequest("/guides?ref=abc123"));
    expect(res.cookies.get("waitlist_ref")).toBeUndefined();
  });
});

describe("middleware geo cookie", () => {
  it("sets geo-country from x-vercel-ip-country", () => {
    const res = middleware(
      makeRequest("/", { "x-vercel-ip-country": "US" })
    );
    expect(res.cookies.get("geo-country")?.value).toBe("US");
  });

  it("prefers x-vercel-ip-country over cf-ipcountry", () => {
    const res = middleware(
      makeRequest("/", {
        "x-vercel-ip-country": "US",
        "cf-ipcountry": "GB",
      })
    );
    expect(res.cookies.get("geo-country")?.value).toBe("US");
  });

  it("falls back to cf-ipcountry when Vercel and Netlify headers are absent", () => {
    const res = middleware(makeRequest("/", { "cf-ipcountry": "GB" }));
    expect(res.cookies.get("geo-country")?.value).toBe("GB");
  });

  it("falls back to cloudfront-viewer-country as the last source", () => {
    const res = middleware(
      makeRequest("/", { "cloudfront-viewer-country": "CA" })
    );
    expect(res.cookies.get("geo-country")?.value).toBe("CA");
  });

  it("does not set geo-country when no geo headers are present", () => {
    const res = middleware(makeRequest("/"));
    expect(res.cookies.get("geo-country")).toBeUndefined();
  });
});
