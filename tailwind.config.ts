import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        salon: {
          dark: "#12090C",
          card: "#1C0E13",
          surface: "#28141C",
          border: "#421C28",
          red: "#D91B42",
          ruby: "#C01438",
          crimson: "#E63956",
          rose: "#FDA4AF",
          cream: "#FFF5F6",
          muted: "#A88D95",
          gold: "#E0B768"
        }
      },
      fontFamily: {
        serif: ["Playfair Display", "serif"],
        sans: ["Plus Jakarta Sans", "-apple-system", "BlinkMacSystemFont", "sans-serif"]
      }
    },
  },
  plugins: [],
} satisfies Config;
