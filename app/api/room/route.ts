import { prisma } from "../../../lib/prismaClient";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (
      !body.roomNumber ||
      !body.roomName ||
      !body.roomImageUrl ||
      !body.maxNumberOfPeople ||
      !body.facilities
    ) {
      return Response.json("Invalid input", { status: 400 });
    }

    const {
      roomNumber,
      roomName,
      roomImageUrl,
      maxNumberOfPeople,
      facilities,
    } = body;
    const newRoom = await prisma.room.create({
      data: {
        roomNumber,
        roomName,
        roomImageUrl,
        maxNumberOfPeople,
        facilities,
      },
    });

    if (!newRoom) {
      return Response.json("Failed to create a room", { status: 500 });
    }

    return Response.json(newRoom, { status: 201 });
  } catch (error) {
    console.error("POST api/room:", error);
    return Response.json("Failed to create a room", { status: 500 });
  }
}

export async function GET() {
  try {
    const rooms = await prisma.room.findMany();

    if (rooms.length === 0) {
      return Response.json("No rooms found", { status: 404 });
    } else if (!rooms) {
      return Response.json("Failed to get rooms", { status: 500 });
    }

    return Response.json(rooms, { status: 200 });
  } catch (error) {
    console.error("GET api/room:", error);
    return Response.json("Failed to get rooms", { status: 500 });
  }
}
