import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "../components/shadcn/toggle-group";

const meta = {
  title: "form/ToggleGroup",
  component: ToggleGroup,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "contained"],
      description: "The visual style variant of the toggle group",
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg"],
      description: "The size of the toggle group",
    },
    type: {
      control: "select",
      options: ["single", "multiple"],
      description: "Whether multiple items can be selected",
    },
    required: {
      control: "boolean",
      description:
        "If true, prevents deselection (only works with type='single')",
    },
  },
} satisfies Meta<typeof ToggleGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Duration: Story = {
  name: "Duration (Default)",
  // @ts-expect-error - using custom render function
  args: {},
  render: () => (
    <ToggleGroup type="single" defaultValue="1d">
      <ToggleGroupItem value="1d">1D</ToggleGroupItem>
      <ToggleGroupItem value="1w">1W</ToggleGroupItem>
      <ToggleGroupItem value="1m">1M</ToggleGroupItem>
      <ToggleGroupItem value="1y">1Y</ToggleGroupItem>
    </ToggleGroup>
  ),
};

export const Percentage: Story = {
  name: "Percentage",
  // @ts-expect-error - using custom render function
  args: {},
  render: () => (
    <ToggleGroup type="single" defaultValue="25" size="sm">
      <ToggleGroupItem value="25">25%</ToggleGroupItem>
      <ToggleGroupItem value="50">50%</ToggleGroupItem>
      <ToggleGroupItem value="75">75%</ToggleGroupItem>
      <ToggleGroupItem value="100">100%</ToggleGroupItem>
    </ToggleGroup>
  ),
};

export const Stake: Story = {
  name: "Stake (Large)",
  // @ts-expect-error - using custom render function
  args: {},
  render: () => (
    <ToggleGroup type="single" defaultValue="quick" size="lg">
      <ToggleGroupItem value="quick">Quick Stake</ToggleGroupItem>
      <ToggleGroupItem value="advanced">Advanced Stake</ToggleGroupItem>
    </ToggleGroup>
  ),
};

export const AllStates: Story = {
  name: "All States",
  // @ts-expect-error - using custom render function
  args: {},
  render: () => (
    <div className="flex flex-col gap-8">
      <div className="space-y-2">
        <p className="text-muted-foreground text-sm">Duration - State 1</p>
        <ToggleGroup type="single" defaultValue="1d">
          <ToggleGroupItem value="1d">1D</ToggleGroupItem>
          <ToggleGroupItem value="1w">1W</ToggleGroupItem>
          <ToggleGroupItem value="1m">1M</ToggleGroupItem>
          <ToggleGroupItem value="1y">1Y</ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div className="space-y-2">
        <p className="text-muted-foreground text-sm">Duration - State 2</p>
        <ToggleGroup type="single" defaultValue="1w">
          <ToggleGroupItem value="1d">1D</ToggleGroupItem>
          <ToggleGroupItem value="1w">1W</ToggleGroupItem>
          <ToggleGroupItem value="1m">1M</ToggleGroupItem>
          <ToggleGroupItem value="1y">1Y</ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div className="space-y-2">
        <p className="text-muted-foreground text-sm">Duration - State 3</p>
        <ToggleGroup type="single" defaultValue="1m">
          <ToggleGroupItem value="1d">1D</ToggleGroupItem>
          <ToggleGroupItem value="1w">1W</ToggleGroupItem>
          <ToggleGroupItem value="1m">1M</ToggleGroupItem>
          <ToggleGroupItem value="1y">1Y</ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div className="space-y-2">
        <p className="text-muted-foreground text-sm">Duration - State 4</p>
        <ToggleGroup type="single" defaultValue="1y">
          <ToggleGroupItem value="1d">1D</ToggleGroupItem>
          <ToggleGroupItem value="1w">1W</ToggleGroupItem>
          <ToggleGroupItem value="1m">1M</ToggleGroupItem>
          <ToggleGroupItem value="1y">1Y</ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div className="space-y-2">
        <p className="text-muted-foreground text-sm">Stake - State 1</p>
        <ToggleGroup type="single" defaultValue="quick" size="lg">
          <ToggleGroupItem value="quick">Quick Stake</ToggleGroupItem>
          <ToggleGroupItem value="advanced">Advanced Stake</ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div className="space-y-2">
        <p className="text-muted-foreground text-sm">Stake - State 2</p>
        <ToggleGroup type="single" defaultValue="advanced" size="lg">
          <ToggleGroupItem value="quick">Quick Stake</ToggleGroupItem>
          <ToggleGroupItem value="advanced">Advanced Stake</ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div className="space-y-2">
        <p className="text-muted-foreground text-sm">Percentage - State 1</p>
        <ToggleGroup type="single" defaultValue="25" size="sm">
          <ToggleGroupItem value="25">25%</ToggleGroupItem>
          <ToggleGroupItem value="50">50%</ToggleGroupItem>
          <ToggleGroupItem value="75">75%</ToggleGroupItem>
          <ToggleGroupItem value="100">100%</ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  ),
};

