import type { Meta, StoryObj } from "@storybook/react";
import { BarChart } from "../src/components/bar-chart";

const meta = {
  title: "Components/BarChart",
  component: BarChart,
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
} satisfies Meta<typeof BarChart>;

export default meta;
type Story = StoryObj<typeof meta>;

const monthlyRevenue = [
  { month: "Sep", revenue: 14200 },
  { month: "Oct", revenue: 15800 },
  { month: "Nov", revenue: 13900 },
  { month: "Dec", revenue: 18400 },
  { month: "Jan", revenue: 16700 },
  { month: "Feb", revenue: 19200 },
];

export const Default: Story = {
  args: {
    data: monthlyRevenue,
    xKey: "month",
    bars: [{ key: "revenue", label: "Revenue ($)" }],
  },
};

const siteRevenue = [
  { month: "Sep", lambgoat: 8200, theneedledrop: 4100, numetalagenda: 1900 },
  { month: "Oct", lambgoat: 9100, theneedledrop: 4500, numetalagenda: 2200 },
  { month: "Nov", lambgoat: 7800, theneedledrop: 3900, numetalagenda: 2200 },
  { month: "Dec", lambgoat: 10500, theneedledrop: 5200, numetalagenda: 2700 },
  { month: "Jan", lambgoat: 9600, theneedledrop: 4800, numetalagenda: 2300 },
  { month: "Feb", lambgoat: 11200, theneedledrop: 5400, numetalagenda: 2600 },
];

export const MultipleBars: Story = {
  args: {
    data: siteRevenue,
    xKey: "month",
    bars: [
      { key: "lambgoat", label: "lambgoat.com" },
      { key: "theneedledrop", label: "theneedledrop.com" },
      { key: "numetalagenda", label: "numetalagenda.com" },
    ],
  },
};

const writerRevenue = [
  { writer: "Alex H.", revenue: 4250 },
  { writer: "Jordan P.", revenue: 3800 },
  { writer: "Casey M.", revenue: 3120 },
  { writer: "Taylor R.", revenue: 2890 },
  { writer: "Morgan S.", revenue: 2450 },
];

export const HorizontalLayout: Story = {
  args: {
    data: writerRevenue,
    xKey: "writer",
    bars: [{ key: "revenue", label: "Revenue ($)" }],
    layout: "horizontal",
    height: 250,
  },
};

export const CustomColors: Story = {
  args: {
    data: siteRevenue,
    xKey: "month",
    bars: [
      { key: "lambgoat", label: "lambgoat.com", color: "#8b5cf6" },
      { key: "theneedledrop", label: "theneedledrop.com", color: "#f59e0b" },
      { key: "numetalagenda", label: "numetalagenda.com", color: "#06b6d4" },
    ],
  },
};
