import { CreateUserData, SignInData } from "@/types/api";

export const signIn = async (signInData: SignInData) => {
  try {
    const { email, password } = signInData;

    const response = await fetch("/api/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error("Failed to sign in");
    }

    return await response.json();
  } catch (error) {
    console.error("Error signing in:", error);
    throw error;
  }
};

// ADMIN USER SERVICES /////////////////////////////////////

export const createUser = async (userData: CreateUserData) => {
  try {
    const { username, email, password, roleId } = userData;

    const createUserOnAuthResponse = await fetch("/api/auth/admin/createUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!createUserOnAuthResponse.ok) {
      throw new Error("Failed to create user on Supabase Auth");
    }

    const data = await createUserOnAuthResponse.json();
    console.log("User created on Supabase Auth:", data.user);

    const userId = data.user.id;

    const createUserOnDBResponse = await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, username, email, roleId }),
    });

    if (!createUserOnDBResponse.ok) {
      throw new Error("Failed to create user in database");
    }

    return await createUserOnDBResponse.json();
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};
