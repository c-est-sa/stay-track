import { prisma } from "../../../lib/prismaClient";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.role) {
      return Response.json("Invalid input", { status: 400 });
    }

    const { role } = body;
    const newRole = await prisma.userRole.create({
      data: {
        role,
      },
    });

    if (!newRole) {
      return Response.json("Failed to create role", { status: 500 });
    }

    return Response.json(newRole, { status: 201 });
  } catch (error) {
    console.error("POST api/userRole:", error);
    return Response.json("Failed to create role", { status: 500 });
  }
}

export async function GET() {
  try {
    const roles = await prisma.userRole.findMany();

    if (roles.length === 0) {
      return Response.json("No roles found", { status: 404 });
    } else if (!roles) {
      return Response.json("Failed to get roles", { status: 500 });
    }

    return Response.json(roles, { status: 200 });
  } catch (error) {
    console.error("GET api/userRole:", error);
    return Response.json("Failed to get roles", { status: 500 });
  }
}
