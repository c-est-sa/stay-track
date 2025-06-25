import { supabase } from "@/lib/supabaseClient";

export async function POST() {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Error signing out:", error);
      return Response.json("Failed to sign out", {
        status: 500,
      });
    }

    return Response.json("Signed out successfully", {
      status: 200,
    });
  } catch (error) {
    console.error("POST api/auth/signout:", error);
    return Response.json("Failed to sign out", {
      status: 500,
    });
  }
}
