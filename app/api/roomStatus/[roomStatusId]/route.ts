// https://nextjs.org/docs/app/building-your-application/routing/route-handlers#dynamic-route-segments

import { prisma } from "../../../../lib/prismaClient";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ roomStatusId: string }> }
) {
  try {
    const { roomStatusId } = await params;

    if (!roomStatusId) {
      return Response.json("Room status ID is required", { status: 400 });
    }

    const roomStatus = await prisma.roomStatus.findUnique({
      where: {
        roomStatusId: parseInt(roomStatusId),
      },
    });

    if (!roomStatus) {
      return Response.json("Room status not found", { status: 404 });
    }

    return Response.json(roomStatus, { status: 200 });
  } catch (error) {
    console.error("GET api/roomStatus/[roomStatusId]:", error);
    return Response.json("Failed to get room status", { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ roomStatusId: string }> }
) {
  try {
    const { roomStatusId } = await params;
    if (!roomStatusId) {
      return Response.json("Room status ID is required", { status: 400 });
    }

    const body = await request.json();
    if (!body.roomStatus) {
      return Response.json("Invalid input", { status: 400 });
    }

    const { roomStatus } = body;
    const updatedRoomStatus = await prisma.roomStatus.update({
      where: {
        roomStatusId: parseInt(roomStatusId),
      },
      data: { roomStatus },
    });

    if (!updatedRoomStatus) {
      return Response.json("Failed to update room status", { status: 500 });
    }

    return Response.json(updatedRoomStatus, { status: 200 });
  } catch (error) {
    console.error("PATCH api/roomStatus/[roomStatusId]:", error);
    return Response.json("Failed to update room status", { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ roomStatusId: string }> }
) {
  try {
    const { roomStatusId } = await params;

    if (!roomStatusId) {
      return Response.json("Room status ID is required", { status: 400 });
    }

    const deletedRoomStatus = await prisma.roomStatus.delete({
      where: {
        roomStatusId: parseInt(roomStatusId),
      },
    });

    if (!deletedRoomStatus) {
      return Response.json("Failed to delete room status", { status: 500 });
    }

    return Response.json(deletedRoomStatus, { status: 200 });
  } catch (error) {
    console.error("DELETE api/roomStatus/[roomStatusId]:", error);
    return Response.json("Failed to delete room status", { status: 500 });
  }
}
