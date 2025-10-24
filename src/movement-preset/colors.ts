import { SemanticTokens, Tokens } from "@pandacss/dev";

export const colors = {
  white: { value: "#ffffff" },
  black: { value: "#000000" },
  transparent: { value: "#FFFFFF00" },

  // Brand colors from core.json
  "moveus-marigold": {
    50: { value: "#fffbeb" },
    100: { value: "#fff2bd" },
    200: { value: "#ffea90" },
    300: { value: "#ffe162" },
    400: { value: "#ffd935" },
    500: { value: "#ddba22" },
    600: { value: "#bb9b13" },
    700: { value: "#997e08" },
    800: { value: "#776100" },
    900: { value: "#554500" },
  },
  "guild-green": {
    50: { value: "#f2fff8" },
    100: { value: "#ccffe3" },
    200: { value: "#a7ffce" },
    300: { value: "#81ffba" },
    400: { value: "#6ce2a1" },
    500: { value: "#58c589" },
    600: { value: "#47a872" },
    700: { value: "#368a5c" },
    800: { value: "#286d47" },
    900: { value: "#1b5033" },
  },
  "byzantine-blue": {
    50: { value: "#c2ceff" },
    100: { value: "#859dff" },
    200: { value: "#5c7cff" },
    300: { value: "#335cff" },
    400: { value: "#0337ff" },
    500: { value: "#002cd6" },
    600: { value: "#0024ad" },
    700: { value: "#001b85" },
    800: { value: "#00135c" },
    900: { value: "#000c3d" },
  },
  "protocol-pink": {
    50: { value: "#fff1fc" },
    100: { value: "#ffc9f3" },
    200: { value: "#ffa0eb" },
    300: { value: "#ff77e2" },
    400: { value: "#eb66cf" },
    500: { value: "#ce52b4" },
    600: { value: "#b14199" },
    700: { value: "#94317f" },
    800: { value: "#762365" },
    900: { value: "#59184b" },
  },
  "oracle-orange": {
    50: { value: "#ffefec" },
    100: { value: "#ffcdc2" },
    200: { value: "#ffab97" },
    300: { value: "#ff886d" },
    400: { value: "#FF6642" },
    500: { value: "#ea5330" },
    600: { value: "#c83e1e" },
    700: { value: "#a62c10" },
    800: { value: "#841d05" },
    900: { value: "#621300" },
  },

  // Neutrals with alpha variants
  neutrals: {
    white: { value: "#ffffff" },
    black: { value: "#000000" },
    whiteAlpha: {
      50: { value: "#ffffff0a" },
      100: { value: "#ffffff0f" },
      200: { value: "#ffffff14" },
      300: { value: "#ffffff29" },
      400: { value: "#ffffff3d" },
      500: { value: "#ffffff5c" },
      600: { value: "#ffffff7a" },
      700: { value: "#ffffffa3" },
      800: { value: "#ffffffcc" },
      900: { value: "#ffffffeb" },
    },
    blackAlpha: {
      50: { value: "#0000000a" },
      100: { value: "#0000000f" },
      200: { value: "#00000014" },
      300: { value: "#00000029" },
      400: { value: "#0000003d" },
      500: { value: "#0000005c" },
      600: { value: "#0000007a" },
      700: { value: "#000000a3" },
      800: { value: "#000000cc" },
      900: { value: "#000000eb" },
    },
  },
} satisfies Tokens["colors"];

export const opacity = {
  1: { value: "10%" },
  2: { value: "20%" },
  3: { value: "30%" },
  4: { value: "40%" },
  5: { value: "50%" },
  8: { value: "80%" },
  9: { value: "90%" },
  10: { value: "100%" },
} satisfies Tokens["opacity"];

export const semanticColors = {
  // Semantic colors from semantic_industries.json
  primary: {
    base: { value: "{colors.guild-green.300}" },
    darken: { value: "{colors.guild-green.500}" },
    "darken-2": { value: "{colors.guild-green.600}" },
    lighten: { value: "{colors.guild-green.200}" },
    "lighten-2": { value: "{colors.guild-green.100}" },
  },
  secondary: {
    base: { value: "{colors.byzantine-blue.400}" },
    darken: { value: "{colors.byzantine-blue.500}" },
    "darken-2": { value: "{colors.byzantine-blue.800}" },
    lighten: { value: "{colors.byzantine-blue.300}" },
    "lighten-2": { value: "{colors.byzantine-blue.100}" },
  },
  accent: {
    base: { value: "{colors.protocol-pink.300}" },
    darken: { value: "{colors.protocol-pink.500}" },
    "darken-2": { value: "{colors.protocol-pink.700}" },
    lighten: { value: "{colors.protocol-pink.200}" },
    "lighten-2": { value: "{colors.protocol-pink.100}" },
  },
  // background: {
  //   dark: {
  //     base: { value: "{colors.neutrals.black}" },
  //     lighten: { value: "{colors.neutrals.blackAlpha.900}" },
  //     "lighten-2": { value: "{colors.neutrals.blackAlpha.800}" },
  //     "lighten-3": { value: "{colors.neutrals.blackAlpha.600}" },
  //   },
  //   light: {
  //     base: { value: "{colors.neutrals.white}" },
  //     lighten: { value: "{colors.neutrals.whiteAlpha.200}" },
  //     "lighten-2": { value: "{colors.neutrals.whiteAlpha.300}" },
  //     "lighten-3": { value: "{colors.neutrals.whiteAlpha.400}" },
  //     "lighten-4": { value: "{colors.neutrals.whiteAlpha.600}" },
  //   },
  // },
  // foreground: {
  //   dark: {
  //     base: { value: "{colors.neutrals.white}" },
  //     lighten: { value: "{colors.neutrals.whiteAlpha.700}" },
  //     "lighten-2": { value: "{colors.neutrals.whiteAlpha.600}" },
  //   },
  //   light: {
  //     base: { value: "{colors.neutrals.black}" },
  //     lighten: { value: "{colors.neutrals.blackAlpha.700}" },
  //   },
  // },
  feedback: {
    info: {
      base: { value: "{colors.byzantine-blue.400}" }, // Blue for info
      darken: { value: "{colors.byzantine-blue.600}" },
      lighten: { value: "{colors.byzantine-blue.200}" },
      fg: { value: "{colors.white}" },
    },
    success: {
      base: { value: "{colors.guild-green.400}" }, // Green for success
      darken: { value: "{colors.guild-green.600}" },
      lighten: { value: "{colors.guild-green.200}" },
      fg: { value: "{colors.white}" },
    },
    error: {
      base: { value: "{colors.oracle-orange.400}" }, // Orange/Red for error
      darken: { value: "{colors.oracle-orange.600}" },
      lighten: { value: "{colors.oracle-orange.200}" },
      fg: { value: "{colors.white}" },
    },
    warning: {
      base: { value: "{colors.moveus-marigold.400}" }, // Yellow/Marigold for warning
      darken: { value: "{colors.moveus-marigold.600}" },
      lighten: { value: "{colors.moveus-marigold.200}" },
      fg: { value: "{colors.black}" }, // Dark text on yellow for better contrast
    },
  },
  // text: {
  //   base: { value: "{foreground.dark.base}" },
  //   contrast: { value: "{foreground.light.base}" },
  //   button: { value: "{secondary.darken-2}" },
  // },
  // disabled: {
  //   base: { value: "{colors.neutrals.whiteAlpha.600}" },
  // },
} satisfies SemanticTokens["colors"];
