import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream:            "#f9f5ef",
        surface:          "#f0e9de",
        "surface-raised": "#e8ddd0",
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
        fraunces:  ["var(--font-fraunces)", "Georgia", "serif"],
        jakarta:   ["var(--font-jakarta)", "system-ui", "sans-serif"],
        silkscreen: ["var(--font-silkscreen)", "monospace"],
      },
      fontSize: {
        "display-xl": ["clamp(3rem,8vw,7rem)",    { lineHeight: "1.0",  letterSpacing: "-0.025em" }],
        "display-lg": ["clamp(2rem,5vw,4.5rem)",  { lineHeight: "1.05", letterSpacing: "-0.02em"  }],
        "display-md": ["clamp(1.5rem,3.5vw,2.75rem)", { lineHeight: "1.12", letterSpacing: "-0.015em" }],
      },
      animation: {
        "marquee": "marquee 28s linear infinite",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to:   { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
