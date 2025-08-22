import type { Meta, StoryObj } from "@storybook/react";
import { css } from "styled-system/css";
import { stack } from "styled-system/patterns";
import { Recursive } from "styled-system/types/composition";

import { colors, semanticColors } from "../colors";

const meta: Meta = {
  title: "Theme/Colors",
};
export default meta;

type Story = StoryObj;

function isLeaf<T>(
  recursiveValue: Recursive<{ value: T }>[string],
): recursiveValue is { value: T } {
  return "value" in recursiveValue;
}

/** Returns a map of color token names to their CSS color values. */
function getColorsMap() {
  const colorsMap: Record<string, string> = {};

  function parseTokens(key: string, recursiveValue: Recursive<{ value: string }>[string]) {
    if (isLeaf<string>(recursiveValue)) {
      colorsMap[key] = recursiveValue.value;
      return;
    }
    for (const [nextKey, nextValue] of Object.entries(recursiveValue)) {
      parseTokens(`${key}.${nextKey}`, nextValue);
    }
  }

  for (const [key, value] of Object.entries(colors)) {
    parseTokens(key, value);
  }

  return colorsMap;
}

const colorsMap = getColorsMap();

type SemanticToken = string | { base: string; _dark: string };

/** Parses color tokens from a string like `"{colors.red.300/50}"` to an object like
 * `{ color: "red.300", opacity: 0.25 }`.
 */
function parseColorToken(token: string) {
  const tokenValue = token.slice(1, -1).replace("colors.", "");
  const [color, opacity] = tokenValue.split("/");
  const parsedOpacity = Number.parseInt(opacity ?? "");
  return { color: color ?? "", opacity: Number.isNaN(parsedOpacity) ? 1 : parsedOpacity / 100 };
}

/** Returns a map of semantic color token names to their CSS color values. */
function getSemanticColorsMap() {
  const semanticColorsMap: Record<
    string,
    { base: { color: string; opacity: number }; dark: { color: string; opacity: number } }
  > = {};

  for (const [key, value] of Object.entries(semanticColors)) {
    parseTokens(key, value);
  }

  function parseTokens(key: string, recursiveValue: Recursive<{ value: SemanticToken }>[string]) {
    if (isLeaf<SemanticToken>(recursiveValue)) {
      if (typeof recursiveValue.value === "string") {
        const colorToken = parseColorToken(recursiveValue.value);
        const semanticColor = semanticColorsMap[colorToken.color];
        const paletteColor = colorsMap[colorToken.color];
        const rawColor = { color: recursiveValue.value, opacity: 1 };

        if (semanticColor) {
          semanticColorsMap[key] = {
            base: {
              color: semanticColor.base.color,
              opacity: colorToken.opacity * semanticColor.base.opacity,
            },
            dark: {
              color: semanticColor.dark.color,
              opacity: colorToken.opacity * semanticColor.dark.opacity,
            },
          };
          return;
        }

        if (paletteColor) {
          semanticColorsMap[key] = {
            base: { color: paletteColor, opacity: colorToken.opacity },
            dark: { color: paletteColor, opacity: colorToken.opacity },
          };
          return;
        }

        semanticColorsMap[key] = { base: rawColor, dark: rawColor };
        return;
      } else {
        const baseColorToken = parseColorToken(recursiveValue.value.base);
        const darkColorToken = parseColorToken(recursiveValue.value._dark);

        const baseSemanticColor = semanticColorsMap[baseColorToken.color];
        const darkSemanticColor = semanticColorsMap[darkColorToken.color];

        const basePaletteColor = colorsMap[baseColorToken.color];
        const darkPaletteColor = colorsMap[darkColorToken.color];

        const rawBaseColor = { color: recursiveValue.value.base, opacity: 1 };
        const rawDarkColor = { color: recursiveValue.value._dark, opacity: 1 };

        let baseResolvedColor: { color: string; opacity: number } | null = null;
        let darkResolvedColor: { color: string; opacity: number } | null = null;

        if (baseSemanticColor) {
          baseResolvedColor = {
            color: baseSemanticColor.base.color,
            opacity: baseSemanticColor.base.opacity,
          };
        }

        if (darkSemanticColor) {
          darkResolvedColor = {
            color: darkSemanticColor.dark.color,
            opacity: darkSemanticColor.dark.opacity,
          };
        }

        if (basePaletteColor) {
          baseResolvedColor = { color: basePaletteColor, opacity: baseColorToken.opacity };
        }

        if (darkPaletteColor) {
          darkResolvedColor = { color: darkPaletteColor, opacity: darkColorToken.opacity };
        }

        semanticColorsMap[key] = {
          base: baseResolvedColor ?? rawBaseColor,
          dark: darkResolvedColor ?? rawDarkColor,
        };
        return;
      }
    }

    for (const [nextKey, nextValue] of Object.entries(recursiveValue)) {
      const resolvedNextKey = nextKey === "DEFAULT" ? key : `${key}.${nextKey}`;
      parseTokens(resolvedNextKey, nextValue);
    }
  }

  return semanticColorsMap;
}

