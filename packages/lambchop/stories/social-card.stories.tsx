import type { Meta, StoryObj } from "@storybook/react";
import { SocialCard } from "../src/components/social-card";

const meta = {
  title: "Brand/SocialCard",
  component: SocialCard,
  parameters: {
    layout: "centered",
    docs: { disable: true },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof SocialCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const OpenGraph: Story = {
  args: { width: 1200, height: 630 },
  decorators: [
    (Story) => (
      <div style={{ transform: "scale(0.5)", transformOrigin: "top left", width: 1200, height: 630 }}>
        <Story />
      </div>
    ),
  ],
};

export const TwitterCard: Story = {
  args: { width: 1200, height: 600 },
  decorators: [
    (Story) => (
      <div style={{ transform: "scale(0.5)", transformOrigin: "top left", width: 1200, height: 600 }}>
        <Story />
      </div>
    ),
  ],
};
