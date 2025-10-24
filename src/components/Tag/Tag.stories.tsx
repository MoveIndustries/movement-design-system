import type { Meta, StoryObj } from "@storybook/react";
import { Tag } from "./Tag";
import { tagVariants, tagColors, tagSizes } from "./types";

const meta: Meta<typeof Tag> = {
  title: "Components/Tag",
  component: Tag,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: tagVariants,
      description: "The visual variant of the tag",
    },
    color: {
      control: "select",
      options: tagColors,
      description: "The color scheme of the tag",
    },
    size: {
      control: "select",
      options: tagSizes,
      description: "The size of the tag",
    },
    hasIcon: {
      control: "boolean",
      description: "Whether the tag has an icon",
    },
    isDismissible: {
      control: "boolean",
      description: "Whether the tag can be dismissed",
    },
    children: {
      control: "text",
      description: "The content inside the tag",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Default Tag",
  },
};

export const Outline: Story = {
  args: {
    children: "Outline Tag",
    variant: "outline",
  },
};

export const Solid: Story = {
  args: {
    children: "Solid Tag",
    variant: "solid",
  },
};

export const WithIcon: Story = {
  args: {
    children: "Tag with Icon",
    hasIcon: true,
  },
};

export const Dismissible: Story = {
  args: {
    children: "Dismissible Tag",
    isDismissible: true,
  },
};

export const WithIconAndDismiss: Story = {
  args: {
    children: "Full Featured",
    hasIcon: true,
    isDismissible: true,
  },
};

export const AllColors: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
        <Tag color="yellow">Yellow</Tag>
        <Tag color="blue">Blue</Tag>
        <Tag color="pink">Pink</Tag>
        <Tag color="red">Red</Tag>
        <Tag color="green">Green</Tag>
      </div>
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
        <Tag variant="solid" color="yellow">
          Yellow Solid
        </Tag>
        <Tag variant="solid" color="blue">
          Blue Solid
        </Tag>
        <Tag variant="solid" color="pink">
          Pink Solid
        </Tag>
        <Tag variant="solid" color="red">
          Red Solid
        </Tag>
        <Tag variant="solid" color="green">
          Green Solid
        </Tag>
      </div>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        <Tag size="sm">Small</Tag>
        <Tag size="md">Medium</Tag>
        <Tag size="lg">Large</Tag>
        <Tag size="xl">Extra Large</Tag>
      </div>
      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        <Tag variant="solid" size="sm">
          Small Solid
        </Tag>
        <Tag variant="solid" size="md">
          Medium Solid
        </Tag>
        <Tag variant="solid" size="lg">
          Large Solid
        </Tag>
        <Tag variant="solid" size="xl">
          Extra Large Solid
        </Tag>
      </div>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
        <Tag>Default</Tag>
        <Tag variant="outline">Outline</Tag>
        <Tag variant="solid">Solid</Tag>
        <Tag hasIcon>With Icon</Tag>
        <Tag isDismissible>Dismissible</Tag>
        <Tag hasIcon isDismissible>
          Full Featured
        </Tag>
      </div>

      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
        <Tag color="yellow">Status</Tag>
        <Tag variant="solid" color="blue">
          Active
        </Tag>
        <Tag variant="outline" color="pink">
          Pending
        </Tag>
        <Tag variant="solid" color="green" hasIcon isDismissible>
          Completed
        </Tag>
      </div>

      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
        <Tag color="yellow">React</Tag>
        <Tag variant="solid" color="blue">
          TypeScript
        </Tag>
        <Tag variant="outline" color="pink">
          JavaScript
        </Tag>
        <Tag variant="solid" color="green" hasIcon isDismissible>
          Node.js
        </Tag>
      </div>
    </div>
  ),
};
