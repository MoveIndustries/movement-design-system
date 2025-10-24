import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { css } from "styled-system/css";
import { flex, stack } from "styled-system/patterns";

import { Button } from "./Button";

// Simple icon component for demonstration
const Icon = ({ className }: { className?: string }) => (
  <div
    className={className}
    style={{
      width: "100%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "12px",
      fontWeight: "bold",
    }}
  >
    C
  </div>
);

const meta = {
  title: "Components/Button/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["filled", "outlined"],
    },
    color: {
      control: { type: "select" },
      options: [
        "yellow",
        "blue",
        "pink",
        "green",
        "orange",
        "gray",
        "red",
        "white",
      ],
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
    },
    radius: {
      control: { type: "select" },
      options: ["none", "sm", "md", "lg", "full"],
    },
  },
  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Button",
  },
};

const sectionHeadingStyles = css({
  color: "text.secondary",
  borderBottomStyle: "solid",
  borderBottomWidth: "1",
  borderBottomColor: "border.secondary",
  pb: "2",
  mb: "4",
});

export const FilledButtons: Story = {
  render: (props) => (
    <div className={stack({ gap: "6" })}>
      <div className={stack({ gap: "4" })}>
        <h2 className={sectionHeadingStyles}>Default</h2>
        <div
          className={flex({
            gap: "16",
            align: "center",
            justify: "space-between",
          })}
        >
          <Button {...props} size="sm" />
          <Button {...props} size="md" />
          <Button {...props} size="lg" />
        </div>
      </div>

      <div className={stack({ gap: "4" })}>
        <h2 className={sectionHeadingStyles}>Disabled</h2>
        <div
          className={flex({
            gap: "16",
            align: "center",
            justify: "space-between",
          })}
        >
          <Button {...props} size="sm" disabled />
          <Button {...props} size="md" disabled />
          <Button {...props} size="lg" disabled />
        </div>
      </div>

      <div className={stack({ gap: "4" })}>
        <h2 className={sectionHeadingStyles}>With Lead Icon</h2>
        <div
          className={flex({
            gap: "16",
            align: "center",
            justify: "space-between",
          })}
        >
          <Button {...props} size="sm" LeadIcon={Icon} />
          <Button {...props} size="md" LeadIcon={Icon} />
          <Button {...props} size="lg" LeadIcon={Icon} />
        </div>
      </div>

      <div className={stack({ gap: "4" })}>
        <h2 className={sectionHeadingStyles}>With Tail Icon</h2>
        <div
          className={flex({
            gap: "16",
            align: "center",
            justify: "space-between",
          })}
        >
          <Button {...props} size="sm" TailIcon={Icon} />
          <Button {...props} size="md" TailIcon={Icon} />
          <Button {...props} size="lg" TailIcon={Icon} />
        </div>
      </div>

      <div className={stack({ gap: "4" })}>
        <h2 className={sectionHeadingStyles}>With Lead and Tail Icons</h2>
        <div
          className={flex({
            gap: "16",
            align: "center",
            justify: "space-between",
          })}
        >
          <Button {...props} size="sm" LeadIcon={Icon} TailIcon={Icon} />
          <Button {...props} size="md" LeadIcon={Icon} TailIcon={Icon} />
          <Button {...props} size="lg" LeadIcon={Icon} TailIcon={Icon} />
        </div>
      </div>

      <div className={stack({ gap: "4" })}>
        <h2 className={sectionHeadingStyles}>Border Radius Variants</h2>
        <div
          className={flex({
            gap: "16",
            align: "center",
            justify: "space-between",
          })}
        >
          <Button {...props} size="md" radius="none" />
          <Button {...props} size="md" radius="sm" />
          <Button {...props} size="md" radius="md" />
          <Button {...props} size="md" radius="lg" />
          <Button {...props} size="md" radius="full" />
        </div>
      </div>
    </div>
  ),
  args: {
    children: "Button",
    variant: "filled",
    color: "yellow",
  },
};

// export const YellowFilledButtons: Story = {
//   ...FilledButtons,
//   args: {
//     ...FilledButtons.args,
//     color: "yellow",
//   },
// };

// export const BlueFilledButtons: Story = {
//   ...FilledButtons,
//   args: {
//     ...FilledButtons.args,
//     color: "blue",
//   },
// };

// export const PinkFilledButtons: Story = {
//   ...FilledButtons,
//   args: {
//     ...FilledButtons.args,
//     color: "pink",
//   },
// };

// export const GreenFilledButtons: Story = {
//   ...FilledButtons,
//   args: {
//     ...FilledButtons.args,
//     color: "green",
//   },
// };

// export const OrangeFilledButtons: Story = {
//   ...FilledButtons,
//   args: {
//     ...FilledButtons.args,
//     color: "orange",
//   },
// };

// export const GrayFilledButtons: Story = {
//   ...FilledButtons,
//   args: {
//     ...FilledButtons.args,
//     color: "gray",
//   },
// };

