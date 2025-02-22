"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DatePicker } from "@/components/ui/date-picker";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { api } from "@/trpc/react";
import { useToast } from "@/hooks/use-toast";
import { type BloodPressureReading } from "@/lib/types";
import { Loader2 } from "lucide-react";

type EditReadingFormProps = {
  reading: BloodPressureReading | null;
  onClose: () => void;
};

export function EditReadingForm({ reading, onClose }: EditReadingFormProps) {
  const { toast } = useToast();
  const utils = api.useUtils();

  const updateReading = api.reading.update.useMutation({
    onSuccess: async () => {
      await utils.reading.getLatest.invalidate();
      toast({
        title: "Reading updated",
        description: "Your blood pressure reading has been updated.",
      });
      onClose();
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!reading) return;

    const formData = new FormData(e.currentTarget);
    const date = formData.get("date") as string;

    await updateReading.mutateAsync({
      id: reading.id,
      systolic: Number(formData.get("systolic")),
      diastolic: Number(formData.get("diastolic")),
      pulse: Number(formData.get("pulse")) ?? 0,
      createdAt: date ? new Date(date).toISOString() : reading.createdAt,
    });
  };

  return (
    <Dialog open={!!reading} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Reading</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="systolic">Systolic (mmHg)</Label>
                <Input
                  id="systolic"
                  name="systolic"
                  type="number"
                  defaultValue={reading?.systolic}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="diastolic">Diastolic (mmHg)</Label>
                <Input
                  id="diastolic"
                  name="diastolic"
                  type="number"
                  defaultValue={reading?.diastolic}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pulse">Pulse</Label>
                <Input
                  id="pulse"
                  name="pulse"
                  type="number"
                  defaultValue={reading?.pulse}
                />
              </div>
              <div className="space-y-2">
                <Label>Date Recorded</Label>
                <DatePicker
                  name="date"
                  defaultDate={
                    new Date(reading?.createdAt ?? new Date().toISOString())
                  }
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={updateReading.isPending}>
              {updateReading.isPending && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
