import { supabase } from "@/lib/supabaseClient";

export async function GET() {
  try {
    const { data, error } = await supabase.auth.getSession();

    if (error) {
      console.error("Error getting session:", error);
      return Response.json("Failed to get session", {
        status: 500,
      });
    }

    if (!data) {
      return Response.json("No active session found", {
        status: 404,
      });
    }

    return Response.json(data, { status: 200 });
  } catch (error) {
    console.error("GET api/auth/getSession:", error);
    return Response.json("Failed to get session", {
      status: 500,
    });
  }
}
