import { describe, it, expect } from "vitest";
import { GET } from "../app/feed.xml/route";
import { getFeedItems, renderRssFeed, type FeedItem } from "./feed";
import { getAllGuides, SITE_URL } from "./guides";

describe("renderRssFeed", () => {
  const items: FeedItem[] = [
    {
      link: "https://vaulto.fi/guides/how-to-buy-spacex-stock-pre-ipo",
      title: "How to Buy SpaceX Stock",
      description: "A practical guide.",
      date: "2026-01-15",
    },
  ];

  it("emits a well-formed RSS 2.0 document", () => {
    const xml = renderRssFeed(items);
    expect(xml.startsWith('<?xml version="1.0" encoding="UTF-8"?>')).toBe(true);
    expect(xml).toContain('<rss version="2.0">');
    expect(xml).toContain("<channel>");
    expect(xml).toContain("</channel>");
    expect(xml).toContain("</rss>");
  });

  it("renders one <item> per feed item with an absolute link", () => {
    const xml = renderRssFeed(items);
    expect(xml).toContain("<item>");
    expect(xml).toContain(
      "<link>https://vaulto.fi/guides/how-to-buy-spacex-stock-pre-ipo</link>"
    );
    expect(xml).toContain("<title>How to Buy SpaceX Stock</title>");
    expect(xml).toContain("<pubDate>Thu, 15 Jan 2026 00:00:00 GMT</pubDate>");
  });

  it("escapes XML-significant characters", () => {
    const xml = renderRssFeed([
      { link: "https://vaulto.fi/x", title: "A & B <c>", description: "\"q\"", date: "2026-01-01" },
    ]);
    expect(xml).toContain("<title>A &amp; B &lt;c&gt;</title>");
    expect(xml).not.toContain("<title>A & B <c></title>");
  });
});

describe("getFeedItems", () => {
  it("includes every guide with an absolute link", () => {
    const items = getFeedItems();
    const guideLinks = new Set(items.map((i) => i.link));
    for (const guide of getAllGuides()) {
      expect(guideLinks.has(`${SITE_URL}/guides/${guide.slug}`)).toBe(true);
    }
  });

  it("uses only absolute https links", () => {
    for (const item of getFeedItems()) {
      expect(item.link.startsWith("https://")).toBe(true);
    }
  });
});

describe("GET /feed.xml", () => {
  it("responds with application/xml", async () => {
    const res = GET();
    expect(res.headers.get("Content-Type")).toContain("application/xml");
    expect(res.headers.get("Cache-Control")).toBeTruthy();
  });

  it("returns well-formed XML with an <item> per guide", async () => {
    const res = GET();
    const body = await res.text();
    expect(body.startsWith('<?xml version="1.0"')).toBe(true);
    expect(body).toContain('<rss version="2.0">');
    const itemCount = (body.match(/<item>/g) ?? []).length;
    expect(itemCount).toBeGreaterThanOrEqual(getAllGuides().length);
    for (const guide of getAllGuides()) {
      expect(body).toContain(`${SITE_URL}/guides/${guide.slug}`);
    }
  });
});
