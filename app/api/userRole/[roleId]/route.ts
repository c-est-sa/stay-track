import { prisma } from "../../../../lib/prismaClient";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ roleId: string }> }
) {
  try {
    const { roleId } = await params;

    if (!roleId) {
      return Response.json("Role ID is required", { status: 400 });
    }

    const role = await prisma.userRole.findUnique({
      where: {
        roleId: parseInt(roleId),
      },
    });

    if (!role) {
      return Response.json("Role not found", { status: 404 });
    }

    return Response.json(role, { status: 200 });
  } catch (error) {
    console.error("GET api/userRole/[roleId]:", error);
    return Response.json("Failed to get role", { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ roleId: string }> }
) {
  try {
    const { roleId } = await params;
    if (!roleId) {
      return Response.json("Role ID is required", { status: 400 });
    }

    const body = await request.json();
    if (!body.role) {
      return Response.json("Invalid input", { status: 400 });
    }

    const { role } = body;
    const updatedRole = await prisma.userRole.update({
      where: {
        roleId: parseInt(roleId),
      },
      data: { role },
    });

    if (!updatedRole) {
      return Response.json("Failed to update role", { status: 500 });
    }

    return Response.json(updatedRole, { status: 200 });
  } catch (error) {
    console.error("PATCH api/userRole/[roleId]:", error);
    return Response.json("Failed to update role", { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ roleId: string }> }
) {
  try {
    const { roleId } = await params;

    if (!roleId) {
      return Response.json("Role ID is required", { status: 400 });
    }

    const deletedRole = await prisma.userRole.delete({
      where: {
        roleId: parseInt(roleId),
      },
    });

    if (!deletedRole) {
      return Response.json("Failed to delete role", { status: 500 });
    }

    return Response.json(deletedRole, { status: 200 });
  } catch (error) {
    console.error("DELETE api/userRole/[roleId]:", error);
    return Response.json("Failed to delete role", { status: 500 });
  }
}
