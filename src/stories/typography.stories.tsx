import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta = {
  title: "Design System/Typography",
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj;

const FontWeightSample = ({
  label,
  className,
}: {
  label: string;
  className: string;
}) => (
  <div className="mb-8">
    <p className="text-sm text-muted-foreground mb-2">{label}</p>
    <p className={className}>Movement Design System</p>
  </div>
);

export const Default: Story = {
  render: () => (
    <div className="p-8 bg-background max-w-4xl">
      <h1 className="text-5xl font-bold font-heading mb-4">Typography Usage</h1>
      <p className="text-lg font-body mb-8 text-muted-foreground">
        Examples of how to use the design system fonts in your application
      </p>

      <div className="space-y-12">
        <section>
          <h2 className="text-3xl font-bold font-heading mb-4">
            Heading Example
          </h2>
          <p className="text-base font-body leading-relaxed">
            Use{" "}
            <code className="font-mono bg-muted px-2 py-1 rounded">
              font-heading
            </code>{" "}
            for all headings. The TWK Everett font family is designed for
            impactful titles and headers.
          </p>
          <div className="mt-4 p-6 bg-muted rounded-lg">
            <h1 className="text-4xl font-bold font-heading mb-2">H1 Heading</h1>
            <h2 className="text-3xl font-bold font-heading mb-2">H2 Heading</h2>
            <h3 className="text-2xl font-bold font-heading mb-2">H3 Heading</h3>
            <h4 className="text-xl font-bold font-heading mb-2">H4 Heading</h4>
            <h5 className="text-lg font-bold font-heading mb-2">H5 Heading</h5>
            <h6 className="text-base font-bold font-heading">H6 Heading</h6>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold font-heading mb-4">
            Body Text Example
          </h2>
          <p className="text-base font-body leading-relaxed">
            Use{" "}
            <code className="font-mono bg-muted px-2 py-1 rounded">
              font-body
            </code>{" "}
            for all body text, paragraphs, and general content. Neue Haas Unica
            Pro provides excellent readability.
          </p>
          <div className="mt-4 p-6 bg-muted rounded-lg space-y-4">
            <p className="text-xl font-body font-bold">
              This is bold body text at xl size (20px)
            </p>
            <p className="text-base font-body font-medium">
              This is medium body text at base size (16px). Lorem ipsum dolor
              sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.
            </p>
            <p className="text-sm font-body">
              This is regular body text at sm size (14px). Ut enim ad minim
              veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
              ex ea commodo consequat.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold font-heading mb-4">
            Monospace Example
          </h2>
          <p className="text-base font-body leading-relaxed">
            Use{" "}
            <code className="font-mono bg-muted px-2 py-1 rounded">
              font-mono
            </code>{" "}
            for code snippets, technical labels, and data displays. TWK Everett
            Mono is perfect for technical content.
          </p>
          <div className="mt-4 p-6 bg-muted rounded-lg space-y-4">
            <pre className="font-mono text-sm font-normal bg-background p-4 rounded overflow-x-auto">
              {`const greeting = "Hello, World!";
console.log(greeting);`}
            </pre>
            <p className="font-mono text-base font-bold uppercase tracking-wider">
              API Response: 200 OK
            </p>
            <p className="font-mono text-sm font-medium">
              Status Code: <span className="font-bold">SUCCESS</span>
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold font-heading mb-4">
            Tailwind Classes
          </h2>
          <div className="space-y-2 text-sm font-body">
            <p>
              <code className="font-mono bg-muted px-2 py-1 rounded">
                font-heading
              </code>{" "}
              - TWK Everett (Headings)
            </p>
            <p>
              <code className="font-mono bg-muted px-2 py-1 rounded">
                font-body
              </code>{" "}
              - Neue Haas Unica Pro (Body)
            </p>
            <p>
              <code className="font-mono bg-muted px-2 py-1 rounded">
                font-mono
              </code>{" "}
              - TWK Everett Mono (Code)
            </p>
          </div>
        </section>
      </div>
    </div>
  ),
};

export const HeadingFonts: Story = {
  render: () => (
    <div className="p-8 bg-background">
      <h2 className="text-3xl font-bold mb-8 font-heading">
        TWK Everett - Heading Font
      </h2>

      <div className="space-y-8">
        <div>
          <p className="text-sm text-muted-foreground mb-4">
            Desktop Sizes (lg, xl, 2xl breakpoints)
          </p>
          <div className="space-y-6">
            <FontWeightSample
              label="7xl - 80px"
              className="text-[80px] leading-none font-heading font-bold"
            />
            <FontWeightSample
              label="6xl - 64px"
              className="text-[64px] leading-[1.2] font-heading font-bold"
            />
            <FontWeightSample
              label="5xl - 48px"
              className="text-5xl leading-[1.2] font-heading font-bold"
            />
            <FontWeightSample
              label="4xl - 40px"
              className="text-4xl leading-[1.2] font-heading font-bold"
            />
            <FontWeightSample
              label="3xl - 32px"
              className="text-3xl leading-[1.2] font-heading font-bold"
            />
            <FontWeightSample
              label="2xl - 24px"
              className="text-2xl leading-[1.3] font-heading font-bold"
            />
            <FontWeightSample
              label="lg - 18px"
              className="text-lg leading-[1.3] font-heading font-bold"
            />
            <FontWeightSample
              label="sm - 14px"
              className="text-sm leading-[1.4] font-heading font-bold"
            />
            <FontWeightSample
              label="xs - 12px"
              className="text-xs leading-normal font-heading font-bold"
            />
          </div>
        </div>

        <div>
          <p className="text-sm text-muted-foreground mb-4">
            Mobile Sizes (md, sm breakpoints)
          </p>
          <div className="space-y-6">
            <FontWeightSample
              label="6xl - 64px"
              className="text-[64px] leading-[1.2] tracking-[0.7px] font-heading font-bold"
            />
            <FontWeightSample
              label="5xl - 48px"
              className="text-5xl leading-[1.2] tracking-[0.7px] font-heading font-bold"
            />
            <FontWeightSample
              label="4xl - 40px"
              className="text-4xl leading-[1.2] tracking-[0.7px] font-heading font-bold"
            />
            <FontWeightSample
              label="3xl - 32px"
              className="text-3xl leading-tight tracking-[0.7px] font-heading font-bold"
            />
            <FontWeightSample
              label="2xl - 24px"
              className="text-2xl leading-[1.3] tracking-[0.7px] font-heading font-bold"
            />
            <FontWeightSample
              label="lg - 18px"
              className="text-lg leading-[1.3] tracking-[0.7px] font-heading font-bold"
            />
            <FontWeightSample
              label="sm - 14px"
              className="text-sm leading-[1.4] tracking-[0.7px] font-heading font-bold"
            />
            <FontWeightSample
              label="xs - 12px"
              className="text-xs leading-normal tracking-[0.7px] font-heading font-bold"
            />
          </div>
        </div>
      </div>
    </div>
  ),
};

export const BodyFonts: Story = {
  render: () => (
    <div className="p-8 bg-background">
      <h2 className="text-3xl font-bold mb-8 font-heading">
        Neue Haas Unica Pro - Body Font
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        <div>
          <p className="text-sm text-muted-foreground mb-4 font-bold">
            Bold (700)
          </p>
          <div className="space-y-4">
            <FontWeightSample
              label="3xl - 32px"
              className="text-3xl leading-[1.3] font-body font-bold"
            />
            <FontWeightSample
              label="2xl - 24px"
              className="text-2xl leading-[1.3] font-body font-bold"
            />
            <FontWeightSample
              label="xl - 20px"
              className="text-xl leading-[1.4] font-body font-bold"
            />
            <FontWeightSample
              label="lg - 18px"
              className="text-lg leading-[1.3] font-body font-bold"
            />
            <FontWeightSample
              label="md - 16px"
              className="text-base leading-normal font-body font-bold"
            />
            <FontWeightSample
              label="sm - 14px"
              className="text-sm leading-[1.4] font-body font-bold"
            />
            <FontWeightSample
              label="xs - 12px"
              className="text-xs leading-[1.3] font-body font-bold"
            />
          </div>
        </div>

        <div>
          <p className="text-sm text-muted-foreground mb-4 font-medium">
            Medium (500)
          </p>
          <div className="space-y-4">
            <FontWeightSample
              label="3xl - 32px"
              className="text-3xl leading-[1.3] font-body font-medium"
            />
            <FontWeightSample
              label="2xl - 24px"
              className="text-2xl leading-[1.3] font-body font-medium"
            />
            <FontWeightSample
              label="xl - 20px"
              className="text-xl leading-[1.4] font-body font-medium"
            />
            <FontWeightSample
              label="lg - 18px"
              className="text-lg leading-[1.3] font-body font-medium"
            />
            <FontWeightSample
              label="md - 16px"
              className="text-base leading-[1.4] font-body font-medium"
            />
            <FontWeightSample
              label="sm - 14px"
              className="text-sm leading-[1.4] font-body font-medium"
            />
            <FontWeightSample
              label="xs - 12px"
              className="text-xs leading-[1.3] font-body font-medium"
            />
          </div>
        </div>

        <div>
          <p className="text-sm text-muted-foreground mb-4 font-normal">
            Regular (400)
          </p>
          <div className="space-y-4">
            <FontWeightSample
              label="3xl - 32px"
              className="text-3xl leading-[1.3] font-body font-normal"
            />
            <FontWeightSample
              label="2xl - 24px"
              className="text-2xl leading-[1.3] font-body font-normal"
            />
            <FontWeightSample
              label="xl - 20px"
              className="text-xl leading-[1.4] font-body font-normal"
            />
            <FontWeightSample
              label="lg - 18px"
              className="text-lg leading-[1.4] font-body font-normal"
            />
            <FontWeightSample
              label="md - 16px"
              className="text-base leading-[1.4] font-body font-normal"
            />
            <FontWeightSample
              label="sm - 14px"
              className="text-sm leading-[1.4] font-body font-normal"
            />
            <FontWeightSample
              label="xs - 12px"
              className="text-xs leading-[1.3] font-body font-normal"
            />
          </div>
        </div>
      </div>

      <div className="mt-12">
        <p className="text-sm text-muted-foreground mb-4 font-bold">
          Uppercase (Bold, with letter spacing)
        </p>
        <div className="space-y-4">
          <FontWeightSample
            label="xl - 20px"
            className="text-xl leading-[1.4] tracking-[2px] font-body font-bold uppercase"
          />
          <FontWeightSample
            label="lg - 18px"
            className="text-lg leading-[1.3] tracking-[1.8px] font-body font-bold uppercase"
          />
          <FontWeightSample
            label="md - 16px"
            className="text-base leading-[1.3] tracking-[1.6px] font-body font-bold uppercase"
          />
          <FontWeightSample
            label="sm - 14px"
            className="text-sm leading-[1.4] tracking-[1.4px] font-body font-bold uppercase"
          />
          <FontWeightSample
            label="xs - 12px"
            className="text-xs leading-[1.3] tracking-[1.2px] font-body font-bold uppercase"
          />
        </div>
      </div>
    </div>
  ),
};

export const MonoFonts: Story = {
  render: () => (
    <div className="p-8 bg-background">
      <h2 className="text-3xl font-bold mb-8 font-heading">
        TWK Everett Mono - Monospace Font
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        <div>
          <p className="text-sm text-muted-foreground mb-4 font-bold">
            Bold (700)
          </p>
          <div className="space-y-4">
            <FontWeightSample
              label="6xl - 64px"
              className="text-[64px] leading-[1.2] font-mono font-bold uppercase"
            />
            <FontWeightSample
              label="5xl - 48px"
              className="text-5xl leading-[1.3] font-mono font-bold uppercase"
            />
            <FontWeightSample
              label="4xl - 40px"
              className="text-4xl leading-[1.3] font-mono font-bold uppercase"
            />
            <FontWeightSample
              label="3xl - 32px"
              className="text-3xl leading-[1.4] font-mono font-bold uppercase"
            />
            <FontWeightSample
              label="2xl - 24px"
              className="text-2xl leading-[1.4] font-mono font-bold uppercase"
            />
            <FontWeightSample
              label="xl - 20px"
              className="text-xl leading-[1.4] tracking-[0.4px] font-mono font-bold uppercase"
            />
            <FontWeightSample
              label="md - 16px"
              className="text-base leading-[1.4] tracking-[0.32px] font-mono font-bold uppercase"
            />
            <FontWeightSample
              label="sm - 14px"
              className="text-sm leading-[1.4] tracking-[0.56px] font-mono font-bold uppercase"
            />
            <FontWeightSample
              label="xs - 12px"
              className="text-xs leading-[1.4] tracking-[0.48px] font-mono font-bold uppercase"
            />
          </div>
        </div>

        <div>
          <p className="text-sm text-muted-foreground mb-4 font-medium">
            Medium (500)
          </p>
          <div className="space-y-4">
            <FontWeightSample
              label="6xl - 64px"
              className="text-[64px] leading-[1.2] font-mono font-medium uppercase"
            />
            <FontWeightSample
              label="5xl - 48px"
              className="text-5xl leading-[1.3] font-mono font-medium uppercase"
            />
            <FontWeightSample
              label="4xl - 40px"
              className="text-4xl leading-[1.3] font-mono font-medium uppercase"
            />
            <FontWeightSample
              label="3xl - 32px"
              className="text-3xl leading-[1.4] tracking-[0.64px] font-mono font-medium uppercase"
            />
            <FontWeightSample
              label="2xl - 24px"
              className="text-2xl leading-[1.4] tracking-[0.48px] font-mono font-medium uppercase"
            />
            <FontWeightSample
              label="xl - 20px"
              className="text-xl leading-[1.4] tracking-[0.4px] font-mono font-medium uppercase"
            />
            <FontWeightSample
              label="md - 16px"
              className="text-base leading-[1.4] tracking-[0.64px] font-mono font-medium uppercase"
            />
            <FontWeightSample
              label="sm - 14px"
              className="text-sm leading-[1.4] tracking-[0.56px] font-mono font-medium uppercase"
            />
            <FontWeightSample
              label="xs - 12px"
              className="text-xs leading-[1.4] tracking-[0.48px] font-mono font-medium uppercase"
            />
          </div>
        </div>

        <div>
          <p className="text-sm text-muted-foreground mb-4 font-normal">
            Regular (400)
          </p>
          <div className="space-y-4">
            <FontWeightSample
              label="6xl - 64px"
              className="text-[64px] leading-[1.2] font-mono font-normal uppercase"
            />
            <FontWeightSample
              label="5xl - 48px"
              className="text-5xl leading-[1.3] font-mono font-normal uppercase"
            />
            <FontWeightSample
              label="4xl - 40px"
              className="text-4xl leading-[1.3] font-mono font-normal uppercase"
            />
            <FontWeightSample
              label="3xl - 32px"
              className="text-3xl leading-[1.4] tracking-[0.64px] font-mono font-normal uppercase"
            />
            <FontWeightSample
              label="2xl - 24px"
              className="text-2xl leading-[1.4] tracking-[0.48px] font-mono font-normal uppercase"
            />
            <FontWeightSample
              label="xl - 20px"
              className="text-xl leading-[1.4] tracking-[0.4px] font-mono font-normal uppercase"
            />
            <FontWeightSample
              label="md - 16px"
              className="text-base leading-[1.4] tracking-[0.64px] font-mono font-normal uppercase"
            />
            <FontWeightSample
              label="sm - 14px"
              className="text-sm leading-[1.4] tracking-[0.56px] font-mono font-normal uppercase"
            />
            <FontWeightSample
              label="xs - 12px"
              className="text-xs leading-[1.4] tracking-[0.48px] font-mono font-normal uppercase"
            />
          </div>
        </div>

        <div>
          <p className="text-sm text-muted-foreground mb-4 font-light">
            Light (300)
          </p>
          <div className="space-y-4">
            <FontWeightSample
              label="6xl - 64px"
              className="text-[64px] leading-[1.2] font-mono font-light uppercase"
            />
            <FontWeightSample
              label="5xl - 48px"
              className="text-5xl leading-[1.3] font-mono font-light uppercase"
            />
            <FontWeightSample
              label="4xl - 40px"
              className="text-4xl leading-[1.3] font-mono font-light uppercase"
            />
            <FontWeightSample
              label="3xl - 32px"
              className="text-3xl leading-[1.4] tracking-[0.64px] font-mono font-light uppercase"
            />
            <FontWeightSample
              label="2xl - 24px"
              className="text-2xl leading-[1.4] tracking-[0.48px] font-mono font-light uppercase"
            />
            <FontWeightSample
              label="xl - 20px"
              className="text-xl leading-[1.4] tracking-[0.4px] font-mono font-light uppercase"
            />
            <FontWeightSample
              label="md - 16px"
              className="text-base leading-[1.4] tracking-[0.32px] font-mono font-light uppercase"
            />
            <FontWeightSample
              label="sm - 14px"
              className="text-sm leading-[1.4] tracking-[0.56px] font-mono font-light uppercase"
            />
            <FontWeightSample
              label="xs - 12px"
              className="text-xs leading-[1.4] tracking-[0.48px] font-mono font-light uppercase"
            />
          </div>
        </div>
      </div>
    </div>
  ),
};
