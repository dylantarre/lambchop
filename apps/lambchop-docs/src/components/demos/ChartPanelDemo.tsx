import { ChartPanel, LineChart, formatCategory, formatCategoryLong, formatTick, formatValue } from "lmbchp";
import { days, dailyRevenue } from "./lgm-sample";

export default function ChartPanelDemo() {
  return (
    <ChartPanel
      title="Daily revenue"
      subtitle="Oct 1 – Oct 29, 2026"
      aside={<span className="text-sm font-semibold tabular-nums text-text">$5,402</span>}
      footer="Verified against the revenue database"
    >
      <LineChart
        data={days.map((d, i) => ({ day: d, Revenue: dailyRevenue[i] }))}
        xKey="day"
        lines={[{ key: "Revenue", label: "Revenue" }]}
        height={220}
        showLegend={false}
        fillSingle
        xTickFormatter={(d) => formatCategory(d)}
        tooltipLabelFormatter={formatCategoryLong}
        yTickFormatter={(v) => formatTick(v, "currency")}
        tooltipFormatter={(v) => formatValue(v, "currency")}
      />
    </ChartPanel>
  );
}