export const Multiple = {
  name: "Multiple selection",
  render: () => (
    <div className="flex flex-col gap-8">
      <div className="space-y-2">
        <p className="text-muted-foreground text-sm">
          Multiple selection (default)
        </p>
        <ToggleGroup type="multiple" defaultValue={["bold", "italic"]}>
          <ToggleGroupItem value="bold">Bold</ToggleGroupItem>
          <ToggleGroupItem value="italic">Italic</ToggleGroupItem>
          <ToggleGroupItem value="underline">Underline</ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div className="space-y-2">
        <p className="text-muted-foreground text-sm">
          Multiple selection (large)
        </p>
        <ToggleGroup type="multiple" size="lg">
          <ToggleGroupItem value="feature1">Feature 1</ToggleGroupItem>
          <ToggleGroupItem value="feature2">Feature 2</ToggleGroupItem>
          <ToggleGroupItem value="feature3">Feature 3</ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div className="space-y-2">
        <p className="text-muted-foreground text-sm">
          Multiple selection (small)
        </p>
        <ToggleGroup type="multiple" size="sm">
          <ToggleGroupItem value="apple">🍏</ToggleGroupItem>
          <ToggleGroupItem value="banana">🍌</ToggleGroupItem>
          <ToggleGroupItem value="cherry">🍒</ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  ),
};

export const Contained: Story = {
  name: "Contained Variant",
  // @ts-expect-error - using custom render function
  args: {},
  render: () => (
    <div className="flex flex-col gap-8">
      <div className="space-y-2">
        <p className="text-muted-foreground text-sm">Contained - Time Period</p>
        <ToggleGroup type="single" variant="contained" defaultValue="1d">
          <ToggleGroupItem value="1d">1D</ToggleGroupItem>
          <ToggleGroupItem value="1w">1W</ToggleGroupItem>
          <ToggleGroupItem value="1m">1M</ToggleGroupItem>
          <ToggleGroupItem value="1y">1Y</ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div className="space-y-2">
        <p className="text-muted-foreground text-sm">Contained with Label</p>
        <div className="flex items-center gap-4">
          <span className="font-sans text-sm leading-[1.4] text-white/64">
            Projected Yield
          </span>
          <ToggleGroup type="single" variant="contained" defaultValue="1w">
            <ToggleGroupItem value="1d">1D</ToggleGroupItem>
            <ToggleGroupItem value="1w">1W</ToggleGroupItem>
            <ToggleGroupItem value="1m">1M</ToggleGroupItem>
            <ToggleGroupItem value="1y">1Y</ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-muted-foreground text-sm">Contained - Small</p>
        <ToggleGroup
          type="single"
          variant="contained"
          size="sm"
          defaultValue="25"
        >
          <ToggleGroupItem value="25">25%</ToggleGroupItem>
          <ToggleGroupItem value="50">50%</ToggleGroupItem>
          <ToggleGroupItem value="75">75%</ToggleGroupItem>
          <ToggleGroupItem value="100">100%</ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div className="space-y-2">
        <p className="text-muted-foreground text-sm">Contained - Large</p>
        <ToggleGroup
          type="single"
          variant="contained"
          size="lg"
          defaultValue="quick"
        >
          <ToggleGroupItem value="quick">Quick Stake</ToggleGroupItem>
          <ToggleGroupItem value="advanced">Advanced Stake</ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  ),
};

