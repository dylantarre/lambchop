import { PricingCard } from "lambchop";

export default function PricingCardDemo() {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <PricingCard
        name="Starter"
        price="$29"
        description="Perfect for small publishers."
        features={["Up to 3 sites", "Basic analytics", "Email support"]}
      />
      <PricingCard
        name="Pro"
        price="$99"
        featured
        badge="Most Popular"
        description="Scale your publishing network."
        features={["Unlimited sites", "Advanced analytics", "Priority support", "Real-time dashboards"]}
      />
      <PricingCard
        name="Enterprise"
        price="Custom"
        unit=""
        features={["Custom integrations", "Dedicated account manager", "SLA guarantee"]}
        ctaLabel="Contact Sales"
      />
    </div>
  );
}
