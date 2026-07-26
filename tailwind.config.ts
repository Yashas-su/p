import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#14131B",
        "ink-mid": "#8B899C",
        paper: "#EDEEF0",
        "paper-dim": "#E1E2E6",
        graphite: "#29282F",
        signal: "#FF4E32",
        "signal-dim": "#C93B26",
        pulse: "#00D2B4",
        "pulse-dim": "#00A88F",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
        mono: ["var(--font-mono)"],
      },
      letterSpacing: {
        tightest: "-0.04em",
      },
      maxWidth: {
        content: "1400px",
      },
      transitionTimingFunction: {
        signal: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
