import Link from "next/link";
import Image from "next/image";
import { LEGACY_SITES, API_URL, CAREERS_URL, SOCIAL_URLS, WHITEPAPERS } from "@/lib/external-urls";
import { getSocialCounts, formatCount, type SocialCount } from "@/lib/social-stats";

type DropdownItem = {
  label: string;
  href: string;
  description?: string;
  external?: boolean;
};

type DropdownGroup = {
  heading: string;
  badge?: string;
  items: DropdownItem[];
};

const GROUPS: DropdownGroup[] = [
  {
    heading: "Legacy products",
    items: [
      {
        label: "Vaulto Search",
        href: LEGACY_SITES.search,
        description: "Discover tokenized private companies",
        external: true,
      },
      {
        label: "Vaulto Swap",
        href: LEGACY_SITES.swap,
        description: "Swap pre-IPO tokens",
        external: true,
      },
      {
        label: "Vaulto Ramp",
        href: LEGACY_SITES.ramp,
        description: "On/off-ramp fiat to crypto",
        external: true,
      },
      {
        label: "Vaulto Stake",
        href: LEGACY_SITES.stake,
        description: "Staking platform for tokenized stocks",
        external: true,
      },
    ],
  },
  {
    heading: "Developers",
    items: [
      {
        label: "API",
        href: API_URL,
        description: "Programmatic access",
        external: true,
      },
      {
        label: "GitHub",
        href: SOCIAL_URLS.github,
        description: "Source code & SDKs",
        external: true,
      },
      {
        label: "Prediction Market Whitepaper",
        href: WHITEPAPERS.predictionMarket,
        description: "Technical paper (PDF)",
        external: true,
      },
    ],
  },
  {
    heading: "Resources",
    items: [
      {
        label: "FAQ",
        href: "/faq",
        description: "Common questions about Vaulto",
      },
    ],
  },
  {
    heading: "SEC compliance",
    items: [
      {
        label: "Overview",
        href: "/compliance",
        description: "Index of all docs",
      },
      {
        label: "Project Crypto",
        href: "/compliance/project-crypto",
      },
      {
        label: "Howey & Reves",
        href: "/compliance/howey-reves",
      },
      {
        label: "Enforcement",
        href: "/compliance/enforcement",
      },
    ],
  },
  {
    heading: "Careers",
    badge: "New",
    items: [
      {
        label: "Prompting",
        href: CAREERS_URL,
        description: "Take our prompting assessment",
        external: true,
      },
      {
        label: "Jobs",
        href: SOCIAL_URLS.linkedinJobs,
        description: "Open roles at Vaulto",
        external: true,
      },
    ],
  },
  {
    heading: "Social",
    items: [
      {
        label: "X",
        href: SOCIAL_URLS.x,
        description: "@vaultoAI",
        external: true,
      },
      {
        label: "LinkedIn",
        href: SOCIAL_URLS.linkedin,
        description: "company/vaulto",
        external: true,
      },
      {
        label: "Instagram",
        href: SOCIAL_URLS.instagram,
        description: "@vaulto.fi",
        external: true,
      },
    ],
  },
];

function ItemLink({ item, count }: { item: DropdownItem; count?: SocialCount | null }) {
  const className =
    "block rounded-md px-3 py-2 text-sm text-[var(--foreground)] transition-colors hover:bg-[var(--card-hover)]";
  const content = (
    <>
      <span className="block font-medium">{item.label}</span>
      {item.description && (
        <span className="block text-xs text-[var(--muted)]">
          {item.description}
        </span>
      )}
      {count && (
        <span className="mt-1 inline-block whitespace-nowrap rounded-full bg-[var(--card-hover)] px-1.5 py-0.5 text-[0.65rem] font-semibold tabular-nums text-[var(--muted)]">
          {formatCount(count.count)} {count.unit}
        </span>
      )}
    </>
  );
  if (item.external) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {content}
      </a>
    );
  }
  return (
    <Link href={item.href} className={className}>
      {content}
    </Link>
  );
}

export async function SiteHeader() {
  const counts = await getSocialCounts();
  return (
    <header className="sticky top-0 z-30 border-b border-[var(--border)] bg-[var(--background)]">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <div className="group relative">
          <Link
            href="/"
            className="relative flex items-center"
            aria-haspopup="menu"
          >
            <span className="relative block h-7 w-[104px]">
              <Image
                src="/vaulto-logo-light-v2.png"
                alt="Vaulto"
                fill
                priority
                sizes="104px"
                className="object-contain object-left"
              />
            </span>
            <span
              aria-label="Trademark"
              className="pointer-events-none absolute left-[92px] top-[4px] text-[0.6rem] font-medium leading-none text-[var(--muted)]"
            >
              TM
            </span>
          </Link>
          <div
            className="invisible absolute left-0 top-full z-40 pt-2 opacity-0 transition-opacity duration-150 group-hover:visible group-hover:opacity-100 hidden md:block"
            role="menu"
          >
            <div className="grid w-[min(94vw,1080px)] grid-cols-1 gap-5 rounded-lg border border-[var(--border)] bg-[var(--background)] p-5 shadow-lg md:grid-cols-6">
              {GROUPS.map((group) => (
                <div key={group.heading}>
                  <div className="mb-2 flex items-center gap-2 px-3 text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
                    {group.heading}
                    {group.badge && (
                      <span className="bg-[var(--badge-bg)] px-1.5 py-0.5 text-[0.6rem] font-bold uppercase tracking-wide text-[var(--badge-text)]">
                        {group.badge}
                      </span>
                    )}
                  </div>
                  <ul className="flex flex-col">
                    {group.items.map((item) => (
                      <li key={item.href}>
                        <ItemLink item={item} count={counts[item.href]} />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        <nav className="hidden items-center gap-6 text-sm md:flex">
          <Link
            href="/faq"
            className="text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
          >
            FAQ
          </Link>
          <Link
            href="/compliance"
            className="text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
          >
            Compliance
          </Link>
          <a
            href={API_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
          >
            API
          </a>
        </nav>
      </div>
    </header>
  );
}
