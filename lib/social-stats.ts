import { SOCIAL_URLS } from "@/lib/external-urls";

// Live social counts. Server-only, cached 1h via fetch revalidate.
// Only sources with a free, working endpoint are wired up. Others return
// null and the UI simply hides the number (link stays).
//
// YouTube: mixerno.space public counter (no key). X / Instagram / LinkedIn
// have no free count API as of 2026-05 -> null.

const REVALIDATE_SECONDS = 3600;

// Vaulto YouTube channel id (resolved from @vaultoAI). Override via env.
const YOUTUBE_CHANNEL_ID =
  process.env.YOUTUBE_CHANNEL_ID ?? "UCXJcOmkkNa0GTJBDPb9X7og";

type MixernoStats = {
  counts?: { value: string; count: number }[];
};

// Vaulto Instagram handle (from instagram.com/vaulto.fi). Override via env.
const INSTAGRAM_HANDLE = process.env.INSTAGRAM_HANDLE ?? "vaulto.fi";

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

async function fetchYouTubeSubscribers(): Promise<number | null> {
  try {
    const res = await fetch(
      `https://mixerno.space/api/youtube-channel-counter/user/${YOUTUBE_CHANNEL_ID}`,
      {
        headers: { Accept: "application/json", "User-Agent": "Mozilla/5.0" },
        next: { revalidate: REVALIDATE_SECONDS },
      },
    );
    if (!res.ok) return null;
    const data = (await res.json()) as MixernoStats | null;
    const subs = data?.counts?.find((c) => c.value === "subscribers")?.count;
    return typeof subs === "number" && Number.isFinite(subs) ? subs : null;
  } catch {
    return null;
  }
}

export type SocialCount = { count: number; unit: string };

/**
 * Returns a map of social link href -> live count + unit (or null when
 * unavailable). Keyed by href so callers can match items without extra plumbing.
 */
export async function getSocialCounts(): Promise<
  Record<string, SocialCount | null>
> {
  const [instagram] = await Promise.all([fetchInstagramFollowers()]);
  return {
    [SOCIAL_URLS.instagram]:
      instagram === null ? null : { count: instagram, unit: "followers" },
    // No free count API for X / LinkedIn -> static, update manually.
    [SOCIAL_URLS.x]: { count: 222, unit: "followers" },
    [SOCIAL_URLS.linkedin]: { count: 400, unit: "followers" },
  };
}

/** Compact follower-count format: 5 -> "5", 1234 -> "1.2K", 1_200_000 -> "1.2M". */
export function formatCount(n: number): string {
  if (n < 1000) return String(n);
  if (n < 1_000_000) return `${(n / 1000).toFixed(n < 10_000 ? 1 : 0)}K`;
  return `${(n / 1_000_000).toFixed(1)}M`;
}
