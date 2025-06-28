import { supabase } from "@/lib/supabaseClient";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.email || !body.password) {
      console.log("Invalid input:", body);
      return Response.json("Invalid input", { status: 400 });
    }

    const { email, password } = body;

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Error signing in:", error);
      return Response.json("Failed to sign in", {
        status: 500,
      });
    }

    if (!data) {
      return Response.json("Failed to get signed-in user's data", {
        status: 500,
      });
    }

    return Response.json(data, { status: 201 });
  } catch (error) {
    console.error("POST api/auth/signin:", error);
    return Response.json("Failed to sign in", {
      status: 500,
    });
  }
}
