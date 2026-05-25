import { Suspense } from "react";
import { UnsubscribeClient } from "@/components/UnsubscribeClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Unsubscribe · Vaulto",
  description: "Unsubscribe from the Vaulto newsletter.",
};

export default function UnsubscribePage() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <UnsubscribeClient />
    </Suspense>
  );
}
