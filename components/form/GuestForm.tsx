import React from "react";

import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { UseFormReturn } from "react-hook-form";
import { format } from "date-fns";

export const GuestFormSchema = z.object({
  guestName: z.string({
    required_error: "Guest name is required.",
  }),
  checkInDate: z.date({
    required_error: "Check-in date is required.",
  }),
  checkOutDate: z.date({
    required_error: "Check-out date is required.",
  }),
  numberOfAdults: z.number().min(1, {
    message: "Number of adults must be at least 1.",
  }),
  numberOfKids: z.number().default(0),
  roomNumber: z.string({
    required_error: "Please select a room.",
  }),
  guestStatus: z.number().default(1),
  reservationInfo: z.string().optional(),
  reservationId: z.string().optional(),
  bookingSite: z.number(),
  paymentCompletionStatus: z.boolean().default(false),
});

const roomNumbers = [
  { label: "101", value: "101" },
  { label: "102", value: "102" },
  { label: "201", value: "201" },
  { label: "202", value: "202" },
  { label: "301", value: "301" },
  { label: "302", value: "302" },
];

const guestStatuses = [
  { label: "Checked-In", value: 1 },
  { label: "Checked-Out", value: 2 },
] as const;

const bookingSites = [
  { label: "Booking.com", value: 1 },
  { label: "Expedia", value: 2 },
  { label: "Agoda", value: 3 },
  { label: "Direct Booking", value: 4 },
];

interface GuestFormProps {
  form: UseFormReturn<{
    guestName: string;
    checkInDate: Date;
    checkOutDate: Date;
    numberOfAdults: number;
    numberOfKids: number;
    roomNumber: string;
    guestStatus: number;
    reservationInfo?: string;
    reservationId?: string;
    bookingSite: number;
    paymentCompletionStatus: boolean;
  }>;
  onSubmit: (values: z.infer<typeof GuestFormSchema>) => void;
}

const GuestForm = ({ form, onSubmit }: GuestFormProps) => {
  const isRoomNumberDisabled = true;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="guestName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Guest Name</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="checkInDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Check In</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    captionLayout="dropdown"
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="checkOutDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Check Out</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    captionLayout="dropdown"
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="numberOfAdults"
          render={({ field }) => (
            <FormItem>
              <FormLabel># of Adults</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="numberOfKids"
          render={({ field }) => (
            <FormItem>
              <FormLabel># of Kids</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="roomNumber"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Room</FormLabel>
              <Popover open={!isRoomNumberDisabled}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[200px] justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                      disabled={isRoomNumberDisabled}
                    >
                      {field.value
                        ? roomNumbers.find((room) => room.value === field.value)
                            ?.label
                        : "Select room"}
                      <ChevronsUpDown className="opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput
                      placeholder="Search framework..."
                      className="h-9"
                      disabled={isRoomNumberDisabled}
                    />
                    <CommandList>
                      <CommandEmpty>No room found.</CommandEmpty>
                      <CommandGroup>
                        {roomNumbers.map((room) => (
                          <CommandItem
                            value={room.label}
                            key={room.value}
                            onSelect={() => {
                              form.setValue("roomNumber", room.value);
                            }}
                          >
                            {room.label}
                            <Check
                              className={cn(
                                "ml-auto",
                                room.value === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="guestStatus"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Guest Status</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[200px] justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? guestStatuses.find(
                            (guestStatus) => guestStatus.value === field.value
                          )?.label
                        : "Select room"}
                      <ChevronsUpDown className="opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput
                      placeholder="Search framework..."
                      className="h-9"
                    />
                    <CommandList>
                      <CommandEmpty>No framework found.</CommandEmpty>
                      <CommandGroup>
                        {guestStatuses.map((guestStatus) => (
                          <CommandItem
                            value={guestStatus.label}
                            key={guestStatus.value}
                            onSelect={() => {
                              form.setValue("guestStatus", guestStatus.value);
                            }}
                          >
                            {guestStatus.label}
                            <Check
                              className={cn(
                                "ml-auto",
                                guestStatus.value === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="reservationInfo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Info</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter guest information here if any."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="reservationId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Reservation ID</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} disabled/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bookingSite"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Booking Site</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[200px] justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? bookingSites.find(
                            (bookingSite) => bookingSite.value === field.value
                          )?.label
                        : "Select booking site"}
                      <ChevronsUpDown className="opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput
                      placeholder="Search framework..."
                      className="h-9"
                    />
                    <CommandList>
                      <CommandEmpty>No framework found.</CommandEmpty>
                      <CommandGroup>
                        {bookingSites.map((bookingSite) => (
                          <CommandItem
                            value={bookingSite.label}
                            key={bookingSite.value}
                            onSelect={() => {
                              form.setValue("bookingSite", bookingSite.value);
                            }}
                          >
                            {bookingSite.label}
                            <Check
                              className={cn(
                                "ml-auto",
                                bookingSite.value === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="paymentCompletionStatus"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
              <div className="space-y-0.5">
                <FormLabel>Payment Completion Status</FormLabel>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button variant="destructive">Delete</Button>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default GuestForm;