export const Required: Story = {
  name: "Required (Always Selected)",
  // @ts-expect-error - using custom render function
  args: {},
  render: () => (
    <div className="flex flex-col gap-8">
      <div className="space-y-2">
        <p className="text-muted-foreground text-sm">
          Without required (can deselect by clicking selected item)
        </p>
        <ToggleGroup type="single" defaultValue="1d">
          <ToggleGroupItem value="1d">1D</ToggleGroupItem>
          <ToggleGroupItem value="1w">1W</ToggleGroupItem>
          <ToggleGroupItem value="1m">1M</ToggleGroupItem>
          <ToggleGroupItem value="1y">1Y</ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div className="space-y-2">
        <p className="text-muted-foreground text-sm">
          With required (cannot deselect - try clicking the selected item)
        </p>
        <ToggleGroup type="single" required defaultValue="1d">
          <ToggleGroupItem value="1d">1D</ToggleGroupItem>
          <ToggleGroupItem value="1w">1W</ToggleGroupItem>
          <ToggleGroupItem value="1m">1M</ToggleGroupItem>
          <ToggleGroupItem value="1y">1Y</ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div className="space-y-2">
        <p className="text-muted-foreground text-sm">
          Contained + Required (full example)
        </p>
        <div className="flex items-center gap-4">
          <span className="font-sans text-sm leading-[1.4] text-white/64">
            Time Period
          </span>
          <ToggleGroup
            type="single"
            variant="contained"
            required
            defaultValue="1w"
          >
            <ToggleGroupItem value="1d">1D</ToggleGroupItem>
            <ToggleGroupItem value="1w">1W</ToggleGroupItem>
            <ToggleGroupItem value="1m">1M</ToggleGroupItem>
            <ToggleGroupItem value="1y">1Y</ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>
    </div>
  ),
};

export const Controlled: Story = {
  name: "Controlled vs Uncontrolled",
  // @ts-expect-error - using custom render function
  args: {},
  render: () => {
    const ControlledExample = () => {
      const [value, setValue] = useState("1w");
      return (
        <div className="space-y-2">
          <p className="text-muted-foreground text-sm">
            Controlled (value: {value})
          </p>
          <ToggleGroup
            type="single"
            variant="contained"
            value={value}
            onValueChange={(val: string) => {
              console.log("Controlled value changed:", val);
              setValue(val);
            }}
          >
            <ToggleGroupItem value="1d">1D</ToggleGroupItem>
            <ToggleGroupItem value="1w">1W</ToggleGroupItem>
            <ToggleGroupItem value="1m">1M</ToggleGroupItem>
            <ToggleGroupItem value="1y">1Y</ToggleGroupItem>
          </ToggleGroup>
        </div>
      );
    };

    const ControlledRequiredExample = () => {
      const [value, setValue] = useState("1w");
      return (
        <div className="space-y-2">
          <p className="text-muted-foreground text-sm">
            Controlled + Required (value: {value})
          </p>
          <ToggleGroup
            type="single"
            variant="contained"
            required
            value={value}
            onValueChange={(val: string) => {
              console.log("Controlled required value changed:", val);
              setValue(val);
            }}
          >
            <ToggleGroupItem value="1d">1D</ToggleGroupItem>
            <ToggleGroupItem value="1w">1W</ToggleGroupItem>
            <ToggleGroupItem value="1m">1M</ToggleGroupItem>
            <ToggleGroupItem value="1y">1Y</ToggleGroupItem>
          </ToggleGroup>
        </div>
      );
    };

    return (
      <div className="flex flex-col gap-8">
        <ControlledExample />
        <ControlledRequiredExample />
        <div className="space-y-2">
          <p className="text-muted-foreground text-sm">
            Uncontrolled (using defaultValue)
          </p>
          <ToggleGroup
            type="single"
            variant="contained"
            defaultValue="1m"
            onValueChange={(val: string) =>
              console.log("Uncontrolled value changed:", val)
            }
          >
            <ToggleGroupItem value="1d">1D</ToggleGroupItem>
            <ToggleGroupItem value="1w">1W</ToggleGroupItem>
            <ToggleGroupItem value="1m">1M</ToggleGroupItem>
            <ToggleGroupItem value="1y">1Y</ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>
    );
  },
};
