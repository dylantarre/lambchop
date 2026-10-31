import { BreakdownList, formatValue } from "lmbchp";
import { sites } from "./lgm-sample";

export default function BreakdownListDemo() {
  return <BreakdownList items={sites} format={(v) => formatValue(v, "currency")} className="max-w-xl" />;
}
