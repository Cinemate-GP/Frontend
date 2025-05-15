import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
      background: "var(--main-bg)",
      secondaryBg: "var(--secondary-bg)",
      sideNavBg: "var(--side-nav-bg)",

      foreground: "var(--text)",
      textMuted: "var(--text-muted)",

      primary: "var(--primary)",
      primaryHover: "var(--primary-hover)",

      hoverBg: "var(--hover-bg)",
      hoverText: "var(--hover-text)",

      border: "var(--border)",
      overlay: "var(--overlay)",
    },
    },
    keyframes: {
      shimmer: {
        "100%": {
          transform: "translateX(100%)",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
