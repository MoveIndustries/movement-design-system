import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Input } from "../components/shadcn/input";
import { Label } from "../components/shadcn/label";
import { DottedBackground } from "../components/DottedBackground";
import {
  Search,
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  Calendar,
  CreditCard,
} from "lucide-react";

const meta = {
  title: "form/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["text", "email", "password", "number", "search", "tel", "url"],
      description: "The type of input",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Input size variant",
    },
    variant: {
      control: "select",
      options: ["default", "error"],
      description: "Input variant",
    },
    disabled: {
      control: "boolean",
      description: "Whether the input is disabled",
    },
    error: {
      control: "boolean",
      description: "Whether the input has an error state",
    },
    clearable: {
      control: "boolean",
      description: "Whether the input can be cleared with a button",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text",
    },
    leftIcon: {
      control: false,
      description: "Icon to display on the left side",
    },
    rightIcon: {
      control: false,
      description: "Icon to display on the right side",
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <DottedBackground variant="gradient">
      <div className="flex h-full items-center justify-center">
        <div className="w-full max-w-sm">
          <Input {...args} />
        </div>
      </div>
    </DottedBackground>
  ),
  args: {
    type: "text",
    placeholder: "Enter text...",
  },
};

export const Email: Story = {
  render: (args) => (
    <DottedBackground variant="dots">
      <div className="flex h-full items-center justify-center">
        <div className="w-full max-w-sm">
          <Input {...args} />
        </div>
      </div>
    </DottedBackground>
  ),
  args: {
    type: "email",
    placeholder: "Enter your email...",
  },
};

export const Password: Story = {
  render: (args) => (
    <DottedBackground variant="dots">
      <div className="flex h-full items-center justify-center">
        <div className="w-full max-w-sm">
          <Input {...args} />
        </div>
      </div>
    </DottedBackground>
  ),
  args: {
    type: "password",
    placeholder: "Enter password...",
  },
};

export const Disabled: Story = {
  render: (args) => (
    <DottedBackground variant="dots">
      <div className="flex h-full items-center justify-center">
        <div className="w-full max-w-sm">
          <Input {...args} />
        </div>
      </div>
    </DottedBackground>
  ),
  args: {
    disabled: true,
    placeholder: "Disabled input",
  },
};

export const WithLabel: Story = {
  render: () => (
    <DottedBackground variant="gradient">
      <div className="flex h-full items-center justify-center">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="email" className="text-white">
            Email
          </Label>
          <Input type="email" id="email" placeholder="Email" />
        </div>
      </div>
    </DottedBackground>
  ),
};

export const File: Story = {
  render: () => (
    <DottedBackground variant="gradient">
      <div className="flex h-full items-center justify-center">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="picture" className="text-white">
            Picture
          </Label>
          <Input id="picture" type="file" />
        </div>
      </div>
    </DottedBackground>
  ),
};

// Glass Effect with Icons (Figma Design)
export const SearchGlass: Story = {
  render: () => (
    <DottedBackground variant="gradient" className="min-h-[300px]">
      <div className="flex h-full items-center justify-center">
        <div className="w-full max-w-sm">
          <Input
            type="search"
            placeholder="Search"
            leftIcon={<Search className="size-6" />}
          />
        </div>
      </div>
    </DottedBackground>
  ),
};

export const WithLeftIcon: Story = {
  render: () => (
    <DottedBackground variant="dots">
      <div className="flex h-full items-center justify-center">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="email-icon" className="text-white">
            Email
          </Label>
          <Input
            type="email"
            id="email-icon"
            placeholder="Enter your email"
            leftIcon={<Mail className="size-6" />}
          />
        </div>
      </div>
    </DottedBackground>
  ),
};

export const WithRightIcon: Story = {
  render: () => (
    <DottedBackground variant="dots">
      <div className="flex h-full items-center justify-center">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="password-icon" className="text-white">
            Password
          </Label>
          <Input
            type="password"
            id="password-icon"
            placeholder="Enter password"
            rightIcon={<Eye className="size-6" />}
          />
        </div>
      </div>
    </DottedBackground>
  ),
};

