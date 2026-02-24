import { TestimonialCard } from "lambchop";

export default function TestimonialCardDemo() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <TestimonialCard
        quote="The analytics dashboard transformed how we track our content performance across all our sites."
        author="Alex Rivera"
        role="Content Director"
        rating={5}
      />
      <TestimonialCard
        quote="We went from guessing to knowing exactly which content drives revenue."
        author="Sam Mitchell"
        role="Editor in Chief"
        rating={4}
      />
    </div>
  );
}
