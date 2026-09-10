import { describe, it, expect } from "vitest";
import { NextRequest } from "next/server";
import { middleware } from "../middleware";

describe("middleware geo-country cookie", () => {
  it("scopes geo-country to the site root when set from a nested path", () => {
    const req = new NextRequest("https://vaulto.fi/guides/x", {
      headers: { "x-vercel-ip-country": "US" },
    });
    const res = middleware(req);

    const geo = res.cookies.get("geo-country");
    expect(geo?.value).toBe("US");
    expect(geo?.path).toBe("/");

    const setCookie = res.headers
      .getSetCookie()
      .find((c) => c.startsWith("geo-country="));
    expect(setCookie).toContain("Path=/");
    expect(setCookie).not.toContain("Path=/guides");
  });

  it("does not set geo-country when no geo header is present", () => {
    const res = middleware(new NextRequest("https://vaulto.fi/guides/x"));
    expect(res.cookies.get("geo-country")).toBeUndefined();
  });
});
