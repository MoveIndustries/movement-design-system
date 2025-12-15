import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardAction,
} from "../components/shadcn/card";
import { Button } from "../components/shadcn/button";
import { DottedBackground } from "../components/DottedBackground";

const meta = {
  title: "movement-design-system/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <DottedBackground variant="gradient">
      <div className="flex h-full min-h-[500px] items-center justify-center p-8">
        <Card className="w-96">
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
          <CardFooter>
            <Button>Action</Button>
          </CardFooter>
        </Card>
      </div>
    </DottedBackground>
  ),
};

export const Simple: Story = {
  render: () => (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>You have 3 unread messages.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center">
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">
                Push Notifications
              </p>
              <p className="text-sm text-muted-foreground">
                Send notifications to device.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  ),
};

export const WithAction: Story = {
  render: () => (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
        <CardAction>
          <Button variant="ghost" size="icon-sm">
            ×
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p>Ready to deploy?</p>
      </CardContent>
      <CardFooter className="gap-2">
        <Button variant="outline">Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter>
    </Card>
  ),
};

export const Glow: Story = {
  render: () => (
    <DottedBackground variant="gradient">
      <div className="flex h-full min-h-[500px] items-center justify-center p-8">
        <Card variant="glow" className="w-96">
          <CardHeader>
            <CardTitle>Gradient Border Card</CardTitle>
            <CardDescription>
              This card uses the same gradient border as the crypto input
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm">
              The glow variant features a beautiful gradient border that transitions
              from guild-green to cyan, with a glass backdrop blur effect.
            </p>
          </CardContent>
          <CardFooter>
            <Button>Get Started</Button>
          </CardFooter>
        </Card>
      </div>
    </DottedBackground>
  ),
};

