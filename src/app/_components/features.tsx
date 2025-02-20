import {
  Brain,
  ChartLine,
  CircleDollarSignIcon,
  Cloud,
  Shield,
  Zap,
} from "lucide-react";

const features = [
  {
    name: "AI-Powered Analytics",
    description:
      "Harness the power of machine learning to derive actionable insights from your data.",
    icon: Brain,
  },
  {
    name: "Insights over time",
    description:
      "Gain a deeper understanding of your blood pressure trends over time.",
    icon: ChartLine,
  },
  {
    name: "Free to use",
    description:
      "Our app is completely free to use, with no hidden fees or limitations.",
    icon: CircleDollarSignIcon,
  },
  {
    name: "Easy to use",
    description:
      "Our app is easy to use, even for those with little to no experience.",
    icon: Zap,
  },
];

export default function Features() {
  return (
    <section className="container space-y-16 py-24 md:py-32">
      <div className="mx-auto max-w-[58rem] text-center">
        <h2 className="text-3xl font-bold leading-[1.1] sm:text-3xl md:text-5xl">
          Key insights, unlocked
        </h2>
        <p className="mt-4 text-muted-foreground sm:text-lg">
          Discover how we can unlock the insights into your blood pressure data.
        </p>
      </div>
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2">
        {features.map((feature) => (
          <div
            key={feature.name}
            className="relative overflow-hidden rounded-lg border bg-background p-8"
          >
            <div className="flex items-center gap-4">
              <feature.icon className="h-8 w-8" />
              <h3 className="font-bold">{feature.name}</h3>
            </div>
            <p className="mt-2 text-muted-foreground">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
