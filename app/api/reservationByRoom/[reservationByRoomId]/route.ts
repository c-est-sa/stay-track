import { prisma } from "../../../../lib/prismaClient";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ reservationByRoomId: string }> }
) {
  try {
    const { reservationByRoomId } = await params;

    if (!reservationByRoomId) {
      return Response.json("Reservation by room ID is required", {
        status: 400,
      });
    }

    const reservationByRoom = await prisma.reservationByRoom.findUnique({
      where: {
        reservationByRoomId,
      },
    });

    if (!reservationByRoom) {
      return Response.json("Reservation by room not found", { status: 404 });
    }

    return Response.json(reservationByRoom, { status: 200 });
  } catch (error) {
    console.error("GET api/reservationByRoom/[reservationByRoomId]:", error);
    return Response.json("Failed to get reservation by room details", {
      status: 500,
    });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ reservationByRoomId: string }> }
) {
  try {
    const { reservationByRoomId } = await params;

    if (!reservationByRoomId) {
      return Response.json("Reservation by room ID is required", {
        status: 400,
      });
    }

    const body = await request.json();

    // pick fields to update
    const reservationByRoomDataToUpdate: any = {};
    if (body.roomNumber)
      reservationByRoomDataToUpdate.roomNumber = body.roomNumber;
    if (body.reservationId)
      reservationByRoomDataToUpdate.reservationId = body.reservationId;
    if (body.guestName)
      reservationByRoomDataToUpdate.guestName = body.guestName;
    if (body.numberOfAdults)
      reservationByRoomDataToUpdate.numberOfAdults = body.numberOfAdults;
    if (body.numberOfKids)
      reservationByRoomDataToUpdate.numberOfKids = body.numberOfKids;
    if (body.guestStatusId)
      reservationByRoomDataToUpdate.guestStatusId = body.guestStatusId;
    if (body.restaurantTimeId)
      reservationByRoomDataToUpdate.restaurantTimeId = body.restaurantTimeId;
    if (body.restaurantTableId)
      reservationByRoomDataToUpdate.restaurantTableId = body.restaurantTableId;

    if (Object.keys(reservationByRoomDataToUpdate).length === 0) {
      return Response.json("No valid fields to update", { status: 400 });
    }

    const updatedReservationByRoom = await prisma.reservationByRoom.update({
      where: {
        reservationByRoomId,
      },
      data: reservationByRoomDataToUpdate,
    });

    if (!updatedReservationByRoom) {
      return Response.json("Failed to update reservation by room details", {
        status: 500,
      });
    }

    return Response.json(updatedReservationByRoom, { status: 200 });
  } catch (error) {
    console.error("PATCH api/reservationByRoom/[reservationByRoomId]:", error);
    return Response.json("Failed to update reservation by room details", {
      status: 500,
    });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ reservationByRoomId: string }> }
) {
  try {
    const { reservationByRoomId } = await params;

    if (!reservationByRoomId) {
      return Response.json("Reservation by room ID is required", {
        status: 400,
      });
    }

    const deletedReservationByRoom = await prisma.reservationByRoom.delete({
      where: {
        reservationByRoomId,
      },
    });

    if (!deletedReservationByRoom) {
      return Response.json("Failed to delete reservation by room", {
        status: 500,
      });
    }

    return Response.json(deletedReservationByRoom, { status: 200 });
  } catch (error) {
    console.error("DELETE api/reservation/[reservationByRoomId]:", error);
    return Response.json("Failed to delete reservation by room", {
      status: 500,
    });
  }
}
