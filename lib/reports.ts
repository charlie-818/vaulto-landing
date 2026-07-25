import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content", "reports");

export type Report = {
  slug: string;
  title: string;
  description?: string;
  date?: string;
  image?: string;
  body: string;
};

function deriveTitle(slug: string, body: string): string {
  const h1 = body.match(/^#\s+(.+)$/m);
  if (h1) return h1[1].replace(/\s+—.*$/, "").trim();
  return slug;
}

function toReport(fileSlug: string, raw: string): Report {
  const { content, data } = matter(raw);
  return {
    slug: fileSlug,
    title:
      (typeof data.title === "string" && data.title) ||
      deriveTitle(fileSlug, content),
    description:
      typeof data.description === "string" ? data.description : undefined,
    date: typeof data.date === "string" ? data.date : undefined,
    image: typeof data.image === "string" ? data.image : undefined,
    body: content,
  };
}

export function getReportSlugs(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

export function getAllReports(): Report[] {
  return getReportSlugs()
    .map((slug) =>
      toReport(slug, fs.readFileSync(path.join(CONTENT_DIR, `${slug}.md`), "utf8"))
    )
    .sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""));
}

export function getReport(slug: string): Report | null {
  const filename = path.join(CONTENT_DIR, `${slug}.md`);
  if (!fs.existsSync(filename)) return null;
  return toReport(slug, fs.readFileSync(filename, "utf8"));
}
