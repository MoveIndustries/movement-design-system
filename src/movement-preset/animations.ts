import { CssKeyframes, Tokens } from "@pandacss/dev";

export const durations = {
  0: { value: "0s" },
  100: { value: "0.2s" },
  200: { value: "0.4s" },
  300: { value: "0.6s" },
  400: { value: "0.8s" },
  500: { value: "1.0s" },
} satisfies Tokens["durations"];

export const keyframes = {
  scaleIn: {
    "0%": { transform: "scale(0)", opacity: 0 },
    "100%": { transform: "scale(1)", opacity: 1 },
  },
  scaleOut: {
    "0%": { transform: "scale(1)", opacity: 1 },
    "100%": { transform: "scale(0)", opacity: 0 },
  },
  dialogScaleIn: {
    "0%": { transform: "translate(-50%, -50%) scale(0.7)", opacity: 0 },
    "100%": { transform: "translate(-50%, -50%) scale(1)", opacity: 1 },
  },
  dialogScaleOut: {
    "0%": { transform: "translate(-50%, -50%) scale(1)", opacity: 1 },
    "100%": { transform: "translate(-50%, -50%) scale(0.7)", opacity: 0 },
  },
  fadeIn: {
    "0%": { opacity: 0 },
    "100%": { opacity: 1 },
  },
  fadeOut: {
    "0%": { opacity: 1 },
    "100%": { opacity: 0 },
  },
  spin: {
    "0%": { transform: "rotate(0deg)" },
    "100%": { transform: "rotate(360deg)" },
  },
  slideInFromBottom: {
    "0%": { transform: "translateY(150%)" },
    "100%": { transform: "translateY(0%)" },
  },
  slideOutToBottom: {
    "0%": { transform: "translateY(0%)" },
    "100%": { transform: "translateY(150%)" },
  },
  slideInFromTop: {
    "0%": { transform: "translateY(-100%)" },
    "100%": { transform: "translateY(0%)" },
  },
  slideOutToTop: {
    "0%": { transform: "translateY(0%)" },
    "100%": { transform: "translateY(-100%)" },
  },
  slideInFromLeft: {
    "0%": { transform: "translateX(-100%)" },
    "100%": { transform: "translateX(0%)" },
  },
  slideOutToLeft: {
    "0%": { transform: "translateX(0%)" },
    "100%": { transform: "translateX(-100%)" },
  },
  slideInFromRight: {
    "0%": { transform: "translateX(100%)" },
    "100%": { transform: "translateX(0%)" },
  },
  slideOutToRight: {
    "0%": { transform: "translateX(0%)" },
    "100%": { transform: "translateX(100%)" },
  },
  shimmer: {
    "0%": { transform: "translateX(-100%)" },
    "100%": { transform: "translateX(100%)" },
  },
  expandHeight: {
    "0%": { height: "0px" },
    "100%": { height: "var(--height)" },
  },
  collapseHeight: {
    "0%": { height: "var(--height)" },
    "100%": { height: "0px" },
  },
} satisfies CssKeyframes;
