import type { Meta, StoryObj } from "@storybook/react";
import { BridgeButton } from "./BridgeButton";

const meta: Meta<typeof BridgeButton> = {
  title: "Components/Button/BridgeButton",
  component: BridgeButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    children: {
      control: "text",
      description: "The button's label",
    },
    fullWidth: {
      control: "boolean",
      description: "When true, the button will fill the width of its parent",
    },
    disabled: {
      control: "boolean",
      description: "When true, the button will be disabled",
    },
    ariaLabel: {
      control: "text",
      description:
        "An aria-label to override the label passed via the children prop",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "BRIDGE",
  },
};

export const FullWidth: Story = {
  args: {
    children: "BRIDGE",
    fullWidth: true,
  },
  parameters: {
    layout: "padded",
  },
};

export const Disabled: Story = {
  args: {
    children: "BRIDGE",
    disabled: true,
  },
};

export const CustomText: Story = {
  args: {
    children: "CONNECT WALLET",
  },
};

export const LongText: Story = {
  args: {
    children: "BRIDGE TO POLYGON",
    fullWidth: true,
  },
  parameters: {
    layout: "padded",
  },
};

export const Interactive: Story = {
  args: {
    children: "BRIDGE",
  },
  parameters: {
    docs: {
      description: {
        story:
          "This button has interactive hover and active states. Try hovering over it to see the shadow effect change and the background color shift to yellow.",
      },
    },
  },
};

export const AllStates: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        alignItems: "flex-start",
      }}
    >
      <BridgeButton>DEFAULT</BridgeButton>
      <BridgeButton disabled>DISABLED</BridgeButton>
      <BridgeButton fullWidth>FULL WIDTH</BridgeButton>
    </div>
  ),
  parameters: {
    layout: "padded",
    docs: {
      description: {
        story:
          "All the different states of the BridgeButton component displayed together.",
      },
    },
  },
};
