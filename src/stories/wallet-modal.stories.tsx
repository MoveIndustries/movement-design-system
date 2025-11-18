import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { WalletModal } from "@/components/WalletModal";
import { Button } from "@/components/shadcn/button";

const meta: Meta<typeof WalletModal> = {
  title: "Components/WalletModal",
  component: WalletModal,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A responsive wallet connection modal that automatically switches between Dialog (desktop) and Drawer (mobile) based on screen size. Supports Aptos wallet adapters with custom styling.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Interactive demo of the WalletModal component.
 * Click the button to open the modal and see how it behaves.
 */
export const Interactive: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="flex flex-col items-center gap-4">
        <div className="space-y-2 text-center">
          <h3 className="text-lg font-semibold">Wallet Connection Demo</h3>
          <p className="text-muted-foreground max-w-md text-sm">
            Click the button below to open the wallet connection modal. On
            desktop, it appears as a dialog. On mobile devices, it slides up as
            a drawer.
          </p>
        </div>

        <Button onClick={() => setIsOpen(true)} size="lg">
          Connect Wallet
        </Button>

        {isOpen && <WalletModal onClose={() => setIsOpen(false)} />}
      </div>
    );
  },
};

/**
 * The WalletModal automatically opens on mount.
 * Useful for previewing the modal's appearance without interaction.
 */
export const AlwaysOpen: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(true);

    return (
      <div className="relative min-h-screen">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="space-y-4 text-center">
            <h3 className="text-lg font-semibold">Modal Preview</h3>
            <p className="text-muted-foreground text-sm">
              The wallet modal is always open in this story
            </p>
            <Button onClick={() => setIsOpen(true)} disabled={isOpen}>
              Reopen Modal
            </Button>
          </div>
        </div>

        {isOpen && (
          <WalletModal
            onClose={() => {
              setIsOpen(false);
              // Automatically reopen after a short delay for demo purposes
              setTimeout(() => setIsOpen(true), 500);
            }}
          />
        )}
      </div>
    );
  },
  parameters: {
    layout: "fullscreen",
  },
};

/**
 * Demonstrates the modal with custom wallet sorting options.
 * You can pass additional configuration to control wallet ordering.
 */
export const WithSortingOptions: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="flex flex-col items-center gap-4">
        <div className="space-y-2 text-center">
          <h3 className="text-lg font-semibold">Custom Wallet Sorting</h3>
          <p className="text-muted-foreground max-w-md text-sm">
            This example shows how you can pass sorting options to customize the
            wallet order.
          </p>
        </div>

        <Button onClick={() => setIsOpen(true)} size="lg">
          Connect Wallet
        </Button>

        {isOpen && (
          <WalletModal
            onClose={() => setIsOpen(false)}
            // Add any WalletSortingOptions here
          />
        )}
      </div>
    );
  },
};

/**
 * Mobile-optimized view of the WalletModal.
 * Resize your browser window or use responsive mode to see the drawer behavior.
 */
export const MobileView: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="flex flex-col items-center gap-4 p-4">
        <div className="space-y-2 text-center">
          <h3 className="text-lg font-semibold">Mobile Drawer View</h3>
          <p className="text-muted-foreground max-w-md text-sm">
            On screens smaller than 768px, the modal appears as a bottom drawer.
            Try resizing your browser window to see the effect.
          </p>
        </div>

        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="w-full max-w-xs"
        >
          Connect Wallet
        </Button>

        {isOpen && <WalletModal onClose={() => setIsOpen(false)} />}
      </div>
    );
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
};

/**
 * Shows the WalletModal's styling and theming capabilities.
 */
export const Styling: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="flex flex-col items-center gap-4">
        <div className="max-w-2xl space-y-2 text-center">
          <h3 className="text-lg font-semibold">Styling Features</h3>
          <ul className="text-muted-foreground space-y-2 text-left text-sm">
            <li>• Gradient background with blue/green radial overlay</li>
            <li>• Glassmorphic backdrop blur effect</li>
            <li>• Hover effects on wallet cards with shadow animations</li>
            <li>• Responsive grid layout for wallet icons</li>
            <li>• Smooth transitions and collapsible sections</li>
          </ul>
        </div>

        <Button onClick={() => setIsOpen(true)} size="lg">
          View Styled Modal
        </Button>

        {isOpen && <WalletModal onClose={() => setIsOpen(false)} />}
      </div>
    );
  },
};
