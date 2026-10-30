import {
  KpiCard,
  ChartPanel,
  BarChart,
  DonutBreakdown,
  ComparisonCard,
  RankedTable,
  Callout,
  LineChart,
  formatValue,
  formatTick,
  formatCategory,
  formatCategoryLong,
} from "lmbchp";
import { sites, days, dailyRevenue, articleRows } from "./lgm-sample";

const usd = (v: number) => formatValue(v, "currency");

/** A complete Ask Lambert answer, assembled from the same components the renderer uses. */
export default function LambertShowcase() {
  const ranked = [...sites].sort((a, b) => b.value - a.value);
  return (
    <div className="flex flex-col gap-6">
      <h2 className="font-display text-2xl uppercase leading-none tracking-wider text-text">
        October 2026 revenue overview
      </h2>
      <div className="grid gap-4 sm:grid-cols-3">
        <KpiCard label="MTD revenue" value="$5,402.21" trend={{ value: 14.7, isPositive: true }} trendLabel="vs last month" />
        <KpiCard label="Pageviews" value="937,237" trend={{ value: -2.2, isPositive: false }} trendLabel="vs last month" />
        <KpiCard label="Articles published" value="316" />
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <ChartPanel title="Revenue by site" subtitle="October 2026">
          <BarChart
            data={ranked.map((s) => ({ site: s.label, Revenue: s.value }))}
            xKey="site"
            bars={[{ key: "Revenue", label: "Revenue" }]}
            layout="horizontal"
            height={330}
            showValues
            showLegend={false}
            valueFormatter={usd}
            valueTickFormatter={(v) => formatTick(v, "currency")}
          />
        </ChartPanel>
        <ChartPanel title="Revenue share" subtitle="October 2026">
          <DonutBreakdown items={sites} format={usd} totalLabel="October" maxSlices={6} height={220} />
        </ChartPanel>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <ComparisonCard label="Overall revenue" current={5402.21} previous={4709.48} format={usd} currentLabel="October" previousLabel="September" />
        <ComparisonCard label="The Needle Drop" current={1239.9} previous={923.12} format={usd} currentLabel="October" previousLabel="September" />
      </div>
      <ChartPanel title="Daily revenue" subtitle="Oct 1, 2026 – Oct 29, 2026">
        <LineChart
          data={days.map((d, i) => ({ day: d, Revenue: dailyRevenue[i] }))}
          xKey="day"
          lines={[{ key: "Revenue", label: "Revenue" }]}
          height={240}
          showLegend={false}
          fillSingle
          referenceValue={191}
          referenceLabel="Avg $191"
          xTickFormatter={(d) => formatCategory(d)}
          tooltipLabelFormatter={formatCategoryLong}
          yTickFormatter={(v) => formatTick(v, "currency")}
          tooltipFormatter={usd}
        />
      </ChartPanel>
      <ChartPanel title="Top articles" subtitle={`${articleRows.length} rows`} flush>
        <div className="px-2 pb-3">
          <RankedTable columns={["Title", "Author", "Site", "Revenue", "Pageviews"]} rows={articleRows} pageSize={5} />
        </div>
      </ChartPanel>
      <Callout label="Insight">
        Revenue is up <strong>14.7%</strong> on September while pageviews fell 2.2%, so the gain came from
        better monetization. Lambgoat and The Needle Drop earn 89% of the total.
      </Callout>
    </div>
  );
}
