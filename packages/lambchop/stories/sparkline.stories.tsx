import type { Meta, StoryObj } from "@storybook/react";
import { Sparkline } from "../src/components/sparkline";

const meta = {
  title: "Components/Sparkline",
  component: Sparkline,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Sparkline>;

export default meta;
type Story = StoryObj<typeof meta>;

const revenueData = [
  1250, 1380, 1420, 1290, 1510, 1620, 1580, 1690, 1750, 1820, 1780, 1910,
  1950, 2050,
];

export const Default: Story = {
  args: {
    data: revenueData,
  },
};

export const CustomColor: Story = {
  args: {
    data: revenueData,
    color: "#16a34a",
  },
};

export const Wide: Story = {
  args: {
    data: revenueData,
    width: 200,
    height: 24,
  },
};

export const Tall: Story = {
  args: {
    data: revenueData,
    width: 80,
    height: 60,
  },
};

export const FlatData: Story = {
  args: {
    data: [500, 502, 498, 501, 499, 500, 503, 497, 500, 501],
    color: "#6b7280",
  },
};

export const VolatileData: Story = {
  args: {
    data: [800, 2400, 600, 3100, 450, 2800, 900, 3500, 700, 2200, 1100, 2900],
    color: "#ef4444",
  },
};
