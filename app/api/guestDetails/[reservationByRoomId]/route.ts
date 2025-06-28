import { prisma } from "@/lib/prismaClient";

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

    const reservation = await prisma.reservationByRoom.findUnique({
      where: {
        reservationByRoomId,
      },
      omit: { createdAt: true, updatedAt: true },
      include: {
        reservation: {
          select: {
            checkInDate: true,
            checkOutDate: true,
            reservationInfo: true,
            paymentCompletionStatus: true,
            bookingSite: {
              select: {
                bookingSiteId: true,
                bookingSiteName: true,
              },
            },
          },
        },
        room: {
          select: {
            roomStatus: true,
          },
        },
        guestStatus: {
          select: {
            guestStatusId: true,
            guestStatus: true,
          },
        },
      },
    });

    if (!reservation) {
      return Response.json("Reservation not found", { status: 404 });
    }

    return Response.json(reservation, { status: 200 });
  } catch (error) {
    console.error("GET api/guestDetails/[reservationByRoomId]:", error);
    return Response.json("Failed to get guest details", {
      status: 500,
    });
  }
}
