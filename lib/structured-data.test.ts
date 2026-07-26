import { describe, expect, it } from "vitest";
import { SOCIAL_URLS } from "@/lib/external-urls";
import {
  SITE_LOGO,
  SITE_NAME,
  SITE_URL,
  buildSiteJsonLd,
} from "@/lib/structured-data";

describe("buildSiteJsonLd", () => {
  const [organization, website] = buildSiteJsonLd();

  it("emits an Organization and a WebSite node", () => {
    expect(buildSiteJsonLd()).toHaveLength(2);
    expect(organization["@type"]).toBe("Organization");
    expect(website["@type"]).toBe("WebSite");
  });

  it("uses the schema.org context on every node", () => {
    for (const node of buildSiteJsonLd()) {
      expect(node["@context"]).toBe("https://schema.org");
    }
  });

  it("carries the expected Organization identity fields", () => {
    expect(organization.name).toBe(SITE_NAME);
    expect(organization.url).toBe(SITE_URL);
    expect(SITE_URL).toBe("https://vaulto.fi");
    expect(organization.logo).toBe(SITE_LOGO);
    expect(organization.logo).toMatch(/^https:\/\/vaulto\.fi\/.+\.png$/);
  });

  it("lists every controlled social profile in sameAs", () => {
    expect(organization.sameAs).toEqual(
      expect.arrayContaining([
        SOCIAL_URLS.x,
        SOCIAL_URLS.linkedin,
        SOCIAL_URLS.instagram,
        SOCIAL_URLS.youtube,
        SOCIAL_URLS.github,
      ]),
    );
    // No duplicates.
    expect(new Set(organization.sameAs).size).toBe(organization.sameAs.length);
  });

  it("points the WebSite at the canonical site url", () => {
    expect(website.name).toBe(SITE_NAME);
    expect(website.url).toBe(SITE_URL);
  });

  it("round-trips through JSON.stringify (valid JSON-LD payload)", () => {
    const json = JSON.stringify(buildSiteJsonLd());
    expect(JSON.parse(json)).toEqual(buildSiteJsonLd());
  });
});
