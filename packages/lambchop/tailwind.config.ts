import type { Config } from "tailwindcss";
import lambchopPreset from "./src/tailwind-preset";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}", "./stories/**/*.{ts,tsx}"],
  presets: [lambchopPreset as Config],
  darkMode: "class",
  plugins: [],
};

export default config;
