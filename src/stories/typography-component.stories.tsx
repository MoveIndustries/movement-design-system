import type { Meta, StoryObj } from "@storybook/react-vite";
import { Typography } from "../components/ui/typography";

const meta: Meta<typeof Typography> = {
  title: "Components/Typography",
  component: Typography,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "p",
        "lead",
        "large",
        "small",
        "muted",
        "blockquote",
        "code",
        "list",
        "inlineCode",
        "label",
        "mono",
        "uppercase",
      ],
      description: "The visual style variant of the typography element",
    },
    as: {
      control: "text",
      description: "Override the default HTML element",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Typography>;

export const Default: Story = {
  args: {
    variant: "p",
    children: "This is a paragraph using the Typography component.",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-8 max-w-4xl">
      <div>
        <Typography variant="h1">Heading 1</Typography>
        <Typography variant="muted" className="mt-2">
          Default heading style with TWK Everett font
        </Typography>
      </div>

      <div>
        <Typography variant="h2">Heading 2</Typography>
        <Typography variant="muted" className="mt-2">
          Secondary heading style
        </Typography>
      </div>

      <div>
        <Typography variant="h3">Heading 3</Typography>
        <Typography variant="muted" className="mt-2">
          Tertiary heading style
        </Typography>
      </div>

      <div>
        <Typography variant="h4">Heading 4</Typography>
        <Typography variant="muted" className="mt-2">
          Fourth level heading
        </Typography>
      </div>

      <div>
        <Typography variant="h5">Heading 5</Typography>
        <Typography variant="muted" className="mt-2">
          Fifth level heading
        </Typography>
      </div>

      <div>
        <Typography variant="h6">Heading 6</Typography>
        <Typography variant="muted" className="mt-2">
          Sixth level heading
        </Typography>
      </div>

      <div>
        <Typography variant="p">
          This is a paragraph of text using the Neue Haas Unica Pro font. It
          provides excellent readability for body content and maintains
          comfortable line height for extended reading.
        </Typography>
      </div>

      <div>
        <Typography variant="lead">
          This is a lead paragraph that stands out from regular body text. Use
          it for introductory content or important highlights.
        </Typography>
      </div>

      <div>
        <Typography variant="large">
          This is large text, perfect for emphasis or subheadings within body
          content.
        </Typography>
      </div>

      <div>
        <Typography variant="small">
          This is small text, useful for captions or secondary information.
        </Typography>
      </div>

      <div>
        <Typography variant="muted">
          This is muted text with reduced emphasis, ideal for helper text or
          less important information.
        </Typography>
      </div>

      <div>
        <Typography variant="blockquote">
          "This is a blockquote. It's styled with italic text and a border on
          the left side, perfect for highlighting quotes or testimonials."
        </Typography>
      </div>

      <div>
        <Typography variant="code">const example = "code block";</Typography>
      </div>

      <div>
        <Typography variant="p">
          This paragraph contains an{" "}
          <Typography variant="inlineCode" as="code">
            inline code snippet
          </Typography>{" "}
          within the text.
        </Typography>
      </div>

      <div>
        <Typography variant="label">Form Label</Typography>
      </div>

      <div>
        <Typography variant="mono">
          This text uses the TWK Everett Mono font, perfect for technical
          content and data.
        </Typography>
      </div>

      <div>
        <Typography variant="uppercase">
          Uppercase text with proper spacing
        </Typography>
      </div>

      <div>
        <Typography variant="list">
          <li>First list item</li>
          <li>Second list item</li>
          <li>Third list item with more content</li>
        </Typography>
      </div>
    </div>
  ),
};

export const Headings: Story = {
  render: () => (
    <div className="space-y-6">
      <Typography variant="h1">
        The quick brown fox jumps over the lazy dog
      </Typography>
      <Typography variant="h2">
        The quick brown fox jumps over the lazy dog
      </Typography>
      <Typography variant="h3">
        The quick brown fox jumps over the lazy dog
      </Typography>
      <Typography variant="h4">
        The quick brown fox jumps over the lazy dog
      </Typography>
      <Typography variant="h5">
        The quick brown fox jumps over the lazy dog
      </Typography>
      <Typography variant="h6">
        The quick brown fox jumps over the lazy dog
      </Typography>
    </div>
  ),
};

export const ArticleExample: Story = {
  render: () => (
    <article className="max-w-3xl space-y-6">
      <Typography variant="h1">
        Understanding Typography in Modern Web Design
      </Typography>

      <Typography variant="lead">
        Typography is more than just selecting beautiful fonts. It's about
        creating hierarchy, improving readability, and enhancing the overall
        user experience of your digital products.
      </Typography>

      <Typography variant="h2">The Importance of Font Selection</Typography>

      <Typography variant="p" affects="removePMargin">
        When choosing fonts for your design system, consider three key factors:
        readability, personality, and performance. Each font should serve a
        specific purpose in your design hierarchy.
      </Typography>

      <Typography variant="p" affects="removePMargin">
        The{" "}
        <Typography variant="inlineCode" as="span">
          font-heading
        </Typography>{" "}
        utility applies TWK Everett, which is perfect for creating impactful
        headlines and establishing visual hierarchy. Meanwhile,{" "}
        <Typography variant="inlineCode" as="span">
          font-body
        </Typography>{" "}
        uses Neue Haas Unica Pro for comfortable, extended reading.
      </Typography>

      <Typography variant="h3">Code and Technical Content</Typography>

      <Typography variant="p" affects="removePMargin">
        For technical documentation and code examples, we use TWK Everett Mono:
      </Typography>

      <Typography variant="code">
        const typography = {"{"}
        {"\n  "}heading: "TWK Everett",
        {"\n  "}body: "Neue Haas Unica Pro",
        {"\n  "}mono: "TWK Everett Mono"
        {"\n"}
        {"}"};
      </Typography>

      <Typography variant="h3">Best Practices</Typography>

      <Typography variant="list">
        <li>Maintain consistent spacing and line height</li>
        <li>Use appropriate font sizes for different viewport sizes</li>
        <li>Ensure sufficient contrast between text and background</li>
        <li>Limit the number of font weights used in a single design</li>
      </Typography>

      <Typography variant="blockquote">
        "Good typography is invisible. Great typography is felt."
      </Typography>

      <Typography variant="muted">
        This article demonstrates the various typography components available in
        the Movement Design System.
      </Typography>
    </article>
  ),
};

export const WithCustomElement: Story = {
  render: () => (
    <div className="space-y-4">
      <Typography variant="h2" as="h1">
        This looks like an H2 but is actually an H1 element
      </Typography>
      <Typography variant="p" as="div">
        This looks like a paragraph but is actually a div element
      </Typography>
      <Typography variant="lead" as="p">
        You can override the semantic HTML element while keeping the styles
      </Typography>
    </div>
  ),
};

export const ColoredText: Story = {
  render: () => (
    <div className="space-y-4">
      <Typography variant="h3" className="text-primary">
        Primary Colored Heading
      </Typography>
      <Typography variant="h3" className="text-secondary">
        Secondary Colored Heading
      </Typography>
      <Typography variant="h3" className="text-destructive">
        Destructive Colored Heading
      </Typography>
      <Typography variant="p" className="text-muted-foreground">
        Muted text color for less prominent content
      </Typography>
      <Typography variant="p" className="text-success">
        Success message in green
      </Typography>
      <Typography variant="p" className="text-warning">
        Warning message in yellow
      </Typography>
      <Typography variant="p" className="text-error">
        Error message in red
      </Typography>
    </div>
  ),
};

export const ResponsiveHeading: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <Typography variant="h1">Standard Responsive Heading</Typography>
        <Typography variant="muted" className="mt-2">
          This heading automatically adjusts from 4xl to 5xl on large screens
        </Typography>
      </div>

      <div>
        <Typography variant="h1" className="text-2xl md:text-4xl lg:text-6xl">
          Custom Responsive Heading
        </Typography>
        <Typography variant="muted" className="mt-2">
          This heading has custom responsive sizes: 2xl → 4xl → 6xl
        </Typography>
      </div>
    </div>
  ),
};

