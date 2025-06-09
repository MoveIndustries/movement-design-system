// .storybook/preview.tsx
import type { Preview } from "@storybook/react";
import '../../styled-system/styles.css'; // Path relative to `apps/docs`

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: { matchers: { color: /(background|color)$/i } },
  },
};

export default preview;
