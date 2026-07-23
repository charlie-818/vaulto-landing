import { CSSProperties, ReactNode } from "react";

type Tone = "cream" | "dark";

/**
 * On tone="dark" we re-point the surface tokens to the charcoal set for the
 * subtree. Because every landing component reads --background/--foreground/
 * --muted/--border/--card-bg, wrapping them here re-themes them for free — no
 * per-component dark styling, and we never touch the .dark class (owned by the
 * app theme and force-removed on the landing).
 */
export const darkVars: CSSProperties = {
  ["--background" as string]: "var(--dark-bg)",
  ["--foreground" as string]: "var(--dark-foreground)",
  ["--muted" as string]: "var(--dark-muted)",
  ["--border" as string]: "var(--dark-border)",
  ["--card-bg" as string]: "var(--dark-card-bg)",
};

export function Section({
  tone = "cream",
  id,
  className = "",
  children,
}: {
  tone?: Tone;
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      style={tone === "dark" ? darkVars : undefined}
      className={`relative overflow-hidden bg-[var(--background)] text-[var(--foreground)] ${className}`}
    >
      {children}
    </section>
  );
}
