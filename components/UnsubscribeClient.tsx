"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { API_URL } from "@/lib/external-urls";

type State = "idle" | "loading" | "done" | "error" | "invalid";

export function UnsubscribeClient() {
  const search = useSearchParams();
  const email = search.get("email") || "";
  const token = search.get("token") || "";
  const [state, setState] = useState<State>("idle");

  useEffect(() => {
    document.documentElement.classList.remove("dark");
    if (!email || !token) {
      setState("invalid");
      return;
    }
    setState("loading");
    fetch(`${API_URL}/api/newsletter/unsubscribe`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, token }),
    })
      .then(async (res) => {
        if (res.ok) {
          setState("done");
        } else if (res.status === 403) {
          setState("invalid");
        } else {
          setState("error");
        }
      })
      .catch(() => setState("error"));
  }, [email, token]);

  const heading =
    state === "done"
      ? "You're unsubscribed."
      : state === "invalid"
        ? "This link isn't valid."
        : state === "error"
          ? "Something went wrong."
          : "Unsubscribing…";

  const body =
    state === "done" ? (
      <>
        {email ? <span className="font-medium">{email}</span> : "Your address"} has
        been removed from the Vaulto newsletter. You won&apos;t receive any more of
        these emails.
      </>
    ) : state === "invalid" ? (
      "This unsubscribe link is missing or expired. If you keep receiving emails, reply to one and we'll remove you."
    ) : state === "error" ? (
      "We couldn't process the request. Please try again in a moment, or reply to any newsletter email to be removed."
    ) : (
      "One moment while we remove you from the list."
    );

  return (
    <main className="min-h-screen bg-[var(--background)] py-12 sm:py-16 px-6">
      <div className="mx-auto max-w-xl text-center">
        <Image
          src="/vaulto-logo-light.png"
          alt="Vaulto"
          width={140}
          height={40}
          className="mx-auto mb-8 h-10 w-auto"
        />
        <h1 className="mb-3 text-3xl sm:text-4xl font-semibold tracking-tight text-[var(--foreground)]">
          {heading}
        </h1>
        <p className="mb-10 text-base sm:text-lg text-[var(--muted)]">{body}</p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
        >
          ← Back to home
        </Link>
      </div>
    </main>
  );
}
