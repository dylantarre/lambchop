import type { Meta, StoryObj } from "@storybook/react";
import { PricingCard } from "../src/components/pricing-card";

const meta = {
  title: "Components/PricingCard",
  component: PricingCard,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ width: 320 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof PricingCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Standard: Story = {
  args: {
    name: "Starter",
    price: "$29",
    description: "Perfect for small publishers getting started.",
    features: [
      "Up to 3 sites",
      "Basic analytics",
      "Email support",
      "Monthly reports",
    ],
  },
};

export const Featured: Story = {
  args: {
    name: "Pro",
    price: "$99",
    featured: true,
    badge: "Most Popular",
    description: "Everything you need to scale your publishing network.",
    features: [
      "Unlimited sites",
      "Advanced analytics",
      "Priority support",
      "Real-time dashboards",
      "Writer bonus tracking",
      "API access",
    ],
  },
};

export const Minimal: Story = {
  args: {
    name: "Enterprise",
    price: "Custom",
    unit: "",
    features: [
      "Custom integrations",
      "Dedicated account manager",
      "SLA guarantee",
      "On-premise option",
    ],
    ctaLabel: "Contact Sales",
  },
};
