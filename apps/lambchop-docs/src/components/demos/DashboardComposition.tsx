import { KpiCard, AreaChart, DataTable } from "lambchop";
import { createColumnHelper } from "@tanstack/react-table";

interface TopArticle {
  title: string;
  site: string;
  revenue: number;
  pageviews: number;
}

const columnHelper = createColumnHelper<TopArticle>();
const columns = [
  columnHelper.accessor("title", { header: "Article" }),
  columnHelper.accessor("site", { header: "Site" }),
  columnHelper.accessor("revenue", {
    header: "Revenue",
    cell: (info) => `$${info.getValue().toFixed(2)}`,
  }),
  columnHelper.accessor("pageviews", {
    header: "Views",
    cell: (info) => info.getValue().toLocaleString(),
  }),
];

const articles: TopArticle[] = [
  { title: "Top 10 Metalcore Albums of January", site: "noecho.net", revenue: 310.8, pageviews: 18900 },
  { title: "Every Time I Die Reunion Rumors", site: "theneedledrop.com", revenue: 267.4, pageviews: 15800 },
  { title: "Meshuggah Announce Farewell Tour", site: "melodicmag.com", revenue: 218.3, pageviews: 12400 },
  { title: "Knocked Loose New Single Breakdown", site: "metalinsider.net", revenue: 185.6, pageviews: 11200 },
  { title: "Converge - Bloodmoon Review", site: "ghostcultmag.com", revenue: 142.5, pageviews: 8200 },
];

const revenueBySource = [
  { date: "Jan 1", playwire: 820, stripe: 310, partnerize: 120 },
  { date: "Jan 3", playwire: 880, stripe: 290, partnerize: 115 },
  { date: "Jan 5", playwire: 950, stripe: 350, partnerize: 140 },
  { date: "Jan 7", playwire: 980, stripe: 360, partnerize: 145 },
  { date: "Jan 9", playwire: 1100, stripe: 420, partnerize: 170 },
  { date: "Jan 11", playwire: 1120, stripe: 430, partnerize: 175 },
  { date: "Jan 14", playwire: 1280, stripe: 520, partnerize: 205 },
];

const sparkline = [1250, 1380, 1420, 1290, 1510, 1620, 1580, 1690, 1750, 1820, 1780, 1910, 1950, 2050];

export default function DashboardComposition() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          label="Total Revenue"
          value="$18,230"
          trend={{ value: 12.4, isPositive: true }}
          sparklineData={sparkline}
        />
        <KpiCard
          label="Pageviews"
          value="142,800"
          trend={{ value: 8.1, isPositive: true }}
        />
        <KpiCard
          label="Ad Revenue"
          value="$14,520"
          trend={{ value: 15.3, isPositive: true }}
        />
        <KpiCard
          label="Active Writers"
          value="24"
        />
      </div>

      <div className="rounded-card border border-surface-border bg-surface p-card-p shadow-card">
        <h3 className="mb-4 text-sm font-semibold text-text">Revenue by Source</h3>
        <AreaChart
          data={revenueBySource}
          xKey="date"
          areas={[
            { key: "playwire", label: "Playwire" },
            { key: "stripe", label: "Stripe" },
            { key: "partnerize", label: "Partnerize" },
          ]}
          height={240}
          stacked
        />
      </div>

      <div className="rounded-card border border-surface-border bg-surface p-card-p shadow-card">
        <h3 className="mb-4 text-sm font-semibold text-text">Top Articles</h3>
        <DataTable columns={columns} data={articles} pageSize={5} />
      </div>
    </div>
  );
}
