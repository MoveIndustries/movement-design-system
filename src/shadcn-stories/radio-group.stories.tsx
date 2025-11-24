import type { Meta, StoryObj } from "@storybook/react-vite";
import { RadioGroup, RadioGroupItem } from "../components/shadcn/radio-group";
import { Label } from "../components/shadcn/label";

const meta = {
  title: "form/RadioGroup",
  component: RadioGroup,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <RadioGroup defaultValue="option-one">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-one" id="option-one" />
        <Label htmlFor="option-one">Option One</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-two" id="option-two" />
        <Label htmlFor="option-two">Option Two</Label>
      </div>
    </RadioGroup>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <RadioGroup defaultValue="comfortable" className="flex space-x-4">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="default" id="r1" />
        <Label htmlFor="r1">Default</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="comfortable" id="r2" />
        <Label htmlFor="r2">Comfortable</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="compact" id="r3" />
        <Label htmlFor="r3">Compact</Label>
      </div>
    </RadioGroup>
  ),
};

export const WithDescription: Story = {
  render: () => (
    <RadioGroup defaultValue="card">
      <div className="flex items-start space-x-2">
        <RadioGroupItem value="card" id="card" className="mt-1" />
        <div className="grid gap-1.5">
          <Label htmlFor="card">Credit Card</Label>
          <p className="text-sm text-muted-foreground">
            Pay with your credit card via Stripe.
          </p>
        </div>
      </div>
      <div className="flex items-start space-x-2">
        <RadioGroupItem value="paypal" id="paypal" className="mt-1" />
        <div className="grid gap-1.5">
          <Label htmlFor="paypal">PayPal</Label>
          <p className="text-sm text-muted-foreground">
            Pay with your PayPal account.
          </p>
        </div>
      </div>
    </RadioGroup>
  ),
};
