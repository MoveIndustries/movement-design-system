import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "../components/shadcn/avatar";
import { Branding } from "../components/Branding";

const meta = {
  title: "movement-design-system/Avatar",
  component: Avatar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    border: {
      control: { type: "select" },
      options: ["none", "glow", "guild", "byzantine"],
      description: "Border variant for the avatar",
    },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  ),
};

export const WithFallback: Story = {
  render: () => (
    <Avatar>
      <AvatarImage src="invalid-url" alt="User" />
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar className="size-8">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>SM</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>MD</AvatarFallback>
      </Avatar>
      <Avatar className="size-12">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>LG</AvatarFallback>
      </Avatar>
      <Avatar className="size-16">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>XL</AvatarFallback>
      </Avatar>
    </div>
  ),
};

export const WithGlowBorder: Story = {
  render: () => (
    <Avatar border="glow">
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  ),
};

export const WithGuildBorder: Story = {
  render: () => (
    <Avatar border="guild">
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  ),
};

export const WithByzantineBorder: Story = {
  render: () => (
    <Avatar border="byzantine">
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  ),
};

export const BorderVariants: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <div className="flex flex-col items-center gap-2">
        <Avatar border="none">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <span className="text-muted-foreground text-xs">None</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Avatar border="glow">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <span className="text-muted-foreground text-xs">Glow</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Avatar border="guild">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <span className="text-muted-foreground text-xs">Guild</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Avatar border="byzantine">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <span className="text-muted-foreground text-xs">Byzantine</span>
      </div>
    </div>
  ),
};

export const BorderVariantsWithSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <div className="flex items-center gap-4">
        <Avatar border="glow" className="size-8">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>SM</AvatarFallback>
        </Avatar>
        <Avatar border="glow">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>MD</AvatarFallback>
        </Avatar>
        <Avatar border="glow" className="size-12">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>LG</AvatarFallback>
        </Avatar>
        <Avatar border="glow" className="size-16">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>XL</AvatarFallback>
        </Avatar>
      </div>
      <div className="flex items-center gap-4">
        <Avatar border="guild" className="size-8">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>SM</AvatarFallback>
        </Avatar>
        <Avatar border="guild">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>MD</AvatarFallback>
        </Avatar>
        <Avatar border="guild" className="size-12">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>LG</AvatarFallback>
        </Avatar>
        <Avatar border="guild" className="size-16">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>XL</AvatarFallback>
        </Avatar>
      </div>
      <div className="flex items-center gap-4">
        <Avatar border="byzantine" className="size-8">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>SM</AvatarFallback>
        </Avatar>
        <Avatar border="byzantine">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>MD</AvatarFallback>
        </Avatar>
        <Avatar border="byzantine" className="size-12">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>LG</AvatarFallback>
        </Avatar>
        <Avatar border="byzantine" className="size-16">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>XL</AvatarFallback>
        </Avatar>
      </div>
    </div>
  ),
};

export const WithBrandingLogo: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar className="size-8">
        <Branding
          theme="labs"
          variant="moveus"
          color="color"
          className="size-full object-cover"
        />
        <AvatarFallback>ML</AvatarFallback>
      </Avatar>
      <Avatar>
        <Branding
          theme="labs"
          variant="moveus"
          color="color"
          className="size-full object-cover"
        />
        <AvatarFallback>ML</AvatarFallback>
      </Avatar>
      <Avatar className="size-12">
        <Branding
          theme="labs"
          variant="moveus"
          color="color"
          className="size-full object-cover"
        />
        <AvatarFallback>ML</AvatarFallback>
      </Avatar>
      <Avatar className="size-16">
        <Branding
          theme="labs"
          variant="moveus"
          color="color"
          className="size-full object-cover"
        />
        <AvatarFallback>ML</AvatarFallback>
      </Avatar>
    </div>
  ),
};

export const BrandingWithBorders: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <div className="flex flex-col items-center gap-2">
        <Avatar border="none" className="size-12">
          <Branding
            theme="labs"
            variant="moveus"
            color="color"
            className="size-full object-cover"
          />
          <AvatarFallback>ML</AvatarFallback>
        </Avatar>
        <span className="text-muted-foreground text-xs">None</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Avatar border="glow" className="size-12">
          <Branding
            theme="labs"
            variant="moveus"
            color="color"
            className="size-full object-cover"
          />
          <AvatarFallback>ML</AvatarFallback>
        </Avatar>
        <span className="text-muted-foreground text-xs">Glow</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Avatar border="guild" className="size-12">
          <Branding
            theme="labs"
            variant="moveus"
            color="color"
            className="size-full object-cover"
          />
          <AvatarFallback>ML</AvatarFallback>
        </Avatar>
        <span className="text-muted-foreground text-xs">Guild</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Avatar border="byzantine" className="size-12">
          <Branding
            theme="labs"
            variant="moveus"
            color="color"
            className="size-full object-cover"
          />
          <AvatarFallback>ML</AvatarFallback>
        </Avatar>
        <span className="text-muted-foreground text-xs">Byzantine</span>
      </div>
    </div>
  ),
};
