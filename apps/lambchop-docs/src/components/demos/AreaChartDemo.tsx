import { AreaChart } from "lambchop";

const revenueBySource = [
  { date: "Jan 1", playwire: 820, stripe: 310, partnerize: 120 },
  { date: "Jan 2", playwire: 910, stripe: 340, partnerize: 130 },
  { date: "Jan 3", playwire: 880, stripe: 290, partnerize: 115 },
  { date: "Jan 4", playwire: 790, stripe: 260, partnerize: 100 },
  { date: "Jan 5", playwire: 950, stripe: 350, partnerize: 140 },
  { date: "Jan 6", playwire: 1020, stripe: 380, partnerize: 155 },
  { date: "Jan 7", playwire: 980, stripe: 360, partnerize: 145 },
  { date: "Jan 8", playwire: 1060, stripe: 400, partnerize: 160 },
  { date: "Jan 9", playwire: 1100, stripe: 420, partnerize: 170 },
  { date: "Jan 10", playwire: 1150, stripe: 450, partnerize: 180 },
  { date: "Jan 11", playwire: 1120, stripe: 430, partnerize: 175 },
  { date: "Jan 12", playwire: 1200, stripe: 470, partnerize: 190 },
  { date: "Jan 13", playwire: 1230, stripe: 490, partnerize: 195 },
  { date: "Jan 14", playwire: 1280, stripe: 520, partnerize: 205 },
];

export default function AreaChartDemo() {
  return (
    <AreaChart
      data={revenueBySource}
      xKey="date"
      areas={[
        { key: "playwire", label: "Playwire" },
        { key: "stripe", label: "Stripe" },
        { key: "partnerize", label: "Partnerize" },
      ]}
      height={300}
      stacked
    />
  );
}
