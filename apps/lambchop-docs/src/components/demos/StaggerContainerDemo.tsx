import { StaggerContainer } from "lambchop";

export default function StaggerContainerDemo() {
  return (
    <StaggerContainer stagger={100} className="grid gap-4 sm:grid-cols-3">
      <div className="rounded-card border-2 border-foreground/40 p-4 text-center">
        <p className="font-display text-xl uppercase text-foreground">First</p>
        <p className="text-xs text-muted-foreground">0ms delay</p>
      </div>
      <div className="rounded-card border-2 border-foreground/40 p-4 text-center">
        <p className="font-display text-xl uppercase text-foreground">Second</p>
        <p className="text-xs text-muted-foreground">100ms delay</p>
      </div>
      <div className="rounded-card border-2 border-foreground/40 p-4 text-center">
        <p className="font-display text-xl uppercase text-foreground">Third</p>
        <p className="text-xs text-muted-foreground">200ms delay</p>
      </div>
    </StaggerContainer>
  );
}