const semanticColorsMap = getSemanticColorsMap();

function groupByTopLevel<T>(record: Record<string, T>): Record<string, Array<[string, T]>> {
  const groupedEntries: Record<string, Array<[string, T]>> = {};
  console.log(record);
  for (const [key, value] of Object.entries(record)) {
    const [topLevel] = key.split(".");
    if (!topLevel) continue;
    let group = groupedEntries[topLevel];

    if (group) group.push([key, value]);
    else group = [[key, value]];

    groupedEntries[topLevel] = group;
  }

  return groupedEntries;
}

function poolSingleElementGroups<T>(
  groups: Record<string, Array<[string, T]>>,
): Record<string, Array<[string, T]>> {
  const newGroups: Record<string, Array<[string, T]>> = { general: [] };

  for (const [key, value] of Object.entries(groups)) {
    if (value.length === 1 && "general" in newGroups) {
      newGroups.general = newGroups.general.concat(value);
    } else {
      newGroups[key] = value;
    }
  }

  return newGroups;
}

/** These tokens each reference a single color. Most of the semantic color tokens are derived from these tokens. */
export const ColorPalette: Story = {
  render: () => {
    const groupedColors = poolSingleElementGroups(groupByTopLevel(colorsMap));

    return (
      <div className={stack({ gap: "12", px: "3", py: "6" })}>
        {Object.entries(groupedColors).map(([groupName, colors]) => (
          <div key={groupName} className={stack({ gap: "6" })}>
            <h2
              className={css({
                textStyle: "heading.md",
                textTransform: "uppercase",
              })}
            >
              {groupName}
            </h2>
            <div className={css({
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "24px"
            })}>
              {colors.map(([tokenName, color]) => (
                <div key={tokenName} className={css({
                  display: "flex",
                  gap: "16px",
                  alignItems: "center"
                })}>
                  <div
                    style={{ backgroundColor: color }}
                    className={css({
                      h: "48px",
                      w: "48px",
                      rounded: "primary",
                      flexShrink: 0
                    })}
                  />
                  <div className={css({
                    display: "flex",
                    flexDirection: "column",
                    gap: "4px"
                  })}>
                    <p className={css({ 
                      textStyle: "label.md",
                    })}>{tokenName}</p>
                    <p className={css({
                      textStyle: "label.sm",
                      color:"neutrals.whiteAlpha.600"
                    })}>{color}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  },
};

type Context = Parameters<Exclude<Story["render"], undefined>>[1] & {
  currentTheme: "light" | "dark";
};

/**
 * These tokens are named based on how they are used in the system. Most of these semantic tokens
 * reference a different color depending on whether light or dark mode is active. Try using the theme
 * switcher at the top of the page to see how these semantic tokens change with the theme.
 *
 * These are the color tokens that you should almost always be using in your application code.
 */
export const SemanticColors: Story = {
  render: (_, context) => {
    const theme = (context as Context).currentTheme;
    const groupedSemanticColors = groupByTopLevel(semanticColorsMap);
    console.log(groupedSemanticColors);

    return (
      <div className={stack({ gap: "12", px: "3", py: "6" })}>
        {Object.entries(groupedSemanticColors).map(([groupName, semanticColors], i, col) => (
          <div key={groupName} className={stack({ gap: "6" })}>
            <h2
              className={css({
                textStyle: "heading.md",
                textTransform: "uppercase",
              })}
            >
              {groupName}
            </h2>
            <div className={css({
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "16px"
            })}>
              {semanticColors.map(([tokenName, color]) => (
                <div key={tokenName} className={css({
                  display: "flex",
                  gap: "12px",
                  alignItems: "center"
                })}>
                  <div
                    style={{
                      backgroundColor: theme === "light" ? color.base.color : color.dark.color,
                      opacity: theme === "light" ? color.base.opacity : color.dark.opacity,
                    }}
                    className={css({
                      h: "48px",
                      w: "48px",
                      rounded: "primary",
                      flexShrink: 0
                    })}
                  />
                  <div className={css({
                    display: "flex",
                    flexDirection: "column",
                    gap: "4px"
                  })}>
                    <p className={css({ textStyle: "label.md" })}>{tokenName}</p>
                    <p className={css({ 
                      textStyle: "body.sm",
                    })}>
                      {theme === "light" ? color.base.color : color.dark.color}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            {i !== col.length - 1 && (
              <div className={css({ w: "full", h: "[1px]", bg: "border.primary", mt: "24" })} />
            )}
          </div>
        ))}
      </div>
    );
  },
};
