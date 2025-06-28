import { prisma } from "../../../../lib/prismaClient";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ bookingSiteId: string }> }
) {
  try {
    const { bookingSiteId } = await params;

    if (!bookingSiteId) {
      return Response.json("Booking site ID is required", { status: 400 });
    }

    const bookingSite = await prisma.bookingSite.findUnique({
      where: {
        bookingSiteId: parseInt(bookingSiteId),
      },
    });

    if (!bookingSite) {
      return Response.json("Booking site not found", { status: 404 });
    }

    return Response.json(bookingSite, { status: 200 });
  } catch (error) {
    console.error("GET api/bookingSite/[bookingSiteId]:", error);
    return Response.json("Failed to get booking site", { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ bookingSiteId: string }> }
) {
  try {
    const { bookingSiteId } = await params;
    if (!bookingSiteId) {
      return Response.json("Booking site ID is required", { status: 400 });
    }

    const body = await request.json();
    if (!body.bookingSiteName) {
      return Response.json("Invalid input", { status: 400 });
    }

    const { bookingSiteName } = body;
    const updatedBookingSite = await prisma.bookingSite.update({
      where: {
        bookingSiteId: parseInt(bookingSiteId),
      },
      data: { bookingSiteName },
    });

    if (!updatedBookingSite) {
      return Response.json("Failed to update booking site", { status: 500 });
    }

    return Response.json(updatedBookingSite, { status: 200 });
  } catch (error) {
    console.error("PATCH api/bookingSite/[bookingSiteId]:", error);
    return Response.json("Failed to update booking site", { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ bookingSiteId: string }> }
) {
  try {
    const { bookingSiteId } = await params;

    if (!bookingSiteId) {
      return Response.json("Booking site ID is required", { status: 400 });
    }

    const deletedBookingSite = await prisma.bookingSite.delete({
      where: {
        bookingSiteId: parseInt(bookingSiteId),
      },
    });

    if (!deletedBookingSite) {
      return Response.json("Failed to delete booking site", { status: 500 });
    }

    return Response.json(deletedBookingSite, { status: 200 });
  } catch (error) {
    console.error("DELETE api/bookingSite/[bookingSiteId]:", error);
    return Response.json("Failed to delete booking site", { status: 500 });
  }
}
