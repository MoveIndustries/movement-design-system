import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Input } from "../components/shadcn/input";
import { Label } from "../components/shadcn/label";
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
      options: ["default", "error", "iridescent"],
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
    <div className="w-full max-w-sm">
      <Input {...args} />
    </div>
  ),
  args: {
    type: "text",
    placeholder: "Enter text...",
  },
};

export const Email: Story = {
  render: (args) => (
    <div className="w-full max-w-sm">
      <Input {...args} />
    </div>
  ),
  args: {
    type: "email",
    placeholder: "Enter your email...",
  },
};

export const Password: Story = {
  render: (args) => (
    <div className="w-full max-w-sm">
      <Input {...args} />
    </div>
  ),
  args: {
    type: "password",
    placeholder: "Enter password...",
  },
};

export const Disabled: Story = {
  render: (args) => (
    <div className="w-full max-w-sm">
      <Input {...args} />
    </div>
  ),
  args: {
    disabled: true,
    placeholder: "Disabled input",
  },
};

export const WithLabel: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="email">Email</Label>
      <Input type="email" id="email" placeholder="Email" />
    </div>
  ),
};

export const File: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="picture">Picture</Label>
      <Input id="picture" type="file" />
    </div>
  ),
};

// Glass Effect with Icons (Figma Design)
export const SearchGlass: Story = {
  render: () => (
    <div className="w-full max-w-sm">
      <Input
        type="search"
        placeholder="Search"
        leftIcon={<Search className="size-6" />}
      />
    </div>
  ),
};

export const WithLeftIcon: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="email-icon">Email</Label>
      <Input
        type="email"
        id="email-icon"
        placeholder="Enter your email"
        leftIcon={<Mail className="size-6" />}
      />
    </div>
  ),
};

export const WithRightIcon: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="password-icon">Password</Label>
      <Input
        type="password"
        id="password-icon"
        placeholder="Enter password"
        rightIcon={<Eye className="size-6" />}
      />
    </div>
  ),
};

export const WithBothIcons: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="username">Username</Label>
      <Input
        type="text"
        id="username"
        placeholder="Enter username"
        leftIcon={<User className="size-6" />}
        rightIcon={<Lock className="size-6" />}
      />
    </div>
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
    <div className="w-full max-w-sm space-y-2">
      <Label>Glass Effect (No Icons)</Label>
      <Input size="lg" placeholder="Enter amount" clearable />
    </div>
  ),
};

// Size Variants (Figma Design System)
export const SizeSmall: Story = {
  render: () => (
    <div className="w-full max-w-sm space-y-2">
      <Label>Small (40px)</Label>
      <Input
        size="sm"
        placeholder="Small input"
        leftIcon={<Search className="size-5" />}
        clearable
        defaultValue="Small"
      />
    </div>
  ),
};

export const SizeMedium: Story = {
  render: () => (
    <div className="w-full max-w-sm space-y-2">
      <Label>Medium (56px)</Label>
      <Input
        size="md"
        placeholder="Medium input"
        leftIcon={<Search className="size-5" />}
        clearable
        defaultValue="Medium"
      />
    </div>
  ),
};

export const SizeLarge: Story = {
  render: () => (
    <div className="w-full max-w-sm space-y-2">
      <Label className="text-lg">Large (64px)</Label>
      <Input size="lg" placeholder="0" clearable defaultValue="0" />
    </div>
  ),
};

export const ClearableInput: Story = {
  render: function ClearableInputRender() {
    const [value, setValue] = useState("Clear me!");

    return (
      <div className="w-full max-w-sm space-y-2">
        <Label>Clearable Input</Label>
        <Input
          size="lg"
          placeholder="Type something..."
          clearable
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onClear={() => setValue("")}
        />
      </div>
    );
  },
};

export const ErrorState: Story = {
  render: () => (
    <div className="w-full max-w-sm space-y-2">
      <Label>Error State</Label>
      <Input size="lg" placeholder="0" error defaultValue="Invalid input" />
      <p className="text-destructive text-sm">This field has an error</p>
    </div>
  ),
};

export const FocusState: Story = {
  render: () => (
    <div className="w-full max-w-sm space-y-2">
      <Label className="text-lg">Focus State (Green Cursor)</Label>
      <Input
        size="lg"
        placeholder="Click to focus and see green cursor"
        autoFocus
      />
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex w-full max-w-md flex-col gap-6">
      <h2 className="text-2xl font-semibold">Size Variants</h2>

      <div className="space-y-2">
        <Label>Small</Label>
        <Input
          size="sm"
          placeholder="Small (40px)"
          leftIcon={<Search className="size-5" />}
          clearable
          defaultValue="Small"
        />
      </div>

      <div className="space-y-2">
        <Label>Medium</Label>
        <Input
          size="md"
          placeholder="Medium (56px)"
          leftIcon={<Search className="size-5" />}
          clearable
          defaultValue="Medium"
        />
      </div>

      <div className="space-y-2">
        <Label className="text-lg">Large</Label>
        <Input
          size="lg"
          placeholder="Large (64px)"
          clearable
          defaultValue="Large"
        />
      </div>
    </div>
  ),
};

