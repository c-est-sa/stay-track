"use client";

import React, { useEffect, useState } from "react";
import {
  columns,
  ReservationByRoomTableType,
} from "@/components/table/columns";
import { DataTable } from "@/components/table/DataTable";
import { getReservationsForViewTable } from "@/services/reservation";

const GuestView = () => {
  const today = new Date().toISOString().split("T")[0]; //YYYY-MM-DD

  const [checkInDate, setCheckInDate] = useState("2025-06-08");
  const [reservationData, setReservationData] = useState<
    ReservationByRoomTableType[]
  >([]);

  useEffect(() => {
    const fetchReservationsForViewTable = async () => {
      try {
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
    <>
      <h1 className="text-2xl font-bold mb-4">Guest View</h1>
      <DataTable columns={columns} data={reservationData} />
    </>
  );
};

export default GuestView;
