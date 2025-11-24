import type { Meta, StoryObj } from "@storybook/react-vite";
import { Checkbox } from "../components/shadcn/checkbox";
import { Label } from "../components/shadcn/label";

const meta = {
  title: "form/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    disabled: {
      control: "boolean",
      description: "Whether the checkbox is disabled",
    },
    checked: {
      control: "select",
      options: [true, false, "indeterminate"],
      description: "The checked state of the checkbox",
    },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Checked: Story = {
  args: {
    checked: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const WithLabel: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" />
      <Label htmlFor="terms">Accept terms and conditions</Label>
    </div>
  ),
};

export const MultipleItems: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Checkbox id="item1" />
        <Label htmlFor="item1">Item 1</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="item2" />
        <Label htmlFor="item2">Item 2</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="item3" disabled />
        <Label htmlFor="item3">Item 3 (disabled)</Label>
      </div>
    </div>
  ),
};