export const AllStates: Story = {
  render: () => (
    <div className="flex w-full max-w-md flex-col gap-6">
      <h2 className="text-2xl font-semibold">Input States</h2>

      <div className="space-y-2">
        <Label>Default (Empty)</Label>
        <Input size="lg" placeholder="0" />
      </div>

      <div className="space-y-2">
        <Label>Filled</Label>
        <Input size="lg" placeholder="0" defaultValue="0" clearable />
      </div>

      <div className="space-y-2">
        <Label>With Search Icon</Label>
        <Input
          size="lg"
          placeholder="Search"
          leftIcon={<Search className="size-6" />}
          clearable
          defaultValue="Query"
        />
      </div>

      <div className="space-y-2">
        <Label>Focus (Green Cursor)</Label>
        <Input size="lg" placeholder="Click to see cursor" autoFocus />
      </div>

      <div className="space-y-2">
        <Label>Error State</Label>
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
        <Label className="opacity-50">Disabled</Label>
        <Input size="lg" placeholder="0" disabled defaultValue="Disabled" />
      </div>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex w-full max-w-2xl flex-col gap-6">
      <div className="grid w-full items-center gap-1.5">
        <Label>Default Input (No Icons)</Label>
        <Input type="text" placeholder="Regular input without icons" />
      </div>

      <div className="grid w-full items-center gap-1.5">
        <Label>Search with Glass Effect</Label>
        <Input
          type="search"
          placeholder="Search"
          leftIcon={<Search className="size-6" />}
        />
      </div>

      <div className="grid w-full items-center gap-1.5">
        <Label>Email with Left Icon</Label>
        <Input
          type="email"
          placeholder="email@example.com"
          leftIcon={<Mail className="size-6" />}
        />
      </div>

      <div className="grid w-full items-center gap-1.5">
        <Label>Password with Right Icon</Label>
        <Input
          type="password"
          placeholder="Enter password"
          rightIcon={<EyeOff className="size-6" />}
        />
      </div>

      <div className="grid w-full items-center gap-1.5">
        <Label>Username with Both Icons</Label>
        <Input
          type="text"
          placeholder="Enter username"
          leftIcon={<User className="size-6" />}
          rightIcon={<Lock className="size-6" />}
        />
      </div>
    </div>
  ),
};

export const IridescentVariant: Story = {
  render: () => (
    <div className="flex w-full max-w-md flex-col gap-6">
      <h2 className="text-2xl font-semibold">Iridescent Variant</h2>

      <div className="space-y-2">
        <Label>Iridescent Input</Label>
        <Input
          variant="iridescent"
          size="lg"
          placeholder="Enter text..."
          clearable
        />
      </div>

      <div className="space-y-2">
        <Label>Iridescent with Search Icon</Label>
        <Input
          variant="iridescent"
          size="lg"
          placeholder="Search"
          leftIcon={<Search className="size-6" />}
          clearable
          defaultValue="Query"
        />
      </div>

      <div className="space-y-2">
        <Label>Iridescent with Email</Label>
        <Input
          variant="iridescent"
          size="md"
          type="email"
          placeholder="email@example.com"
          leftIcon={<Mail className="size-6" />}
        />
      </div>

      <div className="space-y-2">
        <Label>Iridescent Error State</Label>
        <Input
          variant="iridescent"
          size="lg"
          placeholder="Invalid input"
          error
          defaultValue="Invalid value"
          clearable
        />
        <p className="text-destructive text-sm">This field has an error</p>
      </div>

      <div className="space-y-2">
        <Label>Iridescent Small Size</Label>
        <Input
          variant="iridescent"
          size="sm"
          placeholder="Small iridescent"
          leftIcon={<User className="size-5" />}
          clearable
        />
      </div>

      <div className="space-y-2">
        <Label className="opacity-50">Iridescent Disabled</Label>
        <Input
          variant="iridescent"
          size="md"
          placeholder="Disabled"
          disabled
          defaultValue="Cannot edit"
        />
      </div>
    </div>
  ),
};

export const IridescentComparison: Story = {
  render: function IridescentComparisonRender() {
    const [value, setValue] = useState("");
    const [hasError, setHasError] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setValue(newValue);
      // Simple validation: error if less than 3 characters
      setHasError(newValue.length > 0 && newValue.length < 3);
    };

    return (
      <div className="flex w-full max-w-md flex-col gap-6">
        <h2 className="text-2xl font-semibold">
          Iridescent with Live Validation
        </h2>

        <div className="space-y-2">
          <Label>Default Variant</Label>
          <Input
            size="lg"
            placeholder="Default border..."
            leftIcon={<User className="size-6" />}
            clearable
          />
        </div>

        <div className="space-y-2">
          <Label>Iridescent Variant</Label>
          <Input
            variant="iridescent"
            size="lg"
            placeholder="Iridescent border..."
            leftIcon={<User className="size-6" />}
            clearable
          />
        </div>

        <div className="space-y-2">
          <Label>Live Validation (type at least 3 chars)</Label>
          <Input
            variant="iridescent"
            size="lg"
            placeholder="Start typing..."
            value={value}
            onChange={handleChange}
            onClear={() => {
              setValue("");
              setHasError(false);
            }}
            error={hasError}
            clearable
            leftIcon={<Mail className="size-6" />}
          />
          {hasError && (
            <p className="text-destructive text-sm">
              Input must be at least 3 characters long
            </p>
          )}
          {value.length >= 3 && (
            <p className="text-cyan-300 text-sm">✓ Valid input</p>
          )}
        </div>
      </div>
    );
  },
};
