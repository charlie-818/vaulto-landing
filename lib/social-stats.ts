import { SOCIAL_URLS } from "@/lib/external-urls";

// Social follower counts shown in the header dropdown. Server-side, 1h cache.
//
// Instagram has a free unofficial endpoint that works from normal IPs but is
// blocked from Vercel's egress IPs -> we try it live and fall back to a static
// value when it returns nothing. X / LinkedIn have no free count API at all, so
// they're static. Update the static numbers manually as they grow.

const REVALIDATE_SECONDS = 3600;

// Vaulto Instagram handle (from instagram.com/vaulto.fi). Override via env.
const INSTAGRAM_HANDLE = process.env.INSTAGRAM_HANDLE ?? "vaulto.fi";

// Manual fallbacks used when no live value is available.
const STATIC_COUNTS = {
  instagram: 10495,
  x: 222,
  linkedin: 400,
} as const;

type IgProfile = {
  data?: { user?: { edge_followed_by?: { count?: number } } };
};

async function fetchInstagramFollowers(): Promise<number | null> {
  try {
    const res = await fetch(
      `https://www.instagram.com/api/v1/users/web_profile_info/?username=${INSTAGRAM_HANDLE}`,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
          // Public web app id Instagram's own site sends; required by the endpoint.
          "x-ig-app-id": "936619743392459",
          Accept: "*/*",
          Referer: `https://www.instagram.com/${INSTAGRAM_HANDLE}/`,
          "X-Requested-With": "XMLHttpRequest",
          "Sec-Fetch-Site": "same-origin",
          "Sec-Fetch-Mode": "cors",
          "Sec-Fetch-Dest": "empty",
          Origin: "https://www.instagram.com",
        },
        next: { revalidate: REVALIDATE_SECONDS },
      },
    );
    if (!res.ok) return null;
    const data = (await res.json()) as IgProfile;
    const n = data?.data?.user?.edge_followed_by?.count;
    return typeof n === "number" && Number.isFinite(n) ? n : null;
  } catch {
    return null;
  }
}

export type SocialCount = { count: number; unit: string };

/**
 * Returns a map of social link href -> count + unit. Instagram is live with a
 * static fallback; X / LinkedIn are static. Keyed by href so callers match
 * items without extra plumbing.
 */
export async function getSocialCounts(): Promise<
  Record<string, SocialCount>
> {
  const [instagramLive] = await Promise.all([fetchInstagramFollowers()]);
  return {
    [SOCIAL_URLS.instagram]: {
      count: instagramLive ?? STATIC_COUNTS.instagram,
      unit: "followers",
    },
    [SOCIAL_URLS.x]: { count: STATIC_COUNTS.x, unit: "followers" },
    [SOCIAL_URLS.linkedin]: { count: STATIC_COUNTS.linkedin, unit: "followers" },
  };
}

/** Compact follower-count format: 5 -> "5", 1234 -> "1.2K", 1_200_000 -> "1.2M". */
export function formatCount(n: number): string {
  if (n < 1000) return String(n);
  if (n < 1_000_000) return `${(n / 1000).toFixed(n < 10_000 ? 1 : 0)}K`;
  return `${(n / 1_000_000).toFixed(1)}M`;
}
