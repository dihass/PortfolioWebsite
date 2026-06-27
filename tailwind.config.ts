import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        cream:            "#F6F0E4",
        surface:          "#EAE0C8",
        "surface-raised": "#E2D5BA",
        "text-primary":   "#1c1714",
        "text-body":      "#4a4238",
        "text-muted":     "#7a6f68",
        border:           "#ddd0c0",
        mint:             "#9fead3",
        "mint-dark":      "#0d7f60",
        sunshine:         "#f9c840",
        "sunshine-dark":  "#7a4800",
        coral:            "#ffd0bc",
        "hot-pink":       "#e30057",
        "electric-blue":  "#2540ff",
        lavender:         "#dce4ff",
        "lavender-dark":  "#3440c0",
      },
      fontFamily: {
        fraunces:   ["var(--font-fraunces)", "Georgia", "serif"],
        jakarta:    ["var(--font-jakarta)", "system-ui", "sans-serif"],
        silkscreen: ["var(--font-silkscreen)", "monospace"],
      },
      fontSize: {
        "display-xl": ["clamp(3rem,8vw,7rem)",         { lineHeight: "1.0",  letterSpacing: "-0.025em" }],
        "display-lg": ["clamp(2rem,5vw,4.5rem)",        { lineHeight: "1.05", letterSpacing: "-0.02em"  }],
        "display-md": ["clamp(1.5rem,3.5vw,2.75rem)",  { lineHeight: "1.12", letterSpacing: "-0.015em" }],
      },
      animation: {
        "ticker-left":  "ticker-left  24s linear infinite",
        "ticker-right": "ticker-right 24s linear infinite",
        "marquee":      "marquee      28s linear infinite",
        "spin-slow":    "spin-slow    14s linear infinite",
        "star-float":   "star-float    3s ease-in-out infinite",
        "float-left":   "float-left   3.5s ease-in-out infinite",
        "float-right":  "float-right  4.2s ease-in-out infinite",
        "pulse-dot":    "pulse-dot     2s ease-in-out infinite",
      },
      keyframes: {
        "ticker-left": {
          from: { transform: "translateX(0)" },
          to:   { transform: "translateX(-50%)" },
        },
        "ticker-right": {
          from: { transform: "translateX(-33.333%)" },
          to:   { transform: "translateX(0)" },
        },
        "marquee": {
          from: { transform: "translateX(0)" },
          to:   { transform: "translateX(-50%)" },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to:   { transform: "rotate(360deg)" },
        },
        "star-float": {
          "0%, 100%": { opacity: "0.8", transform: "translateY(0) scale(1)" },
          "50%":      { opacity: "1",   transform: "translateY(-12px) scale(1.1)" },
        },
        "float-left": {
          "0%, 100%": { transform: "translateY(0px) rotate(-3deg)" },
          "50%":      { transform: "translateY(-8px) rotate(-3deg)" },
        },
        "float-right": {
          "0%, 100%": { transform: "translateY(0px) rotate(4deg)" },
          "50%":      { transform: "translateY(-6px) rotate(4deg)" },
        },
        "pulse-dot": {
          "0%, 100%": { opacity: "1",   boxShadow: "0 0 0 0 rgba(13,127,96,0.4)" },
          "50%":      { opacity: "0.7", boxShadow: "0 0 0 5px rgba(13,127,96,0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
