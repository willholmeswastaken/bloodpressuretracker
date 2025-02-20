"use client";

import type { BloodPressureReading } from "@/lib/types";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from "@/components/ui/chart";
import { formatDateTime } from "@/lib/date-utils";

interface BloodPressureChartProps {
  readings: BloodPressureReading[];
}

export default function BloodPressureChart({
  readings,
}: BloodPressureChartProps) {
  const data = readings.map((reading) => ({
    date: formatDateTime(reading.createdAt),
    systolic: reading.systolic,
    diastolic: reading.diastolic,
  }));

  return (
    <Card className="w-full overflow-hidden bg-card">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <h3 className="text-sm font-medium">Blood Pressure Trend</h3>
          <p className="text-xs text-muted-foreground">Last 30 days</p>
        </div>
      </CardHeader>
      <CardContent className="w-full">
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ left: -20 }}>
              <XAxis hide />
              <YAxis
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload?.length) {
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-sm">
                        <div className="flex flex-col gap-2">
                          <div className="text-sm text-muted-foreground">
                            {/* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access */}
                            {payload[0]?.payload.date}
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="flex items-center">
                              <div className="mr-2 h-2 w-2 rounded-full bg-primary" />
                              <span className="text-sm font-medium">
                                Systolic: {payload[0]?.value}
                              </span>
                            </div>
                            <div className="flex items-center">
                              <div className="mr-2 h-2 w-2 rounded-full bg-secondary" />
                              <span className="text-sm font-medium">
                                Diastolic: {payload[1]?.value}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="systolic"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="diastolic"
                stroke="hsl(var(--secondary))"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
