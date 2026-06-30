"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

function readCookie(name: string): string | undefined {
  const m = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return m ? decodeURIComponent(m[1]) : undefined;
}

/**
 * Mounts the Crisp support chatbox on every page.
 *
 * The chatbox bundle is deferred (autoload: false) and only loaded on the
 * first user interaction — or after a short idle fallback — so it never
 * competes with first paint / LCP. No-ops when the Website ID is unset, so
 * local dev and CI without the env var don't error.
 */
export function CrispChat() {
  useEffect(() => {
    const websiteId = process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID;
    if (!websiteId) return;

    Crisp.configure(websiteId, { autoload: false, locale: "en" });

    // Attach support context so escalations are actionable in the agent inbox.
    const ref = readCookie("waitlist_ref");
    const country = readCookie("geo-country");
    if (ref || country) {
      Crisp.session.setData({
        ...(ref ? { ref } : {}),
        ...(country ? { country } : {}),
      });
    }

    const events = ["pointerdown", "keydown", "scroll", "touchstart"] as const;
    let loaded = false;
    let timer: ReturnType<typeof setTimeout>;

    const teardown = () => {
      events.forEach((e) => window.removeEventListener(e, load));
      clearTimeout(timer);
    };
    const load = () => {
      if (loaded) return;
      loaded = true;
      teardown();
      Crisp.load();
    };

    events.forEach((e) =>
      window.addEventListener(e, load, { once: true, passive: true }),
    );
    timer = setTimeout(load, 3500);

    return teardown;
  }, []);

  return null;
}
