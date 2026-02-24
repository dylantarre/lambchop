import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../src/components/button";

const meta = {
  title: "Components/Button",
  component: Button,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { children: "Get Started" },
};

export const Secondary: Story = {
  args: { variant: "secondary", children: "Learn More" },
};

export const Ghost: Story = {
  args: { variant: "ghost", children: "Cancel" },
};

export const Small: Story = {
  args: { size: "sm", children: "Small" },
};

export const Large: Story = {
  args: { size: "lg", children: "Large Button" },
};

export const AsChild: Story = {
  args: {
    asChild: true,
    children: <a href="#">Link as Button</a>,
  },
};
