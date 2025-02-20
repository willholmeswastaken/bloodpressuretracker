"use client";

import BloodPressureChart from "./blood-pressure-chart";
import LastReadingTile from "./last-reading-tile";
import AverageBPCategory from "./average-bp-category";
import AddReadingForm from "./add-reading-form";
import type { BloodPressureReading } from "@/lib/types";
import { api } from "@/trpc/react";
import { useToast } from "@/hooks/use-toast";
import { Activity } from "lucide-react";
import { PlusCircle, Target, History } from "lucide-react";
import { Card, CardHeader } from "./ui/card";

export default function BloodPressureDashboard() {
  const utils = api.useUtils();
  const { toast } = useToast();

  const [readings] = api.reading.getLatest.useSuspenseQuery();
  const createReading = api.reading.create.useMutation({
    onSuccess: async () => {
      await utils.reading.getLatest.invalidate();
      toast({
        title: "Reading added successfully",
        description:
          "Your blood pressure reading has been added to the system.",
      });
    },
  });

  const addReading = async (newReading: Omit<BloodPressureReading, "id">) => {
    // todo
    await createReading.mutateAsync(newReading);
  };

  const lastReading = readings[readings.length - 1];

  const actionCards = [
    {
      title: "Add Reading",
      description: "Record a new blood pressure measurement",
      icon: PlusCircle,
    },
    {
      title: "View History",
      description: "See all your past measurements",
      icon: History,
      href: "#",
    },
    {
      title: "Set Goals",
      description: "Manage your blood pressure targets",
      icon: Target,
      href: "#",
    },
    {
      title: "Track Progress",
      description: "View your blood pressure trends",
      icon: Activity,
      href: "#",
    },
  ];

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="mb-4 sm:mb-0">
          <h1 className="text-2xl font-bold sm:text-3xl">Welcome, Will</h1>
          <p className="pl-1 text-muted-foreground">
            Overview of your blood pressure readings
          </p>
        </div>
        <AddReadingForm onAddReading={addReading} />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <LastReadingTile reading={lastReading!} />
        <AverageBPCategory readings={readings} />
      </div>

      <div className="w-full">
        <BloodPressureChart readings={readings} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {actionCards.map((card) => (
          <Card
            key={card.title}
            className="cursor-pointer bg-card transition-colors hover:bg-accent/50"
          >
            <CardHeader className="flex flex-row items-center space-x-4 p-6">
              <div className="rounded-full bg-primary/10 p-2">
                <card.icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">{card.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {card.description}
                </p>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}
