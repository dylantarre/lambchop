import type { Preview } from "@storybook/react";
import { withThemeByClassName } from "@storybook/addon-themes";
import "../src/styles.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: { disable: true },
    docs: {
      canvas: {
        sourceState: "shown",
      },
    },
  },
  decorators: [
    withThemeByClassName({
      themes: {
        dark: "dark",
        light: "",
      },
      defaultTheme: "dark",
      parentSelector: "html",
    }),
    (Story, context) => {
      const theme = context.globals.theme || "dark";
      const isDark = theme === "dark";

      return (
        <div
          style={{
            backgroundColor: isDark ? "#0e0e0e" : "#f2ede4",
            color: isDark ? "#e6ddd0" : "#1a1a1a",
            padding: "1rem",
            borderRadius: "2px",
            minHeight: "4rem",
          }}
          className={isDark ? "dark" : ""}
        >
          <Story />
        </div>
      );
    },
  ],
};

export default preview;
