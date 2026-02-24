import { MetricTrend } from "lambchop";

export default function MetricTrendDemo() {
  return (
    <div className="flex flex-wrap gap-8">
      <MetricTrend value="$14,520" delta={8.3} deltaLabel="vs last month" />
      <MetricTrend value="$9,870" delta={-4.2} />
      <MetricTrend value="$28,750" delta={15.6} size="lg" />
      <MetricTrend value="$6,340" delta={3.1} size="sm" />
    </div>
  );
}
