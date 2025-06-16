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

    return { message: "Signed out successfully" };
  } catch (error) {
    console.error("POST api/auth/signout:", error);
    return Response.json("Failed to sign out", {
      status: 500,
    });
  }
}
