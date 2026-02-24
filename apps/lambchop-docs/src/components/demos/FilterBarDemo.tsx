import { useState } from "react";
import { FilterBar, type FilterDef } from "lambchop";

const filters: FilterDef[] = [
  {
    id: "site",
    label: "Site",
    options: [
      { label: "theneedledrop.com", value: "theneedledrop" },
      { label: "noecho.net", value: "noecho" },
      { label: "melodicmag.com", value: "melodicmag" },
      { label: "metalinsider.net", value: "metalinsider" },
      { label: "ghostcultmag.com", value: "ghostcultmag" },
    ],
  },
  {
    id: "author",
    label: "Author",
    multiple: true,
    options: [
      { label: "Alex H.", value: "alex" },
      { label: "Jordan P.", value: "jordan" },
      { label: "Casey M.", value: "casey" },
      { label: "Taylor R.", value: "taylor" },
      { label: "Morgan S.", value: "morgan" },
    ],
  },
  {
    id: "source",
    label: "Revenue Source",
    options: [
      { label: "Playwire", value: "playwire" },
      { label: "Stripe", value: "stripe" },
      { label: "Partnerize", value: "partnerize" },
    ],
  },
];

export default function FilterBarDemo() {
  const [values, setValues] = useState<Record<string, string | string[]>>({});

  return (
    <FilterBar
      filters={filters}
      values={values}
      onChange={(id, val) => setValues((prev) => ({ ...prev, [id]: val }))}
      onClear={() => setValues({})}
    />
  );
}
