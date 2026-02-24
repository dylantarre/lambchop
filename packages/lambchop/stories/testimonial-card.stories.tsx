import type { Meta, StoryObj } from "@storybook/react";
import { TestimonialCard } from "../src/components/testimonial-card";

const meta = {
  title: "Components/TestimonialCard",
  component: TestimonialCard,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ width: 360 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof TestimonialCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    quote: "The analytics dashboard transformed how we track our content performance across all our sites.",
    author: "Alex Rivera",
    role: "Content Director",
  },
};

export const WithRating: Story = {
  args: {
    quote: "Incredible tooling for managing a multi-site publishing network. Revenue tracking is seamless.",
    author: "Jordan Chen",
    role: "VP of Operations",
    rating: 5,
  },
};

export const WithAvatar: Story = {
  args: {
    quote: "We went from guessing to knowing exactly which content drives revenue. Game changer.",
    author: "Sam Mitchell",
    role: "Editor in Chief",
    avatarUrl: "https://i.pravatar.cc/80?img=12",
    rating: 4,
  },
};
