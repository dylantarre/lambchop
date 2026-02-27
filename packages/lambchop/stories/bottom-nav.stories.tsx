import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { BottomNav } from "../src/components/bottom-nav";

const DashboardIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <rect x="1" y="1" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
    <rect x="9" y="1" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
    <rect x="1" y="9" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
    <rect x="9" y="9" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

const RevenueIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M8 1v14M4.5 4C4.5 2.9 6 2 8 2s3.5.9 3.5 2-1.5 2-3.5 2-3.5.9-3.5 2 1.5 2 3.5 2 3.5.9 3.5 2-1.5 2-3.5 2-3.5-.9-3.5-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const WritersIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M11 14v-1a3 3 0 00-3-3H5a3 3 0 00-3 3v1M6.5 7a3 3 0 100-6 3 3 0 000 6zM14 14v-1a3 3 0 00-2-2.8M10 1.2a3 3 0 010 5.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ArticlesIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M2 3h12M2 6h12M2 9h8M2 12h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const SettingsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.5" />
    <path d="M8 1v2M8 13v2M1 8h2M13 8h2M3.05 3.05l1.41 1.41M11.54 11.54l1.41 1.41M3.05 12.95l1.41-1.41M11.54 4.46l1.41-1.41" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const fiveItems = [
  { label: "Dashboard", href: "#", icon: <DashboardIcon />, active: true },
  { label: "Revenue", href: "#", icon: <RevenueIcon /> },
  { label: "Writers", href: "#", icon: <WritersIcon /> },
  { label: "Articles", href: "#", icon: <ArticlesIcon /> },
  { label: "Settings", href: "#", icon: <SettingsIcon /> },
];

const meta = {
  title: "Components/BottomNav",
  component: BottomNav,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ height: 560, width: 390, margin: "0 auto", border: "1px solid #d6cfc5", position: "relative", overflow: "hidden", background: "rgb(var(--surface))" }}>
        <div style={{ padding: "1rem", paddingBottom: "5rem" }}>
          <p style={{ fontSize: 14, color: "rgb(var(--text-secondary))", marginBottom: 8 }}>Page content</p>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} style={{ height: 40, background: "rgb(var(--surface-tertiary))", borderRadius: 2, marginBottom: 8 }} />
          ))}
        </div>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof BottomNav>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: fiveItems,
    fixed: false,
  },
};

export const FourItems: Story = {
  args: {
    items: fiveItems.slice(0, 4),
    fixed: false,
  },
};

export const ThreeItems: Story = {
  args: {
    items: fiveItems.slice(0, 3),
    fixed: false,
  },
};

export const NoActiveItem: Story = {
  args: {
    items: fiveItems.map((item) => ({ ...item, active: false })),
    fixed: false,
  },
};
