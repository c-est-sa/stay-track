import { supabase, supabaseAdmin } from "@/lib/supabaseClient";

export const signIn = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    return data;
  } catch (error) {
    console.error("Error signing in:", error);
    throw error;
  }
};

export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) throw error;

    return { message: "Signed out successfully" };
  } catch (error) {
    console.error("Error signing out:", error);
    throw error;
  }
};

// get currently signed-in user on the server
export const getUser = async () => {
  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error) throw error;

    return user;
  } catch (error) {
    console.error("Error getting user:", error);
    throw error;
  }
};

// get currently signed-in user on the client
export const getSession = async () => {
  try {
    const { data, error } = await supabase.auth.getSession();

    if (error) throw error;

    return data;
  } catch (error) {
    console.error("Error getting session:", error);
    throw error;
  }
};

// Admin - these should be used on the server /////////////////

export const getUserById = async (userId: string) => {
  try {
    const { data, error } = await supabaseAdmin.auth.admin.getUserById(userId);

    if (error) throw error;

    return data;
  } catch (error) {
    console.error("Error gettin user by ID:", error);
    throw error;
  }
};

export const listAllUsers = async () => {
  try {
    const {
      data: { users },
      error,
    } = await supabaseAdmin.auth.admin.listUsers();

    if (error) throw error;

    return users;
  } catch (error) {
    console.error("Error listing all uesrs:", error);
    throw error;
  }
};

export const createUser = async (email: string, password: string) => {
  try {
    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email,
      email_confirm: true,
      password,
    });

    if (error) throw error;

    return data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

export const deleteUser = async (userId: string) => {
  try {
    const { data, error } = await supabaseAdmin.auth.admin.deleteUser(userId);

    if (error) throw error;

    return data;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

export const sendEmailInviteLink = async (email: string) => {
  try {
    const { data, error } = await supabaseAdmin.auth.admin.inviteUserByEmail(
      email
    );

    if (error) throw error;

    return data;
  } catch (error) {
    console.error("Error sending email invite link:", error);
    throw error;
  }
};

export const updateUser = async (userId: string, newEmail: string) => {
  try {
    const { data: user, error } = await supabaseAdmin.auth.admin.updateUserById(
      userId,
      { email: newEmail }
    );

    if (error) throw error;

    return user;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};
