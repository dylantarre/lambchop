import { Badge } from "lmbchp";

export default function BadgeDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Badge>Default</Badge>
      <Badge variant="primary">Featured</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="muted">Archived</Badge>
    </div>
  );
}
