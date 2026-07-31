import { describe, it, expect, vi } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";

// Stub Next.js primitives so the components render in a plain node env.
vi.mock("next/link", () => ({
  default: ({ href, children, ...rest }: any) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}));

vi.mock("next/image", () => ({
  default: ({ alt = "", src }: any) => (
    <img alt={alt} src={typeof src === "string" ? src : ""} />
  ),
}));

// SiteHeader awaits live social counts; keep the test hermetic.
vi.mock("@/lib/social-stats", () => ({
  getSocialCounts: vi.fn(async () => ({})),
  formatCount: (n: number) => String(n),
}));

// LandingFooter's newsletter form pulls in Supabase at import time.
vi.mock("@/lib/newsletter-client", () => ({
  subscribeNewsletter: vi.fn(async () => ({ ok: true })),
}));

import { SiteHeader } from "@/components/SiteHeader";
import { LandingFooter } from "@/components/landing/LandingFooter";

describe("Guides link in the global nav", () => {
  it("SiteHeader renders an anchor to /guides", async () => {
    const html = renderToStaticMarkup(await SiteHeader());
    expect(html).toContain('href="/guides"');
  });

  it("LandingFooter renders an anchor to /guides", () => {
    const html = renderToStaticMarkup(<LandingFooter />);
    expect(html).toContain('href="/guides"');
  });
});
