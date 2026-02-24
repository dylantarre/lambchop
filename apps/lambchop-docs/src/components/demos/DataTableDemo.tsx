import { DataTable } from "lmbchp";
import { createColumnHelper } from "@tanstack/react-table";

interface ArticleRow {
  title: string;
  author: string;
  site: string;
  revenue: number;
  pageviews: number;
}

const columnHelper = createColumnHelper<ArticleRow>();

const columns = [
  columnHelper.accessor("title", { header: "Title" }),
  columnHelper.accessor("author", { header: "Author" }),
  columnHelper.accessor("site", { header: "Site" }),
  columnHelper.accessor("revenue", {
    header: "Revenue",
    cell: (info) => `$${info.getValue().toFixed(2)}`,
  }),
  columnHelper.accessor("pageviews", {
    header: "Pageviews",
    cell: (info) => info.getValue().toLocaleString(),
  }),
];

const data: ArticleRow[] = [
  { title: "New Album Review: Converge - Bloodmoon", author: "Alex H.", site: "noecho.net", revenue: 142.5, pageviews: 8200 },
  { title: "Meshuggah Announce Farewell Tour", author: "Jordan P.", site: "melodicmag.com", revenue: 218.3, pageviews: 12400 },
  { title: "Deftones Studio Update", author: "Casey M.", site: "theneedledrop.com", revenue: 95.2, pageviews: 5600 },
  { title: "Top 10 Metalcore Albums of January", author: "Taylor R.", site: "metalinsider.net", revenue: 310.8, pageviews: 18900 },
  { title: "Between the Buried and Me Interview", author: "Alex H.", site: "ghostcultmag.com", revenue: 78.9, pageviews: 4200 },
  { title: "Knocked Loose New Single Breakdown", author: "Morgan S.", site: "noecho.net", revenue: 185.6, pageviews: 11200 },
  { title: "Every Time I Die Reunion Rumors", author: "Jordan P.", site: "theneedledrop.com", revenue: 267.4, pageviews: 15800 },
  { title: "Periphery Album Review", author: "Casey M.", site: "thenumetalagenda.com", revenue: 62.3, pageviews: 3400 },
];

export default function DataTableDemo() {
  return <DataTable columns={columns} data={data} pageSize={5} searchable />;
}
