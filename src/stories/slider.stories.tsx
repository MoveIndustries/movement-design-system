import type { Meta, StoryObj } from "@storybook/react-vite";
import { Slider } from "../components/shadcn/slider";

const meta = {
  title: "form/Slider",
  component: Slider,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    disabled: {
      control: "boolean",
      description: "Whether the slider is disabled",
    },
    min: {
      control: "number",
      description: "The minimum value",
    },
    max: {
      control: "number",
      description: "The maximum value",
    },
    step: {
      control: "number",
      description: "The step increment",
    },
  },
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="w-80">
      <Slider defaultValue={[50]} max={100} step={1} />
    </div>
  ),
};

export const Range: Story = {
  render: () => (
    <div className="w-80">
      <Slider defaultValue={[25, 75]} max={100} step={1} />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="w-80">
      <Slider defaultValue={[50]} max={100} step={1} disabled />
    </div>
  ),
};

export const WithStep: Story = {
  render: () => (
    <div className="w-80">
      <Slider defaultValue={[50]} max={100} step={10} />
    </div>
  ),
};
