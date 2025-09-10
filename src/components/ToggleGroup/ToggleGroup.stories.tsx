import type { Meta, StoryObj } from "@storybook/react";
import FilterToggleGroup from "./ToggleGroup";

const meta: Meta<typeof FilterToggleGroup> = {
  title: "Components/ToggleGroup",
  component: FilterToggleGroup,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    options: {
      control: "object",
      description: "Array of options with value and label",
    },
    defaultValue: {
      control: "text",
      description: "Default selected value",
    },
    value: {
      control: "text",
      description: "Controlled value",
    },
    onChange: {
      action: "changed",
      description: "Callback when selection changes",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultOptions = [
  { value: "all", label: "All" },
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
];

const filterOptions = [
  { value: "recent", label: "Recent" },
  { value: "popular", label: "Popular" },
  { value: "trending", label: "Trending" },
];

const categoryOptions = [
  { value: "technology", label: "Technology" },
  { value: "design", label: "Design" },
  { value: "business", label: "Business" },
  { value: "marketing", label: "Marketing" },
];

export const Default: Story = {
  args: {
    options: defaultOptions,
    defaultValue: "all",
  },
};

export const WithDefaultValue: Story = {
  args: {
    options: defaultOptions,
    defaultValue: "active",
  },
};

export const FilterOptions: Story = {
  args: {
    options: filterOptions,
    defaultValue: "recent",
  },
};

export const CategoryOptions: Story = {
  args: {
    options: categoryOptions,
    defaultValue: "technology",
  },
};

export const Controlled: Story = {
  args: {
    options: defaultOptions,
    value: "inactive",
  },
};

export const MultipleGroups: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div>
        <h3
          style={{ marginBottom: "12px", fontSize: "14px", fontWeight: "500" }}
        >
          Status Filter
        </h3>
        <FilterToggleGroup
          options={defaultOptions}
          defaultValue="all"
          onChange={(value) => console.log("Status changed:", value)}
        />
      </div>

      <div>
        <h3
          style={{ marginBottom: "12px", fontSize: "14px", fontWeight: "500" }}
        >
          Sort Options
        </h3>
        <FilterToggleGroup
          options={filterOptions}
          defaultValue="recent"
          onChange={(value) => console.log("Sort changed:", value)}
        />
      </div>

      <div>
        <h3
          style={{ marginBottom: "12px", fontSize: "14px", fontWeight: "500" }}
        >
          Categories
        </h3>
        <FilterToggleGroup
          options={categoryOptions}
          defaultValue="technology"
          onChange={(value) => console.log("Category changed:", value)}
        />
      </div>
    </div>
  ),
};

export const WithIcons: Story = {
  args: {
    options: [
      { value: "grid", label: "Grid View" },
      { value: "list", label: "List View" },
      { value: "table", label: "Table View" },
    ],
    defaultValue: "grid",
  },
  parameters: {
    docs: {
      description: {
        story:
          "This example shows how the component works with icons. The icons are loaded from `/icons/` directory.",
      },
    },
  },
};
