"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export interface ReservationByRoomTableType {
  name: string;
  checkInDate: Date;
  checkOutDate: Date;
  numberOfGuests: number;
  roomNumber: string;
  guestStatus: string;
  reservationInfo: string;
}

export const columns: ColumnDef<ReservationByRoomTableType>[] = [
  {
    accessorKey: "guestName",
    header: "Name",
  },
  {
    accessorKey: "reservation.checkInDate",
    header: "Check-In",
  },
  {
    accessorKey: "reservation.checkOutDate",
    header: "Check-Out",
  },
  {
    accessorKey: "numberOfGuests",
    header: "Number of Guests",
  },
  {
    accessorKey: "roomNumber",
    header: "Room",
  },
  {
    accessorKey: "guestStatus.guestStatus",
    header: "Status",
  },
  {
    accessorKey: "reservation.reservationInfo",
    header: "Info",
  },
];
