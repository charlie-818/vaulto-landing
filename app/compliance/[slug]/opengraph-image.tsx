import { ImageResponse } from "next/og";
import { getComplianceDoc, getComplianceSlugs } from "@/lib/compliance";

// Node runtime: getComplianceDoc reads markdown from the filesystem.
export const runtime = "nodejs";

export const alt = "Vaulto Compliance";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getComplianceSlugs().map((slug) => ({ slug }));
}

// Brand tokens mirror app/globals.css :root.
const FOREGROUND = "#0a0a0a";
const MUTED = "#737373";
const BORDER = "rgba(0, 0, 0, 0.08)";
const ACCENT = "rgb(59, 130, 246)";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = getComplianceDoc(slug);
  const title = doc?.title ?? "Compliance";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#ffffff",
          padding: "80px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              width: 20,
              height: 20,
              borderRadius: 6,
              background: ACCENT,
              marginRight: 18,
            }}
          />
          <div
            style={{
              fontSize: 30,
              fontWeight: 600,
              letterSpacing: "-0.01em",
              color: FOREGROUND,
            }}
          >
            Vaulto Compliance
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 72,
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            color: FOREGROUND,
          }}
        >
          {title}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: `1px solid ${BORDER}`,
            paddingTop: 32,
            fontSize: 26,
            color: MUTED,
          }}
        >
          <div style={{ display: "flex" }}>Crypto securities knowledge base</div>
          <div style={{ display: "flex" }}>vaulto.fi</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
