import { ScaleIn } from "lambchop";

export default function ScaleInDemo() {
  return (
    <div className="space-y-6">
      <ScaleIn>
        <div className="rounded-card border-2 border-foreground/40 p-4">
          <p className="text-sm text-foreground">Scale in on scroll</p>
        </div>
      </ScaleIn>
      <ScaleIn delay={300}>
        <div className="rounded-card border-2 border-foreground/40 p-4">
          <p className="text-sm text-foreground">Scale in with 300ms delay</p>
        </div>
      </ScaleIn>
    </div>
  );
}
