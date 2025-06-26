import { supabaseAdmin } from "@/lib/supabaseAdminClient";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.email || !body.password || !body.roleId) {
      console.log("Invalid input:", body);
      return Response.json("Invalid input", { status: 400 });
    }

    const { email, password, roleId } = body;
    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      app_metadata: {
        isAdmin: roleId === 1,
      },
    });

    if (error) {
      console.error("Error creating user on Supabase Auth:", error);
      return Response.json("Failed to create user on Supabase Auth", {
        status: 500,
      });
    }

    if (!data) {
      return Response.json("Failed to create user on Supabase Auth", {
        status: 500,
      });
    }

    return Response.json(data, { status: 201 });
  } catch (error) {
    console.error("POST api/auth/admin/createUser:", error);
    return Response.json("Failed to create user on Supabase Auth", {
      status: 500,
    });
  }
}
