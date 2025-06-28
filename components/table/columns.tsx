"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "../ui/button";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export interface ReservationByRoomTableType {
  name: string;
  reservation: {
    checkInDate: Date;
    checkOutDate: Date;
  };
  numberOfGuests: number;
  roomNumber: string;
  guestStatus: {
    guestStatus: string;
  };
  reservationInfo: string;
}

export const columns: ColumnDef<ReservationByRoomTableType>[] = [
  {
    accessorKey: "guestName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "reservation.checkInDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          In
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const checkInDate = new Date(row.original.reservation.checkInDate);
      const checkInDateFormatted = checkInDate.toLocaleDateString(undefined, {
        weekday: "short",
        month: "short",
        day: "numeric",
      });
      return <div className="text-center">{checkInDateFormatted}</div>;
    },
  },
  {
    accessorKey: "reservation.checkOutDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Out
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const checkOutDate = new Date(row.original.reservation.checkOutDate);
      const checkOutDateFormatted = checkOutDate.toLocaleDateString(undefined, {
        weekday: "short",
        month: "short",
        day: "numeric",
      });
      return <div className="text-center">{checkOutDateFormatted}</div>;
    },
  },
  {
    accessorKey: "numberOfGuests",
    header: "# of Guests",
    cell: ({ row }) => {
      return (
        <div className="text-center">{row.getValue("numberOfGuests")}</div>
      );
    },
  },
  {
    accessorKey: "roomNumber",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Room
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div className="text-center">{row.getValue("roomNumber")}</div>;
    },
  },
  {
    accessorKey: "guestStatus.guestStatus",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="text-center">
          {row.original.guestStatus.guestStatus}
        </div>
      );
    },
  },
  {
    accessorKey: "reservation.reservationInfo",
    header: "Info",
  },
];
