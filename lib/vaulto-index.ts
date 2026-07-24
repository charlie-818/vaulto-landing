import { z } from "zod";
import { API_URL } from "@/lib/external-urls";

// The Vaulto Private 20 — an equal-weight index of the 20 tokenized private
// companies traded on Vaulto. This module consumes the public, read-only
// endpoints served by api.vaulto.ai (shipped by the api:vaulto-price-index
// slice) and provides a pure API-response → SVG-chart-points mapping util that
// the /index page renders server-side.

export const INDEX_NAME = "Vaulto Private 20";
export const INDEX_TICKER = "VP20";
export const INDEX_BASE_VALUE = 1000;
export const INDEX_CONSTITUENT_COUNT = 20;

// A market index refreshes far more often than static content, so we revalidate
// every 5 minutes — frequent enough to feel live, cheap enough to stay cached.
export const INDEX_REVALIDATE_SECONDS = 300;

const INDEX_ENDPOINT = `${API_URL}/api/vaulto-index`;
const HISTORY_ENDPOINT = `${API_URL}/api/vaulto-index/history`;

// ---------------------------------------------------------------------------
// API response schemas (defensive — the index API is a separate service).
// ---------------------------------------------------------------------------

const constituentSchema = z.object({
  slug: z.string(),
  name: z.string(),
  // Weight is fractional (0.05 == 5%). Equal-weight, so all ~1/20, but we take
  // whatever the API reports rather than assuming.
  weight: z.number().optional(),
  level: z.number().optional(),
  change24h: z.number().optional(),
});

const indexSchema = z.object({
  level: z.number(),
  change24h: z.number(),
  change7d: z.number(),
  asOf: z.string(),
  base: z.number().optional(),
  constituents: z.array(constituentSchema).default([]),
});

// History points may carry a null value where the series has a gap (e.g. a
// missed sample). The mapping util below breaks the line across those gaps.
const historyPointSchema = z.object({
  t: z.string(),
  v: z.number().nullable(),
});

const historySchema = z.union([
  z.object({ points: z.array(historyPointSchema) }),
  z.array(historyPointSchema),
]);

export type IndexConstituent = z.infer<typeof constituentSchema>;
export type IndexSnapshot = z.infer<typeof indexSchema>;
export type IndexHistoryPoint = z.infer<typeof historyPointSchema>;

// ---------------------------------------------------------------------------
// Pure mapping util: API history response → SVG chart geometry.
// ---------------------------------------------------------------------------

export type ChartPoint = { x: number; y: number };

export type ChartGeometryOptions = {
  width?: number;
  height?: number;
  padding?: number;
};

export type ChartGeometry = {
  /** Finite plotted points, in series order (gaps omitted). */
  points: ChartPoint[];
  /** SVG path `d` — one sub-path per gap-free run of points. */
  path: string;
  /** Value range actually plotted (0/0 when there is nothing to plot). */
  min: number;
  max: number;
};

export const DEFAULT_CHART_WIDTH = 720;
export const DEFAULT_CHART_HEIGHT = 240;
export const DEFAULT_CHART_PADDING = 8;

function round(n: number): number {
  return Math.round(n * 100) / 100;
}

function isFiniteValue(v: number | null | undefined): v is number {
  return typeof v === "number" && Number.isFinite(v);
}

/**
 * Map an index history series onto SVG coordinates.
 *
 * - Empty series (or all-null values) → empty geometry, no path drawn.
 * - Single point → one point, drawn flat at the vertical centre.
 * - Gaps (null values) → the line breaks and resumes, leaving the x-slot empty
 *   so time stays proportional across the full series.
 */
export function toChartPoints(
  history: IndexHistoryPoint[],
  options: ChartGeometryOptions = {},
): ChartGeometry {
  const width = options.width ?? DEFAULT_CHART_WIDTH;
  const height = options.height ?? DEFAULT_CHART_HEIGHT;
  const padding = options.padding ?? DEFAULT_CHART_PADDING;

  const innerWidth = Math.max(0, width - padding * 2);
  const innerHeight = Math.max(0, height - padding * 2);

  const values = history
    .map((p) => p?.v)
    .filter(isFiniteValue);

  if (values.length === 0) {
    return { points: [], path: "", min: 0, max: 0 };
  }

  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min;

  const n = history.length;
  const xFor = (index: number): number =>
    n <= 1 ? padding + innerWidth / 2 : padding + (index / (n - 1)) * innerWidth;
  const yFor = (value: number): number =>
    span === 0
      ? padding + innerHeight / 2
      : padding + (1 - (value - min) / span) * innerHeight;

  const points: ChartPoint[] = [];
  const commands: string[] = [];
  let penDown = false;

  history.forEach((point, index) => {
    if (!isFiniteValue(point?.v)) {
      penDown = false; // gap → lift the pen so the next run starts a new sub-path
      return;
    }
    const x = round(xFor(index));
    const y = round(yFor(point.v));
    points.push({ x, y });
    commands.push(`${penDown ? "L" : "M"} ${x} ${y}`);
    penDown = true;
  });

  return { points, path: commands.join(" "), min, max };
}

