import type { BloodPressureReading } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getBPCategory } from "@/lib/blood-pressure-utils";
import { formatDateTime } from "@/lib/date-utils";

interface LastReadingTileProps {
  reading: BloodPressureReading;
}

export default function LastReadingTile({ reading }: LastReadingTileProps) {
  const { category, color } = getBPCategory(
    reading.systolic,
    reading.diastolic,
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Last Reading</CardTitle>
        <p className="text-sm text-muted-foreground">
          {formatDateTime(reading.createdAt)}
        </p>
      </CardHeader>
      <CardContent>
        <div className={`text-3xl font-bold ${color}`}>
          {reading.systolic}/{reading.diastolic} mmHg
        </div>
        <div className={`mt-2 font-semibold ${color}`}>{category}</div>
      </CardContent>
    </Card>
  );
}
