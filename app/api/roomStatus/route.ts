import { prisma } from "../../../lib/prismaClient";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.roomStatus) {
      return Response.json("Invalid input", { status: 400 });
    }

    const { roomStatus } = body;
    const newRoomStatus = await prisma.roomStatus.create({
      data: {
        roomStatus,
      },
    });

    if (!newRoomStatus) {
      return Response.json("Failed to create room status", { status: 500 });
    }

    return Response.json(newRoomStatus, { status: 201 });
  } catch (error) {
    console.error("POST api/roomStatus:", error);
    return Response.json("Failed to create room status", { status: 500 });
  }
}

export async function GET() {
  try {
    const roomStatusAll = await prisma.roomStatus.findMany();

    if (roomStatusAll.length === 0) {
      return Response.json("No room statuses found", { status: 404 });
    } else if (!roomStatusAll) {
      return Response.json("Failed to get room statuses", { status: 500 });
    }

    return Response.json(roomStatusAll, { status: 200 });
  } catch (error) {
    console.error("GET api/roomStatus:", error);
    return Response.json("Failed to get room statuses", { status: 500 });
  }
}
