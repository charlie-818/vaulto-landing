"use client";

import { useState } from "react";

import { resolveLogoUrl } from "@/lib/company-logo";

type Props = {
  name: string;
  size?: number;
  className?: string;
};

export function CompanyLogo({ name, size = 32, className = "" }: Props) {
  const [errored, setErrored] = useState(false);
  const logoUrl = resolveLogoUrl(name);

  if (!logoUrl || errored) {
    return (
      <span
        className={`inline-flex items-center justify-center rounded-full bg-[var(--badge-bg)] text-[var(--badge-text)] text-sm font-medium shrink-0 ${className}`}
        style={{ width: size, height: size }}
        aria-hidden
      >
        {name.trim()[0]?.toUpperCase() ?? "?"}
      </span>
    );
  }

  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src={logoUrl}
      alt={`${name} logo`}
      width={size}
      height={size}
      decoding="async"
      loading="lazy"
      className={`rounded-full object-cover shrink-0 ${className}`}
      onError={() => setErrored(true)}
    />
  );
}
