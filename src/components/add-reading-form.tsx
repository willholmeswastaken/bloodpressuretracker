"use client";

import type React from "react";

import { useEffect, useState } from "react";
import type { BloodPressureReading } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface AddReadingFormProps {
  onAddReading: (reading: Omit<BloodPressureReading, "id">) => void;
}

export default function AddReadingForm({ onAddReading }: AddReadingFormProps) {
  const [systolic, setSystolic] = useState("");
  const [diastolic, setDiastolic] = useState("");
  const [open, setOpen] = useState(false);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddReading({
      systolic: Number.parseInt(systolic),
      diastolic: Number.parseInt(diastolic),
      createdAt: new Date().toISOString(),
    });
    setSystolic("");
    setDiastolic("");
    setOpen(false);
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
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="systolic">Systolic (mmHg)</Label>
              <Input
                id="systolic"
                type="number"
                value={systolic}
                onChange={(e) => setSystolic(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="diastolic">Diastolic (mmHg)</Label>
              <Input
                id="diastolic"
                type="number"
                value={diastolic}
                onChange={(e) => setDiastolic(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button type="submit">Save</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
