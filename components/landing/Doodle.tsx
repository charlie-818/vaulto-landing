/**
 * Small inline-SVG accents — Wispr's playful hand-drawn touches, kept sparse.
 * Rendered with the brand accent gradient (via stroke) so they stay on-palette.
 * Pure markup, no runtime cost. Mark decorative with aria-hidden by default.
 */

type DoodleProps = {
  className?: string;
};

/** A loose underline swoosh to sit under a headline word. */
export function Swoosh({ className = "" }: DoodleProps) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 200 20"
      fill="none"
      className={className}
      preserveAspectRatio="none"
    >
      <path
        d="M4 13C46 4 92 3 196 8"
        stroke="url(#swoosh-grad)"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <defs>
        <linearGradient id="swoosh-grad" x1="0" y1="0" x2="200" y2="0">
          <stop stopColor="var(--accent-blue)" />
          <stop offset="1" stopColor="var(--accent-cyan)" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/** A four-point sparkle for decorating headings. */
export function Sparkle({ className = "" }: DoodleProps) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M12 2c.6 4.7 2.7 6.8 7.4 7.4C14.7 10 12.6 12.1 12 16.8 11.4 12.1 9.3 10 4.6 9.4 9.3 8.8 11.4 6.7 12 2Z"
        fill="url(#sparkle-grad)"
      />
      <defs>
        <linearGradient id="sparkle-grad" x1="4" y1="2" x2="20" y2="17">
          <stop stopColor="var(--accent-blue)" />
          <stop offset="1" stopColor="var(--accent-cyan)" />
        </linearGradient>
      </defs>
    </svg>
  );
}
