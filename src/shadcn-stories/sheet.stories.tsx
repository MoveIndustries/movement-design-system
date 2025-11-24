import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../components/shadcn/sheet";
import { Button } from "../components/shadcn/button";

const meta = {
  title: "shadcn/Sheet",
  component: Sheet,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Sheet>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open Sheet</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <p>Sheet content goes here.</p>
        </div>
      </SheetContent>
    </Sheet>
  ),
};

export const Left: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open from Left</Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Left Sheet</SheetTitle>
          <SheetDescription>
            This sheet opens from the left side.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  ),
};

export const Top: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open from Top</Button>
      </SheetTrigger>
      <SheetContent side="top">
        <SheetHeader>
          <SheetTitle>Top Sheet</SheetTitle>
          <SheetDescription>This sheet opens from the top.</SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  ),
};

export const Bottom: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open from Bottom</Button>
      </SheetTrigger>
      <SheetContent side="bottom">
        <SheetHeader>
          <SheetTitle>Bottom Sheet</SheetTitle>
          <SheetDescription>This sheet opens from the bottom.</SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  ),
};

export const Glass: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open Glass Sheet</Button>
      </SheetTrigger>
      <SheetContent variant="glass">
        <SheetHeader>
          <SheetTitle>Glass Morphism Sheet</SheetTitle>
          <SheetDescription>
            This sheet features a glass morphism background with backdrop blur.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <p className="text-sm">
            The glass variant applies a multi-layered gradient with a sophisticated overlay effect,
            perfect for modern UI designs.
          </p>
        </div>
      </SheetContent>
    </Sheet>
  ),
};

export const GlassLeft: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open Glass Sheet from Left</Button>
      </SheetTrigger>
      <SheetContent variant="glass" side="left">
        <SheetHeader>
          <SheetTitle>Glass Sheet - Left</SheetTitle>
          <SheetDescription>
            Glass morphism sheet opening from the left side.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <p className="text-sm">
            Combines the glass variant with left-side positioning.
          </p>
        </div>
      </SheetContent>
    </Sheet>
  ),
};

export const GlassWithContent: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Open Settings</Button>
      </SheetTrigger>
      <SheetContent variant="glass">
        <SheetHeader>
          <SheetTitle>Settings</SheetTitle>
          <SheetDescription>
            Manage your account settings and preferences.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-6 py-6">
          <div className="space-y-2">
            <h4 className="font-medium text-sm">Profile</h4>
            <p className="text-sm text-muted-foreground">
              Update your personal information and profile picture.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium text-sm">Notifications</h4>
            <p className="text-sm text-muted-foreground">
              Configure how you receive notifications and alerts.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium text-sm">Privacy</h4>
            <p className="text-sm text-muted-foreground">
              Control your privacy settings and data preferences.
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  ),
};
