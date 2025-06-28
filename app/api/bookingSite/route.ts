import { prisma } from "../../../lib/prismaClient";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.bookingSiteName) {
      return Response.json("Invalid input", { status: 400 });
    }

    const { bookingSiteName } = body;
    const newBookingSite = await prisma.bookingSite.create({
      data: {
        bookingSiteName,
      },
    });

    if (!newBookingSite) {
      return Response.json("Failed to create booking site", { status: 500 });
    }

    return Response.json(newBookingSite, { status: 201 });
  } catch (error) {
    console.error("POST api/bookingSite:", error);
    return Response.json("Failed to create booking site", { status: 500 });
  }
}

export async function GET() {
  try {
    const bookingSiteAll = await prisma.bookingSite.findMany();

    if (bookingSiteAll.length === 0) {
      return Response.json("No booking sites found", { status: 404 });
    } else if (!bookingSiteAll) {
      return Response.json("Failed to get booking sites", { status: 500 });
    }

    return Response.json(bookingSiteAll, { status: 200 });
  } catch (error) {
    console.error("GET api/bookingSite:", error);
    return Response.json("Failed to get booking sites", { status: 500 });
  }
}
