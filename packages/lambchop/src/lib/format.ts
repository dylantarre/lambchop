/**
 * Number and label formatting shared by charts, tables and metric cards.
 *
 * Generated dashboards (Ask Lambert) pass raw numbers and free-text labels,
 * so these helpers also infer a sensible format from a label like
 * "Revenue", "Pageviews" or "RPM".
 */

export type ValueFormat = "currency" | "count" | "percent" | "number";

const CURRENCY_HINT = /(revenue|earn|payout|paid|bonus|rpm|cpm|\$|usd|income|spend|cost|price|amount|total earned)/i;
const PERCENT_HINT = /(%|percent|share|rate|growth|change|ctr)/i;
const COUNT_HINT = /(pageview|views|sessions|visits|articles|posts|count|impressions|requests|words|writers|users|clicks)/i;

/** Guess a format from one or more labels (series name, axis label, title). */
export function inferFormat(...labels: (string | undefined | null)[]): ValueFormat {
  const text = labels.filter(Boolean).join(" ");
  if (!text) return "number";
  if (CURRENCY_HINT.test(text)) return "currency";
  if (PERCENT_HINT.test(text)) return "percent";
  if (COUNT_HINT.test(text)) return "count";
  return "number";
}

function trimZeros(s: string): string {
  return s.includes(".") ? s.replace(/\.0+$/, "").replace(/(\.\d*[1-9])0+$/, "$1") : s;
}

/** 1234 → "1.2K", 1_250_000 → "1.25M". Values under 1,000 keep up to `small` decimals. */
export function formatCompact(value: number, small = 0): string {
  const abs = Math.abs(value);
  const sign = value < 0 ? "-" : "";
  if (abs >= 1_000_000_000) return `${sign}${trimZeros((abs / 1_000_000_000).toFixed(2))}B`;
  if (abs >= 1_000_000) return `${sign}${trimZeros((abs / 1_000_000).toFixed(2))}M`;
  if (abs >= 10_000) return `${sign}${trimZeros((abs / 1_000).toFixed(1))}K`;
  if (abs >= 1_000) return `${sign}${trimZeros((abs / 1_000).toFixed(2))}K`;
  return `${sign}${trimZeros(abs.toFixed(small))}`;
}

/** Full-precision display: "$5,402.21", "937,237", "14.7%". */
export function formatValue(
  value: number | null | undefined,
  format: ValueFormat,
  /** Force decimal places for currency (e.g. 2 to keep a table column aligned). */
  digitsOverride?: number,
): string {
  if (value == null || !Number.isFinite(value)) return "—";
  switch (format) {
    case "currency": {
      const abs = Math.abs(value);
      const digits = digitsOverride ?? (abs >= 100 ? 0 : 2);
      return value.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: digits,
        maximumFractionDigits: digits,
      });
    }
    case "percent":
      return `${trimZeros(value.toFixed(1))}%`;
    case "count":
      return Math.round(value).toLocaleString("en-US");
    default:
      return Number.isInteger(value)
        ? value.toLocaleString("en-US")
        : value.toLocaleString("en-US", { maximumFractionDigits: 2 });
  }
}

/** Short axis-tick display: "$5.4K", "937K", "15%". */
export function formatTick(value: number, format: ValueFormat): string {
  if (!Number.isFinite(value)) return "";
  switch (format) {
    case "currency":
      return Math.abs(value) < 10 && value !== 0
        ? `$${trimZeros(value.toFixed(2))}`
        : `$${formatCompact(value)}`;
    case "percent":
      return `${trimZeros(value.toFixed(0))}%`;
    default:
      return formatCompact(value);
  }
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/**
 * Shorten date-like category labels for axes:
 *   "2026-10-01" → "Oct 1", "2026-10" → "Oct '26", "10/26" → "Oct '26".
 * Anything else is returned unchanged (truncated to `max` chars).
 */
export function formatCategory(label: string, max = 18): string {
  const s = String(label ?? "");
  let m = s.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (m) return `${MONTHS[Number(m[2]) - 1]} ${Number(m[3])}`;
  m = s.match(/^(\d{4})-(\d{2})$/);
  if (m) return `${MONTHS[Number(m[2]) - 1]} '${m[1].slice(2)}`;
  m = s.match(/^(\d{1,2})\/(\d{2})$/);
  if (m && Number(m[1]) >= 1 && Number(m[1]) <= 12) return `${MONTHS[Number(m[1]) - 1]} '${m[2]}`;
  return s.length > max ? `${s.slice(0, max - 1)}…` : s;
}

/** Long tooltip form of a date-like label: "2026-10-01" → "Oct 1, 2026". */
export function formatCategoryLong(label: string): string {
  const s = String(label ?? "");
  const m = s.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (m) return `${MONTHS[Number(m[2]) - 1]} ${Number(m[3])}, ${m[1]}`;
  return formatCategory(s, 64);
}

/** Percent change from previous to current, or null when undefined. */
export function percentChange(current: number, previous: number): number | null {
  if (!Number.isFinite(current) || !Number.isFinite(previous) || previous === 0) return null;
  return ((current - previous) / Math.abs(previous)) * 100;
}

/** Whether a numeric delta should read as flat (rounds to 0.0%). */
export function isFlat(delta: number | null | undefined): boolean {
  return delta == null || Math.abs(delta) < 0.05;
}
