import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        bg_dark: "#0C1012",
        primary_dark: "#C4B1C4",
        secondary_dark: "#654953",
        accent_dark: "#BB868C",
      },
      colors: {
        text_white: "#F5F0F5",
        text_black: "#0F0A0F",
        primary_dark: "#C4B1C4",
        secondary_dark: "#654953",
        accent_dark: "#BB868C",
      },
      gridTemplateColumns: {
        "page-sm": "32px 1fr 32px",
        "page-lg": "128px 1fr 128px",
        "page-xl": "192px 1fr 192px",
        "page-2xl": "256px 1fr 256px",
        "icon-middle": "1fr 64px 1fr",
      },
      gridTemplateRows: {
        page: "max-content max-content max-content",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
