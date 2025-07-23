import { defineConfig } from "@pandacss/dev";
import { movementLabsPreset } from "./src/movement-labs-preset";

export default defineConfig({
  presets:[movementLabsPreset],
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: [
    "./src/**/*.{js,jsx,ts,tsx}", 
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./.storybook/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.stories.{js,jsx,ts,tsx}",
    "./src/**/*.mdx"
  ],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {},
  },

  // The output directory for your css system
  outdir: "styled-system",
});
