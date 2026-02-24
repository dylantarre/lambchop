import { BarChart } from "lambchop";

const multiSiteData = [
  { month: "Sep", noecho: 8200, theneedledrop: 4100, melodicmag: 1900 },
  { month: "Oct", noecho: 9100, theneedledrop: 4500, melodicmag: 2200 },
  { month: "Nov", noecho: 7800, theneedledrop: 3900, melodicmag: 2200 },
  { month: "Dec", noecho: 10500, theneedledrop: 5200, melodicmag: 2700 },
  { month: "Jan", noecho: 9600, theneedledrop: 4800, melodicmag: 2300 },
  { month: "Feb", noecho: 11200, theneedledrop: 5400, melodicmag: 2600 },
];

export default function BarChartDemo() {
  return (
    <BarChart
      data={multiSiteData}
      xKey="month"
      bars={[
        { key: "noecho", label: "noecho.net" },
        { key: "theneedledrop", label: "theneedledrop.com" },
        { key: "melodicmag", label: "melodicmag.com" },
      ]}
      height={300}
    />
  );
}
