import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import EcosystemPagination from "./Pagination";

const meta: Meta<typeof EcosystemPagination> = {
  title: "Components/Pagination",
  component: EcosystemPagination,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    currentPage: {
      control: { type: "number", min: 1 },
      description: "Current active page",
    },
    totalPages: {
      control: { type: "number", min: 1 },
      description: "Total number of pages",
    },
    onPageChange: {
      action: "pageChanged",
      description: "Callback when page changes",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    currentPage: 1,
    totalPages: 10,
  },
};

export const MiddlePage: Story = {
  args: {
    currentPage: 5,
    totalPages: 10,
  },
};

export const LastPage: Story = {
  args: {
    currentPage: 10,
    totalPages: 10,
  },
};

export const FewPages: Story = {
  args: {
    currentPage: 2,
    totalPages: 3,
  },
};

export const ManyPages: Story = {
  args: {
    currentPage: 50,
    totalPages: 100,
  },
};

export const SinglePage: Story = {
  args: {
    currentPage: 1,
    totalPages: 1,
  },
};

export const LargePageCount: Story = {
  args: {
    currentPage: 25,
    totalPages: 50,
  },
};

export const Interactive: Story = {
  render: (args) => {
    const [currentPage, setCurrentPage] = React.useState(args.currentPage || 1);

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "16px",
        }}
      >
        <div style={{ fontSize: "14px", color: "#666" }}>
          Current Page: {currentPage} of {args.totalPages}
        </div>
        <EcosystemPagination
          currentPage={currentPage}
          totalPages={args.totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    );
  },
  args: {
    currentPage: 1,
    totalPages: 15,
  },
};

export const AllExamples: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      <div>
        <h3
          style={{ marginBottom: "12px", fontSize: "14px", fontWeight: "500" }}
        >
          Few Pages (3 total)
        </h3>
        <EcosystemPagination
          currentPage={2}
          totalPages={3}
          onPageChange={(page) => console.log("Page changed to:", page)}
        />
      </div>

      <div>
        <h3
          style={{ marginBottom: "12px", fontSize: "14px", fontWeight: "500" }}
        >
          Medium Pages (10 total)
        </h3>
        <EcosystemPagination
          currentPage={5}
          totalPages={10}
          onPageChange={(page) => console.log("Page changed to:", page)}
        />
      </div>

      <div>
        <h3
          style={{ marginBottom: "12px", fontSize: "14px", fontWeight: "500" }}
        >
          Many Pages (50 total)
        </h3>
        <EcosystemPagination
          currentPage={25}
          totalPages={50}
          onPageChange={(page) => console.log("Page changed to:", page)}
        />
      </div>
    </div>
  ),
};
