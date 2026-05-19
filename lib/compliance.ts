import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content", "sec-research");

export type ComplianceDoc = {
  slug: string;
  title: string;
  order: number;
  description?: string;
  raw: string;
  body: string;
};

const TITLE_OVERRIDES: Record<string, string> = {
  README: "Knowledge Base Index",
  "02-bucket-digital-commodities": "Commodities",
  "03-bucket-digital-collectibles": "Collectibles",
  "04-bucket-digital-tools": "Tools",
  "05-bucket-tokenized-securities": "Securities",
  "06-bucket-stablecoins": "Stablecoins",
};

function deriveTitle(slug: string, body: string): string {
  if (TITLE_OVERRIDES[slug]) return TITLE_OVERRIDES[slug];
  const h1 = body.match(/^#\s+(.+)$/m);
  if (h1) return h1[1].replace(/\s+—.*$/, "").trim();
  return slug;
}

function deriveOrder(slug: string): number {
  const match = slug.match(/^(\d+)/);
  if (match) return parseInt(match[1], 10);
  if (slug === "README") return -1;
  return 9999;
}

/**
 * Rewrite intra-doc markdown links so `[x](02-foo.md)` resolves to
 * `/compliance/02-foo` in the rendered output.
 */
function rewriteInternalLinks(md: string): string {
  return md.replace(
    /\]\(([0-9A-Za-z-]+)\.md(#[^)]*)?\)/g,
    (_match, slug, hash) => {
      if (slug === "README") return `](/compliance${hash ?? ""})`;
      return `](/compliance/${slug}${hash ?? ""})`;
    }
  );
}

let _citationMap: Map<string, string> | null = null;

function getCitationMap(): Map<string, string> {
  if (_citationMap) return _citationMap;
  const map = new Map<string, string>();
  const sourcesPath = path.join(CONTENT_DIR, "99-sources.md");
  if (fs.existsSync(sourcesPath)) {
    const text = fs.readFileSync(sourcesPath, "utf8");
    for (const line of text.split(/\r?\n/)) {
      const keyMatch = line.match(/^\|\s*\[(S\d+)\]\s*\|/);
      if (!keyMatch) continue;
      const urlMatch = line.match(/https?:\/\/[^\s|)]+/);
      if (urlMatch) map.set(keyMatch[1], urlMatch[0]);
    }
  }
  _citationMap = map;
  return map;
}

/**
 * Wrap bare `[S#]` citation tokens with markdown links to the source URL
 * defined in 99-sources.md. Skips tokens already followed by `(`.
 */
function linkCitations(md: string, slug: string): string {
  if (slug === "99-sources") return md;
  const map = getCitationMap();
  return md.replace(/\[(S\d+)\](?!\()/g, (_match, key) => {
    const url = map.get(key) ?? `/compliance/99-sources`;
    return `[[${key}]](${url})`;
  });
}

export function getComplianceSlugs(): string[] {
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""))
    .filter((slug) => slug !== "README");
}

export function getAllComplianceDocs(): ComplianceDoc[] {
  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".md"));
  const docs: ComplianceDoc[] = files.map((f) => {
    const slug = f.replace(/\.md$/, "");
    const raw = fs.readFileSync(path.join(CONTENT_DIR, f), "utf8");
    const { content, data } = matter(raw);
    return {
      slug,
      title:
        (typeof data.title === "string" && data.title) ||
        deriveTitle(slug, content),
      order: deriveOrder(slug),
      description:
        typeof data.description === "string" ? data.description : undefined,
      raw,
      body: linkCitations(rewriteInternalLinks(content), slug),
    };
  });
  return docs.sort((a, b) => a.order - b.order);
}

export function getComplianceDoc(slug: string): ComplianceDoc | null {
  const filename = path.join(CONTENT_DIR, `${slug}.md`);
  if (!fs.existsSync(filename)) return null;
  const raw = fs.readFileSync(filename, "utf8");
  const { content, data } = matter(raw);
  return {
    slug,
    title:
      (typeof data.title === "string" && data.title) ||
      deriveTitle(slug, content),
    order: deriveOrder(slug),
    description:
      typeof data.description === "string" ? data.description : undefined,
    raw,
    body: rewriteInternalLinks(content),
  };
}
