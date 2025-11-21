/* eslint-disable */
import type { ConditionalValue } from './conditions';
import type { CssProperties } from './system-types';
import type { Tokens } from '../tokens/index';

export interface UtilityValues {
	zIndex: Tokens["zIndex"];
	top: Tokens["spacing"];
	left: Tokens["spacing"];
	inset: "auto" | Tokens["spacing"];
	insetInline: Tokens["spacing"];
	insetBlock: Tokens["spacing"];
	insetBlockEnd: Tokens["spacing"];
	insetBlockStart: Tokens["spacing"];
	insetInlineEnd: Tokens["spacing"];
	insetInlineStart: Tokens["spacing"];
	right: Tokens["spacing"];
	bottom: Tokens["spacing"];
	float: "start" | "end" | CssProperties["float"];
	hideFrom: Tokens["breakpoints"];
	hideBelow: Tokens["breakpoints"];
	flexBasis: Tokens["sizes"] | "1/2" | "1/3" | "2/3" | "1/4" | "2/4" | "3/4" | "1/5" | "2/5" | "3/5" | "4/5" | "1/6" | "2/6" | "3/6" | "4/6" | "5/6" | "1/12" | "2/12" | "3/12" | "4/12" | "5/12" | "6/12" | "7/12" | "8/12" | "9/12" | "10/12" | "11/12" | "full";
	flex: "1" | "auto" | "initial" | "none";
	gridAutoColumns: "min" | "max" | "fr";
	gridAutoRows: "min" | "max" | "fr";
	gap: Tokens["spacing"];
	gridGap: Tokens["spacing"];
	gridRowGap: Tokens["spacing"];
	gridColumnGap: Tokens["spacing"];
	rowGap: Tokens["spacing"];
	columnGap: Tokens["spacing"];
	padding: Tokens["spacing"];
	paddingLeft: Tokens["spacing"];
	paddingRight: Tokens["spacing"];
	paddingTop: Tokens["spacing"];
	paddingBottom: Tokens["spacing"];
	paddingBlock: Tokens["spacing"];
	paddingBlockEnd: Tokens["spacing"];
	paddingBlockStart: Tokens["spacing"];
	paddingInline: Tokens["spacing"];
	paddingInlineEnd: Tokens["spacing"];
	paddingInlineStart: Tokens["spacing"];
	marginLeft: "auto" | Tokens["spacing"];
	marginRight: "auto" | Tokens["spacing"];
	marginTop: "auto" | Tokens["spacing"];
	marginBottom: "auto" | Tokens["spacing"];
	margin: "auto" | Tokens["spacing"];
	marginBlock: "auto" | Tokens["spacing"];
	marginBlockEnd: "auto" | Tokens["spacing"];
	marginBlockStart: "auto" | Tokens["spacing"];
	marginInline: "auto" | Tokens["spacing"];
	marginInlineEnd: "auto" | Tokens["spacing"];
	marginInlineStart: "auto" | Tokens["spacing"];
	spaceX: "auto" | Tokens["spacing"] | CssProperties["marginInlineStart"];
	spaceY: "auto" | Tokens["spacing"] | CssProperties["marginBlockStart"];
	outlineWidth: Tokens["borderWidths"];
	outlineColor: Tokens["colors"];
	outlineOffset: Tokens["spacing"];
	divideX: Tokens["borderWidths"];
	divideY: Tokens["borderWidths"];
	divideColor: Tokens["colors"];
	divideStyle: CssProperties["borderStyle"];
	width: "auto" | Tokens["sizes"] | "1/2" | "1/3" | "2/3" | "1/4" | "2/4" | "3/4" | "1/5" | "2/5" | "3/5" | "4/5" | "1/6" | "2/6" | "3/6" | "4/6" | "5/6" | "1/12" | "2/12" | "3/12" | "4/12" | "5/12" | "6/12" | "7/12" | "8/12" | "9/12" | "10/12" | "11/12" | "screen";
	inlineSize: "auto" | Tokens["sizes"] | "1/2" | "1/3" | "2/3" | "1/4" | "2/4" | "3/4" | "1/5" | "2/5" | "3/5" | "4/5" | "1/6" | "2/6" | "3/6" | "4/6" | "5/6" | "1/12" | "2/12" | "3/12" | "4/12" | "5/12" | "6/12" | "7/12" | "8/12" | "9/12" | "10/12" | "11/12" | "screen";
	minWidth: "auto" | Tokens["sizes"] | "1/2" | "1/3" | "2/3" | "1/4" | "2/4" | "3/4" | "1/5" | "2/5" | "3/5" | "4/5" | "1/6" | "2/6" | "3/6" | "4/6" | "5/6" | "1/12" | "2/12" | "3/12" | "4/12" | "5/12" | "6/12" | "7/12" | "8/12" | "9/12" | "10/12" | "11/12" | "screen";
	minInlineSize: "auto" | Tokens["sizes"] | "1/2" | "1/3" | "2/3" | "1/4" | "2/4" | "3/4" | "1/5" | "2/5" | "3/5" | "4/5" | "1/6" | "2/6" | "3/6" | "4/6" | "5/6" | "1/12" | "2/12" | "3/12" | "4/12" | "5/12" | "6/12" | "7/12" | "8/12" | "9/12" | "10/12" | "11/12" | "screen";
	maxWidth: "auto" | Tokens["sizes"] | "1/2" | "1/3" | "2/3" | "1/4" | "2/4" | "3/4" | "1/5" | "2/5" | "3/5" | "4/5" | "1/6" | "2/6" | "3/6" | "4/6" | "5/6" | "1/12" | "2/12" | "3/12" | "4/12" | "5/12" | "6/12" | "7/12" | "8/12" | "9/12" | "10/12" | "11/12" | "screen";
	maxInlineSize: "auto" | Tokens["sizes"] | "1/2" | "1/3" | "2/3" | "1/4" | "2/4" | "3/4" | "1/5" | "2/5" | "3/5" | "4/5" | "1/6" | "2/6" | "3/6" | "4/6" | "5/6" | "1/12" | "2/12" | "3/12" | "4/12" | "5/12" | "6/12" | "7/12" | "8/12" | "9/12" | "10/12" | "11/12" | "screen";
	height: "auto" | Tokens["sizes"] | "svh" | "lvh" | "dvh" | "screen" | "1/2" | "1/3" | "2/3" | "1/4" | "2/4" | "3/4" | "1/5" | "2/5" | "3/5" | "4/5" | "1/6" | "2/6" | "3/6" | "4/6" | "5/6";
	blockSize: "auto" | Tokens["sizes"] | "svh" | "lvh" | "dvh" | "screen" | "1/2" | "1/3" | "2/3" | "1/4" | "2/4" | "3/4" | "1/5" | "2/5" | "3/5" | "4/5" | "1/6" | "2/6" | "3/6" | "4/6" | "5/6";
	minHeight: "auto" | Tokens["sizes"] | "svh" | "lvh" | "dvh" | "screen" | "1/2" | "1/3" | "2/3" | "1/4" | "2/4" | "3/4" | "1/5" | "2/5" | "3/5" | "4/5" | "1/6" | "2/6" | "3/6" | "4/6" | "5/6";
	minBlockSize: "auto" | Tokens["sizes"] | "svh" | "lvh" | "dvh" | "screen" | "1/2" | "1/3" | "2/3" | "1/4" | "2/4" | "3/4" | "1/5" | "2/5" | "3/5" | "4/5" | "1/6" | "2/6" | "3/6" | "4/6" | "5/6";
	maxHeight: "auto" | Tokens["sizes"] | "svh" | "lvh" | "dvh" | "screen" | "1/2" | "1/3" | "2/3" | "1/4" | "2/4" | "3/4" | "1/5" | "2/5" | "3/5" | "4/5" | "1/6" | "2/6" | "3/6" | "4/6" | "5/6";
	maxBlockSize: "auto" | Tokens["sizes"] | "svh" | "lvh" | "dvh" | "screen" | "1/2" | "1/3" | "2/3" | "1/4" | "2/4" | "3/4" | "1/5" | "2/5" | "3/5" | "4/5" | "1/6" | "2/6" | "3/6" | "4/6" | "5/6";
	color: Tokens["colors"];
	fontFamily: Tokens["fonts"];
	fontSize: Tokens["fontSizes"];
	fontWeight: Tokens["fontWeights"];
	fontSmoothing: "antialiased" | "subpixel-antialiased";
	lineHeight: Tokens["lineHeights"];
	textDecorationColor: Tokens["colors"];
	textEmphasisColor: Tokens["colors"];
	textIndent: Tokens["spacing"];
	textShadowColor: Tokens["colors"];
	textWrap: "wrap" | "balance" | "nowrap";
	truncate: boolean;
	background: Tokens["colors"];
	backgroundColor: Tokens["colors"];
	backgroundGradient: "to-t" | "to-tr" | "to-r" | "to-br" | "to-b" | "to-bl" | "to-l" | "to-tl";
	textGradient: "to-t" | "to-tr" | "to-r" | "to-br" | "to-b" | "to-bl" | "to-l" | "to-tl";
	gradientFrom: Tokens["colors"];
	gradientTo: Tokens["colors"];
	gradientVia: Tokens["colors"];
	borderRadius: Tokens["radii"];
	borderTopLeftRadius: Tokens["radii"];
	borderTopRightRadius: Tokens["radii"];
	borderBottomRightRadius: Tokens["radii"];
	borderBottomLeftRadius: Tokens["radii"];
	borderTopRadius: Tokens["radii"] | CssProperties["borderRadius"];
	borderRightRadius: Tokens["radii"] | CssProperties["borderRadius"];
	borderBottomRadius: Tokens["radii"] | CssProperties["borderRadius"];
	borderLeftRadius: Tokens["radii"] | CssProperties["borderRadius"];
	borderStartStartRadius: Tokens["radii"];
	borderStartEndRadius: Tokens["radii"];
	borderStartRadius: Tokens["radii"] | CssProperties["borderRadius"];
	borderEndStartRadius: Tokens["radii"];
	borderEndEndRadius: Tokens["radii"];
	borderEndRadius: Tokens["radii"] | CssProperties["borderRadius"];
	borderWidth: Tokens["borderWidths"];
	borderTopWidth: Tokens["borderWidths"];
	borderLeftWidth: Tokens["borderWidths"];
	borderRightWidth: Tokens["borderWidths"];
	borderBottomWidth: Tokens["borderWidths"];
	borderBlockStartWidth: Tokens["borderWidths"];
	borderBlockEndWidth: Tokens["borderWidths"];
	borderColor: Tokens["colors"];
	borderInlineWidth: Tokens["borderWidths"];
	borderInlineColor: Tokens["colors"];
	borderBlockWidth: Tokens["borderWidths"];
	borderBlockColor: Tokens["colors"];
	borderLeftColor: Tokens["colors"];
	borderInlineStartWidth: Tokens["borderWidths"];
	borderInlineStartColor: Tokens["colors"];
	borderRightColor: Tokens["colors"];
	borderInlineEndWidth: Tokens["borderWidths"];
	borderInlineEndColor: Tokens["colors"];
	borderTopColor: Tokens["colors"];
	borderBottomColor: Tokens["colors"];
	borderBlockEndColor: Tokens["colors"];
	borderBlockStartColor: Tokens["colors"];
	boxShadowColor: Tokens["colors"];
	filter: "auto";
	backdropFilter: "auto";
	borderSpacing: Tokens["spacing"] | "auto";
	borderSpacingX: Tokens["spacing"];
	borderSpacingY: Tokens["spacing"];
	transitionDelay: Tokens["durations"];
	transitionDuration: Tokens["durations"];
	transition: "all" | "common" | "background" | "colors" | "opacity" | "shadow" | "transform";
	animationName: "scaleIn" | "scaleOut" | "dialogScaleIn" | "dialogScaleOut" | "fadeIn" | "fadeOut" | "spin" | "slideInFromBottom" | "slideOutToBottom" | "slideInFromTop" | "slideOutToTop" | "slideInFromLeft" | "slideOutToLeft" | "slideInFromRight" | "slideOutToRight" | "shimmer" | "expandHeight" | "collapseHeight";
	animationDuration: Tokens["durations"];
	animationDelay: Tokens["durations"];
	rotate: "auto" | "auto-3d" | CssProperties["rotate"];
	rotateX: CssProperties["rotate"];
	rotateY: CssProperties["rotate"];
	rotateZ: CssProperties["rotate"];
	scale: "auto" | CssProperties["scale"];
	translate: "auto" | "auto-3d" | CssProperties["translate"];
	translateX: Tokens["spacing"] | "1/2" | "1/3" | "2/3" | "1/4" | "2/4" | "3/4" | "full" | "-1/2" | "-1/3" | "-2/3" | "-1/4" | "-2/4" | "-3/4" | "-full";
	translateY: Tokens["spacing"] | "1/2" | "1/3" | "2/3" | "1/4" | "2/4" | "3/4" | "full" | "-1/2" | "-1/3" | "-2/3" | "-1/4" | "-2/4" | "-3/4" | "-full";
	translateZ: Tokens["spacing"] | "1/2" | "1/3" | "2/3" | "1/4" | "2/4" | "3/4" | "full" | "-1/2" | "-1/3" | "-2/3" | "-1/4" | "-2/4" | "-3/4" | "-full";
	accentColor: Tokens["colors"];
	caretColor: Tokens["colors"];
	scrollbar: "visible" | "hidden";
	scrollbarColor: Tokens["colors"];
	scrollbarWidth: Tokens["sizes"];
	scrollMargin: Tokens["spacing"];
	scrollMarginLeft: Tokens["spacing"];
	scrollMarginRight: Tokens["spacing"];
	scrollMarginTop: Tokens["spacing"];
	scrollMarginBottom: Tokens["spacing"];
	scrollMarginBlock: Tokens["spacing"];
	scrollMarginBlockEnd: Tokens["spacing"];
	scrollMarginBlockStart: Tokens["spacing"];
	scrollMarginInline: Tokens["spacing"];
	scrollMarginInlineEnd: Tokens["spacing"];
	scrollMarginInlineStart: Tokens["spacing"];
	scrollPadding: Tokens["spacing"];
	scrollPaddingBlock: Tokens["spacing"];
	scrollPaddingBlockStart: Tokens["spacing"];
	scrollPaddingBlockEnd: Tokens["spacing"];
	scrollPaddingInline: Tokens["spacing"];
	scrollPaddingInlineEnd: Tokens["spacing"];
	scrollPaddingInlineStart: Tokens["spacing"];
	scrollPaddingLeft: Tokens["spacing"];
	scrollPaddingRight: Tokens["spacing"];
	scrollPaddingTop: Tokens["spacing"];
	scrollPaddingBottom: Tokens["spacing"];
	scrollSnapType: "none" | "x" | "y" | "both";
	scrollSnapStrictness: "mandatory" | "proximity";
	scrollSnapMargin: Tokens["spacing"];
	scrollSnapMarginTop: Tokens["spacing"];
	scrollSnapMarginBottom: Tokens["spacing"];
	scrollSnapMarginLeft: Tokens["spacing"];
	scrollSnapMarginRight: Tokens["spacing"];
	fill: Tokens["colors"];
	stroke: Tokens["colors"];
	strokeWidth: Tokens["borderWidths"];
	srOnly: boolean;
	debug: boolean;
	containerName: CssProperties["containerName"];
	colorPalette: "white" | "black" | "transparent" | "moveus-marigold" | "guild-green" | "byzantine-blue" | "protocol-pink" | "oracle-orange" | "neutrals" | "neutrals.whiteAlpha" | "neutrals.blackAlpha" | "primary" | "secondary" | "accent" | "feedback" | "feedback.info" | "feedback.success" | "feedback.error" | "feedback.warning";
	textStyle: "heading-large.xs" | "heading-large.sm" | "heading-large.md" | "heading-large.lg" | "heading-large.xl" | "heading-large.2xl" | "heading-large.3xl" | "heading-large.4xl" | "heading-large.5xl" | "heading-small.xs" | "heading-small.sm" | "heading-small.md" | "heading-small.lg" | "heading-small.xl" | "mono-bold.xs" | "mono-bold.sm" | "mono-bold.md" | "mono-bold.lg" | "mono-bold.xl" | "mono-medium.xs" | "mono-medium.sm" | "mono-medium.md" | "mono-medium.lg" | "mono-medium.xl" | "mono-regular.xs" | "mono-regular.sm" | "mono-regular.md" | "mono-regular.lg" | "mono-regular.xl" | "mono-light.xs" | "mono-light.sm" | "mono-light.md" | "mono-light.lg" | "mono-light.xl" | "mono-hairline.xs" | "mono-hairline.sm" | "mono-hairline.md" | "mono-hairline.lg" | "mono-hairline.xl" | "mono-thin.xs" | "mono-thin.sm" | "mono-thin.md" | "mono-thin.lg" | "mono-thin.xl" | "mono-ultralight.xs" | "mono-ultralight.sm" | "mono-ultralight.md" | "mono-ultralight.lg" | "mono-ultralight.xl" | "mono-extrabold.xs" | "mono-extrabold.sm" | "mono-extrabold.md" | "mono-extrabold.lg" | "mono-extrabold.xl" | "mono-super.xs" | "mono-super.sm" | "mono-super.md" | "mono-super.lg" | "mono-super.xl" | "mono-black.xs" | "mono-black.sm" | "mono-black.md" | "mono-black.lg" | "mono-black.xl" | "body-heavy.xs" | "body-heavy.sm" | "body-heavy.md" | "body-heavy.lg" | "body-heavy.xl" | "body-bold.xs" | "body-bold.sm" | "body-bold.md" | "body-bold.lg" | "body-bold.xl" | "body-medium.xs" | "body-medium.sm" | "body-medium.md" | "body-medium.lg" | "body-medium.xl" | "body-light.xs" | "body-light.sm" | "body-light.md" | "body-light.lg" | "body-light.xl" | "body-regular.xs" | "body-regular.sm" | "body-regular.md" | "body-regular.lg" | "body-regular.xl" | "tables-uppercase.xs" | "tables-uppercase.sm" | "tables-uppercase.md" | "tables-uppercase.lg" | "tables-uppercase.xl";
}



