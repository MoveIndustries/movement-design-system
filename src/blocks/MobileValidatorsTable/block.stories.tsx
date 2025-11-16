import type { StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Card, CardContent } from "@/components/shadcn/card";
import { Typography } from "@/components/shadcn/typography";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/shadcn/table";
import { Button } from "@/components/shadcn/button";
import { Progress } from "@/components/shadcn/progress";
import { MoveIcon, Plant } from "@/components/Icon";
import { useSortableData, useTableSort } from "@/components/shadcn/table-hooks";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/shadcn/badge";

/**
 * MobileValidatorsTable Block
 *
 * A mobile-optimized validators table that displays as cards on mobile devices.
 * Demonstrates the flexible mobile rendering pattern for tables with custom layouts.
 */

const meta = {
  title: "Blocks/Mobile Validators Table",
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

// Sample data types
interface Validator {
  id: string;
  name: string;
  icon: string;
  iconBg: string;
  volume: number;
  performance: number;
  commission: number;
  uptime: number;
  totalStake: number;
  apy: number;
  status: "active" | "inactive";
}

// Generate sample validators data
const generateValidators = (): Validator[] => {
  return [
    {
      id: "1",
      name: "Movement Labs",
      icon: "🔬",
      iconBg: "bg-purple-500",
      volume: 3979074,
      performance: 100,
      commission: 6,
      uptime: 100,
      totalStake: 225,
      apy: 8.0,
      status: "active",
    },
    {
      id: "2",
      name: "Movement Elite",
      icon: "💎",
      iconBg: "bg-cyan-400",
      volume: 3979074,
      performance: 100,
      commission: 6,
      uptime: 100,
      totalStake: 225,
      apy: 8.0,
      status: "active",
    },
    {
      id: "3",
      name: "Movement Pro",
      icon: "🏆",
      iconBg: "bg-blue-500",
      volume: 3979074,
      performance: 100,
      commission: 6,
      uptime: 100,
      totalStake: 225,
      apy: 8.0,
      status: "active",
    },
    {
      id: "4",
      name: "Validator One",
      icon: "✓",
      iconBg: "bg-green-500",
      volume: 3979074,
      performance: 100,
      commission: 6,
      uptime: 100,
      totalStake: 225,
      apy: 8.0,
      status: "active",
    },
    {
      id: "5",
      name: "Movement Foundation",
      icon: "⭐",
      iconBg: "bg-yellow-400",
      volume: 1070060,
      performance: 99,
      commission: 6,
      uptime: 100,
      totalStake: 200,
      apy: 9.2,
      status: "active",
    },
  ];
};

// Format large numbers with commas
const formatNumber = (num: number): string => {
  return num.toLocaleString("en-US");
};

interface MobileValidatorsTableProps {
  variant?: "simple" | "borders" | "alternating";
  forceMobile?: boolean;
}

function ValidatorsTableInner({ validators }: { validators: Validator[] }) {
  const sortedValidators = useSortableData(validators);
  const { sortColumn, sortDirection } = useTableSort();

  const handleStake = (validatorId: string, validatorName: string) => {
    console.log(`Stake to validator ${validatorName} (${validatorId})`);
  };

  return (
    <>
      <TableHeader>
        <TableRow>
          <TableHead sortKey="name" className="pl-6">
            Validator
          </TableHead>
          <TableHead sortKey="volume">Volume</TableHead>
          <TableHead sortKey="performance">Performance</TableHead>
          <TableHead sortKey="commission">Commission</TableHead>
          <TableHead sortKey="uptime">Uptime</TableHead>
          <TableHead sortKey="totalStake">Total Stake</TableHead>
          <TableHead sortKey="apy">APY</TableHead>
          <TableHead className="pr-6"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody key={`${sortColumn}-${sortDirection}`}>
        {sortedValidators.map((validator) => (
          <TableRow key={validator.id}>
            {/* Validator Name with Icon */}
            <TableCell className="pl-6">
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "flex items-center justify-center size-10 rounded-full text-lg",
                    validator.iconBg,
                  )}
                >
                  {validator.icon}
                </div>
                <span className="text-white font-normal">{validator.name}</span>
              </div>
            </TableCell>

            {/* Volume */}
            <TableCell>
              <div className="flex items-center gap-2">
                <MoveIcon className="size-5 shrink-0" />
                <span className="font-mono">
                  {formatNumber(validator.volume)}
                </span>
              </div>
            </TableCell>

            {/* Performance Progress Bar */}
            <TableCell>
              <div className="flex items-center gap-3 min-w-[215px]">
                <Progress
                  value={validator.performance}
                  className="h-4 flex-1 bg-white/10 [&>div]:bg-guild-green-300"
                />
                <span className="text-white/64 text-xs font-normal min-w-[35px]">
                  {validator.performance}%
                </span>
              </div>
            </TableCell>

            {/* Commission */}
            <TableCell>
              <span className="text-white">{validator.commission}%</span>
            </TableCell>

            {/* Uptime */}
            <TableCell>
              <span className="text-white">{validator.uptime}%</span>
            </TableCell>

            {/* Total Stake */}
            <TableCell>
              <div className="flex items-center gap-2">
                <MoveIcon className="size-5 shrink-0" />
                <span className="font-mono">{validator.totalStake}</span>
              </div>
            </TableCell>

            {/* APY */}
            <TableCell>
              <span className="text-white">{validator.apy}%</span>
            </TableCell>

            {/* Stake Button */}
            <TableCell className="pr-6">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleStake(validator.id, validator.name)}
                className="border-guild-green-300 text-guild-green-300 hover:bg-guild-green-300/10 rounded-lg gap-1.5"
              >
                <Plant className="size-4" weight="fill" />
                <span className="uppercase text-xs">Stake</span>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
}

export function MobileValidatorsTable({
  variant = "simple",
  forceMobile = false,
}: MobileValidatorsTableProps) {
  const [validators] = useState<Validator[]>(generateValidators());
  const sortedValidators = useSortableData(validators);

  const handleStake = (validatorId: string, validatorName: string) => {
    console.log(`Stake to validator ${validatorName} (${validatorId})`);
  };

  return (
    <div className="w-full max-w-7xl">
      <Card variant="default" className="border-0 p-0">
        <CardContent className="p-0">
          {/* Title */}
          <div className="px-6 py-6 flex items-center justify-center">
            <Typography
              variant="mono"
              className="text-2xl leading-[1.4] font-medium tracking-[0.02em] text-white uppercase"
            >
              All Validators
            </Typography>
          </div>

          {/* Table with Mobile Support */}
          <Table
            variant={variant}
            className="border-0 p-0 rounded-none"
            forceMobile={forceMobile}
            mobileData={sortedValidators}
            mobileCardRender={(validator: Validator) => (
              <div className="rounded-lg bg-[rgba(0,0,0,0.4)] backdrop-blur-sm border border-[rgba(255,255,255,0.24)] overflow-hidden">
                {/* Card Header */}
                <div className="flex items-center justify-between p-4 border-b border-[rgba(255,255,255,0.24)]">
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "flex items-center justify-center size-10 rounded-full text-lg shrink-0",
                        validator.iconBg,
                      )}
                    >
                      {validator.icon}
                    </div>
                    <Typography variant="body" className="text-white font-semibold">
                      {validator.name}
                    </Typography>
                  </div>
                  <Badge
                    variant="outline"
                    className="bg-green-500/20 text-green-400 border-green-500/40 capitalize"
                  >
                    {validator.status}
                  </Badge>
                </div>

                {/* Card Content - Grid Layout */}
                <div className="p-4 space-y-4">
                  {/* Row 1: Volume, Commission, APY */}
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <div className="text-[10px] leading-[1.3] font-bold tracking-[1.2px] uppercase text-[rgba(255,255,255,0.48)] mb-1.5">
                        Volume
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MoveIcon className="size-4 shrink-0" />
                        <span className="text-white text-sm font-mono leading-[1.4]">
                          {formatNumber(validator.volume)}
                        </span>
                      </div>
                    </div>

                    <div>
                      <div className="text-[10px] leading-[1.3] font-bold tracking-[1.2px] uppercase text-[rgba(255,255,255,0.48)] mb-1.5">
                        Commission
                      </div>
                      <div className="text-white text-sm font-normal leading-[1.4]">
                        {validator.commission}%
                      </div>
                    </div>

                    <div>
                      <div className="text-[10px] leading-[1.3] font-bold tracking-[1.2px] uppercase text-[rgba(255,255,255,0.48)] mb-1.5">
                        APY
                      </div>
                      <div className="text-white text-sm font-normal leading-[1.4]">
                        {validator.apy}%
                      </div>
                    </div>
                  </div>

                  {/* Row 2: Performance, Uptime, Total Stake */}
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <div className="text-[10px] leading-[1.3] font-bold tracking-[1.2px] uppercase text-[rgba(255,255,255,0.48)] mb-1.5">
                        Performance
                      </div>
                      <div className="text-white text-sm font-normal leading-[1.4]">
                        {validator.performance}%
                      </div>
                    </div>

                    <div>
                      <div className="text-[10px] leading-[1.3] font-bold tracking-[1.2px] uppercase text-[rgba(255,255,255,0.48)] mb-1.5">
                        Uptime
                      </div>
                      <div className="text-white text-sm font-normal leading-[1.4]">
                        {validator.uptime}%
                      </div>
                    </div>

                    <div>
                      <div className="text-[10px] leading-[1.3] font-bold tracking-[1.2px] uppercase text-[rgba(255,255,255,0.48)] mb-1.5">
                        Total Stake
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MoveIcon className="size-4 shrink-0" />
                        <span className="text-white text-sm font-mono leading-[1.4]">
                          {validator.totalStake}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Stake Button */}
                  <Button
                    variant="outline"
                    size="default"
                    onClick={() => handleStake(validator.id, validator.name)}
                    className="w-full border-guild-green-300 text-guild-green-300 hover:bg-guild-green-300/10 rounded-lg gap-2"
                  >
                    <Plant className="size-5" weight="fill" />
                    <span className="uppercase text-sm font-semibold">Stake</span>
                  </Button>
                </div>
              </div>
            )}
          >
            <ValidatorsTableInner validators={validators} />
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

export const Default: Story = {
  render: () => <MobileValidatorsTable forceMobile={true} />,
};

export const WithBorders: Story = {
  render: () => <MobileValidatorsTable variant="borders" forceMobile={true} />,
};

export const Alternating: Story = {
  render: () => <MobileValidatorsTable variant="alternating" forceMobile={true} />,
};

export const Responsive: Story = {
  render: () => <MobileValidatorsTable />,
  parameters: {
    docs: {
      description: {
        story:
          "This story demonstrates responsive behavior. On desktop, it shows a traditional table. On mobile (< 768px), it automatically switches to card view. Resize your browser to see the transition.",
      },
    },
  },
};

