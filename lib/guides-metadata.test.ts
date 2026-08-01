import { describe, it, expect } from "vitest";
import type { ReactElement } from "react";
import { metadata as guidesIndexMetadata } from "../app/guides/page";
import GuideDetailPage, {
  generateMetadata,
} from "../app/guides/[slug]/page";
import { getGuideSlugs, SITE_URL } from "./guides";

/** Depth-first walk of a React element tree collecting every parsed JSON-LD blob. */
function collectJsonLd(node: unknown): Record<string, unknown>[] {
  if (!node || typeof node !== "object") return [];
  const el = node as ReactElement & {
    props?: {
      type?: string;
      dangerouslySetInnerHTML?: { __html?: string };
      children?: unknown;
    };
  };
  const out: Record<string, unknown>[] = [];
  const html = el.props?.dangerouslySetInnerHTML?.__html;
  if (el.props?.type === "application/ld+json" && html) {
    out.push(JSON.parse(html));
  }
  const children = el.props?.children;
  if (Array.isArray(children)) {
    for (const c of children) out.push(...collectJsonLd(c));
  } else if (children) {
    out.push(...collectJsonLd(children));
  }
  return out;
}

describe("/guides index metadata", () => {
  it("declares a social-share image on its openGraph block", () => {
    expect(guidesIndexMetadata.openGraph?.images).toContain("/socialbanner.png");
  });
});

describe("/guides/[slug] metadata", () => {
  it("declares og:image and twitter image for a real guide", async () => {
    const slug = getGuideSlugs()[0];
    expect(slug).toBeTruthy();

    const meta = await generateMetadata({ params: Promise.resolve({ slug }) });

    expect(meta.openGraph?.images).toContain("/socialbanner.png");
    expect(meta.twitter?.images).toContain("/socialbanner.png");
  });

  it("returns empty metadata for an unknown slug", async () => {
    const meta = await generateMetadata({
      params: Promise.resolve({ slug: "not-a-real-guide" }),
    });
    expect(meta).toEqual({});
  });
});

describe("Article structured-data image", () => {
  it("emits Article JSON-LD with an absolute image Google can crawl", async () => {
    const slug = getGuideSlugs()[0];
    const tree = await GuideDetailPage({
      params: Promise.resolve({ slug }),
    });

    const article = collectJsonLd(tree).find((b) => b["@type"] === "Article");
    expect(article).toBeDefined();
    expect(article?.image).toBe(`${SITE_URL}/socialbanner.png`);
  });
});
