import { addons } from "@storybook/manager-api";
import { createStorybookTheme } from "./theme";

addons.setConfig({
  isFullscreen: false,
  panelPosition: "right",
  showNav: true,
  showPanel: true,
  showToolbar: true,
  sidebar: {
    showRoots: true,
  },
  theme: createStorybookTheme(),
});
