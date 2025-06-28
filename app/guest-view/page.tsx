"use client";

import React, { useEffect, useState } from "react";
import {
  columns,
  ReservationByRoomTableType,
} from "@/components/table/columns";
import { DataTable } from "@/components/table/DataTable";
import { Button } from "@/components/ui/button";
import { getReservationsForViewTable } from "@/services/reservation";
import { toLocalDateString } from "@/utils/date";
import Link from "next/link";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

const GuestView = () => {
  const today = toLocalDateString(new Date()); //YYYY-MM-DD

  const [checkInDate, setCheckInDate] = useState(today);
  const [reservationData, setReservationData] = useState<
    ReservationByRoomTableType[]
  >([]);

  useEffect(() => {
    const fetchReservationsForViewTable = async () => {
      try {
        console.log("Check-in date:", checkInDate);
        const data = await getReservationsForViewTable(checkInDate);
        console.log(data);

        if (!data) {
          console.error("Error fetching reservations for View table");
          window.alert(
            "An error occurred while fetching reservations. Please try again."
          );
          return;
        }

        if (data.length === 0) {
          console.warn("No reservations found.");
          setReservationData(data);
          return;
        }

        setReservationData(data);
      } catch (error) {
        console.error("Error fetching reservations for View table:", error);
        window.alert(
          "An error occurred while fetching reservations. Please try again."
        );
      }
    };

    fetchReservationsForViewTable();
  }, [checkInDate]);

  return (
    <ProtectedRoute>
      <div>
        <h1 className="text-2xl font-bold mb-4">Guest View</h1>
        <DataTable
          columns={columns}
          data={reservationData}
          checkInDate={checkInDate}
          setCheckInDate={setCheckInDate}
        />

        <Link href={"/guest-details/new"}>
          <Button>Create</Button>
        </Link>
      </div>
    </ProtectedRoute>
  );
};

export default GuestView;
