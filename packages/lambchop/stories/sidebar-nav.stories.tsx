import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { ResponsiveSidebarNav } from "../src/components/responsive-sidebar-nav";
import { SidebarNav } from "../src/components/sidebar-nav";

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

const defaultItems = [
  { label: "Dashboard", href: "/", icon: <DashboardIcon />, active: true },
  { label: "Revenue", href: "/revenue", icon: <RevenueIcon /> },
  { label: "Writers", href: "/writers", icon: <WritersIcon /> },
  { label: "Articles", href: "/articles", icon: <ArticlesIcon /> },
  { label: "Settings", href: "/settings", icon: <SettingsIcon /> },
];

const meta = {
  title: "Components/SidebarNav",
  component: SidebarNav,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ height: 500 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SidebarNav>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: defaultItems,
    onToggleCollapse: () => {},
  },
};

export const Collapsed: Story = {
  args: {
    items: defaultItems,
    collapsed: true,
    onToggleCollapse: () => {},
  },
};

export const WithHeader: Story = {
  args: {
    items: defaultItems,
    onToggleCollapse: () => {},
    header: (
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <rect width="24" height="24" rx="6" fill="#3b82f6" />
          <text
            x="12"
            y="16"
            textAnchor="middle"
            fill="white"
            fontSize="12"
            fontWeight="bold"
          >
            L
          </text>
        </svg>
        <span style={{ fontWeight: 600, fontSize: 14 }}>LGM Dashboard</span>
      </div>
    ),
  },
};

export const ResponsiveBottomNav: Story = {
  render: () => (
    <div style={{ height: 560, width: 390, border: "1px solid #d6cfc5" }}>
      <ResponsiveSidebarNav
        items={defaultItems}
        onToggleCollapse={() => {}}
        header={<span style={{ fontWeight: 600, fontSize: 14 }}>LGM Dashboard</span>}
        desktopBreakpoint="nav"
      />
    </div>
  ),
};
