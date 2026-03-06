import type { Meta, StoryObj } from "@storybook/react-vite";
import { Footer, DesktopFooter, MobileFooter } from "../components/Footer";

const meta = {
  title: "movement-design-system/Footer",
  component: Footer,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    showHeading: {
      control: "boolean",
      description: "Whether to show the heading tagline",
    },
    heading: {
      control: "text",
      description: "Custom heading text",
    },
    copyright: {
      control: "text",
      description: "Copyright text",
    },
  },
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story - responsive wrapper
export const Default: Story = {
  args: {
    showHeading: true,
  },
};

// Without heading
export const WithoutHeading: Story = {
  args: {
    showHeading: false,
  },
};

// Custom heading
export const CustomHeading: Story = {
  args: {
    heading: "Building the future of decentralized finance.",
    showHeading: true,
  },
};

// Custom columns
export const CustomColumns: Story = {
  args: {
    showHeading: true,
    columns: [
      {
        title: "Products",
        links: [
          { label: "Wallet", href: "#" },
          { label: "Exchange", href: "#" },
          { label: "Bridge", href: "#" },
        ],
      },
      {
        title: "Developers",
        links: [
          { label: "Documentation", href: "#" },
          { label: "API Reference", href: "#" },
          { label: "GitHub", href: "#" },
          { label: "SDK", href: "#" },
        ],
      },
      {
        title: "Legal",
        links: [
          { label: "Terms of Service", href: "#" },
          { label: "Privacy Policy", href: "#" },
          { label: "Cookie Policy", href: "#" },
        ],
      },
    ],
  },
};

// Custom social links
export const CustomSocialLinks: Story = {
  args: {
    showHeading: true,
    socialLinks: [
      { platform: "x", href: "https://x.com/example" },
      { platform: "github", href: "https://github.com/example" },
      { platform: "discord", href: "https://discord.gg/example" },
    ],
  },
};

// =============================================================================
// DESKTOP FOOTER STORIES
// =============================================================================

export const Desktop: Story = {
  render: (args) => (
    <DesktopFooter
      showHeading={args.showHeading ?? true}
      heading={args.heading ?? "Serving the People's Chain. powered by Move."}
      columns={args.columns ?? [
        {
          title: "Company",
          links: [
            { label: "About", href: "#" },
            { label: "Blog", href: "#" },
            { label: "Careers", href: "#" },
            { label: "Privacy Policy", href: "#" },
          ],
        },
        {
          title: "Resources",
          links: [
            { label: "White Paper", href: "#" },
            { label: "Marketplace", href: "#" },
            { label: "Move Docs", href: "#" },
            { label: "Developer Portal", href: "#" },
          ],
        },
        {
          title: "Contact",
          links: [
            { label: "Contact Us", href: "#" },
            { label: "FAQs", href: "#" },
            { label: "Support", href: "#" },
          ],
        },
      ]}
      socialLinks={args.socialLinks ?? [
        { platform: "x", href: "#" },
        { platform: "telegram", href: "#" },
        { platform: "discord", href: "#" },
        { platform: "reddit", href: "#" },
        { platform: "linkedin", href: "#" },
        { platform: "github", href: "#" },
      ]}
      copyright={args.copyright ?? "© 2026 Movement Network Foundation. All rights reserved."}
    />
  ),
  args: {
    showHeading: true,
  },
};

export const DesktopWithoutHeading: Story = {
  render: (args) => (
    <DesktopFooter
      showHeading={false}
      heading=""
      columns={args.columns ?? [
        {
          title: "Company",
          links: [
            { label: "About", href: "#" },
            { label: "Blog", href: "#" },
            { label: "Careers", href: "#" },
            { label: "Privacy Policy", href: "#" },
          ],
        },
        {
          title: "Resources",
          links: [
            { label: "White Paper", href: "#" },
            { label: "Marketplace", href: "#" },
            { label: "Move Docs", href: "#" },
            { label: "Developer Portal", href: "#" },
          ],
        },
        {
          title: "Contact",
          links: [
            { label: "Contact Us", href: "#" },
            { label: "FAQs", href: "#" },
            { label: "Support", href: "#" },
          ],
        },
      ]}
      socialLinks={[
        { platform: "x", href: "#" },
        { platform: "telegram", href: "#" },
        { platform: "discord", href: "#" },
        { platform: "reddit", href: "#" },
        { platform: "linkedin", href: "#" },
        { platform: "github", href: "#" },
      ]}
      copyright="© 2026 Movement Network Foundation. All rights reserved."
    />
  ),
};

// =============================================================================
// MOBILE FOOTER STORIES
// =============================================================================

