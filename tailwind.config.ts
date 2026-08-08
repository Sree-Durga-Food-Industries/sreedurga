import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#FDF8F3",
        "cream-dark": "#F5EDE4",
        maroon: "#8B1538",
        "maroon-light": "#B91C3C",
        "maroon-dark": "#6B0F2A",
        gold: "#FFD700",
        "gold-dark": "#B8860B",
        brown: "#4A3728",
        "brown-light": "#6B5B4F",
        "brown-dark": "#2C1810",
        border: "#E8DDD4",
      },
      fontFamily: {
        serif: ["Georgia", "Noto Serif Tamil", "serif"],
        sans: ["system-ui", "-apple-system", "sans-serif"],
      },
      boxShadow: {
        card: "0 2px 12px rgba(0,0,0,0.05)",
        "card-hover": "0 8px 30px rgba(0,0,0,0.08)",
        premium: "0 4px 20px rgba(139,21,56,0.15)",
      },
      borderRadius: {
        xl: "16px",
        "2xl": "20px",
      },
    },
  },
  plugins: [],
};

export default config;
