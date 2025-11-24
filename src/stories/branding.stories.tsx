import type { Meta, StoryObj } from '@storybook/react';
import { Branding } from '@/components/Branding';

const meta = {
  title: 'movement-design-system/Branding',
  component: Branding,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    theme: {
      control: 'select',
      options: ['industries', 'labs'],
      description: 'The branding theme',
    },
    variant: {
      control: 'select',
      options: ['lockup-long', 'lockup-short', 'logomark', 'moveus'],
      description: 'The logo variant',
    },
    color: {
      control: 'select',
      options: ['black', 'white', 'color'],
      description: 'The color version',
    },
  },
} satisfies Meta<typeof Branding>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    theme: 'industries',
    variant: 'logomark',
    color: 'color',
    className: 'w-24 h-24',
  },
};

export const IndustriesLogomarkColor: Story = {
  args: {
    theme: 'industries',
    variant: 'logomark',
    color: 'color',
    className: 'w-32 h-32',
  },
};

export const IndustriesLogomarkBlack: Story = {
  args: {
    theme: 'industries',
    variant: 'logomark',
    color: 'black',
    className: 'w-32 h-32',
  },
};

export const IndustriesLogomarkWhite: Story = {
  args: {
    theme: 'industries',
    variant: 'logomark',
    color: 'white',
    className: 'w-32 h-32 bg-slate-900 p-4',
  },
};

export const IndustriesLockupLongColor: Story = {
  args: {
    theme: 'industries',
    variant: 'lockup-long',
    color: 'color',
    className: 'w-64 h-auto',
  },
};

export const IndustriesLockupShortColor: Story = {
  args: {
    theme: 'industries',
    variant: 'lockup-short',
    color: 'color',
    className: 'w-48 h-auto',
  },
};

export const LabsMoveus: Story = {
  args: {
    theme: 'labs',
    variant: 'moveus',
    color: 'color',
    className: 'w-32 h-32',
  },
};

/**
 * All Industries variants in a grid
 */
export const AllIndustriesVariants: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-8 p-8">
      <div className="flex flex-col items-center gap-2">
        <Branding theme="industries" variant="logomark" color="color" className="w-24 h-24" />
        <span className="text-sm text-muted-foreground">Logomark Color</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Branding theme="industries" variant="logomark" color="black" className="w-24 h-24" />
        <span className="text-sm text-muted-foreground">Logomark Black</span>
      </div>
      <div className="flex flex-col items-center gap-2 bg-slate-900 p-4 rounded">
        <Branding theme="industries" variant="logomark" color="white" className="w-24 h-24" />
        <span className="text-sm text-white">Logomark White</span>
      </div>
      <div className="flex flex-col items-center gap-2 col-span-3">
        <Branding theme="industries" variant="lockup-long" color="color" className="w-full max-w-md h-auto" />
        <span className="text-sm text-muted-foreground">Lockup Long Color</span>
      </div>
      <div className="flex flex-col items-center gap-2 col-span-3">
        <Branding theme="industries" variant="lockup-short" color="color" className="w-full max-w-xs h-auto" />
        <span className="text-sm text-muted-foreground">Lockup Short Color</span>
      </div>
    </div>
  ),
};

/**
 * Usage on different backgrounds
 */
export const OnDifferentBackgrounds: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4 p-8">
      <div className="flex flex-col items-center gap-4 p-8 bg-white rounded border">
        <Branding theme="industries" variant="logomark" color="color" className="w-24 h-24" />
        <span className="text-sm">White Background</span>
      </div>
      <div className="flex flex-col items-center gap-4 p-8 bg-slate-100 rounded">
        <Branding theme="industries" variant="logomark" color="black" className="w-24 h-24" />
        <span className="text-sm">Light Background</span>
      </div>
      <div className="flex flex-col items-center gap-4 p-8 bg-slate-900 rounded">
        <Branding theme="industries" variant="logomark" color="white" className="w-24 h-24" />
        <span className="text-sm text-white">Dark Background</span>
      </div>
    </div>
  ),
};

/**
 * Different sizes
 */
export const DifferentSizes: Story = {
  render: () => (
    <div className="flex items-end gap-8 p-8">
      <div className="flex flex-col items-center gap-2">
        <Branding theme="industries" variant="logomark" color="color" className="w-12 h-12" />
        <span className="text-xs text-muted-foreground">Small (48px)</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Branding theme="industries" variant="logomark" color="color" className="w-16 h-16" />
        <span className="text-xs text-muted-foreground">Medium (64px)</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Branding theme="industries" variant="logomark" color="color" className="w-24 h-24" />
        <span className="text-xs text-muted-foreground">Large (96px)</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Branding theme="industries" variant="logomark" color="color" className="w-32 h-32" />
        <span className="text-xs text-muted-foreground">XL (128px)</span>
      </div>
    </div>
  ),
};

