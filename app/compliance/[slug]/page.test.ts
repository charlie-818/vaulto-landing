import { describe, it, expect } from "vitest";
import { generateMetadata } from "./page";
import { getComplianceSlugs } from "@/lib/compliance";

describe("compliance generateMetadata", () => {
  const slug = "quickstart";

  it("uses a known slug that exists", () => {
    expect(getComplianceSlugs()).toContain(slug);
  });

  it("sets a per-doc canonical for the slug", async () => {
    const meta = await generateMetadata({ params: Promise.resolve({ slug }) });
    expect(meta.alternates?.canonical).toBe(`/compliance/${slug}`);
    expect(String(meta.alternates?.canonical)).toMatch(
      new RegExp(`/compliance/${slug}$`)
    );
  });

  it("sets openGraph title/description without touching the OG image", async () => {
    const meta = await generateMetadata({ params: Promise.resolve({ slug }) });
    expect(meta.openGraph?.title).toBe(meta.title);
    expect(meta.openGraph?.description).toBe(meta.description);
    expect(meta.openGraph).not.toHaveProperty("images");
  });

  it("returns empty metadata for an unknown slug", async () => {
    const meta = await generateMetadata({
      params: Promise.resolve({ slug: "does-not-exist" }),
    });
    expect(meta).toEqual({});
  });
});
