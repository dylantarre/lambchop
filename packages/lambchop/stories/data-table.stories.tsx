import type { Meta, StoryObj } from "@storybook/react";
import { createColumnHelper } from "@tanstack/react-table";
import { DataTable } from "../src/components/data-table";

interface ArticleRow {
  title: string;
  author: string;
  site: string;
  revenue: number;
  pageviews: number;
  date: string;
}

const columnHelper = createColumnHelper<ArticleRow>();

const defaultColumns = [
  columnHelper.accessor("title", {
    header: "Title",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("author", {
    header: "Author",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("site", {
    header: "Site",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("revenue", {
    header: "Revenue",
    cell: (info) =>
      info.getValue().toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      }),
  }),
  columnHelper.accessor("pageviews", {
    header: "Pageviews",
    cell: (info) => info.getValue().toLocaleString(),
  }),
];

const articleData: ArticleRow[] = [
  {
    title: "New Album Review: Converge - Bloodmoon",
    author: "Alex H.",
    site: "lambgoat.com",
    revenue: 142.5,
    pageviews: 8200,
    date: "2026-01-14",
  },
  {
    title: "Meshuggah Announce Farewell Tour",
    author: "Jordan P.",
    site: "lambgoat.com",
    revenue: 218.3,
    pageviews: 12400,
    date: "2026-01-13",
  },
  {
    title: "Deftones Studio Update",
    author: "Casey M.",
    site: "noecho.net",
    revenue: 95.2,
    pageviews: 5600,
    date: "2026-01-12",
  },
  {
    title: "Top 10 Metalcore Albums of January",
    author: "Taylor R.",
    site: "lambgoat.com",
    revenue: 310.8,
    pageviews: 18900,
    date: "2026-01-11",
  },
  {
    title: "Knocked Loose Break Streaming Records",
    author: "Morgan S.",
    site: "ghostcultmag.com",
    revenue: 78.4,
    pageviews: 4300,
    date: "2026-01-10",
  },
  {
    title: "Interview: Code Orange on New Direction",
    author: "Alex H.",
    site: "lambgoat.com",
    revenue: 165.9,
    pageviews: 9100,
    date: "2026-01-09",
  },
  {
    title: "Parkway Drive Announce Hiatus",
    author: "Jordan P.",
    site: "noecho.net",
    revenue: 187.6,
    pageviews: 11200,
    date: "2026-01-08",
  },
  {
    title: "Spiritbox New Single Premiere",
    author: "Casey M.",
    site: "lambgoat.com",
    revenue: 245.1,
    pageviews: 14800,
    date: "2026-01-07",
  },
  {
    title: "Gojira Win Grammy for Best Metal",
    author: "Taylor R.",
    site: "noecho.net",
    revenue: 198.7,
    pageviews: 10500,
    date: "2026-01-06",
  },
  {
    title: "Periphery IV Deluxe Edition Details",
    author: "Morgan S.",
    site: "ghostcultmag.com",
    revenue: 62.3,
    pageviews: 3400,
    date: "2026-01-05",
  },
  {
    title: "Architects Tour Dates Revealed",
    author: "Alex H.",
    site: "lambgoat.com",
    revenue: 134.5,
    pageviews: 7800,
    date: "2026-01-04",
  },
  {
    title: "Underoath Reunion Show Recap",
    author: "Jordan P.",
    site: "lambgoat.com",
    revenue: 189.2,
    pageviews: 10800,
    date: "2026-01-03",
  },
];

const meta = {
  title: "Components/DataTable",
  component: DataTable<ArticleRow>,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ width: 900 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DataTable<ArticleRow>>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    columns: defaultColumns,
    data: articleData,
  },
};

export const WithSearch: Story = {
  args: {
    columns: defaultColumns,
    data: articleData,
    searchable: true,
    searchPlaceholder: "Search articles...",
  },
};

export const CustomPageSize: Story = {
  args: {
    columns: defaultColumns,
    data: articleData,
    pageSize: 5,
  },
};

interface ExtendedRow {
  title: string;
  author: string;
  site: string;
  revenue: number;
  pageviews: number;
  bounceRate: string;
  avgTimeOnPage: string;
  date: string;
}

const extendedColumnHelper = createColumnHelper<ExtendedRow>();

const manyColumnsData: ExtendedRow[] = articleData.map((row) => ({
  ...row,
  bounceRate: `${(40 + Math.random() * 30).toFixed(1)}%`,
  avgTimeOnPage: `${Math.floor(60 + Math.random() * 180)}s`,
}));

const manyColumns = [
  extendedColumnHelper.accessor("title", {
    header: "Title",
    cell: (info) => info.getValue(),
  }),
  extendedColumnHelper.accessor("author", {
    header: "Author",
    cell: (info) => info.getValue(),
  }),
  extendedColumnHelper.accessor("site", {
    header: "Site",
    cell: (info) => info.getValue(),
  }),
  extendedColumnHelper.accessor("revenue", {
    header: "Revenue",
    cell: (info) =>
      info.getValue().toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      }),
  }),
  extendedColumnHelper.accessor("pageviews", {
    header: "Pageviews",
    cell: (info) => info.getValue().toLocaleString(),
  }),
  extendedColumnHelper.accessor("bounceRate", {
    header: "Bounce Rate",
    cell: (info) => info.getValue(),
  }),
  extendedColumnHelper.accessor("avgTimeOnPage", {
    header: "Avg. Time on Page",
    cell: (info) => info.getValue(),
  }),
  extendedColumnHelper.accessor("date", {
    header: "Published",
    cell: (info) => info.getValue(),
  }),
];

export const ManyColumns: Story = {
  args: {
    columns: manyColumns as typeof defaultColumns,
    data: manyColumnsData as ArticleRow[],
    searchable: true,
    searchPlaceholder: "Search articles...",
  },
};
