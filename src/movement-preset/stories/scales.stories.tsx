import type { Meta, StoryObj } from "@storybook/react-vite";
import { center, flex, hstack, stack } from "styled-system/patterns";

import { borderWidths, radii, spacing, zIndex } from "../scales";
import { Title, Subtitle, Description, Controls, Stories } from "@storybook/addon-docs/blocks";
import { css } from "styled-system/css";

const meta: Meta = {
  title: "Theme/Scales",
  tags: ["autodocs"],
  parameters: {
    docs:{page: () => (
      <>
        <Title />
        <Subtitle />
        <Description />
        <Controls />
        <Stories />
      </>
    )},
  },  
};
export default meta;

type Story = StoryObj;

/** Tokens for use with the `borderRadius`/`rounded` property. */
export const Radii: Story = {
  render: () => (
    <div className={flex({ wrap: "wrap", align: "center", gap: "8" })}>
      {Object.entries(radii).map(([name, radius]) => (
        <div
          key={name}
          className={center({
            h: "120",
            w: "120",
            bg: "moveus-marigold.400",
            color: "black",
            textStyle: "label.md",
          })}
          style={{ borderRadius: radius.value }}
        >
          {name}
        </div>
      ))}
    </div>
  ),
};

/** Tokens for use with the `borderWidth` property. */
export const BorderWidths: Story = {
  render: () => (
    <div className={flex({ align: "center", gap: "8" })}>
      {Object.entries(borderWidths).map(([name, borderWidth]) => (
        <div
          key={name}
          className={center({
            h: "120",
            w: "120",
            bg: "background.primary",
            color: "text.primary",
            textStyle: "label.md",
            borderColor: "moveus-marigold.400",
          })}
          style={{ borderWidth: borderWidth.value }}
        >
          {name}
        </div>
      ))}
    </div>
  ),
};

const row = css({
  display: "grid",
  gridTemplateColumns: "60px 60px auto",
  alignItems: "center",
  gap: "8px"
});
/** Tokens for use with spacing and size related properties like `margin`, `padding`, `height`, `width`, etc. */
export const Spacing: Story = {
  render: () => (
    <div className={stack({  align: "flex-start", gap: "8" })}>
      <div className={row}>
        <span className={css({ textStyle: "label.md" })}>Name</span>
        <span className={css({ textStyle: "label.md" })}>Value</span>
        <span className={css({ textStyle: "label.md" })}>Preview</span>
      </div>
      {Object.entries(spacing).map(([name, spacingValue]) => (
        <div
          key={name}
          className={row}
        >
          <span className={css({ textStyle: "label.md" })}>{name}</span>
          <span className={css({ textStyle: "label.md" })}>{spacingValue.value}</span>
          <div
            className={center({
              h: "8",
              bg: "moveus-marigold.400",
              color: "black",
            })}
            style={{ width: spacingValue.value }}
          />
        </div>
      ))}
    </div>
  ),
};

/** Tokens for use with the `zIndex` property. */
export const ZIndex: Story = {
  render: () => (
    <div className={flex({ align: "center", gap: "8", wrap: "wrap" })}>
      {Object.entries(zIndex).map(([name, zIndexValue]) => (
        <div
          key={name}
          className={center({
            h: "120",
            w: "120",
            bg: "moveus-marigold.400",
            color: "black",
            textStyle: "label.md",
            rounded: "200",
          })}
          style={{ zIndex: zIndexValue.value }}
        >
          {name} ({zIndexValue.value})
        </div>
      ))}
    </div>
  ),
};
