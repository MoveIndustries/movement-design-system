import type { Meta, StoryObj } from '@storybook/react';
import { MultiOutlineText } from '@/components/MultiOutlineText';

const meta = {
  title: 'movement design system/MultiOutlineText',
  component: MultiOutlineText,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      description: 'The text content to display with multi-color outlines',
    },
    color: {
      control: 'color',
      description: 'The fill color of the main text',
    },
    fontWeight: {
      control: 'text',
      description: 'Font weight of the text',
    },
    lineHeight: {
      control: 'text',
      description: 'Line height of the text',
    },
    letterSpacing: {
      control: 'text',
      description: 'Letter spacing of the text',
    },
    textAlign: {
      control: 'select',
      options: ['left', 'center', 'right'],
      description: 'Text alignment',
    },
  },
} satisfies Meta<typeof MultiOutlineText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'MOVEMENT',
    color: '#81FFBA',
    fontWeight: '900',
    lineHeight: '110%',
    letterSpacing: '1.28px',
    textAlign: 'center',
  },
};

export const CustomColors: Story = {
  args: {
    children: 'STAKING',
    color: '#FF6B6B',
    outlines: [
      { color: '#4ECDC4', width: { base: '2px', md: '3px' } },
      { color: '#FFE66D', width: { base: '4px', md: '5px' } },
    ],
  },
};

export const ShortText: Story = {
  args: {
    children: 'WIN',
    color: '#FFD700',
    outlines: [
      { color: '#8B0000', width: { base: '2px', md: '4px' } },
      { color: '#000000', width: { base: '4px', md: '6px' } },
    ],
  },
};

export const LongText: Story = {
  args: {
    children: 'BLOCKCHAIN REVOLUTION',
    color: '#00D9FF',
    outlines: [
      { color: '#7B2CBF', width: { base: '2px', md: '3px' } },
      { color: '#FF006E', width: { base: '3px', md: '5px' } },
    ],
  },
};

export const SingleOutline: Story = {
  args: {
    children: 'SIMPLE',
    color: '#FFFFFF',
    outlines: [{ color: '#000000', width: { base: '3px', md: '5px' } }],
  },
};

export const TripleOutline: Story = {
  args: {
    children: 'BOLD',
    color: '#FF4500',
    outlines: [
      { color: '#000080', width: { base: '2px', md: '3px' } },
      { color: '#FFFFFF', width: { base: '4px', md: '5px' } },
      { color: '#FFD700', width: { base: '6px', md: '7px' } },
    ],
  },
};

export const WithMixedContent: Story = {
  args: {
    children: (
      <>
        MOVE <span style={{ color: '#FFD700' }}>NOW</span>
      </>
    ),
    color: '#81FFBA',
  },
};

export const LeftAligned: Story = {
  args: {
    children: 'LEFT',
    textAlign: 'left',
    color: '#FF69B4',
  },
};

export const RightAligned: Story = {
  args: {
    children: 'RIGHT',
    textAlign: 'right',
    color: '#9370DB',
  },
};

export const CustomFontWeight: Story = {
  args: {
    children: 'LIGHT',
    fontWeight: '300',
    color: '#87CEEB',
    outlines: [
      { color: '#000080', width: { base: '1px', md: '2px' } },
      { color: '#FFD700', width: { base: '2px', md: '3px' } },
    ],
  },
};

export const ResponsiveDemo: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="text-center">
        <p className="text-sm text-muted-foreground mb-4">
          Resize your browser to see the text adapt
        </p>
        <MultiOutlineText>RESPONSIVE</MultiOutlineText>
      </div>
      <div className="text-center">
        <p className="text-xs text-muted-foreground">
          Mobile (36px) → Desktop (64px)
        </p>
      </div>
    </div>
  ),
};

export const ColorShowcase: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-6 p-8">
      <MultiOutlineText
        color="#FF6B6B"
        outlines={[
          { color: '#4ECDC4', width: { base: '2px', md: '3px' } },
          { color: '#FFE66D', width: { base: '4px', md: '5px' } },
        ]}
      >
        VIBRANT
      </MultiOutlineText>
      <MultiOutlineText
        color="#A8DADC"
        outlines={[
          { color: '#1D3557', width: { base: '2px', md: '3px' } },
          { color: '#E63946', width: { base: '4px', md: '5px' } },
        ]}
      >
        OCEAN
      </MultiOutlineText>
      <MultiOutlineText
        color="#F72585"
        outlines={[
          { color: '#7209B7', width: { base: '2px', md: '3px' } },
          { color: '#3A0CA3', width: { base: '4px', md: '5px' } },
        ]}
      >
        NEON
      </MultiOutlineText>
    </div>
  ),
};

