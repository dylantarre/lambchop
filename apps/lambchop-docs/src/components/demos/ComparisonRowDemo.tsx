import { ComparisonRow } from "lmbchp";

const fmt = (v: number) =>
  v.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 });

export default function ComparisonRowDemo() {
  return (
    <div className="w-full max-w-md space-y-2">
      <ComparisonRow label="noecho.net" current={18230} previous={15400} format={fmt} />
      <ComparisonRow label="theneedledrop.com" current={4100} previous={5200} format={fmt} />
      <ComparisonRow label="melodicmag.com" current={2300} previous={2300} format={fmt} />
    </div>
  );
}
