import { Prisma } from "@/lib/generated/prisma/client";

import { prisma } from "../../../../lib/prismaClient";
import { UserType } from "@/types/db";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await params;

    if (!userId) {
      return Response.json("User ID is required", {
        status: 400,
      });
    }

    const user = await prisma.user.findUnique({
      where: {
        userId,
      },
    });

    if (!user) {
      return Response.json("User not found", { status: 404 });
    }

    return Response.json(user, { status: 200 });
  } catch (error) {
    console.error("GET api/user/[userId]:", error);
    return Response.json("Failed to get user", {
      status: 500,
    });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await params;

    if (!userId) {
      return Response.json("User ID is required", {
        status: 400,
      });
    }

    const body = await request.json();

    // pick fields to update
    const userDataToUpdate: Partial<UserType> = {};
    if (body.username) userDataToUpdate.username = body.username;
    if (body.email) userDataToUpdate.email = body.email;
    if (body.roleId) userDataToUpdate.roleId = body.roleId;

    if (Object.keys(userDataToUpdate).length === 0) {
      return Response.json("No valid fields to update", { status: 400 });
    }

    const updatedUser = await prisma.user.update({
      where: {
        userId,
      },
      data: userDataToUpdate as Prisma.UserUpdateInput,
    });

    if (!updatedUser) {
      return Response.json("Failed to update user details", {
        status: 500,
      });
    }

    return Response.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error("PATCH api/user/[userId]:", error);
    return Response.json("Failed to update user details", {
      status: 500,
    });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await params;

    if (!userId) {
      return Response.json("User ID is required", {
        status: 400,
      });
    }

    const deletedUser = await prisma.user.delete({
      where: {
        userId,
      },
    });

    if (!deletedUser) {
      return Response.json("Failed to delete user", {
        status: 500,
      });
    }

    return Response.json(deletedUser, { status: 200 });
  } catch (error) {
    console.error("DELETE api/user/[userId]:", error);
    return Response.json("Failed to delete user", {
      status: 500,
    });
  }
}
