import Link from "next/link";
import Image from "next/image";
import { LEGACY_SITES, API_URL, SOCIAL_URLS } from "@/lib/external-urls";

type DropdownItem = {
  label: string;
  href: string;
  description?: string;
  external?: boolean;
};

type DropdownGroup = {
  heading: string;
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
        description: "github.com/vaultoai",
        external: true,
      },
    ],
  },
  {
    heading: "SEC compliance",
    items: [
      {
        label: "Knowledge base",
        href: "/compliance",
        description: "Index of all docs",
      },
      {
        label: "Builders quickstart",
        href: "/compliance/00-quickstart-builders",
      },
      {
        label: "Project Crypto overview",
        href: "/compliance/01-project-crypto-overview",
      },
      {
        label: "Howey & Reves foundations",
        href: "/compliance/10-foundations-howey-reves",
      },
      {
        label: "Key enforcement cases",
        href: "/compliance/11-key-enforcement-cases",
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
      {
        label: "YouTube",
        href: SOCIAL_URLS.youtube,
        description: "@vaultoAI",
        external: true,
      },
    ],
  },
];

function ItemLink({ item }: { item: DropdownItem }) {
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

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-[var(--border)] bg-[var(--background)]">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <div className="group relative">
          <Link
            href="/"
            className="flex items-center gap-2"
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
          </Link>
          <div
            className="invisible absolute left-0 top-full z-40 pt-2 opacity-0 transition-opacity duration-150 group-hover:visible group-hover:opacity-100 hidden md:block"
            role="menu"
          >
            <div className="grid w-[min(90vw,720px)] grid-cols-1 gap-4 rounded-lg border border-[var(--border)] bg-[var(--background)] p-4 shadow-lg md:grid-cols-4">
              {GROUPS.map((group) => (
                <div key={group.heading}>
                  <div className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
                    {group.heading}
                  </div>
                  <ul className="flex flex-col">
                    {group.items.map((item) => (
                      <li key={item.href}>
                        <ItemLink item={item} />
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
