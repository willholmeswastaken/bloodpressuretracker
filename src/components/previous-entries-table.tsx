import type { BloodPressureReading } from "@/lib/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDateTime } from "@/lib/date-utils";

interface PreviousEntriesTableProps {
  readings: BloodPressureReading[];
}

export default function PreviousEntriesTable({
  readings,
}: PreviousEntriesTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Previous Entries</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date/Time</TableHead>
              <TableHead>Systolic</TableHead>
              <TableHead>Diastolic</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {readings
              .slice()
              .reverse()
              .map((reading) => (
                <TableRow key={reading.id}>
                  <TableCell>{formatDateTime(reading.createdAt)}</TableCell>
                  <TableCell>{reading.systolic}</TableCell>
                  <TableCell>{reading.diastolic}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
