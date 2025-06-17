import { prisma } from "../../../lib/prismaClient";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const searchParams = url.searchParams;
    const checkIn = searchParams.get("checkIn"); //YYYY-MM-DD

    if (!checkIn) {
      return Response.json("Check-in date parameter is required", {
        status: 400,
      });
    }

    const checkInDate = new Date(checkIn);
    checkInDate.setHours(0, 0, 0, 0);
    const theDayAfter = new Date(checkInDate);
    theDayAfter.setDate(checkInDate.getDate() + 1);

    const reservations = await prisma.reservationByRoom.findMany({
      where: {
        reservation: {
          is: {
            checkInDate: {
              gte: checkInDate,
              lt: theDayAfter,
            },
          },
        },
      },
      omit: { reservationId: true, createdAt: true, updatedAt: true },
      include: {
        reservation: {
          select: {
            checkInDate: true,
            checkOutDate: true,
            reservationInfo: true,
            paymentCompletionStatus: true,
          },
        },
        room: {
          select: {
            roomStatus: true,
          },
        },
      },
    });

    if (reservations.length === 0) {
      return Response.json("No reservations found", { status: 404 });
    } else if (!reservations) {
      return Response.json("Failed to get reservations for View Table", {
        status: 500,
      });
    }

    return Response.json(reservations, { status: 200 });
  } catch (error) {
    console.error("GET api/reservationForViewTable?checkIn:", error);
    return Response.json("Failed to get reservations for View Table", {
      status: 500,
    });
  }
}
