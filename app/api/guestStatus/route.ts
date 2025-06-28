import { prisma } from "../../../lib/prismaClient";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.guestStatus) {
      return Response.json("Invalid input", { status: 400 });
    }

    const { guestStatus } = body;
    const newGuestStatus = await prisma.guestStatus.create({
      data: {
        guestStatus,
      },
    });

    if (!newGuestStatus) {
      return Response.json("Failed to create guest status", { status: 500 });
    }

    return Response.json(newGuestStatus, { status: 201 });
  } catch (error) {
    console.error("POST api/guestStatus:", error);
    return Response.json("Failed to create guest status", { status: 500 });
  }
}

export async function GET() {
  try {
    const guestStatusAll = await prisma.guestStatus.findMany();

    if (guestStatusAll.length === 0) {
      return Response.json("No guest statuses found", { status: 404 });
    } else if (!guestStatusAll) {
      return Response.json("Failed to get guest statuses", { status: 500 });
    }

    return Response.json(guestStatusAll, { status: 200 });
  } catch (error) {
    console.error("GET api/guestStatus:", error);
    return Response.json("Failed to get guest statuses", { status: 500 });
  }
}
