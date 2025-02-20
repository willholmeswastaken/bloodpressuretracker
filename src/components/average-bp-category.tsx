import type { BloodPressureReading } from "@/lib/types";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getBPCategory } from "@/lib/blood-pressure-utils";
import { Progress } from "@/components/ui/progress";

interface AverageBPCategoryProps {
  readings: BloodPressureReading[];
}

export default function AverageBPCategory({
  readings,
}: AverageBPCategoryProps) {
  const averageSystolic = Math.round(
    readings.reduce((sum, reading) => sum + reading.systolic, 0) /
      readings.length,
  );
  const averageDiastolic = Math.round(
    readings.reduce((sum, reading) => sum + reading.diastolic, 0) /
      readings.length,
  );

  const { category, color } = getBPCategory(averageSystolic, averageDiastolic);
  const maxSystolic = 180; // Maximum expected systolic value
  const maxDiastolic = 120; // Maximum expected diastolic value

  const systolicProgress = (averageSystolic / maxSystolic) * 100;
  const diastolicProgress = (averageDiastolic / maxDiastolic) * 100;

  return (
    <Card className="bg-card">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <h3 className="text-sm font-medium">Average Blood Pressure</h3>
          <p className="text-xs text-muted-foreground">Last 30 days</p>
        </div>
        <div className={`text-2xl font-bold ${color}`}>
          {averageSystolic}/{averageDiastolic}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Avg. Systolic</span>
              <span className={color}>{averageSystolic} mmHg</span>
            </div>
            <Progress value={systolicProgress} className="h-2" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Avg. Diastolic</span>
              <span className={color}>{averageDiastolic} mmHg</span>
            </div>
            <Progress value={diastolicProgress} className="h-2" />
          </div>
          <div className={`text-sm font-medium ${color}`}>{category}</div>
        </div>
      </CardContent>
    </Card>
  );
}
