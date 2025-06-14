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
      animation: {
        "fade-in-up": "fadeInUp 0.5s ease-out forwards",
        "pulse-glow": "pulseGlow 2s infinite",
        float: "float 3s ease-in-out infinite",
      },
      boxShadow: {
        modern: "0 10px 30px -10px rgba(0, 0, 0, 0.15)",
        "modern-hover": "0 15px 35px -10px rgba(0, 0, 0, 0.2)",
        "modern-card": "0 8px 20px rgba(0, 0, 0, 0.12)",
      },
      backdropBlur: {
        card: "12px",
      },
    },
    keyframes: {
      shimmer: {
        "100%": {
          transform: "translateX(100%)",
        },
      },
      fadeInUp: {
        "0%": { opacity: "0", transform: "translateY(20px)" },
        "100%": { opacity: "1", transform: "translateY(0)" },
      },
      pulseGlow: {
        "0%, 100%": { opacity: "1" },
        "50%": { opacity: "0.7" },
      },
      float: {
        "0%, 100%": { transform: "translateY(0)" },
        "50%": { transform: "translateY(-5px)" },
      },
    },
  },
  plugins: [],
} satisfies Config;