export const FormLabels: Story = {
  render: () => (
    <div className="space-y-6 max-w-md">
      <div>
        <Typography variant="label" as="label" htmlFor="email">
          Email Address
        </Typography>
        <input
          id="email"
          type="email"
          placeholder="you@example.com"
          className="mt-2 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
        />
      </div>

      <div>
        <Typography variant="label" as="label" htmlFor="name">
          Full Name
        </Typography>
        <Typography variant="muted" className="mt-1">
          Enter your first and last name
        </Typography>
        <input
          id="name"
          type="text"
          placeholder="John Doe"
          className="mt-2 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
        />
      </div>

      <div>
        <Typography variant="label" as="label" htmlFor="message">
          Message
        </Typography>
        <textarea
          id="message"
          rows={4}
          placeholder="Type your message here..."
          className="mt-2 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
        />
        <Typography variant="small" className="mt-1 text-muted-foreground">
          Maximum 500 characters
        </Typography>
      </div>
    </div>
  ),
};

export const MonospaceVariations: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <Typography variant="h4">Code Block</Typography>
        <Typography variant="code" className="block mt-2">
          npm install @movementlabsxyz/movement-design-system
        </Typography>
      </div>

      <div>
        <Typography variant="h4">Inline Code</Typography>
        <Typography variant="p" className="mt-2">
          Use the{" "}
          <Typography variant="inlineCode" as="code">
            Typography
          </Typography>{" "}
          component with the{" "}
          <Typography variant="inlineCode" as="code">
            variant
          </Typography>{" "}
          prop.
        </Typography>
      </div>

      <div>
        <Typography variant="h4">Technical Labels</Typography>
        <div className="mt-2 space-y-2">
          <Typography variant="mono" className="uppercase text-sm font-bold">
            Status: Active
          </Typography>
          <Typography variant="mono" className="uppercase text-sm font-bold">
            API Version: 2.0
          </Typography>
          <Typography variant="mono" className="uppercase text-sm font-bold">
            Response Time: 45ms
          </Typography>
        </div>
      </div>
    </div>
  ),
};



