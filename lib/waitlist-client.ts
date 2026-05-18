import { PLATFORM_API_URL } from "./config";

export type WaitlistSignupResponse = {
  ok: boolean;
  createdAt?: string;
  message?: string;
  error?: string;
};

export async function signupEmail(
  email: string,
  firstName: string
): Promise<WaitlistSignupResponse> {
  try {
    const res = await fetch(`${PLATFORM_API_URL}/api/waitlist/email-signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, firstName }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      return {
        ok: false,
        message: data.message || data.error || "Sign-up failed.",
      };
    }
    return { ok: true, createdAt: data.createdAt };
  } catch {
    return { ok: false, message: "Network error. Please try again." };
  }
}

export type LeaderboardEntry = {
  rank: number;
  firstName: string;
  bonusPoints: number;
};

export async function fetchLeaderboard(): Promise<LeaderboardEntry[]> {
  try {
    const res = await fetch(
      `${PLATFORM_API_URL}/api/waitlist/public-leaderboard`,
      { credentials: "include" }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : data.entries || [];
  } catch {
    return [];
  }
}
