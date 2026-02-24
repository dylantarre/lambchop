import type { Meta, StoryObj } from "@storybook/react";
import { LineChart } from "../src/components/line-chart";

const meta = {
  title: "Components/LineChart",
  component: LineChart,
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
} satisfies Meta<typeof LineChart>;

export default meta;
type Story = StoryObj<typeof meta>;

const dailyRevenue = [
  { date: "Jan 1", revenue: 1250 },
  { date: "Jan 2", revenue: 1380 },
  { date: "Jan 3", revenue: 1420 },
  { date: "Jan 4", revenue: 1290 },
  { date: "Jan 5", revenue: 1510 },
  { date: "Jan 6", revenue: 1620 },
  { date: "Jan 7", revenue: 1580 },
  { date: "Jan 8", revenue: 1690 },
  { date: "Jan 9", revenue: 1750 },
  { date: "Jan 10", revenue: 1820 },
  { date: "Jan 11", revenue: 1780 },
  { date: "Jan 12", revenue: 1910 },
  { date: "Jan 13", revenue: 1950 },
  { date: "Jan 14", revenue: 2050 },
];

export const SingleLine: Story = {
  args: {
    data: dailyRevenue,
    xKey: "date",
    lines: [{ key: "revenue", label: "Revenue ($)" }],
  },
};

const multiSiteData = [
  { date: "Jan 1", lambgoat: 820, theneedledrop: 340, numetalagenda: 140 },
  { date: "Jan 2", lambgoat: 910, theneedledrop: 380, numetalagenda: 160 },
  { date: "Jan 3", lambgoat: 880, theneedledrop: 420, numetalagenda: 150 },
  { date: "Jan 4", lambgoat: 790, theneedledrop: 360, numetalagenda: 130 },
  { date: "Jan 5", lambgoat: 950, theneedledrop: 410, numetalagenda: 170 },
  { date: "Jan 6", lambgoat: 1020, theneedledrop: 450, numetalagenda: 180 },
  { date: "Jan 7", lambgoat: 980, theneedledrop: 430, numetalagenda: 175 },
  { date: "Jan 8", lambgoat: 1050, theneedledrop: 470, numetalagenda: 190 },
  { date: "Jan 9", lambgoat: 1100, theneedledrop: 490, numetalagenda: 185 },
  { date: "Jan 10", lambgoat: 1150, theneedledrop: 510, numetalagenda: 200 },
  { date: "Jan 11", lambgoat: 1080, theneedledrop: 480, numetalagenda: 195 },
  { date: "Jan 12", lambgoat: 1200, theneedledrop: 530, numetalagenda: 210 },
  { date: "Jan 13", lambgoat: 1220, theneedledrop: 540, numetalagenda: 205 },
  { date: "Jan 14", lambgoat: 1280, theneedledrop: 560, numetalagenda: 220 },
];

export const MultipleLines: Story = {
  args: {
    data: multiSiteData,
    xKey: "date",
    lines: [
      { key: "lambgoat", label: "lambgoat.com" },
      { key: "theneedledrop", label: "theneedledrop.com" },
      { key: "numetalagenda", label: "numetalagenda.com" },
    ],
  },
};

export const CustomColors: Story = {
  args: {
    data: multiSiteData,
    xKey: "date",
    lines: [
      { key: "lambgoat", label: "lambgoat.com", color: "#8b5cf6" },
      { key: "theneedledrop", label: "theneedledrop.com", color: "#f59e0b" },
      { key: "numetalagenda", label: "numetalagenda.com", color: "#06b6d4" },
    ],
  },
};
