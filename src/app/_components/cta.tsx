import { Button } from "@/components/ui/button";

export default function CTA() {
  return (
    <section className="border-t">
      <div className="container flex flex-col items-center gap-4 py-24 text-center md:py-32">
        <h2 className="text-3xl font-bold leading-[1.1] sm:text-3xl md:text-5xl">
          Ready to unlock your blood pressure vitals?
        </h2>
        <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
          Sign up now to start tracking your blood pressure and unlock the
          insights into your heart health.
        </p>
        <Button size="lg" className="mt-4">
          Get Started Today
        </Button>
      </div>
    </section>
  );
}
