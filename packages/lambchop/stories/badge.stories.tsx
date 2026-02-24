import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "../src/components/badge";

const meta = {
  title: "Components/Badge",
  component: Badge,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: "Default" },
};

export const PrimaryBadge: Story = {
  args: { variant: "primary", children: "Featured" },
};

export const Outline: Story = {
  args: { variant: "outline", children: "Outline" },
};

export const Muted: Story = {
  args: { variant: "muted", children: "Archived" },
};