export const OutlinedButtons: Story = {
  render: (props) => (
    <div className={stack({ gap: "24" })}>
      <div className={stack({ gap: "16" })}>
        <h2 className={sectionHeadingStyles}>Default</h2>
        <div
          className={flex({
            gap: "16",
            align: "center",
            justify: "space-between",
          })}
        >
          <Button {...props} size="sm" />
          <Button {...props} size="md" />
          <Button {...props} size="lg" />
        </div>
      </div>

      <div className={stack({ gap: "16" })}>
        <h2 className={sectionHeadingStyles}>Disabled</h2>
        <div
          className={flex({
            gap: "16",
            align: "center",
            justify: "space-between",
          })}
        >
          <Button {...props} size="sm" disabled />
          <Button {...props} size="md" disabled />
          <Button {...props} size="lg" disabled />
        </div>
      </div>

      <div className={stack({ gap: "16" })}>
        <h2 className={sectionHeadingStyles}>With Lead Icon</h2>
        <div
          className={flex({
            gap: "16",
            align: "center",
            justify: "space-between",
          })}
        >
          <Button {...props} size="sm" LeadIcon={Icon} />
          <Button {...props} size="md" LeadIcon={Icon} />
          <Button {...props} size="lg" LeadIcon={Icon} />
        </div>
      </div>

      <div className={stack({ gap: "16" })}>
        <h2 className={sectionHeadingStyles}>With Tail Icon</h2>
        <div
          className={flex({
            gap: "16",
            align: "center",
            justify: "space-between",
          })}
        >
          <Button {...props} size="sm" TailIcon={Icon} />
          <Button {...props} size="md" TailIcon={Icon} />
          <Button {...props} size="lg" TailIcon={Icon} />
        </div>
      </div>

      <div className={stack({ gap: "16" })}>
        <h2 className={sectionHeadingStyles}>With Lead and Tail Icons</h2>
        <div
          className={flex({
            gap: "16",
            align: "center",
            justify: "space-between",
          })}
        >
          <Button {...props} size="sm" LeadIcon={Icon} TailIcon={Icon} />
          <Button {...props} size="md" LeadIcon={Icon} TailIcon={Icon} />
          <Button {...props} size="lg" LeadIcon={Icon} TailIcon={Icon} />
        </div>
      </div>

      <div className={stack({ gap: "16" })}>
        <h2 className={sectionHeadingStyles}>Border Radius Variants</h2>
        <div
          className={flex({
            gap: "16",
            align: "center",
            justify: "space-between",
          })}
        >
          <Button {...props} size="md" radius="none" />
          <Button {...props} size="md" radius="sm" />
          <Button {...props} size="md" radius="md" />
          <Button {...props} size="md" radius="lg" />
          <Button {...props} size="md" radius="full" />
        </div>
      </div>
    </div>
  ),
  args: {
    children: "Button",
    variant: "outlined",
    color: "yellow",
  },
};

// export const YellowOutlinedButtons: Story = {
//   ...OutlinedButtons,
//   args: {
//     ...OutlinedButtons.args,
//     color: "yellow",
//   },
// };

// export const BlueOutlinedButtons: Story = {
//   ...OutlinedButtons,
//   args: {
//     ...OutlinedButtons.args,
//     color: "blue",
//   },
// };

// export const RedOutlinedButtons: Story = {
//   ...OutlinedButtons,
//   args: {
//     ...OutlinedButtons.args,
//     color: "red",
//   },
// };

// export const WhiteOutlinedButtons: Story = {
//   ...OutlinedButtons,
//   args: {
//     ...OutlinedButtons.args,
//     color: "white",
//   },
// };

/**
 * When the `fullWidth` prop is set to `true`, the button will fill the width of its parent.
 */
export const FullWidthButtons: Story = {
  render: (props) => (
    <div className={stack({ gap: "24" })}>
      <div className={stack({ gap: "16" })}>
        <h2 className={sectionHeadingStyles}>Filled Full Width</h2>
        <div className={stack({ gap: "16" })}>
          <Button {...props} variant="filled" color="yellow" fullWidth />
          <Button {...props} variant="filled" color="blue" fullWidth />
          <Button {...props} variant="filled" color="pink" fullWidth />
        </div>
      </div>

      <div className={stack({ gap: "16" })}>
        <h2 className={sectionHeadingStyles}>Outlined Full Width</h2>
        <div className={stack({ gap: "16" })}>
          <Button {...props} variant="outlined" color="yellow" fullWidth />
          <Button {...props} variant="outlined" color="blue" fullWidth />
          <Button {...props} variant="outlined" color="red" fullWidth />
        </div>
      </div>
    </div>
  ),
  args: {
    children: "Button",
  },
};

// /** The `render` prop can be used to render a link that looks like a button. */
// export const LinkButton: Story = {
//   args: {
//     children: "Example Link",
//     TailIcon: Icon,
//     render: (children) => <a href="#example">{children}</a>,
//   },
// };

// Color showcase
export const ColorShowcase: Story = {
  render: () => (
    <div className={stack({ gap: "24" })}>
      <div className={stack({ gap: "16" })}>
        <h2 className={sectionHeadingStyles}>Filled Buttons</h2>
        <div className={flex({ gap: "16", align: "center", wrap: "wrap" })}>
          <Button variant="filled" color="yellow">
            Button
          </Button>
          <Button variant="filled" color="blue">
            Button
          </Button>
          <Button variant="filled" color="pink">
            Button
          </Button>
          <Button variant="filled" color="green">
            Button
          </Button>
          <Button variant="filled" color="orange">
            Button
          </Button>
          <Button variant="filled" color="gray">
            Button
          </Button>
        </div>
      </div>

      <div className={stack({ gap: "16" })}>
        <h2 className={sectionHeadingStyles}>Outlined Buttons</h2>
        <div className={flex({ gap: "16", align: "center", wrap: "wrap" })}>
          <Button variant="outlined" color="yellow">
            Button
          </Button>
          <Button variant="outlined" color="blue">
            Button
          </Button>
          <Button variant="outlined" color="red">
            Button
          </Button>
          <Button variant="outlined" color="white">
            Button
          </Button>
        </div>
      </div>
    </div>
  ),
  args: {
    children: "Button",
  },
};
