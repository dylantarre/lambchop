import type { Meta, StoryObj } from "@storybook/react";
import { Card } from "../src/components/card";

const meta = {
  title: "Components/Card",
  component: Card,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ width: 360 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card>
      <Card.Header>
        <Card.Title>Monthly Revenue</Card.Title>
        <Card.Description>Revenue performance for January 2026</Card.Description>
      </Card.Header>
      <Card.Content>
        <p className="text-3xl font-semibold text-foreground">$24,680</p>
      </Card.Content>
      <Card.Footer>
        <p className="text-xs text-muted-foreground">Updated 2 hours ago</p>
      </Card.Footer>
    </Card>
  ),
};

export const HeaderOnly: Story = {
  render: () => (
    <Card>
      <Card.Header>
        <Card.Title>Quick Stats</Card.Title>
        <Card.Description>Overview of key metrics</Card.Description>
      </Card.Header>
    </Card>
  ),
};

export const WithFooter: Story = {
  render: () => (
    <Card>
      <Card.Content>
        <p className="text-sm text-foreground">
          Content goes here without a header.
        </p>
      </Card.Content>
      <Card.Footer>
        <button className="text-xs text-primary hover:underline">View details</button>
      </Card.Footer>
    </Card>
  ),
};
