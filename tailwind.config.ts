import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#7c5cff",
          dark: "#5a3fd6",
          soft: "#efeafe",
          tint: "#f6f3ff",
        },
        cream: "#fdf5ec",
        peach: "#fbe7d8",
        ink: {
          DEFAULT: "#2b2340",
          soft: "#5c5570",
          muted: "#857f95",
        },
        accent: {
          yellow: "#ffce4a",
          green: "#4fbf8b",
          coral: "#ff7a6b",
          sky: "#6fb7e8",
        },
      },
      fontFamily: {
        sans: ["var(--font-poppins)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl2: "22px",
        xl3: "30px",
      },
      boxShadow: {
        soft: "0 18px 45px -22px rgba(60, 40, 120, .35)",
        card: "0 10px 30px -18px rgba(60, 40, 120, .4)",
      },
      keyframes: {
        floaty: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
      },
      animation: {
        floaty: "floaty 5s ease-in-out infinite",
      },
      maxWidth: {
        container: "1180px",
      },
    },
  },
  plugins: [],
};

export default config;
