import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        muted: "var(--muted)",
        border: "var(--border)",
        "card-bg": "var(--card-bg)",
        "card-hover": "var(--card-hover)",
        "badge-bg": "var(--badge-bg)",
        "badge-text": "var(--badge-text)",
        cream: "#FFFFEB",
        charcoal: "#1A1A1A",
        "accent-blue": "var(--accent-blue)",
        "accent-cyan": "var(--accent-cyan)",
      },
      borderRadius: {
        pill: "12px",
      },
      fontFamily: {
        sans: ["var(--font-body)", '"Inter"', "system-ui", "sans-serif"],
        display: ["var(--font-body)", '"Inter"', "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", '"Space Grotesk"', "ui-monospace", "monospace"],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "none",
          },
        },
      },
    },
  },
  plugins: [],
};

export default config;
