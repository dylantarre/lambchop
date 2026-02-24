import { useState } from "react";
import { DateRangePicker } from "lambchop";

export default function DateRangePickerDemo() {
  const [range, setRange] = useState({
    start: new Date(2026, 0, 1),
    end: new Date(2026, 0, 31),
  });

  return (
    <div className="w-full max-w-sm">
      <DateRangePicker value={range} onChange={setRange} />
    </div>
  );
}
