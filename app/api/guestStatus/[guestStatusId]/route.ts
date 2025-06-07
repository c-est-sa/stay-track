import { prisma } from "../../../../lib/prismaClient";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ guestStatusId: string }> }
) {
  try {
    const { guestStatusId } = await params;

    if (!guestStatusId) {
      return Response.json("Guest status ID is required", { status: 400 });
    }

    const guestStatus = await prisma.guestStatus.findUnique({
      where: {
        guestStatusId: parseInt(guestStatusId),
      },
    });

    if (!guestStatus) {
      return Response.json("Guest status not found", { status: 404 });
    }

    return Response.json(guestStatus, { status: 200 });
  } catch (error) {
    console.error("GET api/guestStatus/[guestStatusId]:", error);
    return Response.json("Failed to get guest status", { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ guestStatusId: string }> }
) {
  try {
    const { guestStatusId } = await params;
    if (!guestStatusId) {
      return Response.json("Guest status ID is required", { status: 400 });
    }

    const body = await request.json();
    if (!body.guestStatus) {
      return Response.json("Invalid input", { status: 400 });
    }

    const { guestStatus } = body;
    const updatedGuestStatus = await prisma.guestStatus.update({
      where: {
        guestStatusId: parseInt(guestStatusId),
      },
      data: { guestStatus },
    });

    if (!updatedGuestStatus) {
      return Response.json("Failed to update guest status", { status: 500 });
    }

    return Response.json(updatedGuestStatus, { status: 200 });
  } catch (error) {
    console.error("PATCH api/guestStatus/[guestStatusId]:", error);
    return Response.json("Failed to update guest status", { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ guestStatusId: string }> }
) {
  try {
    const { guestStatusId } = await params;

    if (!guestStatusId) {
      return Response.json("Guest status ID is required", { status: 400 });
    }

    const deletedGuestStatus = await prisma.guestStatus.delete({
      where: {
        guestStatusId: parseInt(guestStatusId),
      },
    });

    if (!deletedGuestStatus) {
      return Response.json("Failed to delete guest status", { status: 500 });
    }

    return Response.json(deletedGuestStatus, { status: 200 });
  } catch (error) {
    console.error("DELETE api/guestStatus/[guestStatusId]:", error);
    return Response.json("Failed to delete guest status", { status: 500 });
  }
}