// ---------------------------------------------------------------------------
// Data fetching (server-side, revalidated).
// ---------------------------------------------------------------------------

/** Current index snapshot, or null if the index API is unavailable. */
export async function getVaultoIndex(): Promise<IndexSnapshot | null> {
  try {
    const res = await fetch(INDEX_ENDPOINT, {
      next: { revalidate: INDEX_REVALIDATE_SECONDS },
    });
    if (!res.ok) return null;
    const parsed = indexSchema.safeParse(await res.json());
    return parsed.success ? parsed.data : null;
  } catch {
    return null;
  }
}

/** Index history series, normalised to points; empty array when unavailable. */
export async function getVaultoIndexHistory(): Promise<IndexHistoryPoint[]> {
  try {
    const res = await fetch(HISTORY_ENDPOINT, {
      next: { revalidate: INDEX_REVALIDATE_SECONDS },
    });
    if (!res.ok) return [];
    const parsed = historySchema.safeParse(await res.json());
    if (!parsed.success) return [];
    return Array.isArray(parsed.data) ? parsed.data : parsed.data.points;
  } catch {
    return [];
  }
}

// ---------------------------------------------------------------------------
// Presentation helpers.
// ---------------------------------------------------------------------------

/** Signed percentage label, e.g. 0.0123 → "+1.23%", -0.03 → "-3.00%". */
export function formatChange(fraction: number): string {
  const pct = fraction * 100;
  const sign = pct > 0 ? "+" : "";
  return `${sign}${pct.toFixed(2)}%`;
}

/** Index level with thousands separators, e.g. 1234.5 → "1,234.50". */
export function formatLevel(level: number): string {
  return level.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

// ---------------------------------------------------------------------------
// Published methodology (equal-weight, base 1000, rebalance rules).
// ---------------------------------------------------------------------------

export const INDEX_METHODOLOGY: { heading: string; body: string }[] = [
  {
    heading: "Equal weight",
    body: `Each of the ${INDEX_CONSTITUENT_COUNT} constituent companies carries an identical target weight of 1/${INDEX_CONSTITUENT_COUNT} (5%) of the index. Equal weighting keeps the index broadly representative of the private-company set rather than dominated by the largest names.`,
  },
  {
    heading: "Base value",
    body: `The index is set to a base value of ${INDEX_BASE_VALUE} at inception. Every subsequent level is expressed relative to that base, so a level of ${INDEX_BASE_VALUE * 1.1} means the equal-weight basket has appreciated 10% since launch.`,
  },
  {
    heading: "Rebalancing",
    body: "The index rebalances back to equal weight on a fixed monthly schedule (the first trading day of each month) and on any constituent change. Between rebalances, weights drift with each company's price. Additions or removals — for example when a company IPOs and leaves the private set — take effect at the next scheduled rebalance.",
  },
  {
    heading: "Pricing source",
    body: "Constituent levels are taken from the on-chain Vaulto markets for each tokenized company. The index and its history are published through the public Vaulto data API.",
  },
];

/** schema.org Dataset JSON-LD describing the index for search engines. */
export function buildIndexJsonLd(snapshot: IndexSnapshot | null) {
  return {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: `${INDEX_NAME} (${INDEX_TICKER})`,
    description: `An equal-weight index of ${INDEX_CONSTITUENT_COUNT} tokenized private companies traded on Vaulto, base value ${INDEX_BASE_VALUE}.`,
    url: "https://vaulto.fi/index",
    creator: { "@type": "Organization", name: "Vaulto" },
    ...(snapshot
      ? {
          dateModified: snapshot.asOf,
          variableMeasured: {
            "@type": "PropertyValue",
            name: "Index level",
            value: snapshot.level,
          },
        }
      : {}),
  };
}
