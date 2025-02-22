import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="container flex flex-col items-center space-y-16 pt-16 md:pt-24">
      <div className="flex max-w-screen-2xl flex-col items-center space-y-8 text-center">
        <div className="space-y-4">
          <h1 className="bg-gradient-to-br from-foreground from-30% via-foreground/90 to-foreground/70 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl md:text-6xl lg:text-7xl">
            Keep the pulse on your
            <br />
            blood pressure vitals
          </h1>
          <p className="mx-auto max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            Tracking your blood pressure vitals is an important part of your
            overall health. Our app provides a simple and effective way to
            monitor your blood pressure over time.
          </p>
        </div>
        <div className="flex gap-4">
          <Link href="/app">
            <Button size="lg">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>

      <div className="relative w-full max-w-6xl rounded-lg border bg-background/50 shadow-xl duration-700 animate-in fade-in-0">
        <Image
          src="/app.png"
          alt="Blood Pressure Pulse Dashboard Preview"
          width={2400}
          height={1500}
          className="rounded-lg"
          priority
        />
      </div>
    </section>
  );
}
