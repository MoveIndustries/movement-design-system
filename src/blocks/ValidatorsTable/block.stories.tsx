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
import { Plant } from "@phosphor-icons/react";
import { MoveIcon } from "@/components/Icon";
import { useSortableData, useTableSort } from "@/components/shadcn/table-hooks";
import { cn } from "@/lib/utils";

/**
 * ValidatorsTable Block
 *
 * A comprehensive validators table with sorting, performance indicators, and staking actions.
 * Combines Table, Progress, Button, Card, and Typography components.
 */

const meta = {
  title: "Blocks/Validators Table",
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
}

// Generate sample validators data
const generateValidators = (): Validator[] => {
  return [
    {
      id: "1",
      name: "Movement Pro",
      icon: "🏆",
      iconBg: "bg-blue-500",
      volume: 3979074,
      performance: 100,
      commission: 6,
      uptime: 100,
      totalStake: 200000,
      apy: 8.8,
    },
    {
      id: "2",
      name: "Movement Foundation",
      icon: "⭐",
      iconBg: "bg-yellow-400",
      volume: 1070060,
      performance: 100,
      commission: 6,
      uptime: 100,
      totalStake: 200000,
      apy: 9.2,
    },
    {
      id: "3",
      name: "Movement Elite",
      icon: "💎",
      iconBg: "bg-cyan-400",
      volume: 1070060,
      performance: 100,
      commission: 6,
      uptime: 100,
      totalStake: 200000,
      apy: 8.9,
    },
    {
      id: "4",
      name: "Movement Labs",
      icon: "🔬",
      iconBg: "bg-purple-500",
      volume: 1070060,
      performance: 100,
      commission: 6,
      uptime: 100,
      totalStake: 200000,
      apy: 9.0,
    },
    {
      id: "5",
      name: "Validator One",
      icon: "✓",
      iconBg: "bg-green-500",
      volume: 1070060,
      performance: 100,
      commission: 6,
      uptime: 100,
      totalStake: 200000,
      apy: 8.0,
    },
    {
      id: "6",
      name: "Body Default",
      icon: "🎯",
      iconBg: "bg-pink-400",
      volume: 1070060,
      performance: 100,
      commission: 6,
      uptime: 100,
      totalStake: 200000,
      apy: 8.0,
    },
    {
      id: "7",
      name: "Body Default",
      icon: "🌟",
      iconBg: "bg-blue-600",
      volume: 1070060,
      performance: 100,
      commission: 6,
      uptime: 100,
      totalStake: 200000,
      apy: 8.0,
    },
    {
      id: "8",
      name: "Body Default",
      icon: "🚀",
      iconBg: "bg-indigo-500",
      volume: 1070060,
      performance: 100,
      commission: 6,
      uptime: 100,
      totalStake: 200000,
      apy: 8.0,
    },
    {
      id: "9",
      name: "Body Default",
      icon: "💫",
      iconBg: "bg-purple-400",
      volume: 1070060,
      performance: 99,
      commission: 6,
      uptime: 100,
      totalStake: 200000,
      apy: 8.0,
    },
  ];
};

// Format large numbers with commas
const formatNumber = (num: number): string => {
  return num.toLocaleString("en-US");
};

interface ValidatorsTableProps {
  variant?: "simple" | "borders" | "alternating";
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
                      <span className="text-white font-normal">
                        {validator.name}
                      </span>
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
                      <span className="font-mono">
                        {formatNumber(validator.totalStake / 1000)}K
                      </span>
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

export function ValidatorsTable({ variant = "simple" }: ValidatorsTableProps) {
  const [validators] = useState<Validator[]>(generateValidators());

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

          {/* Table */}
          <Table variant={variant} className="border-0 p-0 rounded-none">
            <ValidatorsTableInner validators={validators} />
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

export const Default: Story = {
  render: () => <ValidatorsTable />,
};

export const WithBorders: Story = {
  render: () => <ValidatorsTable variant="borders" />,
};

export const Alternating: Story = {
  render: () => <ValidatorsTable variant="alternating" />,
};

