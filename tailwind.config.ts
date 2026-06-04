import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#060912",
        surface: "#090f1e",
        "surface-raised": "#0e1628",
        "text-primary": "#e2f0ff",
        "text-muted": "#4a7090",
        accent: "#00c8ff",
        "accent-alt": "#a855f7",
        border: "#162035",
        neon: "#00ff88",
        gold: "#c8a94e",
        "warm-dark": "#0c0a08",
      },
      fontFamily: {
        spectral: ["var(--font-spectral)", "Georgia", "serif"],
        urbanist: ["var(--font-urbanist)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["clamp(3rem,8vw,7rem)", { lineHeight: "1.0", letterSpacing: "-0.03em" }],
        "display-lg": ["clamp(2rem,5vw,4.5rem)", { lineHeight: "1.05", letterSpacing: "-0.025em" }],
        "display-md": ["clamp(1.5rem,3.5vw,2.75rem)", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-16px)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(0,200,255,0.2)" },
          "50%": { boxShadow: "0 0 40px rgba(0,200,255,0.5)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
