/* eslint-disable */
export type Token = `colors.${ColorToken}` | `durations.${DurationToken}` | `fonts.${FontToken}` | `fontSizes.${FontSizeToken}` | `fontWeights.${FontWeightToken}` | `lineHeights.${LineHeightToken}` | `radii.${RadiusToken}` | `borderWidths.${BorderWidthToken}` | `sizes.${SizeToken}` | `spacing.${SpacingToken}` | `zIndex.${ZIndexToken}` | `breakpoints.${BreakpointToken}`

export type ColorPalette = "white" | "black" | "transparent" | "moveus-marigold" | "guild-green" | "byzantine-blue" | "protocol-pink" | "oracle-orange" | "neutrals" | "neutrals.whiteAlpha" | "neutrals.blackAlpha" | "primary" | "secondary" | "accent" | "feedback" | "feedback.info" | "feedback.success" | "feedback.error" | "feedback.warning"

export type ColorToken = "white" | "black" | "transparent" | "moveus-marigold.50" | "moveus-marigold.100" | "moveus-marigold.200" | "moveus-marigold.300" | "moveus-marigold.400" | "moveus-marigold.500" | "moveus-marigold.600" | "moveus-marigold.700" | "moveus-marigold.800" | "moveus-marigold.900" | "guild-green.50" | "guild-green.100" | "guild-green.200" | "guild-green.300" | "guild-green.400" | "guild-green.500" | "guild-green.600" | "guild-green.700" | "guild-green.800" | "guild-green.900" | "byzantine-blue.50" | "byzantine-blue.100" | "byzantine-blue.200" | "byzantine-blue.300" | "byzantine-blue.400" | "byzantine-blue.500" | "byzantine-blue.600" | "byzantine-blue.700" | "byzantine-blue.800" | "byzantine-blue.900" | "protocol-pink.50" | "protocol-pink.100" | "protocol-pink.200" | "protocol-pink.300" | "protocol-pink.400" | "protocol-pink.500" | "protocol-pink.600" | "protocol-pink.700" | "protocol-pink.800" | "protocol-pink.900" | "oracle-orange.50" | "oracle-orange.100" | "oracle-orange.200" | "oracle-orange.300" | "oracle-orange.400" | "oracle-orange.500" | "oracle-orange.600" | "oracle-orange.700" | "oracle-orange.800" | "oracle-orange.900" | "neutrals.white" | "neutrals.black" | "neutrals.whiteAlpha.50" | "neutrals.whiteAlpha.100" | "neutrals.whiteAlpha.200" | "neutrals.whiteAlpha.300" | "neutrals.whiteAlpha.400" | "neutrals.whiteAlpha.500" | "neutrals.whiteAlpha.600" | "neutrals.whiteAlpha.700" | "neutrals.whiteAlpha.800" | "neutrals.whiteAlpha.900" | "neutrals.blackAlpha.50" | "neutrals.blackAlpha.100" | "neutrals.blackAlpha.200" | "neutrals.blackAlpha.300" | "neutrals.blackAlpha.400" | "neutrals.blackAlpha.500" | "neutrals.blackAlpha.600" | "neutrals.blackAlpha.700" | "neutrals.blackAlpha.800" | "neutrals.blackAlpha.900" | "primary.base" | "primary.darken" | "primary.darken-2" | "primary.lighten" | "primary.lighten-2" | "secondary.base" | "secondary.darken" | "secondary.darken-2" | "secondary.lighten" | "secondary.lighten-2" | "accent.base" | "accent.darken" | "accent.darken-2" | "accent.lighten" | "accent.lighten-2" | "feedback.info.base" | "feedback.info.darken" | "feedback.info.lighten" | "feedback.info.fg" | "feedback.success.base" | "feedback.success.darken" | "feedback.success.lighten" | "feedback.success.fg" | "feedback.error.base" | "feedback.error.darken" | "feedback.error.lighten" | "feedback.error.fg" | "feedback.warning.base" | "feedback.warning.darken" | "feedback.warning.lighten" | "feedback.warning.fg" | "colorPalette" | "colorPalette.50" | "colorPalette.100" | "colorPalette.200" | "colorPalette.300" | "colorPalette.400" | "colorPalette.500" | "colorPalette.600" | "colorPalette.700" | "colorPalette.800" | "colorPalette.900" | "colorPalette.white" | "colorPalette.black" | "colorPalette.whiteAlpha.50" | "colorPalette.whiteAlpha.100" | "colorPalette.whiteAlpha.200" | "colorPalette.whiteAlpha.300" | "colorPalette.whiteAlpha.400" | "colorPalette.whiteAlpha.500" | "colorPalette.whiteAlpha.600" | "colorPalette.whiteAlpha.700" | "colorPalette.whiteAlpha.800" | "colorPalette.whiteAlpha.900" | "colorPalette.blackAlpha.50" | "colorPalette.blackAlpha.100" | "colorPalette.blackAlpha.200" | "colorPalette.blackAlpha.300" | "colorPalette.blackAlpha.400" | "colorPalette.blackAlpha.500" | "colorPalette.blackAlpha.600" | "colorPalette.blackAlpha.700" | "colorPalette.blackAlpha.800" | "colorPalette.blackAlpha.900" | "colorPalette.base" | "colorPalette.darken" | "colorPalette.darken-2" | "colorPalette.lighten" | "colorPalette.lighten-2" | "colorPalette.info.base" | "colorPalette.info.darken" | "colorPalette.info.lighten" | "colorPalette.info.fg" | "colorPalette.fg" | "colorPalette.success.base" | "colorPalette.success.darken" | "colorPalette.success.lighten" | "colorPalette.success.fg" | "colorPalette.error.base" | "colorPalette.error.darken" | "colorPalette.error.lighten" | "colorPalette.error.fg" | "colorPalette.warning.base" | "colorPalette.warning.darken" | "colorPalette.warning.lighten" | "colorPalette.warning.fg"

