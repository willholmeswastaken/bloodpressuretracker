"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DatePicker } from "@/components/ui/date-picker";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { api } from "@/trpc/react";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

export default function AddReadingForm() {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const utils = api.useUtils();
  const createReading = api.reading.create.useMutation({
    onSuccess: async () => {
      setOpen(false);
      await utils.reading.getLatest.invalidate();
      toast({
        title: "Reading added successfully",
        description:
          "Your blood pressure reading has been added to the system.",
      });
    },
  });

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "b") {
        event.preventDefault();
        event.stopPropagation();
        setOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown, { capture: true });
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const date = formData.get("date") as string;

    createReading.mutate({
      systolic: Number(formData.get("systolic")),
      diastolic: Number(formData.get("diastolic")),
      pulse: Number(formData.get("pulse")) ?? 0,
      createdAt: date ? new Date(date).toISOString() : new Date().toISOString(),
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">Add New Reading</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Reading</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="systolic">Systolic (mmHg)</Label>
                <Input id="systolic" name="systolic" type="number" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="diastolic">Diastolic (mmHg)</Label>
                <Input id="diastolic" name="diastolic" type="number" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pulse">Pulse</Label>
                <Input id="pulse" name="pulse" type="number" />
              </div>
              <div className="space-y-2">
                <Label>Date Recorded</Label>
                <DatePicker name="date" />
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <Button type="submit" disabled={createReading.isPending}>
              {createReading.isPending && (
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
