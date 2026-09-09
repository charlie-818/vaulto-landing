import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { getSocialCounts } from "./social-stats";
import { SOCIAL_URLS } from "./external-urls";

const STATIC_INSTAGRAM = 10495;

function jsonResponse(body: unknown, ok = true): Response {
  return {
    ok,
    json: async () => body,
  } as unknown as Response;
}

describe("getSocialCounts", () => {
  const fetchMock = vi.fn();

  beforeEach(() => {
    vi.stubGlobal("fetch", fetchMock);
  });

  afterEach(() => {
    fetchMock.mockReset();
    vi.unstubAllGlobals();
  });

  it("uses the live Instagram count when the fetch resolves", async () => {
    fetchMock.mockResolvedValue(
      jsonResponse({ data: { user: { edge_followed_by: { count: 1234 } } } }),
    );
    const counts = await getSocialCounts();
    expect(counts[SOCIAL_URLS.instagram]).toEqual({
      count: 1234,
      unit: "followers",
    });
  });

  it("falls back to the static count when the fetch is aborted by timeout", async () => {
    const abortError = new DOMException(
      "The operation was aborted due to timeout",
      "TimeoutError",
    );
    fetchMock.mockRejectedValue(abortError);
    const counts = await getSocialCounts();
    expect(counts[SOCIAL_URLS.instagram]).toEqual({
      count: STATIC_INSTAGRAM,
      unit: "followers",
    });
  });

  it("falls back to the static count on a non-2xx response", async () => {
    fetchMock.mockResolvedValue(jsonResponse({}, false));
    const counts = await getSocialCounts();
    expect(counts[SOCIAL_URLS.instagram].count).toBe(STATIC_INSTAGRAM);
  });

  it("bounds the Instagram request with an AbortSignal", async () => {
    fetchMock.mockResolvedValue(
      jsonResponse({ data: { user: { edge_followed_by: { count: 1 } } } }),
    );
    await getSocialCounts();
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toContain("instagram.com/api/v1/users/web_profile_info/");
    expect(init.signal).toBeInstanceOf(AbortSignal);
  });

  it("keeps X and LinkedIn static regardless of the fetch result", async () => {
    fetchMock.mockRejectedValue(new Error("network down"));
    const counts = await getSocialCounts();
    expect(counts[SOCIAL_URLS.x]).toEqual({ count: 222, unit: "followers" });
    expect(counts[SOCIAL_URLS.linkedin]).toEqual({
      count: 400,
      unit: "followers",
    });
  });
});
