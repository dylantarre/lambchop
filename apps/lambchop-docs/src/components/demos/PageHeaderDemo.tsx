import { PageHeader } from "lambchop";

export default function PageHeaderDemo() {
  return (
    <PageHeader
      title="January 2026 Revenue"
      description="Revenue breakdown across theneedledrop.com, noecho.net, melodicmag.com and 6 other sites."
      breadcrumbs={[
        { label: "Dashboard", href: "#" },
        { label: "Revenue", href: "#" },
        { label: "January 2026" },
      ]}
      actions={
        <div className="flex gap-2">
          <button className="rounded-button border border-surface-border bg-surface px-3 py-1.5 text-sm text-text-secondary hover:bg-surface-hover transition-colors">
            Export CSV
          </button>
          <button className="rounded-button bg-accent px-3 py-1.5 text-sm text-text-inverse hover:bg-accent-dark transition-colors">
            Recalculate
          </button>
        </div>
      }
    />
  );
}
