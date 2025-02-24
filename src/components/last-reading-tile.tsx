import type { BloodPressureReading } from "@/lib/types";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getBPCategory } from "@/lib/blood-pressure-utils";
import { Progress } from "@/components/ui/progress";
import { formatDateTime } from "@/lib/date-utils";

interface LastReadingTileProps {
  reading?: BloodPressureReading;
}

export default function LastReadingTile({ reading }: LastReadingTileProps) {
  const systolic = reading?.systolic ?? 0;
  const diastolic = reading?.diastolic ?? 0;
  const { category, color } = getBPCategory(systolic, diastolic);
  const maxSystolic = 180; // Maximum expected systolic value
  const maxDiastolic = 120; // Maximum expected diastolic value

  const systolicProgress = (systolic / maxSystolic) * 100;
  const diastolicProgress = (diastolic / maxDiastolic) * 100;

  return (
    <Card className="bg-card">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <h3 className="text-sm font-medium">Last Reading</h3>
          <p className="text-xs text-muted-foreground">
            {formatDateTime(reading?.createdAt ?? new Date())}
          </p>
        </div>
        <div className={`text-2xl font-bold ${color}`}>
          {systolic}/{diastolic}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Systolic</span>
              <span className={color}>{systolic} mmHg</span>
            </div>
            <Progress value={systolicProgress} className="h-2" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Diastolic</span>
              <span className={color}>{diastolic} mmHg</span>
            </div>
            <Progress value={diastolicProgress} className="h-2" />
          </div>
          <div className={`text-sm font-medium ${color}`}>{category}</div>
        </div>
      </CardContent>
    </Card>
  );
}
