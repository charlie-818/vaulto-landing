import { getAllGuides, SITE_URL } from "./guides";
import { getAllComplianceDocs } from "./compliance";

/** A single syndicated entry, normalized from a guide or compliance doc. */
export type FeedItem = {
  /** Absolute canonical URL. */
  link: string;
  title: string;
  description: string;
  /** ISO `YYYY-MM-DD` date used for the item's `pubDate`. */
  date: string;
};

/** XML-escape a string for safe inclusion in text nodes and attributes. */
function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/**
 * Render an ISO `YYYY-MM-DD` date as an RFC 822 timestamp for RSS `pubDate`.
 * Falls back to the epoch for unparseable input so the feed stays well-formed.
 */
function toRfc822(date: string): string {
  const parsed = new Date(`${date}T00:00:00Z`);
  const stamp = Number.isNaN(parsed.getTime()) ? new Date(0) : parsed;
  return stamp.toUTCString();
}

/** Collect every guide and compliance doc as normalized feed items. */
export function getFeedItems(): FeedItem[] {
  const guides: FeedItem[] = getAllGuides().map((guide) => ({
    link: `${SITE_URL}/guides/${guide.slug}`,
    title: guide.title,
    description: guide.description,
    date: guide.updated || guide.date,
  }));

  const docs: FeedItem[] = getAllComplianceDocs().map((doc) => ({
    link: `${SITE_URL}/compliance/${doc.slug}`,
    title: doc.title,
    description: doc.description ?? "",
    date: "1970-01-01",
  }));

  return [...guides, ...docs];
}

/** Render feed items as a valid RSS 2.0 document. */
export function renderRssFeed(items: FeedItem[]): string {
  const lastBuildDate = new Date(0).toUTCString();
  const entries = items
    .map((item) =>
      [
        "    <item>",
        `      <title>${escapeXml(item.title)}</title>`,
        `      <link>${escapeXml(item.link)}</link>`,
        `      <guid isPermaLink="true">${escapeXml(item.link)}</guid>`,
        `      <description>${escapeXml(item.description)}</description>`,
        `      <pubDate>${toRfc822(item.date)}</pubDate>`,
        "    </item>",
      ].join("\n")
    )
    .join("\n");

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0">',
    "  <channel>",
    "    <title>Vaulto Guides &amp; Compliance</title>",
    `    <link>${SITE_URL}/guides</link>`,
    "    <description>Guides and regulatory analysis from Vaulto.</description>",
    "    <language>en-us</language>",
    `    <lastBuildDate>${lastBuildDate}</lastBuildDate>`,
    entries,
    "  </channel>",
    "</rss>",
    "",
  ].join("\n");
}
