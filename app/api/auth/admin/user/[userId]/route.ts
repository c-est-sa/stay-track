import { supabaseAdmin } from "@/lib/supabaseAdminClient";

import { UpdateUserAuthDataType } from "@/types/api";

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
    const userAuthDataToUpdate: UpdateUserAuthDataType = {};
    if (body.email) userAuthDataToUpdate.email = body.email;
    if (body.roleId)
      userAuthDataToUpdate.app_metadata = {
        isAdmin: body.roleId === 1,
      };
    if (body.password) userAuthDataToUpdate.password = body.password;

    if (Object.keys(userAuthDataToUpdate).length === 0) {
      return Response.json("No valid fields to update", { status: 400 });
    }

    const { data: user, error } = await supabaseAdmin.auth.admin.updateUserById(
      userId,
      userAuthDataToUpdate
    );

    if (error) {
      console.error("Error updating user on Supabase Auth:", error);
      return Response.json("Failed to update user on Supabase Auth", {
        status: 500,
      });
    }

    if (!user) {
      return Response.json("Failed to update user on Supabase Auth", {
        status: 500,
      });
    }

    return Response.json(user, { status: 200 });
  } catch (error) {
    console.error("PATCH api/auth/admin/[userId]:", error);
    return Response.json("Failed to update user on Supabase Auth", {
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
      return Response.json("User ID is required", { status: 400 });
    }

    const { data, error } = await supabaseAdmin.auth.admin.deleteUser(userId);

    if (error) {
      console.error("Error deleting user on Supabase Auth:", error);
      return Response.json("Failed to delete user on Supabase Auth", {
        status: 500,
      });
    }

    if (!data) {
      return Response.json("Failed to delete user on Supabase Auth", {
        status: 500,
      });
    }

    return Response.json(data, { status: 200 });
  } catch (error) {
    console.error("DELETE api/auth/admin/user/[userId]:", error);
    return Response.json("Failed to delete user on Supabase Auth", {
      status: 500,
    });
  }
}
