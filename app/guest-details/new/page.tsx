"use client";

import GuestForm, { GuestFormSchema } from "@/components/form/GuestForm";
import { createGuestDetails } from "@/services/reservation";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const GuestDetailsNew = () => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const form = useForm<z.infer<typeof GuestFormSchema>>({
    resolver: zodResolver(GuestFormSchema),
    defaultValues: {
      guestName: "",
      checkInDate: today,
      checkOutDate: tomorrow,
      numberOfAdults: 1,
      numberOfKids: 0,
      roomNumber: "",
      guestStatus: 1,
      reservationInfo: "",
      reservationId:
        today.toISOString().split("T")[0] +
        "-" +
        today.toISOString().split("T")[1].split(":")[0] +
        "-" +
        today.toISOString().split("T")[1].split(":")[1] +
        "-" +
        today.toISOString().split("T")[1].split(".")[0].split(":")[2],
      bookingSite: 4,
      paymentCompletionStatus: false,
    },
  });

  const onSubmit = async (values: z.infer<typeof GuestFormSchema>) => {
    try {
      const formattedValues = {
        ...values,
        // checkInDate: values.checkInDate.toISOString(),
        // checkOutDate: values.checkOutDate.toISOString(),
        reservedRoomName: [values.roomNumber],
        reservationName: values.guestName,
        bookingSiteId: values.bookingSite,
      };

      console.log("Submitting guest details:", formattedValues);

      const reseponse = await createGuestDetails(formattedValues);
      console.log("Guest details created successfully:", reseponse);
      window.alert("Guest details created successfully.");
    } catch (error) {
      console.error("Error submitting guest details:", error);
      window.alert(
        "An error occurred while submitting guest details. Please try again."
      );
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Create Guest Details</h1>
      <GuestForm form={form} onSubmit={onSubmit} isNewCreation={true} />
    </>
  );
};

export default GuestDetailsNew;
