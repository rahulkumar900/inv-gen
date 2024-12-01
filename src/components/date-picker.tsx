"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerProps {
  name: string; // name of the input field
  onSelectDate: (event: { name: string; value: string }) => void;
}

export function DatePicker({ name, onSelectDate }: DatePickerProps) {
  const [date, setDate] = React.useState<Date>();

  const handleChangeDate = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    onSelectDate({ name, value: selectedDate?.toLocaleDateString()! });
  };

  return (
    <Popover>
      <PopoverTrigger className="min-w-full" asChild>
        <Button
          variant={"outline"}
          className={cn(
            "max-w-full flex  justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-1 h-4 w-4" />
          {date ? date.toLocaleDateString() : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleChangeDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
