import type { Meta, StoryObj } from "@storybook/react-vite";
import { Toggle } from "../components/shadcn/toggle";
import { Bold, Italic, Underline } from "lucide-react";

const meta = {
  title: "form/Toggle",
  component: Toggle,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "outline"],
      description: "The visual style variant of the toggle",
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg"],
      description: "The size of the toggle",
    },
    disabled: {
      control: "boolean",
      description: "Whether the toggle is disabled",
    },
  },
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Toggle",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    children: "Toggle",
  },
};

export const WithIcon: Story = {
  render: () => (
    <Toggle aria-label="Toggle bold">
      <Bold />
    </Toggle>
  ),
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: "Toggle",
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Toggle size="sm">
        <Bold />
      </Toggle>
      <Toggle size="default">
        <Bold />
      </Toggle>
      <Toggle size="lg">
        <Bold />
      </Toggle>
    </div>
  ),
};

export const TextEditor: Story = {
  render: () => (
    <div className="flex items-center gap-1">
      <Toggle aria-label="Toggle bold">
        <Bold />
      </Toggle>
      <Toggle aria-label="Toggle italic">
        <Italic />
      </Toggle>
      <Toggle aria-label="Toggle underline">
        <Underline />
      </Toggle>
    </div>
  ),
};
