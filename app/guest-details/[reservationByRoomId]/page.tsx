"use client";

import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import GuestForm, { GuestFormSchema } from "@/components/form/GuestForm";
import {
  deleteReservationByRoom,
  getGuestDetails,
  updateGuestDetails,
} from "@/services/reservation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const GuestDetails = () => {
  const { reservationByRoomId } = useParams();

  const router = useRouter();

  const form = useForm<z.infer<typeof GuestFormSchema>>({
    resolver: zodResolver(GuestFormSchema),
    defaultValues: {
      guestName: "",
      checkInDate: new Date(),
      checkOutDate: new Date(),
      numberOfAdults: 1,
      numberOfKids: 0,
      roomNumber: "",
      guestStatus: 1,
      reservationInfo: "",
      reservationId: "",
      bookingSite: 4,
      paymentCompletionStatus: false,
      reservationByRoomId: reservationByRoomId?.toString() || "",
    },
  });

  useEffect(() => {
    if (!reservationByRoomId) {
      console.error("No reservation by room ID provided in the URL.");
      return;
    }

    const fetchGuestDetails = async () => {
      try {
        const data = await getGuestDetails(reservationByRoomId.toString());

        if (!data) {
          console.error("Error fetching user details");
          window.alert(
            "An error occurred while fetching user details. Please reload the page."
          );
          return;
        }
        console.log("Fetched guest details:", data);

        form.reset({
          guestName: data.guestName || "",
          checkInDate: data.reservation.checkInDate
            ? new Date(data.reservation.checkInDate)
            : new Date(),
          checkOutDate: data.reservation.checkOutDate
            ? new Date(data.reservation.checkOutDate)
            : new Date(),
          numberOfAdults: data.numberOfAdults || 1,
          numberOfKids: data.numberOfKids || 0,
          roomNumber: data.roomNumber || "",
          guestStatus: data.guestStatus.guestStatusId || 1,
          reservationInfo: data.reservation.reservationInfo || "",
          reservationId: data.reservationId || "",
          bookingSite: data.reservation.bookingSite.bookingSiteId || 4,
          paymentCompletionStatus:
            data.reservation.paymentCompletionStatus || false,
          reservationByRoomId: reservationByRoomId.toString(),
        });
      } catch (error) {
        console.error("Error fetching guest details:", error);
        window.alert(
          "An error occurred while fetching user details. Please reload the page."
        );
      }
    };

    fetchGuestDetails();
  }, [form, reservationByRoomId]);

  if (!reservationByRoomId) {
    return (
      <h1 className="text-2xl font-bold mb-4">
        Guest Details: no reservation by room ID provided
      </h1>
    );
  }

  const onSubmit = async (values: z.infer<typeof GuestFormSchema>) => {
    try {
      console.log("Form submitted with values:", values);
      const data = await updateGuestDetails(
        reservationByRoomId.toString(),
        values
      );

      if (!data) {
        console.error("Error during form submission");
        window.alert(
          "An error occurred while submitting the form. Please try again."
        );
        return;
      }

      console.log("Guest details updated successfully:", data);
      window.alert("Guest details updated successfully.");

      router.push("/guest-view");
    } catch (error) {
      console.error("Error during from submission:", error);
      window.alert(
        "An error occurred while submitting the form. Please try again."
      );
      return;
    }
  };

  const onDelete = async () => {
    try {
      const data = await deleteReservationByRoom(
        reservationByRoomId.toString()
      );

      if (!data) {
        console.error("Error deleting guest details");
        window.alert(
          "An error occurred while deleting guest details. Please try again."
        );
        return;
      }
      console.log("Guest details deleted successfully:", data);
      window.alert("Guest details deleted successfully.");

      router.push("/guest-view");
    } catch (error) {
      console.error("Error deleting guest details:", error);
      window.alert(
        "An error occurred while deleting guest details. Please try again."
      );
      return;
    }
  };

  return (
    <ProtectedRoute>
      <div>
        <h1 className="text-2xl font-bold mb-4">Guest Details</h1>
        <GuestForm form={form} onSubmit={onSubmit} onDelete={onDelete} />
      </div>
    </ProtectedRoute>
  );
};

export default GuestDetails;
