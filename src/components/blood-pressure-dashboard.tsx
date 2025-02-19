"use client";

import { useState } from "react";
import BloodPressureChart from "./blood-pressure-chart";
import LastReadingTile from "./last-reading-tile";
import AverageBPCategory from "./average-bp-category";
import AddReadingForm from "./add-reading-form";
import PreviousEntriesTable from "./previous-entries-table";
import type { BloodPressureReading } from "@/lib/types";
import { api } from "@/trpc/react";

export default function BloodPressureDashboard() {
  const [readings] = api.reading.getLatest.useSuspenseQuery();
  const utils = api.useUtils();
  const createReading = api.reading.create.useMutation({
    onSuccess: async () => {
      await utils.reading.getLatest.invalidate();
    },
  });
  /*
  const [oldreadings, setReadings] = useState<BloodPressureReading[]>([
    {
      id: 1,
      systolic: 138,
      diastolic: 83,
      timestamp: new Date("2023-05-01T09:00:00").toISOString(),
    },
    {
      id: 2,
      systolic: 128,
      diastolic: 85,
      timestamp: new Date("2023-05-02T09:00:00").toISOString(),
    },
    {
      id: 3,
      systolic: 143,
      diastolic: 83,
      timestamp: new Date("2023-05-03T09:00:00").toISOString(),
    },
    {
      id: 4,
      systolic: 155,
      diastolic: 85,
      timestamp: new Date("2023-05-04T09:00:00").toISOString(),
    },
    {
      id: 5,
      systolic: 146,
      diastolic: 97,
      timestamp: new Date("2023-05-05T09:00:00").toISOString(),
    },
    {
      id: 6,
      systolic: 138,
      diastolic: 92,
      timestamp: new Date("2023-05-05T09:00:00").toISOString(),
    },
  ]);
  */

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
