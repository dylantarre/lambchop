import type { Meta, StoryObj } from "@storybook/react";
import { MetricTrend } from "../src/components/metric-trend";

const meta = {
  title: "Components/MetricTrend",
  component: MetricTrend,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof MetricTrend>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PositiveDelta: Story = {
  args: {
    value: "$14,520",
    delta: 8.3,
  },
};

export const NegativeDelta: Story = {
  args: {
    value: "$9,870",
    delta: -4.2,
  },
};

export const ZeroDelta: Story = {
  args: {
    value: "$11,200",
    delta: 0,
  },
};

export const SmallSize: Story = {
  args: {
    value: "$6,340",
    delta: 3.1,
    size: "sm",
  },
};

export const LargeSize: Story = {
  args: {
    value: "$28,750",
    delta: 15.6,
    size: "lg",
  },
};

export const WithDeltaLabel: Story = {
  args: {
    value: "$18,230",
    delta: 12.4,
    deltaLabel: "vs last month",
  },
};
