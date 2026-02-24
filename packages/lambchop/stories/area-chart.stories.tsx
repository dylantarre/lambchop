import type { Meta, StoryObj } from "@storybook/react";
import { AreaChart } from "../src/components/area-chart";

const meta = {
  title: "Components/AreaChart",
  component: AreaChart,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ width: 700 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof AreaChart>;

export default meta;
type Story = StoryObj<typeof meta>;

const dailyPageviews = [
  { date: "Jan 1", pageviews: 45000 },
  { date: "Jan 2", pageviews: 48000 },
  { date: "Jan 3", pageviews: 47200 },
  { date: "Jan 4", pageviews: 43800 },
  { date: "Jan 5", pageviews: 51000 },
  { date: "Jan 6", pageviews: 54200 },
  { date: "Jan 7", pageviews: 52800 },
  { date: "Jan 8", pageviews: 56100 },
  { date: "Jan 9", pageviews: 58400 },
  { date: "Jan 10", pageviews: 61000 },
  { date: "Jan 11", pageviews: 59200 },
  { date: "Jan 12", pageviews: 63500 },
  { date: "Jan 13", pageviews: 65100 },
  { date: "Jan 14", pageviews: 67800 },
];

export const SingleArea: Story = {
  args: {
    data: dailyPageviews,
    xKey: "date",
    areas: [{ key: "pageviews", label: "Pageviews" }],
  },
};

const revenueBySource = [
  { date: "Jan 1", playwire: 820, stripe: 310, partnerize: 120 },
  { date: "Jan 2", playwire: 910, stripe: 340, partnerize: 130 },
  { date: "Jan 3", playwire: 880, stripe: 380, partnerize: 160 },
  { date: "Jan 4", playwire: 790, stripe: 350, partnerize: 150 },
  { date: "Jan 5", playwire: 950, stripe: 400, partnerize: 160 },
  { date: "Jan 6", playwire: 1020, stripe: 420, partnerize: 180 },
  { date: "Jan 7", playwire: 980, stripe: 410, partnerize: 190 },
  { date: "Jan 8", playwire: 1050, stripe: 450, partnerize: 190 },
  { date: "Jan 9", playwire: 1100, stripe: 470, partnerize: 180 },
  { date: "Jan 10", playwire: 1150, stripe: 490, partnerize: 180 },
  { date: "Jan 11", playwire: 1080, stripe: 460, partnerize: 200 },
  { date: "Jan 12", playwire: 1200, stripe: 510, partnerize: 200 },
  { date: "Jan 13", playwire: 1220, stripe: 520, partnerize: 210 },
  { date: "Jan 14", playwire: 1280, stripe: 540, partnerize: 230 },
];

export const StackedAreas: Story = {
  args: {
    data: revenueBySource,
    xKey: "date",
    areas: [
      { key: "playwire", label: "Playwire Ads" },
      { key: "stripe", label: "Stripe Subscriptions" },
      { key: "partnerize", label: "Partnerize Affiliate" },
    ],
    stacked: true,
  },
};

export const Unstacked: Story = {
  args: {
    data: revenueBySource,
    xKey: "date",
    areas: [
      { key: "playwire", label: "Playwire Ads" },
      { key: "stripe", label: "Stripe Subscriptions" },
      { key: "partnerize", label: "Partnerize Affiliate" },
    ],
    stacked: false,
  },
};

export const CustomColors: Story = {
  args: {
    data: revenueBySource,
    xKey: "date",
    areas: [
      { key: "playwire", label: "Playwire Ads", color: "#8b5cf6" },
      { key: "stripe", label: "Stripe Subscriptions", color: "#f59e0b" },
      { key: "partnerize", label: "Partnerize Affiliate", color: "#06b6d4" },
    ],
    stacked: true,
  },
};
