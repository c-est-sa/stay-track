import { prisma } from "../../../lib/prismaClient";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (
      !body.reservationByRoomId ||
      !body.roomNumber ||
      !body.reservationId ||
      !body.guestName ||
      !body.numberOfAdults ||
      body.numberOfKids < 0
    ) {
      console.log("Invalid input:", body);
      return Response.json("Invalid input", { status: 400 });
    }

    const {
      reservationByRoomId,
      roomNumber,
      reservationId,
      guestName,
      numberOfAdults,
      numberOfKids,
    } = body;
    const newReservationByRoom = await prisma.reservationByRoom.create({
      data: {
        reservationByRoomId,
        roomNumber,
        reservationId,
        guestName,
        numberOfAdults,
        numberOfKids,
      },
    });

    if (!newReservationByRoom) {
      return Response.json("Failed to create a reservationByRoom", {
        status: 500,
      });
    }

    return Response.json(newReservationByRoom, { status: 201 });
  } catch (error) {
    console.error("POST api/reservationByRoom:", error);
    return Response.json("Failed to create a reservationByRoom", {
      status: 500,
    });
  }
}

export async function GET() {
  try {
    const reservations = await prisma.reservation.findMany();

    if (reservations.length === 0) {
      return Response.json("No reservations found", { status: 404 });
    } else if (!reservations) {
      return Response.json("Failed to get reservations", { status: 500 });
    }

    return Response.json(reservations, { status: 200 });
  } catch (error) {
    console.error("GET api/reservation:", error);
    return Response.json("Failed to get reservations", { status: 500 });
  }
}
