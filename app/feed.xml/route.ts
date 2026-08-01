import { getFeedItems, renderRssFeed } from "@/lib/feed";

// Served at /feed.xml as an RSS 2.0 document over the guides and compliance
// docs. Static because the underlying markdown is bundled at build time.
export const dynamic = "force-static";

export function GET() {
  const xml = renderRssFeed(getFeedItems());
  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
