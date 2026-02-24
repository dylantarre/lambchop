import { addons } from "@storybook/manager-api";
import { create } from "@storybook/theming/create";

const lambchopTheme = create({
  base: "dark",

  // Brand
  brandTitle: "Lambchop",
  brandUrl: "https://lambchop-docs-djy.pages.dev",

  // Colors
  colorPrimary: "#fcd34d",
  colorSecondary: "#fcd34d",

  // UI
  appBg: "#0e0e0e",
  appContentBg: "#141414",
  appPreviewBg: "#0e0e0e",
  appBorderColor: "#262626",
  appBorderRadius: 2,

  // Text
  textColor: "#e6ddd0",
  textMutedColor: "#787878",
  textInverseColor: "#0e0e0e",

  // Toolbar
  barTextColor: "#a8a8a8",
  barSelectedColor: "#fcd34d",
  barHoverColor: "#e6ddd0",
  barBg: "#141414",

  // Form
  inputBg: "#1f1f1f",
  inputBorder: "#262626",
  inputTextColor: "#e6ddd0",
  inputBorderRadius: 2,

  // Typography
  fontBase: '"DM Sans", sans-serif',
  fontCode: '"JetBrains Mono", monospace',
});

addons.setConfig({
  theme: lambchopTheme,
});
