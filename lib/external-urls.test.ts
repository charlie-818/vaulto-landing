import { describe, it, expect } from "vitest";
import { xHandle } from "./external-urls";

describe("xHandle", () => {
  it("derives the @handle from SOCIAL_URLS.x by default", () => {
    expect(xHandle()).toBe("@vaultoAI");
  });

  it("strips a trailing slash", () => {
    expect(xHandle("https://x.com/vaultoAI/")).toBe("@vaultoAI");
  });

  it("strips a query string", () => {
    expect(xHandle("https://x.com/vaultoAI?ref=share")).toBe("@vaultoAI");
  });

  it("strips both a trailing slash and a query string", () => {
    expect(xHandle("https://x.com/vaultoAI/?ref=share")).toBe("@vaultoAI");
  });
});
