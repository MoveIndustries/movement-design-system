import type { Meta, StoryObj } from "@storybook/react-vite";
import { GearSix, Plus, Trash, X } from "@phosphor-icons/react";
import { IconButton } from "../components/IconButton/IconButton";

/**
 * `IconButton` is a square, icon-only `Button`. It forwards every `Button`
 * variant/size and defaults `size="icon"`. Pass a single icon as children and
 * always provide an `aria-label` for accessibility.
 */
const meta = {
  title: "movement-design-system/IconButton",
  component: IconButton,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "secondary", "outline", "ghost", "destructive", "glow"],
    },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { variant: "default", "aria-label": "Add", children: <Plus /> },
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <IconButton variant="default" aria-label="Add">
        <Plus />
      </IconButton>
      <IconButton variant="secondary" aria-label="Settings">
        <GearSix />
      </IconButton>
      <IconButton variant="outline" aria-label="Close">
        <X />
      </IconButton>
      <IconButton variant="ghost" aria-label="Settings">
        <GearSix />
      </IconButton>
      <IconButton variant="destructive" aria-label="Delete">
        <Trash />
      </IconButton>
    </div>
  ),
};

export const Disabled: Story = {
  args: { variant: "default", disabled: true, "aria-label": "Add", children: <Plus /> },
};
