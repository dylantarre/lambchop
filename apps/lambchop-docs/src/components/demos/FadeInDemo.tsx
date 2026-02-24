import { FadeIn } from "lmbchp";

export default function FadeInDemo() {
  return (
    <div className="space-y-6">
      <FadeIn direction="up">
        <div className="rounded-card border-2 border-foreground/40 p-4">
          <p className="text-sm text-foreground">Fade in from below</p>
        </div>
      </FadeIn>
      <FadeIn direction="left" delay={200}>
        <div className="rounded-card border-2 border-foreground/40 p-4">
          <p className="text-sm text-foreground">Fade in from left (200ms delay)</p>
        </div>
      </FadeIn>
      <FadeIn direction="right" delay={400}>
        <div className="rounded-card border-2 border-foreground/40 p-4">
          <p className="text-sm text-foreground">Fade in from right (400ms delay)</p>
        </div>
      </FadeIn>
    </div>
  );
}
