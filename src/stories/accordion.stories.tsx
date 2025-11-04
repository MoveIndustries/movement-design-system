import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../components/ui/accordion";
import { MoveIcon, Package, Rocket, Settings } from "lucide-react";

const meta = {
  title: "UI/Accordion",
  component: Accordion,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["single", "multiple"],
      description: "Whether multiple items can be open at once",
    },
  },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Accordion type="single" collapsible className="w-96">
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionContent>
          Yes. It comes with default styles that matches the other components'
          aesthetic.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Is it animated?</AccordionTrigger>
        <AccordionContent>
          Yes. It's animated by default, but you can disable it if you prefer.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <Accordion type="single" collapsible className="w-96">
      <AccordionItem value="item-1">
        <AccordionTrigger showIcon icon={<MoveIcon className="size-6" />}>
          Lorem ipsum accordion heading title?
        </AccordionTrigger>
        <AccordionContent>Accordion content here.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger showIcon icon={<Package className="size-6" />}>
          What features are included?
        </AccordionTrigger>
        <AccordionContent>
          This accordion includes leading icons, improved typography, and
          customizable borders.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger showIcon icon={<Rocket className="size-6" />}>
          How do I get started?
        </AccordionTrigger>
        <AccordionContent>
          Simply import the component and use it with your preferred icons and
          content.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const NoBorders: Story = {
  render: () => (
    <Accordion type="single" collapsible className="w-96">
      <AccordionItem value="item-1" showBottomBorder={false}>
        <AccordionTrigger>Clean layout without borders</AccordionTrigger>
        <AccordionContent>
          You can remove borders for a cleaner, more minimal appearance.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2" showBottomBorder={false}>
        <AccordionTrigger>Perfect for cards</AccordionTrigger>
        <AccordionContent>
          This style works great inside cards or when you want less visual
          separation.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3" showBottomBorder={false}>
        <AccordionTrigger>Flexible styling</AccordionTrigger>
        <AccordionContent>
          Control borders individually on each item as needed.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const CustomBorders: Story = {
  render: () => (
    <Accordion type="single" collapsible className="w-96">
      <AccordionItem value="item-1" showTopBorder>
        <AccordionTrigger>First item with top border</AccordionTrigger>
        <AccordionContent>
          You can add a top border to the first item for better definition.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Middle item</AccordionTrigger>
        <AccordionContent>
          Middle items can have just bottom borders for consistency.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Last item</AccordionTrigger>
        <AccordionContent>
          The last item automatically removes its bottom border.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const Multiple: Story = {
  render: () => (
    <Accordion type="multiple" className="w-96">
      <AccordionItem value="item-1">
        <AccordionTrigger showIcon icon={<Settings className="size-6" />}>
          What is React?
        </AccordionTrigger>
        <AccordionContent>
          React is a JavaScript library for building user interfaces.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger showIcon icon={<Settings className="size-6" />}>
          What is TypeScript?
        </AccordionTrigger>
        <AccordionContent>
          TypeScript is a typed superset of JavaScript that compiles to plain
          JavaScript.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger showIcon icon={<Settings className="size-6" />}>
          What is Tailwind CSS?
        </AccordionTrigger>
        <AccordionContent>
          Tailwind CSS is a utility-first CSS framework for rapidly building
          custom user interfaces.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const DarkTheme: Story = {
  render: () => (
    <div className="bg-background p-8 rounded-lg">
      <Accordion type="single" collapsible className="w-96">
        <AccordionItem value="item-1" showTopBorder>
          <AccordionTrigger showIcon icon={<MoveIcon className="size-6" />}>
            Lorem ipsum accordion heading title?
          </AccordionTrigger>
          <AccordionContent>Accordion content here.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger showIcon icon={<MoveIcon className="size-6" />}>
            Lorem ipsum accordion heading title?
          </AccordionTrigger>
          <AccordionContent>Accordion content here.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger showIcon icon={<MoveIcon className="size-6" />}>
            Lorem ipsum accordion heading title?
          </AccordionTrigger>
          <AccordionContent>Accordion content here.</AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  ),
};
