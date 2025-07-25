import { prisma } from "../../../lib/prismaClient";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.userId || !body.username || !body.email || !body.roleId) {
      console.log("Invalid input:", body);
      return Response.json("Invalid input", { status: 400 });
    }

    const { userId, username, email, roleId } = body;
    const newUser = await prisma.user.create({
      data: {
        userId,
        username,
        email,
        roleId,
      },
    });

    if (!newUser) {
      return Response.json("Failed to create a user", {
        status: 500,
      });
    }

    return Response.json(newUser, { status: 201 });
  } catch (error) {
    console.error("POST api/user:", error);
    return Response.json("Failed to create a user", {
      status: 500,
    });
  }
}

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      include: {
        role: {
          select: {
            roleId: true,
            role: true,
          },
        },
      },
    });

    if (users.length === 0) {
      return Response.json("No users found", { status: 404 });
    } else if (!users) {
      return Response.json("Failed to get users", { status: 500 });
    }

    return Response.json(users, { status: 200 });
  } catch (error) {
    console.error("GET api/user:", error);
    return Response.json("Failed to get users", { status: 500 });
  }
}