export type DurationToken = "0" | "100" | "200" | "300" | "400" | "500"

export type FontToken = "heading" | "body" | "mono"

export type FontSizeToken = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "13" | "14" | "15" | "16" | "17" | "18"

export type FontWeightToken = "hairline" | "thin" | "ultralight" | "light" | "regular" | "medium" | "bold" | "extrabold" | "super" | "black"

export type LineHeightToken = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8"

export type RadiusToken = "sm" | "base" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full" | "primary"

export type BorderWidthToken = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8"

export type SizeToken = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "12" | "14" | "16" | "20" | "24" | "28" | "32" | "36" | "40" | "44" | "48" | "52" | "56" | "60" | "64" | "72" | "80" | "96" | "100" | "px" | "prose" | "full" | "min" | "max" | "fit" | "breakpoint-sm" | "breakpoint-md" | "breakpoint-lg" | "breakpoint-xl"

export type SpacingToken = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "12" | "14" | "16" | "20" | "24" | "28" | "32" | "36" | "40" | "44" | "48" | "52" | "56" | "60" | "64" | "72" | "80" | "96" | "100" | "px" | "-0" | "-1" | "-2" | "-3" | "-4" | "-5" | "-6" | "-7" | "-8" | "-9" | "-10" | "-12" | "-14" | "-16" | "-20" | "-24" | "-28" | "-32" | "-36" | "-40" | "-44" | "-48" | "-52" | "-56" | "-60" | "-64" | "-72" | "-80" | "-96" | "-100" | "-px"

export type ZIndexToken = "hide" | "auto" | "base" | "docked" | "dropdown" | "sticky" | "banner" | "overlay" | "modal" | "popover" | "skipLink" | "toast" | "tooltip"

export type BreakpointToken = "sm" | "md" | "lg" | "xl"

export type Tokens = {
		colors: ColorToken
		durations: DurationToken
		fonts: FontToken
		fontSizes: FontSizeToken
		fontWeights: FontWeightToken
		lineHeights: LineHeightToken
		radii: RadiusToken
		borderWidths: BorderWidthToken
		sizes: SizeToken
		spacing: SpacingToken
		zIndex: ZIndexToken
		breakpoints: BreakpointToken
} & { [token: string]: never }

export type TokenCategory = "aspectRatios" | "zIndex" | "opacity" | "colors" | "fonts" | "fontSizes" | "fontWeights" | "lineHeights" | "letterSpacings" | "sizes" | "cursor" | "shadows" | "spacing" | "radii" | "borders" | "borderWidths" | "durations" | "easings" | "animations" | "blurs" | "gradients" | "breakpoints" | "assets"