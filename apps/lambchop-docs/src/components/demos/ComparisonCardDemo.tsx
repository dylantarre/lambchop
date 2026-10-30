import { ComparisonCard, formatValue } from "lmbchp";

export default function ComparisonCardDemo() {
  const usd = (v: number) => formatValue(v, "currency");
  const count = (v: number) => formatValue(v, "count");
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <ComparisonCard label="Overall revenue" current={5402.21} previous={4709.48} format={usd} currentLabel="October" previousLabel="September" />
      <ComparisonCard label="Pageviews" current={937237} previous={958120} format={count} currentLabel="October" previousLabel="September" />
      <ComparisonCard label="Direct ads" current={221.88} previous={221.9} format={usd} currentLabel="October" previousLabel="September" />
    </div>
  );
}
