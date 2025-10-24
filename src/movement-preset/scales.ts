import { SemanticTokens, Tokens } from "@pandacss/dev";

// Compute dimension values based on scale system
const baseScale = 2; // dimension.scale = 2px
const xs = baseScale * 2; // 4px
const sm = xs * baseScale; // 8px
const md = sm * baseScale; // 16px
const lg = md * baseScale; // 32px
const xl = lg * baseScale; // 64px

export const spacing = {
  0: { value: "0px" },
  1: { value: `${xs}px` }, // 4px
  2: { value: `${sm}px` }, // 8px
  3: { value: `${xs * 3}px` }, // 12px
  4: { value: `${md}px` }, // 16px
  5: { value: `${xs * 5}px` }, // 20px
  6: { value: `${xs * 6}px` }, // 24px
  7: { value: `${xs * 7}px` }, // 28px
  8: { value: `${lg}px` }, // 32px
  9: { value: `${xs * 9}px` }, // 36px
  10: { value: `${xs * 10}px` }, // 40px
  12: { value: `${xs * 12}px` }, // 48px
  14: { value: `${xs * 14}px` }, // 56px
  16: { value: `${xl}px` }, // 64px
  20: { value: `${xs * 20}px` }, // 80px
  24: { value: `${xs * 24}px` }, // 96px
  28: { value: `${xs * 28}px` }, // 112px
  32: { value: `${xs * 32}px` }, // 128px
  36: { value: `${xs * 36}px` }, // 144px
  40: { value: `${xs * 40}px` }, // 160px
  44: { value: `${xs * 44}px` }, // 176px
  48: { value: `${xs * 48}px` }, // 192px
  52: { value: `${xs * 52}px` }, // 208px
  56: { value: `${xs * 56}px` }, // 224px
  60: { value: `${xs * 60}px` }, // 240px
  64: { value: `${xs * 64}px` }, // 256px
  72: { value: `${xs * 72}px` }, // 288px
  80: { value: `${xs * 80}px` }, // 320px
  96: { value: `${xs * 96}px` }, // 384px
  100: { value: `${xs * 100}px` }, // 400px
  px: { value: "1px" },
} satisfies Tokens["spacing"];

export const sizes = {
  ...spacing,
  prose: { value: "65ch" },
  full: { value: "100%" },
  min: { value: "min-content" },
  max: { value: "max-content" },
  fit: { value: "fit-content" },
} satisfies Tokens["sizes"];

export const radii = {
  sm: { value: "2px" },
  base: { value: "4px" },
  md: { value: "6px" },
  lg: { value: "8px" },
  xl: { value: "12px" },
  "2xl": { value: "16px" },
  "3xl": { value: "24px" },
  full: { value: "9999px" },
} satisfies Tokens["radii"];

export const semanticRadii = {
  primary: { value: "{radii.base}" },
} satisfies SemanticTokens["radii"];

export const borderWidths = {
  0: { value: "0px" },
  1: { value: "1px" },
  2: { value: "2px" },
  3: { value: "3px" },
  4: { value: "4px" },
  5: { value: "5px" },
  6: { value: "6px" },
  7: { value: "7px" },
  8: { value: "8px" },
} satisfies Tokens["borderWidths"];

export const shadows = {
  xs: { value: "0 0 0 1px #0000000d" },
  sm: { value: "0 1px 2px 0 #0000000d" },
  base: { value: "0 1px 2px 0 #0000000d, 0 1px 3px 0 #0000000d" },
  md: { value: "0 2px 4px -1px #00000005, 0 4px 6px -1px #00000014" },
  lg: { value: "0 4px 6px -2px #00000005, 0 10px 15px -3px #0000000d" },
  xl: { value: "0 10px 10px -5px #00000005, 0 20px 25px -5px #0000000d" },
  "2xl": { value: "0 25px 50px -12px #00000040" },
  inner: { value: "inset 0 2px 4px 0 #00000006" },
  none: { value: "none" },
} satisfies Tokens["shadows"];

export const zIndex = {
  hide: { value: -1 },
  auto: { value: "auto" },
  base: { value: 0 },
  docked: { value: 10 },
  dropdown: { value: 1000 },
  sticky: { value: 1100 },
  banner: { value: 1200 },
  overlay: { value: 1300 },
  modal: { value: 1400 },
  popover: { value: 1500 },
  skipLink: { value: 1600 },
  toast: { value: 1700 },
  tooltip: { value: 1800 },
} satisfies Tokens["zIndex"];
