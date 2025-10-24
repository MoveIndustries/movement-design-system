import type { Meta, StoryObj } from "@storybook/react-vite";
import { css } from "styled-system/css";
import { stack } from "styled-system/patterns";
import {
  Title,
  Subtitle,
  Description,
  Controls,
  Stories,
} from "@storybook/addon-docs/blocks";

import { colors, semanticColors } from "../colors";

const meta: Meta = {
  title: "Theme/Colors",
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description />
          <Controls />
          <Stories />
        </>
      ),
    },
  },
};
export default meta;

type Story = StoryObj;

/**
 * color token named structure:
 * // shaded color token:
 *  "moveus-marigold": {  // token name
 *    "50": {             // shade name
 *      value: "#fffbeb"  // CSS color value
 *    }
 *  }
 *
 * // simple color token:
 *  "white": {            // token name
 *    value: "#ffffff"    // CSS color value
 *  }
 */
function flattenColors() {
  const colorsMap: Record<string, string> = {};
  for (const entry of Object.entries(colors)) {
    const [key, value] = entry;
    if ("value" in value && value.value) {
      colorsMap[key] = value.value;
      continue;
    }
    for (const entry of Object.entries(value)) {
      const [shade, shadeValue] = entry;
      if ("value" in shadeValue && shadeValue.value) {
        colorsMap[`${key}.${shade}`] = shadeValue.value;
      }
    }
  }
  return colorsMap;
}

/**
 * semantic colors follow same structure as colorsMap
 */
function flattenSemanticColors() {
  const semanticColorsMap: Record<string, string> = {};
  for (const entry of Object.entries(semanticColors)) {
    const [key, value] = entry;
    for (const entry of Object.entries(value)) {
      const [shade, shadeValue] = entry;
      if ("value" in shadeValue && shadeValue.value) {
        console.log(shadeValue.value.slice(1, -1));
        semanticColorsMap[`${key}.${shade}`] =
          colorsMap[shadeValue.value.slice(1, -1).replace("colors.", "")];
      } else {
        // Handle one more level of nesting if the final is not a value
        for (const nestedEntry of Object.entries(shadeValue)) {
          const [nestedShade, nestedShadeValue] = nestedEntry as [
            string,
            { value: string }
          ];
          if ("value" in nestedShadeValue && nestedShadeValue.value) {
            console.log(nestedShadeValue.value.slice(1, -1));
            semanticColorsMap[`${key}.${shade}.${nestedShade}`] =
              colorsMap[
                nestedShadeValue.value.slice(1, -1).replace("colors.", "")
              ];
          }
        }
      }
    }
  }
  return semanticColorsMap;
}

const colorsMap = flattenColors();
const semanticColorsMap = flattenSemanticColors();

function makeTokenGroups<T>(
  record: Record<string, T>
): Record<string, Array<[string, T]>> {
  const groupedEntries: Record<string, Array<[string, T]>> = {};
  for (const [key, value] of Object.entries(record)) {
    const [topLevel] = key.split(".");
    // single element
    if (!topLevel) continue;
    let group = groupedEntries[topLevel];

    if (group) group.push([key, value]);
    else group = [[key, value]];

    groupedEntries[topLevel] = group;
  }

  return groupedEntries;
}

function getoupBasicElements<T>(
  groups: Record<string, Array<[string, T]>>
): Record<string, Array<[string, T]>> {
  const newGroups: Record<string, Array<[string, T]>> = { basic: [] };

  for (const [key, value] of Object.entries(groups)) {
    if (value.length === 1) {
      newGroups.basic = newGroups.basic.concat(value);
    } else {
      newGroups[key] = value;
    }
  }

  return newGroups;
}

/** Primary colors that the theme is built on. Listed is the color token name and the CSS color value. */
export const ColorPalette: Story = {
  render: () => {
    const groupedColors = getoupBasicElements(makeTokenGroups(colorsMap));

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
            <div
              className={css({
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "24px",
              })}
            >
              {colors.map(([tokenName, color]) => (
                <div
                  key={tokenName}
                  className={css({
                    display: "flex",
                    gap: "16px",
                    alignItems: "center",
                  })}
                >
                  <div
                    style={{ backgroundColor: color }}
                    className={css({
                      h: "48px",
                      w: "48px",
                      rounded: "primary",
                      flexShrink: 0,
                    })}
                  />
                  <div
                    className={css({
                      display: "flex",
                      flexDirection: "column",
                      gap: "4px",
                    })}
                  >
                    <p
                      className={css({
                        textStyle: "label.md",
                      })}
                    >
                      {tokenName}
                    </p>
                    <p
                      className={css({
                        textStyle: "label.sm",
                        color: "neutrals.whiteAlpha.600",
                      })}
                    >
                      {color}
                    </p>
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

/**
 * Semantic colors mostly reference a core token and are usually named based on how they are used in the system.
 * When styling with regards to theme, you should almost always be using these semantic colors.
 *
 * Listed is the semantic color token name and the CSS color value.
 */
export const SemanticColors: Story = {
  render: () => {
    const groupedSemanticColors = makeTokenGroups(semanticColorsMap);

    return (
      <div className={stack({ gap: "12", px: "3", py: "6" })}>
        {Object.entries(groupedSemanticColors).map(
          ([groupName, semanticColors], i, col) => (
            <div key={groupName} className={stack({ gap: "6" })}>
              <h2
                className={css({
                  textStyle: "heading.md",
                  textTransform: "uppercase",
                })}
              >
                {groupName}
              </h2>
              <div
                className={css({
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "16px",
                })}
              >
                {semanticColors.map(([tokenName, color]) => (
                  <div
                    key={tokenName}
                    className={css({
                      display: "flex",
                      gap: "12px",
                      alignItems: "center",
                    })}
                  >
                    <div
                      style={{
                        backgroundColor: color,
                      }}
                      className={css({
                        h: "48px",
                        w: "48px",
                        rounded: "primary",
                        flexShrink: 0,
                      })}
                    />
                    <div
                      className={css({
                        display: "flex",
                        flexDirection: "column",
                        gap: "4px",
                      })}
                    >
                      <p className={css({ textStyle: "label.md" })}>
                        {tokenName}
                      </p>
                      <p
                        className={css({
                          textStyle: "body.sm",
                        })}
                      >
                        {color}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              {i !== col.length - 1 && (
                <div
                  className={css({
                    w: "full",
                    h: "[1px]",
                    bg: "border.primary",
                    mt: "24",
                  })}
                />
              )}
            </div>
          )
        )}
      </div>
    );
  },
};

/**
 * Component colors are used to style components. They are usually named based on the component they are used for.
 *
 * Listed is the component color token name and the CSS color value.
 */
export const ComponentColors: Story = {
  render: () => {
    return (
      <div className={stack({ gap: "12", px: "3", py: "6" })}>
        work in progress
      </div>
    );
  },
};
