import { type Config } from "tailwindcss";

export default {
  content: [
    "{routes,islands,components}/**/*.{ts,tsx,js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Outfit", "Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      colors: {
        primary: {
          DEFAULT: "oklch(0.25 0.05 260)",
          light: "oklch(0.35 0.08 260)",
          dark: "oklch(0.15 0.03 260)",
        },
        secondary: {
          DEFAULT: "oklch(0.45 0.1 280)",
          light: "oklch(0.55 0.12 280)",
          dark: "oklch(0.35 0.08 280)",
        },
        accent: {
          DEFAULT: "oklch(0.7 0.15 200)", // Cyan-ish
          violet: "oklch(0.6 0.2 300)", // Violet
          rose: "oklch(0.65 0.18 10)", // Rose
        },
        surface: {
          DEFAULT: "oklch(0.18 0.02 260)",
          glass: "rgba(255, 255, 255, 0.03)",
        },
      },
      backgroundImage: {
        "mesh-gradient":
          "radial-gradient(at 100% 0%, oklch(0.3 0.1 260) 0px, transparent 50%), radial-gradient(at 0% 100%, oklch(0.4 0.15 280) 0px, transparent 50%)",
        "glass-gradient":
          "linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        fadeIn: {
          from: { opacity: "0", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 2s infinite",
        fadeIn: "fadeIn 0.5s ease-out forwards",
      },
    },
  },
  plugins: [
    function (
      { addComponents }: {
        addComponents: (
          components: Record<
            string,
            { [key: string]: string | Record<string, string> }
          >,
        ) => void;
      },
    ) {
      const components = {
        ".glass": {
          "background": "rgba(255, 255, 255, 0.03)",
          "backdrop-filter": "blur(12px)",
          "border": "1px solid rgba(255, 255, 255, 0.05)",
          "box-shadow": "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
        },
        ".btn-primary": {
          "color": "white",
          "padding": "0.75rem 1.5rem",
          "border-radius": "9999px",
          "font-weight": "600",
          "transition": "all 0.3s ease",
          "box-shadow": "0 4px 15px rgba(0, 0, 0, 0.2)",
          "&:hover": {
            "transform": "translateY(-2px)",
            "box-shadow": "0 6px 20px rgba(0, 0, 0, 0.3)",
            "filter": "brightness(1.1)",
          },
        },
      };

      addComponents(components);
    },
  ],
} satisfies Config;
