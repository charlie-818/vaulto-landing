import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

export function MarkdownRenderer({ children }: { children: string }) {
  return (
    <article className="compliance-prose">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[
          rehypeSlug,
          [
            rehypeAutolinkHeadings,
            { behavior: "wrap", properties: { className: "anchor" } },
          ],
        ]}
      >
        {children}
      </ReactMarkdown>
    </article>
  );
}
