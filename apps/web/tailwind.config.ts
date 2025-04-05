import { type Config } from "tailwindcss";

export default {
  content: [
    "{routes,islands,components}/**/*.{ts,tsx,js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "oklch(0.22515 0.00493 248.05)",
        secondary: "oklch(0.46 0.0479 236.76)",
        accent: "oklch(77.425% 0.13127 218.05)",
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
        ".subtle-gradient": {
          background:
            "linear-gradient(0deg, oklch(0.35 0.12 248.05 / 0.9),oklch(0.55 0.18 218.05 / 0.4))",
        },
        ".subtle-gradient-reverse": {
          background:
            "linear-gradient(180deg,oklch(0.35 0.12 248.05 / 0.9),oklch(0.55 0.18 218.05 / 0.4))",
        },
      };

      addComponents(components);
    },
  ],
} satisfies Config;
