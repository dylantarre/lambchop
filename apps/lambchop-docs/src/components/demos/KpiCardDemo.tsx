import { KpiCard } from "lmbchp";

const sparklineData = [1250, 1380, 1420, 1290, 1510, 1620, 1580, 1690, 1750, 1820, 1780, 1910, 1950, 2050];

export default function KpiCardDemo() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <KpiCard label="Total Revenue" value="$18,230" trend={{ value: 12.4, isPositive: true }} />
      <KpiCard label="Ad Revenue" value="$3,180" trend={{ value: 5.7, isPositive: false }} />
      <KpiCard
        label="Monthly Revenue"
        value="$14,520"
        trend={{ value: 8.3, isPositive: true }}
        sparklineData={sparklineData}
      />
      <KpiCard label="Active Writers" value="24" />
    </div>
  );
}
