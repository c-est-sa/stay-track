import { Prisma } from "@/lib/generated/prisma/client";

import { ReservationType } from "@/types/db";
import { prisma } from "@/lib/prismaClient";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ reservationId: string }> }
) {
  try {
    const { reservationId } = await params;

    if (!reservationId) {
      return Response.json("Reservation ID is required", { status: 400 });
    }

    const reservation = await prisma.reservation.findUnique({
      where: {
        reservationId,
      },
    });

    if (!reservation) {
      return Response.json("Reservation not found", { status: 404 });
    }

    return Response.json(reservation, { status: 200 });
  } catch (error) {
    console.error("GET api/reservation/[reservationId]:", error);
    return Response.json("Failed to get reservation details", { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ reservationId: string }> }
) {
  try {
    const { reservationId } = await params;

    if (!reservationId) {
      return Response.json("Reservation ID is required", { status: 400 });
    }

    const body = await request.json();

    // pick fields to update
    const reservationDataToUpdate: Partial<ReservationType> = {};
    if (body.reservationName)
      reservationDataToUpdate.reservationName = body.reservationName;
    if (body.checkInDate)
      reservationDataToUpdate.checkInDate = body.checkInDate;
    if (body.checkOutDate)
      reservationDataToUpdate.checkOutDate = body.checkOutDate;
    if (body.reservedRoomName)
      reservationDataToUpdate.reservedRoomName = body.reservedRoomName;
    if (body.numberOfAdults)
      reservationDataToUpdate.numberOfAdults = body.numberOfAdults;
    if (body.numberOfKids)
      reservationDataToUpdate.numberOfKids = body.numberOfKids;
    if (body.reservationInfo)
      reservationDataToUpdate.reservationInfo = body.reservationInfo;
    if (body.paymentCompletionStatus)
      reservationDataToUpdate.paymentCompletionStatus =
        body.paymentCompletionStatus;
    if (body.reservationsByRoom)
      reservationDataToUpdate.reservationsByRoom = body.reservationsByRoom;
    if (body.bookingSiteId)
      reservationDataToUpdate.bookingSiteId = body.bookingSiteId;

    if (Object.keys(reservationDataToUpdate).length === 0) {
      return Response.json("No valid fields to update", { status: 400 });
    }

    const updatedReservation = await prisma.reservation.update({
      where: {
        reservationId,
      },
      data: reservationDataToUpdate as Prisma.ReservationUpdateInput,
    });

    if (!updatedReservation) {
      return Response.json("Failed to update reservation details", {
        status: 500,
      });
    }

    return Response.json(updatedReservation, { status: 200 });
  } catch (error) {
    console.error("PATCH api/reservation/[reservationId]:", error);
    return Response.json("Failed to update reservation details", {
      status: 500,
    });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ reservationId: string }> }
) {
  try {
    const { reservationId } = await params;

    if (!reservationId) {
      return Response.json("Reservation ID is required", { status: 400 });
    }

    const deletedReservation = await prisma.reservation.delete({
      where: {
        reservationId,
      },
    });

    if (!deletedReservation) {
      return Response.json("Failed to delete reservation", { status: 500 });
    }

    return Response.json(deletedReservation, { status: 200 });
  } catch (error) {
    console.error("DELETE api/reservation/[reservationId]:", error);
    return Response.json("Failed to delete reservation", { status: 500 });
  }
}
