import { Button } from "lambchop";

export default function ButtonDemo() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Button>Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button size="sm">Small</Button>
      <Button size="lg">Large</Button>
    </div>
  );
}
