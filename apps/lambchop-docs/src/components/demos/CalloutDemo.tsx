import { Callout } from "lmbchp";

export default function CalloutDemo() {
  return (
    <div className="space-y-3">
      <Callout label="Insight">
        Lambgoat drives <strong>66%</strong> of October revenue. The Needle Drop grew <strong>34%</strong> month over month.
      </Callout>
      <Callout label="Watch" tone="negative">
        Pageviews dipped 2.2% while revenue rose, so the gain came from monetization rather than traffic.
      </Callout>
    </div>
  );
}
