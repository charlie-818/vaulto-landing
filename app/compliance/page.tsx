import Link from "next/link";

export const metadata = {
  title: "Compliance — Vaulto SEC Token Knowledge Base",
  description:
    "Builder-focused reference on SEC token regulation. Project Crypto five-bucket framework, foundational case law, compliance paths, and jurisdictional contrast.",
};

const BUCKETS: Array<{
  title: string;
  slug: string;
  body: string;
  isSecurity: boolean;
  icon: React.ReactNode;
}> = [
  {
    title: "Digital Commodities",
    slug: "commodities",
    body: "Functional, decentralized networks.",
    isSecurity: false,
    icon: <CoinsIcon />,
  },
  {
    title: "Digital Collectibles",
    slug: "collectibles",
    body: "Cultural / use-value tokens.",
    isSecurity: false,
    icon: <SparklesIcon />,
  },
  {
    title: "Digital Tools",
    slug: "tools",
    body: "Membership, ticket, credential, identity.",
    isSecurity: false,
    icon: <WrenchIcon />,
  },
  {
    title: "Digital Securities",
    slug: "securities",
    body: "On-chain financial instruments.",
    isSecurity: true,
    icon: <ColumnsIcon />,
  },
  {
    title: "Stablecoins",
    slug: "stablecoins",
    body: "USD-pegged, fully reserved, no yield.",
    isSecurity: false,
    icon: <DollarIcon />,
  },
];

export default function ComplianceIndexPage() {
  return (
    <div>
      <header className="mb-10">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-blue-500">
          SEC Token Regulation
        </p>
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[var(--foreground)]">
          A builder&apos;s reference for tokenized assets
        </h1>
        <p className="mt-3 text-base sm:text-lg text-[var(--muted)] max-w-2xl">
          Organized around the SEC&apos;s &quot;Project Crypto&quot; five-bucket
          classification framework. Verify every primary source before relying.
          Not legal advice.
        </p>
      </header>

      <section>
        <h2 className="text-xl font-semibold text-[var(--foreground)]">
          The five buckets
        </h2>
        <p className="mt-1 text-sm text-[var(--muted)]">
          Each bucket determines whether a token is a security and which rules apply.
        </p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {BUCKETS.map((b) => (
            <BucketCard key={b.slug} {...b} />
          ))}
        </div>
      </section>
    </div>
  );
}

function BucketCard({
  title,
  slug,
  body,
  isSecurity,
  icon,
}: {
  title: string;
  slug: string;
  body: string;
  isSecurity: boolean;
  icon: React.ReactNode;
}) {
  return (
    <Link
      href={`/compliance/${slug}`}
      className="group flex gap-4 rounded-lg border border-[var(--border)] bg-[var(--card-bg)] p-4 transition-all hover:border-blue-500/40 hover:shadow-sm"
    >
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-md ${
          isSecurity
            ? "bg-amber-500/10 text-amber-500"
            : "bg-blue-500/10 text-blue-500"
        }`}
      >
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold text-[var(--foreground)] group-hover:text-blue-500">
            {title}
          </h3>
          <span
            className={`rounded px-1.5 py-0.5 text-[0.65rem] font-medium uppercase tracking-wide ${
              isSecurity
                ? "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
            }`}
          >
            {isSecurity ? "Security" : "Not a security"}
          </span>
        </div>
        <p className="mt-1 text-sm text-[var(--muted)]">{body}</p>
      </div>
    </Link>
  );
}

const svgProps = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function CoinsIcon() {
  return (
    <svg {...svgProps}>
      <circle cx="8" cy="8" r="6" />
      <path d="M18.09 10.37A6 6 0 1 1 10.34 18" />
      <path d="M7 6h1v4" />
      <path d="m16.71 13.88.7.71-2.82 2.82" />
    </svg>
  );
}

function SparklesIcon() {
  return (
    <svg {...svgProps}>
      <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z" />
      <path d="M19 17l.7 1.8L21.5 19.5l-1.8.7L19 22l-.7-1.8L16.5 19.5l1.8-.7z" />
    </svg>
  );
}

function WrenchIcon() {
  return (
    <svg {...svgProps}>
      <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.5-2.5z" />
    </svg>
  );
}

function ColumnsIcon() {
  return (
    <svg {...svgProps}>
      <path d="M3 21h18" />
      <path d="M3 10h18" />
      <path d="m12 3 9 5H3z" />
      <path d="M6 13v6" />
      <path d="M12 13v6" />
      <path d="M18 13v6" />
    </svg>
  );
}

function DollarIcon() {
  return (
    <svg {...svgProps}>
      <line x1="12" y1="2" x2="12" y2="22" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );
}
