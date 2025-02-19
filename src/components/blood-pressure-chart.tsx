"use client";

import type { BloodPressureReading } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Blood Pressure Over Time</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis
                dataKey="date"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
              />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="systolic"
                stroke="#8884d8"
                strokeWidth={2}
                dot={false}
                name="Systolic"
              />
              <Line
                type="monotone"
                dataKey="diastolic"
                stroke="#82ca9d"
                strokeWidth={2}
                dot={false}
                name="Diastolic"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
