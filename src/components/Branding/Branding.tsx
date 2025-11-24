import React from "react";

// Import all branding assets as URLs
import blackLongSvg from "@/assets/branding/black-long.svg";
import blackShortSvg from "@/assets/branding/black-short.svg";
import blackSvg from "@/assets/branding/black.svg";
import whiteLongSvg from "@/assets/branding/white-long.svg";
import whiteShortSvg from "@/assets/branding/white-short.svg";
import whiteSvg from "@/assets/branding/white.svg";
import colorLongSvg from "@/assets/branding/color-long.svg";
import colorShortSvg from "@/assets/branding/color-short.svg";
import colorSvg from "@/assets/branding/color.svg";
import moveusSvg from "@/assets/branding/moveus.svg";

export type BrandingTheme = "industries" | "labs";
export type BrandingVariant =
  | "lockup-long"
  | "lockup-short"
  | "logomark"
  | "moveus";
export type BrandingColor = "black" | "white" | "color";

export interface BrandingProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {
  /**
   * The branding theme to display
   * @default 'industries'
   */
  theme?: BrandingTheme;

  /**
   * The logo variant to display
   * @default 'logomark'
   */
  variant?: BrandingVariant;

  /**
   * The color version to display
   * @default 'color'
   */
  color?: BrandingColor;

  /**
   * Custom class name
   */
  className?: string;
}

/**
 * Branding component for displaying Movement Labs logos
 */
function Branding({
  theme = "industries",
  variant = "logomark",
  color = "color",
  className,
  alt = "Movement Labs Logo",
  ...props
}: BrandingProps) {
  // Map theme, variant, and color to the appropriate SVG URL
  const logoMap: Record<string, string> = {
    "industries-lockup-long-black": blackLongSvg,
    "industries-lockup-long-white": whiteLongSvg,
    "industries-lockup-long-color": colorLongSvg,
    "industries-lockup-short-black": blackShortSvg,
    "industries-lockup-short-white": whiteShortSvg,
    "industries-lockup-short-color": colorShortSvg,
    "industries-logomark-black": blackSvg,
    "industries-logomark-white": whiteSvg,
    "industries-logomark-color": colorSvg,
    "labs-moveus-color": moveusSvg,
  };

  const key = `${theme}-${variant}-${color}`;
  const logoSrc = logoMap[key];

  if (!logoSrc) {
    console.warn(
      `No logo found for theme="${theme}", variant="${variant}", color="${color}"`,
    );
    return null;
  }

  return <img src={logoSrc} alt={alt} className={className} {...props} />;
}

export { Branding };