export const Mobile: Story = {
  render: (args) => (
    <div className="max-w-[402px]">
      <MobileFooter
        showHeading={args.showHeading ?? true}
        heading={args.heading ?? "Serving the People's Chain. powered by Move."}
        columns={args.columns ?? [
          {
            title: "Company",
            links: [
              { label: "About", href: "#" },
              { label: "Blog", href: "#" },
              { label: "Careers", href: "#" },
              { label: "Privacy Policy", href: "#" },
            ],
          },
          {
            title: "Resources",
            links: [
              { label: "White Paper", href: "#" },
              { label: "Marketplace", href: "#" },
              { label: "Move Docs", href: "#" },
              { label: "Developer Portal", href: "#" },
            ],
          },
          {
            title: "Contact",
            links: [
              { label: "Contact Us", href: "#" },
              { label: "FAQs", href: "#" },
              { label: "Support", href: "#" },
            ],
          },
        ]}
        socialLinks={args.socialLinks ?? [
          { platform: "x", href: "#" },
          { platform: "telegram", href: "#" },
          { platform: "discord", href: "#" },
          { platform: "reddit", href: "#" },
          { platform: "linkedin", href: "#" },
          { platform: "github", href: "#" },
        ]}
        copyright={args.copyright ?? "© 2026 Movement Network Foundation. All rights reserved."}
      />
    </div>
  ),
  args: {
    showHeading: true,
  },
};

export const MobileWithoutHeading: Story = {
  render: (args) => (
    <div className="max-w-[402px]">
      <MobileFooter
        showHeading={false}
        heading=""
        columns={args.columns ?? [
          {
            title: "Company",
            links: [
              { label: "About", href: "#" },
              { label: "Blog", href: "#" },
              { label: "Careers", href: "#" },
              { label: "Privacy Policy", href: "#" },
            ],
          },
          {
            title: "Resources",
            links: [
              { label: "White Paper", href: "#" },
              { label: "Marketplace", href: "#" },
              { label: "Move Docs", href: "#" },
              { label: "Developer Portal", href: "#" },
            ],
          },
          {
            title: "Contact",
            links: [
              { label: "Contact Us", href: "#" },
              { label: "FAQs", href: "#" },
              { label: "Support", href: "#" },
            ],
          },
        ]}
        socialLinks={[
          { platform: "x", href: "#" },
          { platform: "telegram", href: "#" },
          { platform: "discord", href: "#" },
          { platform: "reddit", href: "#" },
          { platform: "linkedin", href: "#" },
          { platform: "github", href: "#" },
        ]}
        copyright="© 2026 Movement Network Foundation. All rights reserved."
      />
    </div>
  ),
};

// =============================================================================
// COMPARISON STORIES
// =============================================================================

export const SideBySide: Story = {
  render: () => (
    <div className="flex flex-col gap-12 p-8">
      <div>
        <h3 className="mb-4 text-lg font-semibold text-white/60">Desktop Footer</h3>
        <DesktopFooter
          showHeading={true}
          heading="Serving the People's Chain. powered by Move."
          columns={[
            {
              title: "Company",
              links: [
                { label: "About", href: "#" },
                { label: "Blog", href: "#" },
                { label: "Careers", href: "#" },
                { label: "Privacy Policy", href: "#" },
              ],
            },
            {
              title: "Resources",
              links: [
                { label: "White Paper", href: "#" },
                { label: "Marketplace", href: "#" },
                { label: "Move Docs", href: "#" },
                { label: "Developer Portal", href: "#" },
              ],
            },
            {
              title: "Contact",
              links: [
                { label: "Contact Us", href: "#" },
                { label: "FAQs", href: "#" },
                { label: "Support", href: "#" },
              ],
            },
          ]}
          socialLinks={[
            { platform: "x", href: "#" },
            { platform: "telegram", href: "#" },
            { platform: "discord", href: "#" },
            { platform: "reddit", href: "#" },
            { platform: "linkedin", href: "#" },
            { platform: "github", href: "#" },
          ]}
          copyright="© 2026 Movement Network Foundation. All rights reserved."
        />
      </div>
      <div>
        <h3 className="mb-4 text-lg font-semibold text-white/60">Mobile Footer (402px)</h3>
        <div className="max-w-[402px]">
          <MobileFooter
            showHeading={true}
            heading="Serving the People's Chain. powered by Move."
            columns={[
              {
                title: "Company",
                links: [
                  { label: "About", href: "#" },
                  { label: "Blog", href: "#" },
                  { label: "Careers", href: "#" },
                  { label: "Privacy Policy", href: "#" },
                ],
              },
              {
                title: "Resources",
                links: [
                  { label: "White Paper", href: "#" },
                  { label: "Marketplace", href: "#" },
                  { label: "Move Docs", href: "#" },
                  { label: "Developer Portal", href: "#" },
                ],
              },
              {
                title: "Contact",
                links: [
                  { label: "Contact Us", href: "#" },
                  { label: "FAQs", href: "#" },
                  { label: "Support", href: "#" },
                ],
              },
            ]}
            socialLinks={[
              { platform: "x", href: "#" },
              { platform: "telegram", href: "#" },
              { platform: "discord", href: "#" },
              { platform: "reddit", href: "#" },
              { platform: "linkedin", href: "#" },
              { platform: "github", href: "#" },
            ]}
            copyright="© 2026 Movement Network Foundation. All rights reserved."
          />
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: "padded",
  },
};
