import type { Meta, StoryObj } from "@storybook/react";
import { ComparisonRow } from "../src/components/comparison-row";

const meta = {
  title: "Components/ComparisonRow",
  component: ComparisonRow,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ width: 500 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ComparisonRow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Positive: Story = {
  args: {
    label: "lambgoat.com",
    current: 18230,
    previous: 15400,
  },
};

export const Negative: Story = {
  args: {
    label: "noecho.net",
    current: 4100,
    previous: 5200,
  },
};

export const Equal: Story = {
  args: {
    label: "melodicmag.com",
    current: 2300,
    previous: 2300,
  },
};

export const WithCurrencyFormat: Story = {
  args: {
    label: "lambgoat.com Revenue",
    current: 24680.5,
    previous: 21450.75,
    format: (v: number) =>
      v.toLocaleString("en-US", { style: "currency", currency: "USD" }),
  },
};

export const LargeNumbers: Story = {
  args: {
    label: "Total Pageviews",
    current: 1245000,
    previous: 1180000,
  },
};
