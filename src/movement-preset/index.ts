import { definePreset } from "@pandacss/dev";

import { durations, keyframes } from "./animations";
import { colors, semanticColors } from "./colors";
import { borderWidths, radii, semanticRadii, sizes, spacing, zIndex } from "./scales";
import { fonts, fontSizes, fontWeights, lineHeights, textStyles } from "./text";

export const movementPreset = definePreset({
  name: "movement-preset",
  theme: {
    breakpoints: {
      // xs (default) < 600px
      sm: "37.5rem", // ≥ 600px
      md: "56.25rem", // ≥ 900px
      lg: "75rem", // ≥ 1200px
      xl: "96rem", // ≥ 1536px
    },
    keyframes,
    tokens: {
      colors,
      durations,
      fonts,
      fontSizes,
      fontWeights,
      lineHeights,
      radii,
      borderWidths,
      sizes,
      spacing,
      zIndex,
    },
    semanticTokens: {
      colors: semanticColors,
      radii: semanticRadii,
    },
    textStyles,
  },
});
