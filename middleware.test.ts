import { describe, it, expect } from "vitest";
import { NextRequest } from "next/server";
import { config, middleware } from "./middleware";

function request(path: string, headers: Record<string, string> = {}) {
  return new NextRequest(new URL(path, "https://vaulto.fi"), { headers });
}

const GEO_HEADERS = { "x-vercel-ip-country": "US" };

describe("middleware", () => {
  it("does not set any cookie on static content routes", () => {
    for (const path of [
      "/guides/how-to-buy-spacex-stock-pre-ipo",
      "/guides",
      "/compliance/terms",
      "/faq",
      "/transparency",
    ]) {
      const res = middleware(request(path, GEO_HEADERS));
      expect(res.headers.get("set-cookie"), path).toBeNull();
    }
  });

  it("still sets waitlist_ref on / with ?ref=", () => {
    const res = middleware(request("/?ref=abc"));
    const cookie = res.headers.get("set-cookie") ?? "";
    expect(cookie).toContain("waitlist_ref=ABC");
    expect(res.cookies.get("waitlist_ref")?.value).toBe("ABC");
  });

  it("ignores ?ref= on non-home routes", () => {
    const res = middleware(request("/faq?ref=abc"));
    expect(res.headers.get("set-cookie")).toBeNull();
    expect(res.cookies.get("waitlist_ref")).toBeUndefined();
  });

  it("rejects malformed ref codes on /", () => {
    const res = middleware(request("/?ref=not-valid!"));
    expect(res.cookies.get("waitlist_ref")).toBeUndefined();
  });

  it("sets geo-country on / from the platform country header", () => {
    const res = middleware(request("/", GEO_HEADERS));
    expect(res.cookies.get("geo-country")?.value).toBe("US");
  });
});

describe("middleware matcher", () => {
  it("only matches the home page, so static routes skip middleware entirely", () => {
    expect(config.matcher).toEqual(["/"]);
  });
});
