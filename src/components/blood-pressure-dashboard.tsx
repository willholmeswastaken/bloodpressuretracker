"use client";

import { useState } from "react";
import BloodPressureChart from "./blood-pressure-chart";
import LastReadingTile from "./last-reading-tile";
import AverageBPCategory from "./average-bp-category";
import AddReadingForm from "./add-reading-form";
import PreviousEntriesTable from "./previous-entries-table";
import type { BloodPressureReading } from "@/lib/types";
import { api } from "@/trpc/react";
import { useToast } from "@/hooks/use-toast";

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

  return (
    <div className="space-y-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Blood Pressure Dashboard</h1>
        <AddReadingForm onAddReading={addReading} />
      </div>
      {lastReading && (
        <>
          <div className="grid gap-6 md:grid-cols-2">
            <LastReadingTile reading={lastReading} />
            <AverageBPCategory readings={readings} />
          </div>
          <div className="w-full">
            <BloodPressureChart readings={readings} />
          </div>
          <PreviousEntriesTable readings={readings} />
        </>
      )}
    </div>
  );
}
