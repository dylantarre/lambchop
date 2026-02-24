import type { Meta, StoryObj } from "@storybook/react";
import { LogoGrid } from "../src/components/logo-grid";

const placeholderLogos = [
  { src: "https://placehold.co/120x40/1a1a1a/e6ddd0?text=lambgoat", alt: "lambgoat" },
  { src: "https://placehold.co/120x40/1a1a1a/e6ddd0?text=noecho", alt: "noecho" },
  { src: "https://placehold.co/120x40/1a1a1a/e6ddd0?text=ghostcult", alt: "ghost cult" },
  { src: "https://placehold.co/120x40/1a1a1a/e6ddd0?text=metalinsider", alt: "metal insider" },
  { src: "https://placehold.co/120x40/1a1a1a/e6ddd0?text=theneedledrop", alt: "the needle drop" },
  { src: "https://placehold.co/120x40/1a1a1a/e6ddd0?text=numetalagenda", alt: "nu metal agenda" },
];

const meta = {
  title: "Components/LogoGrid",
  component: LogoGrid,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
} satisfies Meta<typeof LogoGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FourColumns: Story = {
  args: {
    logos: placeholderLogos.slice(0, 4),
    columns: 4,
  },
};

export const SixColumns: Story = {
  args: {
    logos: placeholderLogos,
    columns: 6,
  },
};
