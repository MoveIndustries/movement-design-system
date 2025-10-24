import type { Meta, StoryObj } from "@storybook/react";
import { Tooltip } from "./Tooltip";

const meta: Meta<typeof Tooltip> = {
  title: "Components/Tooltip",
  component: Tooltip,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    bgColor: {
      control: "color",
      description: "Background color of the tooltip",
    },
    isOpen: {
      control: "boolean",
      description: "Controls if the tooltip is open",
    },
    openOnClick: {
      control: "boolean",
      description: "Open tooltip on click instead of hover",
    },
    clickable: {
      control: "boolean",
      description: "Make the tooltip clickable",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "This is a tooltip",
    id: "default-tooltip",
  },
  render: (args) => (
    <div style={{ padding: "50px", textAlign: "center" }}>
      <button data-tooltip-id={args.id}>Hover over me</button>
      <Tooltip {...args} />
    </div>
  ),
};

export const CustomColor: Story = {
  args: {
    children: "Tooltip with custom color",
    id: "custom-color-tooltip",
    bgColor: "#FF6B6B",
  },
  render: (args) => (
    <div style={{ padding: "50px", textAlign: "center" }}>
      <button data-tooltip-id={args.id}>Custom colored tooltip</button>
      <Tooltip {...args} />
    </div>
  ),
};

export const ClickToOpen: Story = {
  args: {
    children: "This tooltip opens on click",
    id: "click-tooltip",
    openOnClick: true,
    clickable: true,
  },
  render: (args) => (
    <div style={{ padding: "50px", textAlign: "center" }}>
      <button data-tooltip-id={args.id}>Click me to show tooltip</button>
      <Tooltip {...args} />
    </div>
  ),
};

export const LongContent: Story = {
  args: {
    children:
      "This is a longer tooltip with more content to demonstrate how the tooltip handles text wrapping and maximum width constraints.",
    id: "long-tooltip",
  },
  render: (args) => (
    <div style={{ padding: "50px", textAlign: "center" }}>
      <button data-tooltip-id={args.id}>Long tooltip content</button>
      <Tooltip {...args} />
    </div>
  ),
};

export const MultipleTooltips: Story = {
  render: () => (
    <div
      style={{
        padding: "50px",
        display: "flex",
        gap: "20px",
        justifyContent: "center",
      }}
    >
      <button data-tooltip-id="tooltip-1">Tooltip 1</button>
      <Tooltip id="tooltip-1" bgColor="#4ECDC4">
        First tooltip
      </Tooltip>

      <button data-tooltip-id="tooltip-2">Tooltip 2</button>
      <Tooltip id="tooltip-2" bgColor="#FFE162">
        Second tooltip
      </Tooltip>

      <button data-tooltip-id="tooltip-3">Tooltip 3</button>
      <Tooltip id="tooltip-3" bgColor="#FF6B6B">
        Third tooltip
      </Tooltip>
    </div>
  ),
};
