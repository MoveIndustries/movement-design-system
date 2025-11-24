import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  borderWidths,
  radii,
  spacing,
  zIndex,
  shadows,
  sizes,
} from "../lib/scales";
import {
  Title,
  Subtitle,
  Description,
  Controls,
  Stories,
} from "@storybook/addon-docs/blocks";

const meta: Meta = {
  title: "Theme/Scales",
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
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

/** Tokens for use with the `borderRadius`/`rounded` property. */
export const Radii: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-8">
      {Object.entries(radii).map(([name, radius]) => (
        <div
          key={name}
          className="bg-moveus-marigold-400 flex h-[120px] w-[120px] items-center justify-center font-medium text-black"
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
    <div className="flex flex-wrap items-center gap-8">
      {Object.entries(borderWidths).map(([name, borderWidth]) => (
        <div
          key={name}
          className="bg-background text-foreground border-moveus-marigold-400 flex h-[120px] w-[120px] items-center justify-center font-medium"
          style={{ borderWidth: borderWidth.value, borderStyle: "solid" }}
        >
          {name}
        </div>
      ))}
    </div>
  ),
};

/** Tokens for use with spacing and size related properties like `margin`, `padding`, `height`, `width`, etc. */
export const Spacing: Story = {
  render: () => (
    <div className="flex flex-col items-start gap-2">
      <div className="grid w-full grid-cols-[60px_60px_1fr] items-center gap-2">
        <span className="text-sm font-medium">Name</span>
        <span className="text-sm font-medium">Value</span>
        <span className="text-sm font-medium">Preview</span>
      </div>
      {Object.entries(spacing).map(([name, spacingValue]) => (
        <div
          key={name}
          className="grid w-full grid-cols-[60px_60px_1fr] items-center gap-2"
        >
          <span className="text-sm">{name}</span>
          <span className="text-sm">{spacingValue.value}</span>
          <div
            className="bg-moveus-marigold-400 flex h-8 items-center justify-center text-xs text-black"
            style={{ width: spacingValue.value }}
          />
        </div>
      ))}
    </div>
  ),
};

/** Tokens for use with the `size` property. Includes spacing values plus semantic sizes. */
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col items-start gap-2">
      <div className="grid w-full grid-cols-[80px_120px_1fr] items-center gap-2">
        <span className="text-sm font-medium">Name</span>
        <span className="text-sm font-medium">Value</span>
        <span className="text-sm font-medium">Description</span>
      </div>
      {Object.entries(sizes).map(([name, sizeValue]) => {
        const isNumeric = ![
          "prose",
          "full",
          "min",
          "max",
          "fit",
          "px",
        ].includes(name);
        return (
          <div
            key={name}
            className="grid w-full grid-cols-[80px_120px_1fr] items-center gap-2"
          >
            <span className="font-mono text-sm">{name}</span>
            <span className="text-sm">{sizeValue.value}</span>
            <span className="text-muted-foreground text-sm">
              {!isNumeric && name === "prose" && "Readable text width"}
              {!isNumeric && name === "full" && "100% of parent"}
              {!isNumeric && name === "min" && "Minimum content size"}
              {!isNumeric && name === "max" && "Maximum content size"}
              {!isNumeric && name === "fit" && "Fit to content"}
              {!isNumeric && name === "px" && "Single pixel"}
              {isNumeric && "Fixed size"}
            </span>
          </div>
        );
      })}
    </div>
  ),
};

/** Tokens for use with the `boxShadow`/`shadow` property. */
export const Shadows: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-8">
      {Object.entries(shadows).map(([name, shadow]) => (
        <div
          key={name}
          className="bg-background text-foreground flex h-[120px] w-[120px] items-center justify-center rounded-lg font-medium"
          style={{ boxShadow: shadow.value }}
        >
          {name}
        </div>
      ))}
    </div>
  ),
};

/** Tokens for use with the `zIndex` property. */
export const ZIndex: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      {Object.entries(zIndex).map(([name, zIndexValue]) => (
        <div
          key={name}
          className="bg-moveus-marigold-400 flex h-[120px] w-[120px] items-center justify-center rounded-full p-2 text-center font-medium text-black"
          style={{ zIndex: zIndexValue.value }}
        >
          <div>
            <div className="text-sm">{name}</div>
            <div className="text-xs">({String(zIndexValue.value)})</div>
          </div>
        </div>
      ))}
    </div>
  ),
};
