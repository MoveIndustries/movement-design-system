import type { Meta, StoryObj } from "@storybook/react-vite";
import { Footer } from "../components/Footer";

const meta = {
  title: "movement-design-system/Footer",
  component: Footer,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    copyright: {
      control: "text",
      description: "Copyright text (defaults to \"Movement © {currentYear}\")",
    },
    brandLabel: {
      control: "text",
      description: "Brand wordmark text next to the monogram",
    },
    brandHref: {
      control: "text",
      description: "Href for the brand lockup",
    },
  },
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default — the unified Movement footer with built-in links
export const Default: Story = {
  args: {},
};

// Custom copyright text
export const CustomCopyright: Story = {
  args: {
    copyright: "Movement © 2026",
  },
};

// Custom navigation columns
export const CustomColumns: Story = {
  args: {
    columns: [
      {
        title: "Products",
        links: [
          { label: "Bridge", href: "#" },
          { label: "Stake", href: "#" },
          { label: "Explorer", href: "#" },
        ],
      },
      {
        title: "Developers",
        links: [
          { label: "Docs", href: "#" },
          { label: "API Reference", href: "#" },
          { label: "GitHub", href: "#", external: true },
        ],
      },
      {
        title: "Resources",
        links: [
          { label: "Guides & FAQ", href: "#" },
          { label: "Insights", href: "#" },
        ],
      },
    ],
  },
};

// Custom social links (e.g. adding Reddit)
export const CustomSocialLinks: Story = {
  args: {
    socialLinks: [
      { platform: "x", href: "https://x.com/example" },
      { platform: "discord", href: "https://discord.gg/example" },
      { platform: "github", href: "https://github.com/example" },
      { platform: "reddit", href: "https://reddit.com/r/example" },
    ],
  },
};

// Mobile viewport — verifies the stacked layout below the `md` breakpoint
export const Mobile: Story = {
  args: {},
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
};
