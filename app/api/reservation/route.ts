import { prisma } from "../../../lib/prismaClient";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (
      !body.reservationId ||
      !body.reservationName ||
      !body.checkInDate ||
      !body.checkOutDate ||
      !body.reservedRoomName ||
      !body.numberOfAdults ||
      body.numberOfKids < 0 ||
      "paymentCompletionStatus" in body === false ||
      !body.bookingSiteId
    ) {
      console.log("Invalid input:", body);
      return Response.json("Invalid input", { status: 400 });
    }

    const {
      reservationId,
      reservationName,
      checkInDate,
      checkOutDate,
      reservedRoomName,
      numberOfAdults,
      numberOfKids,
      paymentCompletionStatus,
      bookingSiteId,
    } = body;
    const newReservation = await prisma.reservation.create({
      data: {
        reservationId,
        reservationName,
        checkInDate,
        checkOutDate,
        reservedRoomName,
        numberOfAdults,
        numberOfKids,
        paymentCompletionStatus,
        bookingSiteId,
      },
    });

    if (!newReservation) {
      return Response.json("Failed to create a reservation", { status: 500 });
    }

    return Response.json(newReservation, { status: 201 });
  } catch (error) {
    console.error("POST api/reservation:", error);
    return Response.json("Failed to create a reservation", { status: 500 });
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