export const WithBothIcons: Story = {
  render: () => (
    <DottedBackground variant="grid">
      <div className="flex h-full items-center justify-center">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="username" className="text-white">
            Username
          </Label>
          <Input
            type="text"
            id="username"
            placeholder="Enter username"
            leftIcon={<User className="size-6" />}
            rightIcon={<Lock className="size-6" />}
          />
        </div>
      </div>
    </DottedBackground>
  ),
};

export const DateInput: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="date">Select Date</Label>
      <Input
        type="text"
        id="date"
        placeholder="MM/DD/YYYY"
        leftIcon={<Calendar className="size-6" />}
      />
    </div>
  ),
};

export const PaymentInput: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="card">Card Number</Label>
      <Input
        type="text"
        id="card"
        placeholder="1234 5678 9012 3456"
        leftIcon={<CreditCard className="size-6" />}
      />
    </div>
  ),
};

export const DisabledWithIcon: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="disabled-search">Search</Label>
      <Input
        type="search"
        id="disabled-search"
        placeholder="Search (disabled)"
        disabled
        leftIcon={<Search className="size-6" />}
      />
    </div>
  ),
};

// Glass Effect Without Icons
export const GlassNoIcons: Story = {
  render: () => (
    <DottedBackground variant="gradient">
      <div className="flex h-full items-center justify-center">
        <div className="w-full max-w-sm space-y-2">
          <Label className="text-white">Glass Effect (No Icons)</Label>
          <Input size="lg" placeholder="Enter amount" clearable />
        </div>
      </div>
    </DottedBackground>
  ),
};

// Size Variants (Figma Design System)
export const SizeSmall: Story = {
  render: () => (
    <DottedBackground variant="dots">
      <div className="flex h-full items-center justify-center">
        <div className="w-full max-w-sm space-y-2">
          <Label className="text-white">Small (40px)</Label>
          <Input
            size="sm"
            placeholder="Small input"
            leftIcon={<Search className="size-5" />}
            clearable
            defaultValue="Small"
          />
        </div>
      </div>
    </DottedBackground>
  ),
};

export const SizeMedium: Story = {
  render: () => (
    <DottedBackground variant="dots">
      <div className="flex h-full items-center justify-center">
        <div className="w-full max-w-sm space-y-2">
          <Label className="text-white">Medium (56px)</Label>
          <Input
            size="md"
            placeholder="Medium input"
            leftIcon={<Search className="size-5" />}
            clearable
            defaultValue="Medium"
          />
        </div>
      </div>
    </DottedBackground>
  ),
};

export const SizeLarge: Story = {
  render: () => (
    <DottedBackground variant="dots">
      <div className="flex h-full items-center justify-center">
        <div className="w-full max-w-sm space-y-2">
          <Label className="text-lg text-white">Large (64px)</Label>
          <Input size="lg" placeholder="0" clearable defaultValue="0" />
        </div>
      </div>
    </DottedBackground>
  ),
};

export const ClearableInput: Story = {
  render: function ClearableInputRender() {
    const [value, setValue] = useState("Clear me!");

    return (
      <DottedBackground variant="gradient">
        <div className="flex h-full items-center justify-center">
          <div className="w-full max-w-sm space-y-2">
            <Label className="text-white">Clearable Input</Label>
            <Input
              size="lg"
              placeholder="Type something..."
              clearable
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onClear={() => setValue("")}
            />
          </div>
        </div>
      </DottedBackground>
    );
  },
};

export const ErrorState: Story = {
  render: () => (
    <DottedBackground variant="gradient">
      <div className="flex h-full items-center justify-center">
        <div className="w-full max-w-sm space-y-2">
          <Label className="text-white">Error State</Label>
          <Input size="lg" placeholder="0" error defaultValue="Invalid input" />
          <p className="text-destructive text-sm">This field has an error</p>
        </div>
      </div>
    </DottedBackground>
  ),
};

