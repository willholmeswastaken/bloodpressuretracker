"use client";

import { useState } from "react";
import { api } from "@/trpc/react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Loader2, Pencil, Trash2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { EditReadingForm } from "@/components/edit-reading-form";
import type { BloodPressureReading } from "@/lib/types";

type Props = {
  latestReadings: BloodPressureReading[];
};

export function ReadingsList({ latestReadings }: Props) {
  const [editingReading, setEditingReading] =
    useState<BloodPressureReading | null>(null);
  const [readingToDelete, setReadingToDelete] = useState<number | null>(null);

  const { toast } = useToast();
  const utils = api.useUtils();

  const { data: readings } = api.reading.getLatest.useQuery(undefined, {
    initialData: latestReadings,
  });

  const deleteReading = api.reading.delete.useMutation({
    onSuccess: async () => {
      setReadingToDelete(null);
      await utils.reading.getLatest.invalidate();
      toast({
        title: "Reading deleted",
        description: "The blood pressure reading has been deleted.",
      });
    },
  });

  if (!readings) return null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Reading History</h1>
        <p className="text-muted-foreground">
          View and manage your blood pressure readings
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {readings.map((reading) => (
          <Card key={reading.id}>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center justify-between">
                {reading.systolic}/{reading.diastolic}
                <span className="text-sm font-normal text-muted-foreground">
                  mmHg
                </span>
              </CardTitle>
              <CardDescription>
                {format(reading.createdAt, "PPP 'at' p")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pulse</p>
                  <p>{reading.pulse} bpm</p>
                </div>
                <div className="space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setEditingReading(reading)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setReadingToDelete(reading.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <EditReadingForm
        reading={editingReading}
        onClose={() => setEditingReading(null)}
      />

      <Dialog
        open={!!readingToDelete}
        onOpenChange={() => setReadingToDelete(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete blood pressure reading?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete this
              blood pressure reading from your records.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setReadingToDelete(null)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              disabled={deleteReading.isPending}
              onClick={() => {
                if (readingToDelete) {
                  deleteReading.mutate({ id: readingToDelete });
                }
              }}
            >
              {deleteReading.isPending && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
