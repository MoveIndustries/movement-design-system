import type { Meta, StoryObj } from "@storybook/react-vite";
import { Logo, LogoMark, Wordmark } from "../components/Logo";

/**
 * Movement brand logos. All three paint with `currentColor`, so a single
 * component covers every color: set it via a text utility (`text-black`,
 * `text-white`), a brand token, or an inline `style={{ color }}`. Size with a
 * height utility (`h-8`, `h-12`) — width scales from the viewBox.
 */
const meta = {
  title: "movement-design-system/Logo",
  component: Logo,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof Logo>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Full lockup — the default logo. */
export const LogoLockup: Story = {
  args: { title: "Movement", className: "h-10 text-black dark:text-white" },
};

/** Standalone mark — app icons, avatars, favicons. */
export const Mark: Story = {
  render: () => <LogoMark title="Movement" className="h-14 text-black dark:text-white" />,
};

/** Wordmark only — when the brand is already established on the page. */
export const WordmarkOnly: Story = {
  render: () => <Wordmark title="Movement" className="h-6 text-black dark:text-white" />,
};

/** `currentColor` in action: the same components on light, dark, and brand backgrounds. */
export const OnColors: Story = {
  render: () => (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <div className="flex items-center justify-center rounded-xl bg-white p-8">
        <Logo title="Movement" className="h-8 text-black" />
      </div>
      <div className="flex items-center justify-center rounded-xl bg-black p-8">
        <Logo title="Movement" className="h-8 text-white" />
      </div>
      <div className="bg-primary flex items-center justify-center rounded-xl p-8">
        <LogoMark title="Movement" className="h-12 text-black" />
      </div>
    </div>
  ),
};
