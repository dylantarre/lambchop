import { RankedTable } from "lmbchp";
import { articleRows } from "./lgm-sample";

export default function RankedTableDemo() {
  return (
    <RankedTable
      columns={["Title", "Author", "Site", "Revenue", "Pageviews"]}
      rows={articleRows}
      pageSize={5}
    />
  );
}
