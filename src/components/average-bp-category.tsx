import type { BloodPressureReading } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getBPCategory } from "@/lib/blood-pressure-utils";

interface AverageBPCategoryProps {
  readings: BloodPressureReading[];
}

export default function AverageBPCategory({
  readings,
}: AverageBPCategoryProps) {
  const averageSystolic = Math.round(
    readings.reduce((sum, reading) => sum + reading.systolic, 0) /
      readings.length
  );
  const averageDiastolic = Math.round(
    readings.reduce((sum, reading) => sum + reading.diastolic, 0) /
      readings.length
  );

  const { category, color } = getBPCategory(averageSystolic, averageDiastolic);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Average Blood Pressure Category</CardTitle>
      </CardHeader>
      <CardContent>
        <div className={`text-2xl font-semibold ${color}`}>{category}</div>
        <div className={`text-xl ${color}`}>
          {averageSystolic}/{averageDiastolic} mmHg
        </div>
      </CardContent>
    </Card>
  );
}
