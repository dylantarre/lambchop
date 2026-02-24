import type { Meta, StoryObj } from "@storybook/react";
import { KpiCard } from "../src/components/kpi-card";

const meta = {
  title: "Components/KpiCard",
  component: KpiCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ width: 280 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof KpiCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Total Revenue",
    value: "$12,450",
  },
};

export const WithTrend: Story = {
  args: {
    label: "Monthly Revenue",
    value: "$18,230",
    trend: { value: 12.4, isPositive: true },
  },
};

export const WithNegativeTrend: Story = {
  args: {
    label: "Ad Revenue",
    value: "$3,180",
    trend: { value: 5.7, isPositive: false },
  },
};

export const WithSparkline: Story = {
  args: {
    label: "Pageviews",
    value: "245K",
    sparklineData: [
      32000, 35000, 33000, 38000, 42000, 39000, 45000, 48000, 46000, 52000,
      55000, 53000, 58000, 61000,
    ],
  },
};

export const WithIcon: Story = {
  args: {
    label: "Active Writers",
    value: "24",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path
          d="M8 8a3 3 0 100-6 3 3 0 000 6zM2 14a6 6 0 0112 0"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
};

export const AllFeatures: Story = {
  args: {
    label: "lambgoat.com Revenue",
    value: "$24,680",
    trend: { value: 8.3, isPositive: true },
    sparklineData: [
      1250, 1380, 1420, 1290, 1510, 1620, 1580, 1690, 1750, 1820, 1780, 1910,
      1950, 2050,
    ],
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path
          d="M14 8.5a6 6 0 11-3-5.2"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M14 2v4h-4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
};
