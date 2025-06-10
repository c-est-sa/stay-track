import { Prisma } from "@/lib/generated/prisma/client";

import { prisma } from "@/lib/prismaClient";
import { RoomType } from "@/types/db";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ roomNumber: string }> }
) {
  try {
    const { roomNumber } = await params;

    if (!roomNumber) {
      return Response.json("Room number is required", { status: 400 });
    }

    const room = await prisma.room.findUnique({
      where: {
        roomNumber,
      },
    });

    if (!room) {
      return Response.json("Room not found", { status: 404 });
    }

    return Response.json(room, { status: 200 });
  } catch (error) {
    console.error("GET api/room/[roomNumber]:", error);
    return Response.json("Failed to get room details", { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ roomNumber: string }> }
) {
  try {
    const { roomNumber } = await params;

    if (!roomNumber) {
      return Response.json("Room number is required", { status: 400 });
    }

    const body = await request.json();

    // pick fields to update
    const roomDataToUpdate: Partial<RoomType> = {};
    if (body.roomName) roomDataToUpdate.roomName = body.roomName;
    if (body.roomImageUrl) roomDataToUpdate.roomImageUrl = body.roomImageUrl;
    if (body.maxNumberOfPeople)
      roomDataToUpdate.maxNumberOfPeople = body.maxNumberOfPeople;
    if (body.facilities) roomDataToUpdate.facilities = body.facilities;
    if (body.roomStatusId) roomDataToUpdate.roomStatusId = body.roomStatusId;
    if (body.roomInfo) roomDataToUpdate.roomInfo = body.roomInfo;

    if (Object.keys(roomDataToUpdate).length === 0) {
      return Response.json("No valid fields to update", { status: 400 });
    }

    const updatedRoom = await prisma.room.update({
      where: {
        roomNumber,
      },
      data: roomDataToUpdate as Prisma.RoomUpdateInput,
    });

    if (!updatedRoom) {
      return Response.json("Failed to update room details", { status: 500 });
    }

    return Response.json(updatedRoom, { status: 200 });
  } catch (error) {
    console.error("PATCH api/room/[roomNumber]:", error);
    return Response.json("Failed to update room details", { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ roomNumber: string }> }
) {
  try {
    const { roomNumber } = await params;

    if (!roomNumber) {
      return Response.json("Room number is required", { status: 400 });
    }

    const deletedRoom = await prisma.room.delete({
      where: {
        roomNumber,
      },
    });

    if (!deletedRoom) {
      return Response.json("Failed to delete room", { status: 500 });
    }

    return Response.json(deletedRoom, { status: 200 });
  } catch (error) {
    console.error("DELETE api/room/[roomNumber]:", error);
    return Response.json("Failed to delete room", { status: 500 });
  }
}
