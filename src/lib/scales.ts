/**
 * Theme Scale Tokens
 * These match the CSS custom properties defined in src/theme.css
 */

export const spacing = {
  0: { value: "0px" },
  1: { value: "4px" },
  2: { value: "8px" },
  3: { value: "12px" },
  4: { value: "16px" },
  5: { value: "20px" },
  6: { value: "24px" },
  7: { value: "28px" },
  8: { value: "32px" },
  9: { value: "36px" },
  10: { value: "40px" },
  12: { value: "48px" },
  14: { value: "56px" },
  16: { value: "64px" },
  20: { value: "80px" },
  24: { value: "96px" },
  28: { value: "112px" },
  32: { value: "128px" },
  36: { value: "144px" },
  40: { value: "160px" },
  44: { value: "176px" },
  48: { value: "192px" },
  52: { value: "208px" },
  56: { value: "224px" },
  60: { value: "240px" },
  64: { value: "256px" },
  72: { value: "288px" },
  80: { value: "320px" },
  96: { value: "384px" },
  100: { value: "400px" },
  px: { value: "1px" },
} as const;

export const sizes = {
  ...spacing,
  prose: { value: "65ch" },
  full: { value: "100%" },
  min: { value: "min-content" },
  max: { value: "max-content" },
  fit: { value: "fit-content" },
} as const;

export const radii = {
  sm: { value: "2px" },
  base: { value: "4px" },
  md: { value: "6px" },
  lg: { value: "8px" },
  xl: { value: "12px" },
  "2xl": { value: "16px" },
  "3xl": { value: "24px" },
  full: { value: "9999px" },
} as const;

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
} as const;

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
} as const;

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
} as const;



