import type { Preview } from "@storybook/react-vite";
import { createStorybookTheme } from "./theme";
import "../src/index.css";

const preview: Preview = {
  parameters: {
    options: {
      storySort: {
        order: ["Theme", "Components"],
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
    },

    // Apply the dark theme
    docs: {
      theme: createStorybookTheme(),
      toc: true, // 👈 Enables the table of contents
    },

    // Configure themes addon
    themes: {
      default: "dark",
      list: [{ name: "dark", class: "dark", color: "#1a1a1a" }],
    },
    tags: ["autodocs"],

    // Additional styling for code blocks
    backgrounds: {
      default: "dark",
      values: [
        {
          name: "dark",
          value: "#1a1a1a",
        },
      ],
    },
  },
};

export default preview;
