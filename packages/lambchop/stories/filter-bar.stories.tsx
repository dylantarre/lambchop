import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { FilterBar, type FilterDef } from "../src/components/filter-bar";

function FilterBarWrapper(props: React.ComponentProps<typeof FilterBar>) {
  const [values, setValues] = React.useState<Record<string, string | string[]>>(
    props.values,
  );
  return (
    <FilterBar
      {...props}
      values={values}
      onChange={(id, value) => setValues((prev) => ({ ...prev, [id]: value }))}
      onClear={() => {
        const cleared: Record<string, string | string[]> = {};
        for (const f of props.filters) {
          cleared[f.id] = f.multiple ? [] : "";
        }
        setValues(cleared);
      }}
    />
  );
}

const siteFilter: FilterDef = {
  id: "site",
  label: "Site",
  options: [
    { label: "lambgoat.com", value: "lambgoat" },
    { label: "theneedledrop.com", value: "theneedledrop" },
    { label: "noecho.net", value: "noecho" },
    { label: "melodicmag.com", value: "melodicmag" },
    { label: "metalinsider.net", value: "metalinsider" },
  ],
};

const authorFilter: FilterDef = {
  id: "author",
  label: "Author",
  options: [
    { label: "Alex H.", value: "alex" },
    { label: "Jordan P.", value: "jordan" },
    { label: "Casey M.", value: "casey" },
    { label: "Taylor R.", value: "taylor" },
    { label: "Morgan S.", value: "morgan" },
  ],
  multiple: true,
};

const revenueSourceFilter: FilterDef = {
  id: "source",
  label: "Revenue Source",
  options: [
    { label: "Playwire Ads", value: "playwire" },
    { label: "Stripe Subscriptions", value: "stripe" },
    { label: "Partnerize Affiliate", value: "partnerize" },
  ],
};

const meta = {
  title: "Components/FilterBar",
  component: FilterBar,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  render: (args) => <FilterBarWrapper {...args} />,
} satisfies Meta<typeof FilterBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    filters: [siteFilter],
    values: { site: "" },
    onChange: () => {},
  },
};

export const MultipleFilters: Story = {
  args: {
    filters: [siteFilter, authorFilter, revenueSourceFilter],
    values: { site: "", author: [], source: "" },
    onChange: () => {},
  },
};

export const WithActiveFilters: Story = {
  args: {
    filters: [siteFilter, authorFilter, revenueSourceFilter],
    values: {
      site: "lambgoat",
      author: ["alex", "jordan"],
      source: "playwire",
    },
    onChange: () => {},
    onClear: () => {},
  },
};
