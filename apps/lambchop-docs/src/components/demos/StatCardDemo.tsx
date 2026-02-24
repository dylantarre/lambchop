import { StatCard } from "lmbchp";

export default function StatCardDemo() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard value="2.4M" label="Monthly Pageviews" />
        <StatCard value="$84K" label="Monthly Revenue" />
        <StatCard value="9" label="Network Sites" />
      </div>
      <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Notched variant</p>
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard value="2.4M" label="Monthly Pageviews" notched />
        <StatCard value="$84K" label="Monthly Revenue" notched />
        <StatCard value="9" label="Network Sites" notched />
      </div>
    </div>
  );
}
