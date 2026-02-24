import type { Meta, StoryObj } from "@storybook/react";
import { StatCard } from "../src/components/stat-card";

const meta = {
  title: "Components/StatCard",
  component: StatCard,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ width: 220 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof StatCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { value: "2.4M", label: "Monthly Pageviews" },
};

export const Revenue: Story = {
  args: { value: "$84K", label: "Monthly Revenue" },
};

export const Network: Story = {
  args: { value: "9", label: "Network Sites" },
};

export const Notched: Story = {
  args: { value: "$84K", label: "Monthly Revenue", notched: true },
};

export const NotchedRow: Story = {
  decorators: [
    (Story) => (
      <div style={{ width: 600 }}>
        <Story />
      </div>
    ),
  ],
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
      <StatCard value="2.4M" label="Pageviews" notched />
      <StatCard value="$84K" label="Revenue" notched />
      <StatCard value="9" label="Sites" notched />
    </div>
  ),
};
