import {
  toChartPoints,
  DEFAULT_CHART_WIDTH,
  DEFAULT_CHART_HEIGHT,
  type IndexHistoryPoint,
} from "@/lib/vaulto-index";

type IndexChartProps = {
  history: IndexHistoryPoint[];
  /** Sign of the trend controls the stroke colour. */
  positive?: boolean;
};

// A dependency-free SVG line chart. Geometry comes from the pure, unit-tested
// toChartPoints() mapping util so the rendering here stays trivial.
export function IndexChart({ history, positive = true }: IndexChartProps) {
  const width = DEFAULT_CHART_WIDTH;
  const height = DEFAULT_CHART_HEIGHT;
  const geo = toChartPoints(history, { width, height });

  if (geo.points.length === 0) {
    return (
      <div
        className="flex h-60 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--card-bg)] text-sm text-[var(--muted)]"
        role="img"
        aria-label="Index history is not available yet"
      >
        History not available yet
      </div>
    );
  }

  const stroke = positive ? "#059669" : "#dc2626";
  // Close an area fill beneath the line for a subtle gradient.
  const first = geo.points[0];
  const last = geo.points[geo.points.length - 1];
  const areaPath = `${geo.path} L ${last.x} ${height} L ${first.x} ${height} Z`;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="h-60 w-full rounded-xl border border-[var(--border)] bg-[var(--card-bg)]"
      preserveAspectRatio="none"
      role="img"
      aria-label={`${INDEX_LABEL} history line chart`}
    >
      <defs>
        <linearGradient id="index-area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={stroke} stopOpacity="0.18" />
          <stop offset="100%" stopColor={stroke} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaPath} fill="url(#index-area)" stroke="none" />
      <path
        d={geo.path}
        fill="none"
        stroke={stroke}
        strokeWidth={2}
        strokeLinejoin="round"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

const INDEX_LABEL = "Vaulto Private 20";
