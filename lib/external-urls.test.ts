import { describe, it, expect } from "vitest";
import {
  LEGACY_SITES,
  WHITEPAPERS,
  API_URL,
  CAREERS_URL,
  SOCIAL_URLS,
} from "./external-urls";

const allUrls: string[] = [
  ...Object.values(LEGACY_SITES),
  ...Object.values(WHITEPAPERS),
  API_URL,
  CAREERS_URL,
  ...Object.values(SOCIAL_URLS),
];

describe("external-urls link integrity", () => {
  it.each(allUrls)("%s is a parseable URL", (url) => {
    expect(() => new URL(url)).not.toThrow();
  });

  it.each(allUrls)("%s uses https", (url) => {
    expect(new URL(url).protocol).toBe("https:");
  });

  it.each(allUrls)("%s has no surrounding whitespace", (url) => {
    expect(url).toBe(url.trim());
  });
});

describe("external-urls hosts", () => {
  it("points github at github.com", () => {
    expect(new URL(SOCIAL_URLS.github).host).toBe("github.com");
  });

  it("points x at x.com", () => {
    expect(new URL(SOCIAL_URLS.x).host).toBe("x.com");
  });

  it("points linkedin at linkedin.com", () => {
    expect(new URL(SOCIAL_URLS.linkedin).host).toBe("linkedin.com");
  });

  it("points instagram at instagram.com", () => {
    expect(new URL(SOCIAL_URLS.instagram).host).toBe("instagram.com");
  });

  it("points youtube at youtube.com", () => {
    expect(new URL(SOCIAL_URLS.youtube).host).toBe("youtube.com");
  });

  it("exposes the canonical API URL", () => {
    expect(API_URL).toBe("https://api.vaulto.ai");
  });
});
