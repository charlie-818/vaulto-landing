import Link from "next/link";
import type { FaqCategory, FaqLink } from "@/lib/faq-data";

// Server Component. Uses native <details>/<summary> so every answer ships in the
// server-rendered HTML even while collapsed — crawlable by AI answering engines,
// keyboard-accessible, and zero client JS.

function AnswerLink({ link }: { link: FaqLink }) {
  const className =
    "text-sm font-medium text-blue-600 underline underline-offset-2 transition-colors hover:text-blue-700";
  if (link.external) {
    return (
      <a href={link.href} target="_blank" rel="noopener noreferrer" className={className}>
        {link.label} ↗
      </a>
    );
  }
  return (
    <Link href={link.href} className={className}>
      {link.label}
    </Link>
  );
}

export function FaqAccordion({ categories }: { categories: FaqCategory[] }) {
  return (
    <div className="flex flex-col gap-14">
      {categories.map((category) => (
        <section key={category.id} id={category.id} className="scroll-mt-24">
          <h2 className="text-2xl font-semibold tracking-tight text-[var(--foreground)]">
            {category.heading}
          </h2>
          {category.description && (
            <p className="mt-1 text-sm text-[var(--muted)]">{category.description}</p>
          )}
          <div className="mt-5 flex flex-col gap-3">
            {category.items.map((item, index) => (
              <details
                key={item.id}
                open={index === 0}
                className="group rounded-lg border border-[var(--border)] bg-[var(--card-bg)] px-5 transition-colors hover:border-blue-500/40"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 [&::-webkit-details-marker]:hidden">
                  <h3
                    id={item.id}
                    className="scroll-mt-24 text-base font-medium text-[var(--foreground)]"
                  >
                    {item.question}
                  </h3>
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 20 20"
                    fill="none"
                    className="h-5 w-5 shrink-0 text-[var(--muted)] transition-transform duration-200 group-open:rotate-180"
                  >
                    <path
                      d="M5 7.5 10 12.5 15 7.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </summary>
                <div className="pb-5 pr-9">
                  <p className="text-sm leading-relaxed text-[var(--muted)]">{item.answer}</p>
                  {item.links && item.links.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1">
                      {item.links.map((link) => (
                        <AnswerLink key={link.href} link={link} />
                      ))}
                    </div>
                  )}
                </div>
              </details>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
