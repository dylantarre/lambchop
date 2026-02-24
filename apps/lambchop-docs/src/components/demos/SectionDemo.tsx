import { Section } from "lambchop";

export default function SectionDemo() {
  return (
    <div className="-mx-10 overflow-hidden">
      <Section>
        <h3 className="font-display text-2xl uppercase tracking-wider text-foreground">Default Section</h3>
        <p className="mt-2 text-sm text-muted-foreground">Standard section with container.</p>
      </Section>
      <Section variant="muted">
        <h3 className="font-display text-2xl uppercase tracking-wider text-foreground">Muted Section</h3>
        <p className="mt-2 text-sm text-muted-foreground">Subtle background tint.</p>
      </Section>
      <Section variant="bordered">
        <h3 className="font-display text-2xl uppercase tracking-wider text-foreground">Bordered Section</h3>
        <p className="mt-2 text-sm text-muted-foreground">Industrial border-y-2 styling.</p>
      </Section>
    </div>
  );
}
