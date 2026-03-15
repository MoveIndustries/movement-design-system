import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { cn } from "@/lib/utils";
import { MoveIcon } from "@/components/Icon";
import { Card, CardContent, CardHeader } from "@/components/shadcn/card";
import { Typography } from "@/components/shadcn/typography";
import { Plant } from "@phosphor-icons/react";


/**
 * StakingBalance Block
 *
 * A glass-morphism card displaying staking information with total staked amount,
 * active delegations, and total rewards. Uses the Movement design system with
 * Card, Typography, and Icon components.
 */


const meta = {
  title: "Blocks/Staking Balance",
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "dark",
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card
    className={cn("h-[200px] w-[334px] gap-3 py-0")}
  >
    <CardHeader className="px-6 pt-[19px] pb-0">
      <Typography
        variant="mono"
        className="text-2xl leading-[1.2] font-medium tracking-[-0.04em] text-white"
      >
        Staking Balance
      </Typography>
    </CardHeader>

    <CardContent className="flex flex-col gap-2 px-6 pt-0 pb-6">
      {/* Total Staked Row */}
      <div className="grid grid-cols-[184px_minmax(0,1fr)] items-center gap-2">
        <Typography
          variant="uppercase"
          className="text-sm leading-[1.4] text-white/64"
        >
          Total Staked
        </Typography>
        <div className="flex items-center gap-2">
          <MoveIcon className="size-6 shrink-0" />
          <Typography
            variant="large"
            className="text-xl leading-[1.4] text-white"
          >
            1234.56
          </Typography>
        </div>
      </div>

      {/* Active Delegations Row */}
      <div className="grid grid-cols-[184px_minmax(0,1fr)] items-center gap-2">
        <Typography
          variant="uppercase"
          className="text-sm leading-[1.4] text-white/64"
        >
          Active Delegations
        </Typography>
        <Typography
          variant="large"
          className="text-xl leading-[1.4] text-white"
        >
          3
        </Typography>
      </div>

      {/* Total Rewards Row */}
      <div className="grid grid-cols-[184px_minmax(0,1fr)] items-center gap-2">
        <Typography
          variant="uppercase"
          className="text-guild-green-300 text-sm leading-[1.4]"
        >
          Total Rewards
        </Typography>
        <div className="flex items-center gap-2">
          <Plant
            className="text-guild-green-300 size-6 shrink-0"
            weight="fill"
          />
          <Typography
            variant="large"
            className="text-guild-green-300 text-xl leading-[1.4]"
          >
            45.23
          </Typography>
        </div>
      </div>
    </CardContent>
  </Card>
  ),
};


