import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { SiteHeader } from "@/components/SiteHeader";
import "./globals.css";

// Self-hosted via next/font: the font files are emitted under /_next/static/media
// and preloaded from the same origin, so there is no cross-origin CSS -> font
// chain blocking LCP text. Exposed as CSS variables consumed by tailwind.config.ts.
const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-space-grotesk",
});

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
    title: "Vaulto — Trade Faster & Smarter",
    description:
      "Join the waitlist for early access to tokenized private company stocks.",
    url: "https://vaulto.fi",
    siteName: "Vaulto Protocol",
    images: [
      {
        url: "/socialbanner.png",
        width: 1200,
        height: 630,
        alt: "Vaulto - Trade faster & smarter",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vaulto — Trade Faster & Smarter",
    description:
      "Join the waitlist for early access to tokenized private company stocks.",
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
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${spaceGrotesk.variable}`}
    >
      <body className="min-h-screen">
        <SiteHeader />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
