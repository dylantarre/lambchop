import type { Config } from "tailwindcss";
import lambchopPreset from "../../packages/lambchop/src/tailwind-preset";

const config: Config = {
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}",
    "../../packages/lambchop/src/**/*.{ts,tsx}",
  ],
  presets: [lambchopPreset as Config],
  darkMode: "class",
  plugins: [require("@tailwindcss/typography")],
};

export default config;
