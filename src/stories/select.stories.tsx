import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "../components/shadcn/select";
import { WalletIcon } from "lucide-react";

const meta = {
  title: "form/Select",
  component: Select,
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "dark",
      values: [
        { name: "dark", value: "#000000" },
        { name: "light", value: "#ffffff" },
      ],
    },
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="dark">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
        <SelectItem value="orange">Orange</SelectItem>
        <SelectItem value="grape">Grape</SelectItem>
      </SelectContent>
    </Select>
  ),
};

export const WithGroups: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select an option" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="orange">Orange</SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>Vegetables</SelectLabel>
          <SelectItem value="carrot">Carrot</SelectItem>
          <SelectItem value="potato">Potato</SelectItem>
          <SelectItem value="tomato">Tomato</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Select disabled>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
      </SelectContent>
    </Select>
  ),
};

// Design System Sizes
export const SmallSize: Story = {
  render: () => (
    <Select>
      <SelectTrigger size="sm" className="w-[320px]">
        <SelectValue placeholder="Placeholder" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="option1">Option 1</SelectItem>
        <SelectItem value="option2">Option 2</SelectItem>
        <SelectItem value="option3">Option 3</SelectItem>
      </SelectContent>
    </Select>
  ),
};

export const DefaultSize: Story = {
  render: () => (
    <Select>
      <SelectTrigger size="default" className="w-[320px]">
        <SelectValue placeholder="Placeholder" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="option1">Option 1</SelectItem>
        <SelectItem value="option2">Option 2</SelectItem>
        <SelectItem value="option3">Option 3</SelectItem>
      </SelectContent>
    </Select>
  ),
};

// Validator Card Style (from Figma design)
export const ValidatorCard: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="h-16 w-full max-w-md gap-3 rounded-lg border border-white/24 bg-black/10 px-4 backdrop-blur-[21px] transition-colors hover:bg-black/20">
        <SelectValue>
          <div className="flex w-full items-center gap-3">
            <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-full border-2 border-blue-600 bg-black">
              <div className="absolute inset-0 opacity-20">
                <div
                  className="h-full w-full"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 1px, transparent 50%)",
                    backgroundSize: "10px 10px",
                  }}
                />
              </div>
            </div>
            <div className="flex min-w-0 flex-col gap-1">
              <div className="font-mono text-lg leading-none font-medium tracking-tight text-white">
                Movement Secure
              </div>
              <div className="text-sm leading-tight text-white/64">
                8.7% APY • 8% fee
              </div>
            </div>
          </div>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="movement-secure">
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-full border-2 border-blue-600 bg-black">
              <div className="absolute inset-0 opacity-20">
                <div
                  className="h-full w-full"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 1px, transparent 50%)",
                    backgroundSize: "10px 10px",
                  }}
                />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="font-mono text-lg font-medium">
                Movement Secure
              </div>
              <div className="text-sm text-white/64">8.7% APY • 8% fee</div>
            </div>
          </div>
        </SelectItem>
        <SelectItem value="ethereum-validator">
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-full border-2 border-purple-600 bg-black">
              <div className="absolute inset-0 opacity-20">
                <div
                  className="h-full w-full"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 1px, transparent 50%)",
                    backgroundSize: "10px 10px",
                  }}
                />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="font-mono text-lg font-medium">
                Ethereum Validator
              </div>
              <div className="text-sm text-white/64">7.2% APY • 5% fee</div>
            </div>
          </div>
        </SelectItem>
        <SelectItem value="solana-stake">
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-full border-2 border-green-600 bg-black">
              <div className="absolute inset-0 opacity-20">
                <div
                  className="h-full w-full"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 1px, transparent 50%)",
                    backgroundSize: "10px 10px",
                  }}
                />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="font-mono text-lg font-medium">Solana Stake</div>
              <div className="text-sm text-white/64">9.1% APY • 10% fee</div>
            </div>
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  ),
};

// With Leading Icon (Design System)
export const WithLeadingIcon: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-[320px]">
        <div className="flex items-center gap-2">
          <WalletIcon className="h-5 w-5" />
          <SelectValue placeholder="Placeholder" />
        </div>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="wallet1">
          <div className="flex items-center gap-2">
            <WalletIcon className="h-5 w-5" />
            <span>Wallet 1</span>
          </div>
        </SelectItem>
        <SelectItem value="wallet2">
          <div className="flex items-center gap-2">
            <WalletIcon className="h-5 w-5" />
            <span>Wallet 2</span>
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  ),
};

// Glass Effect Style
export const GlassStyle: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-[320px] border-white/24 bg-white/10 backdrop-blur-[21px] hover:bg-white/15">
        <SelectValue placeholder="Select an option" />
      </SelectTrigger>
      <SelectContent className="border-white/24 bg-black/95 backdrop-blur-[21px]">
        <SelectItem value="option1">Option 1</SelectItem>
        <SelectItem value="option2">Option 2</SelectItem>
        <SelectItem value="option3">Option 3</SelectItem>
        <SelectItem value="option4">Option 4</SelectItem>
      </SelectContent>
    </Select>
  ),
};

// States Showcase
export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Select>
        <SelectTrigger size="sm" className="w-[320px]">
          <SelectValue placeholder="Small (48px)" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="option1">Option 1</SelectItem>
          <SelectItem value="option2">Option 2</SelectItem>
        </SelectContent>
      </Select>

      <Select>
        <SelectTrigger size="default" className="w-[320px]">
          <SelectValue placeholder="Default (56px)" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="option1">Option 1</SelectItem>
          <SelectItem value="option2">Option 2</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
};
