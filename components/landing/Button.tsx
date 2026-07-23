"use client";

import { ReactNode } from "react";

type Variant = "primary" | "secondary";
type Size = "md" | "lg";

type Props = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  size?: Size;
  external?: boolean;
  fullWidthMobile?: boolean;
  className?: string;
};

/**
 * Wispr-style outlined pill button. Primary keeps Vaulto's blue→cyan gradient
 * fill (swapped in for Wispr's lavender); both variants carry the signature
 * 2px charcoal outline (which auto-inverts to cream inside a dark <Section>
 * because it reads --foreground). Renders <a> when href is set, else <button>.
 */
const base =
  "group relative inline-flex items-center justify-center gap-2 rounded-pill font-semibold transition-all duration-300";

const sizes: Record<Size, string> = {
  md: "px-6 py-3.5 min-h-[48px] text-sm",
  lg: "px-7 py-4 min-h-[56px] text-base",
};

const variants: Record<Variant, string> = {
  primary:
    "text-white bg-[image:var(--accent-gradient)] shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30 hover:-translate-y-0.5",
  secondary:
    "border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] hover:bg-[var(--card-hover)] hover:border-[var(--foreground)]/20 hover:-translate-y-0.5",
};

export function Button({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  external,
  fullWidthMobile = false,
  className = "",
}: Props) {
  const cls = `${base} ${sizes[size]} ${variants[variant]} ${
    fullWidthMobile ? "w-full sm:w-fit" : "w-fit"
  } ${className}`;

  if (href) {
    return (
      <a
        href={href}
        onClick={onClick}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className={cls}
      >
        {children}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={cls}>
      {children}
    </button>
  );
}
