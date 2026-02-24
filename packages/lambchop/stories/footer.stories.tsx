import type { Meta, StoryObj } from "@storybook/react";
import { Footer } from "../src/components/footer";

const meta = {
  title: "Components/Footer",
  component: Footer,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    columns: [
      {
        heading: "Network",
        links: [
          { label: "lambgoat", href: "#" },
          { label: "noecho", href: "#" },
          { label: "ghost cult", href: "#" },
          { label: "metal insider", href: "#" },
        ],
      },
      {
        heading: "Company",
        links: [
          { label: "About", href: "#" },
          { label: "Careers", href: "#" },
          { label: "Contact", href: "#" },
        ],
      },
      {
        heading: "Resources",
        links: [
          { label: "Blog", href: "#" },
          { label: "Documentation", href: "#" },
          { label: "API Reference", href: "#" },
        ],
      },
      {
        heading: "Legal",
        links: [
          { label: "Privacy", href: "#" },
          { label: "Terms", href: "#" },
        ],
      },
    ],
  },
};

export const Minimal: Story = {
  args: {
    columns: [
      {
        heading: "Links",
        links: [
          { label: "Home", href: "#" },
          { label: "About", href: "#" },
          { label: "Contact", href: "#" },
        ],
      },
    ],
    bottomContent: (
      <p className="text-xs text-background/50">
        Built with lambchop.
      </p>
    ),
  },
};
