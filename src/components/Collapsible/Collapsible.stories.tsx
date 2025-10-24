import type { Meta, StoryObj } from "@storybook/react";
import { center } from "styled-system/patterns";

import { Button } from "../Button";
import * as Collapsible from "./Collapsible";

const meta: Meta<typeof Collapsible.Root> = {
  title: "Components/Collapsible",
  component: Collapsible.Root,
};
export default meta;

type Story = StoryObj<typeof Collapsible.Root>;

export const Default: Story = {
  args: {
    children: (
      <>
        <Collapsible.Trigger asChild>
          <Button>Toggle</Button>
        </Collapsible.Trigger>
        <Collapsible.Content>
          <div className={center({ height: "[240px]", bg: "neutrals.whiteAlpha.100" })}>Content</div>
        </Collapsible.Content>
      </>
    ),
  },
};

export const DefaultOpen: Story = {
  args: {
    ...Default.args,
    defaultOpen: true,
  },
};
