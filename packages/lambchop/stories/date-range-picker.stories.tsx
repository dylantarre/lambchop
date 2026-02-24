import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { DateRangePicker, type DateRange } from "../src/components/date-range-picker";

function DateRangePickerWrapper(props: React.ComponentProps<typeof DateRangePicker>) {
  const [value, setValue] = React.useState<DateRange>(props.value);
  return <DateRangePicker {...props} value={value} onChange={setValue} />;
}

const meta = {
  title: "Components/DateRangePicker",
  component: DateRangePicker,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  render: (args) => <DateRangePickerWrapper {...args} />,
} satisfies Meta<typeof DateRangePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: {
      start: new Date("2026-01-01"),
      end: new Date("2026-01-31"),
    },
    onChange: () => {},
  },
};

export const CustomPresets: Story = {
  args: {
    value: {
      start: new Date("2026-01-01"),
      end: new Date("2026-02-23"),
    },
    onChange: () => {},
    presets: [
      { label: "This Week", value: "this-week" },
      { label: "Last 7 Days", value: "last-7" },
      { label: "Last 14 Days", value: "last-14" },
      { label: "This Quarter", value: "this-quarter" },
      { label: "Custom", value: "custom" },
    ],
  },
};
