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
          dark: "#141218",
          card: "#1E1A24",
          surface: "#262130",
          accent: "#D4AF37",
          gold: "#E0B768",
          rose: "#E5B8A8",
          purple: "#442A5C",
          cream: "#FBF9F5",
          muted: "#9D95A5"
        }
      },
      fontFamily: {
        serif: ["Playfair Display", "serif"],
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "sans-serif"]
      }
    },
  },
  plugins: [],
} satisfies Config;
