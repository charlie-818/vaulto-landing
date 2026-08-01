import type { Metadata } from "next";
import { Suspense } from "react";
import { UnsubscribeClient } from "@/components/UnsubscribeClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Unsubscribe · Vaulto",
  description: "Unsubscribe from the Vaulto newsletter.",
  robots: { index: false, follow: false },
};

export default function UnsubscribePage() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <UnsubscribeClient />
    </Suspense>
  );
}
