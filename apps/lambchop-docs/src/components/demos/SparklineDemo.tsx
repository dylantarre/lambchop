import { Sparkline } from "lmbchp";

const revenueData = [1250, 1380, 1420, 1290, 1510, 1620, 1580, 1690, 1750, 1820, 1780, 1910, 1950, 2050];
const flatData = [500, 502, 498, 501, 499, 500, 503, 497, 500, 501];
const volatileData = [800, 2400, 600, 3100, 450, 2800, 900, 3500, 700, 2200, 1100, 2900];

export default function SparklineDemo() {
  return (
    <div className="flex flex-wrap items-end gap-8">
      <div>
        <p className="mb-1 text-xs text-text-tertiary">Default</p>
        <Sparkline data={revenueData} />
      </div>
      <div>
        <p className="mb-1 text-xs text-text-tertiary">Green</p>
        <Sparkline data={revenueData} color="#16a34a" />
      </div>
      <div>
        <p className="mb-1 text-xs text-text-tertiary">Wide</p>
        <Sparkline data={revenueData} width={200} />
      </div>
      <div>
        <p className="mb-1 text-xs text-text-tertiary">Flat</p>
        <Sparkline data={flatData} color="#6b7280" />
      </div>
      <div>
        <p className="mb-1 text-xs text-text-tertiary">Volatile</p>
        <Sparkline data={volatileData} color="#ef4444" />
      </div>
    </div>
  );
}