export const Iridescent: Story = {
  render: () => (
    <DottedBackground variant="gradient">
      <div className="flex h-full min-h-[500px] items-center justify-center p-8">
        <Card variant="iridescent" className="w-96">
          <CardHeader>
            <CardTitle>Iridescent Border Card</CardTitle>
            <CardDescription>
              A sleek linear gradient border effect
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm">
              The iridescent variant features a smooth linear gradient border
              at 136 degrees, transitioning from mint green (#81ffba) to cyan
              (#00fff9), creating a modern and vibrant look.
            </p>
          </CardContent>
          <CardFooter>
            <Button>Explore</Button>
          </CardFooter>
        </Card>
      </div>
    </DottedBackground>
  ),
};

export const AllBorderVariants: Story = {
  render: () => (
    <DottedBackground variant="gradient">
      <div className="flex h-full min-h-[700px] items-center justify-center p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full">
          <div className="flex flex-col gap-4">
            <Card className="w-full">
              <CardHeader>
                <CardTitle>Glass Background</CardTitle>
                <CardDescription>Default with glass effect</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  Card with glass dark background (default) featuring backdrop
                  blur and subtle gradient.
                </p>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Default</Button>
              </CardFooter>
            </Card>
            <p className="text-white/60 text-xs text-center">
              Default variant - Glass background
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <Card variant="glow" className="w-full">
              <CardHeader>
                <CardTitle>Gradient Glow</CardTitle>
                <CardDescription>Radial gradient glow</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  Card with radial gradient glow border featuring multiple
                  gradient layers for a luminous effect.
                </p>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Glow</Button>
              </CardFooter>
            </Card>
            <p className="text-white/60 text-xs text-center">
              Glow variant - Radial gradient border
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <Card variant="iridescent" className="w-full">
              <CardHeader>
                <CardTitle>Iridescent</CardTitle>
                <CardDescription>Linear gradient border</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  Card with smooth linear gradient border transitioning from
                  mint to cyan at 136°.
                </p>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Iridescent</Button>
              </CardFooter>
            </Card>
            <p className="text-white/60 text-xs text-center">
              Iridescent variant - Linear gradient border
            </p>
          </div>
        </div>
      </div>
    </DottedBackground>
  ),
};

export const GlowComparison: Story = {
  render: () => (
    <DottedBackground variant="gradient">
      <div className="flex h-full min-h-[600px] items-center justify-center p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
          <div className="flex flex-col gap-4">
            <Card className="w-full">
              <CardHeader>
                <CardTitle>Glass Background</CardTitle>
                <CardDescription>Default with glass effect</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  Card with glass dark background (default) featuring backdrop
                  blur and subtle gradient.
                </p>
              </CardContent>
            </Card>
            <p className="text-white/60 text-xs text-center">
              Default variant - Glass background
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <Card variant="glow" className="w-full">
              <CardHeader>
                <CardTitle>Gradient Glow</CardTitle>
                <CardDescription>Glow variant</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  Card with gradient glow border effect that transitions from
                  guild-green to cyan.
                </p>
              </CardContent>
            </Card>
            <p className="text-white/60 text-xs text-center">
              Glow variant - Gradient border
            </p>
          </div>
        </div>
      </div>
    </DottedBackground>
  ),
};

export const GridLayout: Story = {
  render: () => (
    <DottedBackground variant="gradient">
      <div className="flex h-full min-h-[800px] items-center justify-center p-8">
        <div className="w-full max-w-7xl">
          <h2 className="text-white text-3xl font-bold mb-8 text-center">
            Card Grid Layout
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Staking</CardTitle>
                <CardDescription>Earn rewards by staking</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">APY</span>
                    <span className="font-mono font-bold text-guild-green-300">
                      12.5%
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Staked</span>
                    <span className="font-mono">1,234.56 MOVE</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Stake Now</Button>
              </CardFooter>
            </Card>

            <Card variant="glow">
              <CardHeader>
                <CardTitle>Bridge</CardTitle>
                <CardDescription>Transfer assets across chains</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Fee</span>
                    <span className="font-mono">0.1%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Time</span>
                    <span className="font-mono">~5 min</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Bridge Assets</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Swap</CardTitle>
                <CardDescription>Exchange tokens instantly</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Slippage</span>
                    <span className="font-mono">0.5%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Rate</span>
                    <span className="font-mono">1:1.234</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Swap Tokens</Button>
              </CardFooter>
            </Card>

            <Card variant="glow">
              <CardHeader>
                <CardTitle>Liquidity Pool</CardTitle>
                <CardDescription>Provide liquidity to earn fees</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">TVL</span>
                    <span className="font-mono">$2.4M</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Volume 24h</span>
                    <span className="font-mono">$456K</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Add Liquidity</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Portfolio</CardTitle>
                <CardDescription>Track your assets</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Total Value</span>
                    <span className="font-mono font-bold text-guild-green-300">
                      $12,345.67
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">24h Change</span>
                    <span className="font-mono text-guild-green-300">+5.2%</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" variant="outline">
                  View Details
                </Button>
              </CardFooter>
            </Card>

            <Card variant="glow">
              <CardHeader>
                <CardTitle>Governance</CardTitle>
                <CardDescription>Vote on proposals</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Active Proposals</span>
                    <span className="font-mono">3</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Voting Power</span>
                    <span className="font-mono">1,234 MOVE</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Vote Now</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </DottedBackground>
  ),
};

export const GridLayoutDots: Story = {
  render: () => (
    <DottedBackground variant="dots">
      <div className="flex h-full min-h-[800px] items-center justify-center p-8">
        <div className="w-full max-w-7xl">
          <h2 className="text-white text-3xl font-bold mb-8 text-center">
            Card Grid with Dots Background
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Staking</CardTitle>
                <CardDescription>Earn rewards by staking</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">APY</span>
                    <span className="font-mono font-bold text-guild-green-300">
                      12.5%
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Staked</span>
                    <span className="font-mono">1,234.56 MOVE</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Stake Now</Button>
              </CardFooter>
            </Card>

            <Card variant="glow">
              <CardHeader>
                <CardTitle>Bridge</CardTitle>
                <CardDescription>Transfer assets across chains</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Fee</span>
                    <span className="font-mono">0.1%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Time</span>
                    <span className="font-mono">~5 min</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Bridge Assets</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Swap</CardTitle>
                <CardDescription>Exchange tokens instantly</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Slippage</span>
                    <span className="font-mono">0.5%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Rate</span>
                    <span className="font-mono">1:1.234</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Swap Tokens</Button>
              </CardFooter>
            </Card>

            <Card variant="glow">
              <CardHeader>
                <CardTitle>Liquidity Pool</CardTitle>
                <CardDescription>Provide liquidity to earn fees</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">TVL</span>
                    <span className="font-mono">$2.4M</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Volume 24h</span>
                    <span className="font-mono">$456K</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Add Liquidity</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Portfolio</CardTitle>
                <CardDescription>Track your assets</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Total Value</span>
                    <span className="font-mono font-bold text-guild-green-300">
                      $12,345.67
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">24h Change</span>
                    <span className="font-mono text-guild-green-300">+5.2%</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" variant="outline">
                  View Details
                </Button>
              </CardFooter>
            </Card>

            <Card variant="glow">
              <CardHeader>
                <CardTitle>Governance</CardTitle>
                <CardDescription>Vote on proposals</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Active Proposals</span>
                    <span className="font-mono">3</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Voting Power</span>
                    <span className="font-mono">1,234 MOVE</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Vote Now</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </DottedBackground>
  ),
};
