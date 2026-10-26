import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
        notion: {
          bg: "#FAFAF9",
          darkBg: "#0F0F11",
          card: "#FFFFFF",
          darkCard: "#18181B",
          border: "#E7E5E4",
          darkBorder: "#27272A",
          muted: "#78716C",
          darkMuted: "#A1A1AA",
          text: "#1C1917",
          darkText: "#F4F4F5",
        },
      },
    },
  },
  plugins: [],
};

export default config;
