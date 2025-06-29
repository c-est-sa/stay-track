"use client";

import * as React from "react";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  formatUTCDateForDisplay,
  parseUTCDateString,
  // toLocalDateString,
  toUTCDateString,
} from "@/utils/date";

// function formatDate(date: Date | undefined) {
//   if (!date) {
//     return "";
//   }

//   return date.toLocaleDateString(undefined, {
//     day: "2-digit",
//     month: "long",
//     year: "numeric",
//   });
// }

function isValidDate(date: Date | undefined) {
  if (!date) {
    return false;
  }
  return !isNaN(date.getTime());
}

interface DatePickerWithInputProps {
  label: string;
  checkInDate: string;
  setCheckInDate: (date: string) => void;
}

export function DatePickerWithInput({
  label,
  checkInDate,
  setCheckInDate,
}: DatePickerWithInputProps) {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(
    parseUTCDateString(checkInDate)
  );
  const [month, setMonth] = React.useState<Date | undefined>(date);
  const [value, setValue] = React.useState(formatUTCDateForDisplay(date!));

  return (
    <div className="flex flex-col gap-1">
      <Label htmlFor="date" className="px-1">
        {label}
      </Label>
      <div className="relative flex gap-2">
        <Input
          id="date"
          value={value}
          placeholder="June 01, 2025"
          className="bg-background pr-10"
          onChange={(e) => {
            const date = new Date(e.target.value);
            setValue(e.target.value);
            if (isValidDate(date)) {
              const utcDate = new Date(
                Date.UTC(
                  date.getUTCFullYear(),
                  date.getUTCMonth(),
                  date.getUTCDate()
                )
              );

              setDate(utcDate);
              setMonth(utcDate);
              setCheckInDate(toUTCDateString(utcDate));
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setOpen(true);
            }
          }}
        />
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              id="date-picker"
              variant="ghost"
              className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
            >
              <CalendarIcon className="size-3.5" />
              <span className="sr-only">Select date</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-auto overflow-hidden p-0"
            align="end"
            alignOffset={-8}
            sideOffset={10}
          >
            <Calendar
              mode="single"
              selected={date}
              captionLayout="dropdown"
              month={month}
              onMonthChange={setMonth}
              onSelect={(date) => {
                console.log("Selected date:", date);
                if (isValidDate(date) && date) {
                  const utcDate = new Date(
                    Date.UTC(
                      date.getFullYear(),
                      date.getMonth(),
                      date.getDate()
                    )
                  );

                  console.log("Converted to UTC:", utcDate.toISOString());
                  console.log("UTC date string:", toUTCDateString(utcDate));

                  setDate(utcDate);
                  setValue(formatUTCDateForDisplay(utcDate));
                  setCheckInDate(toUTCDateString(utcDate));
                }
                setOpen(false);
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
