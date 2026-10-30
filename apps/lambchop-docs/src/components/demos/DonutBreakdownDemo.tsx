import { DonutBreakdown, formatValue } from "lmbchp";
import { sites } from "./lgm-sample";

export default function DonutBreakdownDemo() {
  return <DonutBreakdown items={sites} format={(v) => formatValue(v, "currency")} />;
}
