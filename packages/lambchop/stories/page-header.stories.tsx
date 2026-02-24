import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { PageHeader } from "../src/components/page-header";

const meta = {
  title: "Components/PageHeader",
  component: PageHeader,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ width: 800 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof PageHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Revenue Dashboard",
  },
};

export const WithBreadcrumbs: Story = {
  args: {
    title: "lambgoat.com",
    breadcrumbs: [
      { label: "Dashboard", href: "/" },
      { label: "Sites", href: "/sites" },
      { label: "lambgoat.com" },
    ],
  },
};

export const WithActions: Story = {
  args: {
    title: "Monthly Report",
    actions: (
      <>
        <button
          type="button"
          style={{
            padding: "6px 12px",
            fontSize: 14,
            border: "1px solid var(--surface-border)",
            borderRadius: 2,
            background: "var(--surface-tertiary)",
            color: "var(--text)",
            cursor: "pointer",
          }}
        >
          Export CSV
        </button>
        <button
          type="button"
          style={{
            padding: "6px 12px",
            fontSize: 14,
            border: "none",
            borderRadius: 2,
            background: "var(--accent)",
            color: "var(--text-inverse)",
            cursor: "pointer",
          }}
        >
          Generate Report
        </button>
      </>
    ),
  },
};

export const WithDescription: Story = {
  args: {
    title: "Writer Bonuses",
    description:
      "Monthly writer bonus calculations based on pageviews and revenue performance across all sites.",
  },
};

export const FullFeatured: Story = {
  args: {
    title: "January 2026 Revenue",
    description:
      "Revenue breakdown across lambgoat.com, theneedledrop.com, noecho.net and 5 other sites.",
    breadcrumbs: [
      { label: "Dashboard", href: "/" },
      { label: "Revenue", href: "/revenue" },
      { label: "January 2026" },
    ],
    actions: (
      <>
        <button
          type="button"
          style={{
            padding: "6px 12px",
            fontSize: 14,
            border: "1px solid var(--surface-border)",
            borderRadius: 2,
            background: "var(--surface-tertiary)",
            color: "var(--text)",
            cursor: "pointer",
          }}
        >
          Export
        </button>
        <button
          type="button"
          style={{
            padding: "6px 12px",
            fontSize: 14,
            border: "none",
            borderRadius: 2,
            background: "var(--accent)",
            color: "var(--text-inverse)",
            cursor: "pointer",
          }}
        >
          Recalculate
        </button>
      </>
    ),
  },
};
