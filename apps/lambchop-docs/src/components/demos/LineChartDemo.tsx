import { LineChart } from "lmbchp";

const dailyData = [
  { date: "Jan 1", noecho: 820, theneedledrop: 340, melodicmag: 140 },
  { date: "Jan 2", noecho: 910, theneedledrop: 380, melodicmag: 155 },
  { date: "Jan 3", noecho: 880, theneedledrop: 360, melodicmag: 145 },
  { date: "Jan 4", noecho: 790, theneedledrop: 310, melodicmag: 125 },
  { date: "Jan 5", noecho: 950, theneedledrop: 400, melodicmag: 170 },
  { date: "Jan 6", noecho: 1020, theneedledrop: 420, melodicmag: 180 },
  { date: "Jan 7", noecho: 980, theneedledrop: 390, melodicmag: 165 },
  { date: "Jan 8", noecho: 1060, theneedledrop: 440, melodicmag: 190 },
  { date: "Jan 9", noecho: 1100, theneedledrop: 460, melodicmag: 195 },
  { date: "Jan 10", noecho: 1150, theneedledrop: 480, melodicmag: 200 },
  { date: "Jan 11", noecho: 1120, theneedledrop: 470, melodicmag: 195 },
  { date: "Jan 12", noecho: 1200, theneedledrop: 510, melodicmag: 210 },
  { date: "Jan 13", noecho: 1230, theneedledrop: 530, melodicmag: 215 },
  { date: "Jan 14", noecho: 1280, theneedledrop: 560, melodicmag: 220 },
];

export default function LineChartDemo() {
  return (
    <LineChart
      data={dailyData}
      xKey="date"
      lines={[
        { key: "noecho", label: "noecho.net" },
        { key: "theneedledrop", label: "theneedledrop.com" },
        { key: "melodicmag", label: "melodicmag.com" },
      ]}
      height={300}
    />
  );
}
