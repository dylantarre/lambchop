import type { Meta, StoryObj } from "@storybook/react";
import { Section } from "../src/components/section";

const meta = {
  title: "Components/Section",
  component: Section,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
} satisfies Meta<typeof Section>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <div>
        <h2 className="font-display text-3xl uppercase tracking-wider text-foreground">Default Section</h2>
        <p className="mt-2 text-muted-foreground">Content with built-in container and padding.</p>
      </div>
    ),
  },
};

export const Muted: Story = {
  args: {
    variant: "muted",
    children: (
      <div>
        <h2 className="font-display text-3xl uppercase tracking-wider text-foreground">Muted Section</h2>
        <p className="mt-2 text-muted-foreground">Subtle background tint for visual separation.</p>
      </div>
    ),
  },
};

export const Bordered: Story = {
  args: {
    variant: "bordered",
    children: (
      <div>
        <h2 className="font-display text-3xl uppercase tracking-wider text-foreground">Bordered Section</h2>
        <p className="mt-2 text-muted-foreground">Industrial border-top and border-bottom.</p>
      </div>
    ),
  },
};
