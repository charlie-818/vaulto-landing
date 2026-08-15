import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { SiteHeader } from "@/components/SiteHeader";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vaulto — Trade Private Companies Before They Go Public",
  description:
    "Access pre-IPO tokens of the world's most valuable private companies. Trade SpaceX, Anthropic, OpenAI, and more.",
  icons: {
    icon: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
  metadataBase: new URL("https://vaulto.fi"),
  openGraph: {
    title: "Vaulto — Trade Private Companies Before They Go Public",
    description:
      "Access pre-IPO tokens of the world's most valuable private companies. Trade SpaceX, Anthropic, OpenAI, and more with real-time pricing powered by prediction markets.",
    url: "https://vaulto.fi",
    siteName: "Vaulto Protocol",
    images: [
      {
        url: "/socialbanner.png",
        width: 1200,
        height: 630,
        alt: "Vaulto — Trade private companies before they go public",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vaulto — Trade Private Companies Before They Go Public",
    description:
      "Access pre-IPO tokens of the world's most valuable private companies. Trade SpaceX, Anthropic, OpenAI, and more with real-time pricing powered by prediction markets.",
    images: ["/socialbanner.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen">
        <SiteHeader />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