export const FocusState: Story = {
  render: () => (
    <DottedBackground variant="gradient">
      <div className="flex h-full items-center justify-center">
        <div className="w-full max-w-sm space-y-2">
          <Label className="text-lg text-white">
            Focus State (Green Cursor)
          </Label>
          <Input
            size="lg"
            placeholder="Click to focus and see green cursor"
            autoFocus
          />
        </div>
      </div>
    </DottedBackground>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <DottedBackground variant="gradient" className="min-h-[500px]">
      <div className="flex w-full max-w-md flex-col gap-6">
        <h2 className="text-2xl font-semibold text-white">Size Variants</h2>

        <div className="space-y-2">
          <Label className="text-white">Small</Label>
          <Input
            size="sm"
            placeholder="Small (40px)"
            leftIcon={<Search className="size-5" />}
            clearable
            defaultValue="Small"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-white">Medium</Label>
          <Input
            size="md"
            placeholder="Medium (56px)"
            leftIcon={<Search className="size-5" />}
            clearable
            defaultValue="Medium"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-lg text-white">Large</Label>
          <Input
            size="lg"
            placeholder="Large (64px)"
            clearable
            defaultValue="Large"
          />
        </div>
      </div>
    </DottedBackground>
  ),
};

export const AllStates: Story = {
  render: () => (
    <DottedBackground variant="dots" className="min-h-[600px]">
      <div className="flex w-full max-w-md flex-col gap-6">
        <h2 className="text-2xl font-semibold text-white">Input States</h2>

        <div className="space-y-2">
          <Label className="text-white">Default (Empty)</Label>
          <Input size="lg" placeholder="0" />
        </div>

        <div className="space-y-2">
          <Label className="text-white">Filled</Label>
          <Input size="lg" placeholder="0" defaultValue="0" clearable />
        </div>

        <div className="space-y-2">
          <Label className="text-white">With Search Icon</Label>
          <Input
            size="lg"
            placeholder="Search"
            leftIcon={<Search className="size-6" />}
            clearable
            defaultValue="Query"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-white">Focus (Green Cursor)</Label>
          <Input size="lg" placeholder="Click to see cursor" autoFocus />
        </div>

        <div className="space-y-2">
          <Label className="text-white">Error State</Label>
          <Input
            size="lg"
            placeholder="0"
            error
            defaultValue="Invalid"
            clearable
          />
          <p className="text-destructive text-sm">Invalid input</p>
        </div>

        <div className="space-y-2">
          <Label className="text-white opacity-50">Disabled</Label>
          <Input size="lg" placeholder="0" disabled defaultValue="Disabled" />
        </div>
      </div>
    </DottedBackground>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <DottedBackground variant="gradient" className="min-h-[600px]">
      <div className="flex w-full max-w-2xl flex-col gap-6">
        <div className="grid w-full items-center gap-1.5">
          <Label className="text-white">Default Input (No Icons)</Label>
          <Input type="text" placeholder="Regular input without icons" />
        </div>

        <div className="grid w-full items-center gap-1.5">
          <Label className="text-white">Search with Glass Effect</Label>
          <Input
            type="search"
            placeholder="Search"
            leftIcon={<Search className="size-6" />}
          />
        </div>

        <div className="grid w-full items-center gap-1.5">
          <Label className="text-white">Email with Left Icon</Label>
          <Input
            type="email"
            placeholder="email@example.com"
            leftIcon={<Mail className="size-6" />}
          />
        </div>

        <div className="grid w-full items-center gap-1.5">
          <Label className="text-white">Password with Right Icon</Label>
          <Input
            type="password"
            placeholder="Enter password"
            rightIcon={<EyeOff className="size-6" />}
          />
        </div>

        <div className="grid w-full items-center gap-1.5">
          <Label className="text-white">Username with Both Icons</Label>
          <Input
            type="text"
            placeholder="Enter username"
            leftIcon={<User className="size-6" />}
            rightIcon={<Lock className="size-6" />}
          />
        </div>
      </div>
    </DottedBackground>
  ),
};