type WithColorOpacityModifier<T> = [T] extends [string] ? `${T}/${string}` & { __colorOpacityModifier?: true } : never

type ImportantMark = "!" | "!important"
type WhitespaceImportant = ` ${ImportantMark}`
type Important = ImportantMark | WhitespaceImportant
type WithImportant<T> = [T] extends [string] ? `${T}${Important}` & { __important?: true } : never

/**
 * Only relevant when using `strictTokens` or `strictPropertyValues` in your config.
 * - Allows you to use an escape hatch (e.g. `[123px]`) to use any string as a value.
 * - Allows you to use a color opacity modifier (e.g. `red/300`) with known color values.
 * - Allows you to use an important mark (e.g. `!` or `!important`) in the value.
 *
 * This is useful when you want to use a value that is not defined in the config or want to opt-out of the defaults.
 *
 * @example
 * css({
 *   fontSize: '[123px]', // ⚠️ will not throw even if you haven't defined 123px as a token
 * })
 *
 * @see https://panda-css.com/docs/concepts/writing-styles#stricttokens
 * @see https://panda-css.com/docs/concepts/writing-styles#strictpropertyvalues
 */
export type WithEscapeHatch<T> = T | `[${string}]` | WithColorOpacityModifier<T> | WithImportant<T>

/**
 * Will restrict the value of properties that have predefined values to those values only.
 *
 * @example
 * css({
 *   display: 'abc', // ❌ will throw
 * })
 *
 * @see https://panda-css.com/docs/concepts/writing-styles#strictpropertyvalues
 */
export type OnlyKnown<Key, Value> = Value extends boolean
  ? Value
  : Value extends `${infer _}` ? Value : never