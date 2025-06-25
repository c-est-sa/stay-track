import {
  CreateUserDataType,
  SignInDataType,
  UpdateUserDataType,
} from "@/types/api";

export const signIn = async (signInData: SignInDataType) => {
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

export const signOut = async () => {
  try {
    const response = await fetch("/api/auth/signout", {
      method: "POST",
    });

    if (!response.ok) {
      throw new Error("Failed to sign out");
    }

    return await response.json();
  } catch (error) {
    console.error("Error signing out:", error);
    throw error;
  }
};

export const getSession = async () => {
  try {
    const response = await fetch("/api/auth/getSession");

    if (!response.ok) {
      throw new Error("Failed to get session");
    }

    return await response.json();
  } catch (error) {
    console.error("Error getting session:", error);
    throw error;
  }
};

// ADMIN USER SERVICES /////////////////////////////////////

export const createUser = async (userData: CreateUserDataType) => {
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

export const updateUser = async (
  userId: string,
  userData: UpdateUserDataType
) => {
  try {
    const updateUserOnAuthResponse = await fetch(
      `/api/auth/admin/user/${userId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }
    );

    if (!updateUserOnAuthResponse.ok) {
      throw new Error("Failed to update user on Supabase Auth");
    }

    const data = await updateUserOnAuthResponse.json();
    console.log("User updated on Supabase Auth:", data.user);

    const updateUserOnDBResponse = await fetch(`/api/user/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!updateUserOnDBResponse.ok) {
      throw new Error("Failed to update user in database");
    }

    return await updateUserOnDBResponse.json();
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

export const getUserById = async (userId: string) => {
  try {
    const response = await fetch(`/api/user/${userId}`);

    if (!response.ok) {
      throw new Error("Failed to get user");
    }

    return await response.json();
  } catch (error) {
    console.error("Error getting user by ID:", error);
    throw error;
  }
};

export const getAllUsers = async () => {
  try {
    const response = await fetch("/api/user");

    if (!response.ok) {
      throw new Error("Failed to get all users");
    }

    return await response.json();
  } catch (error) {
    console.error("Error getting all users:", error);
    throw error;
  }
};

export const deleteUser = async (userId: string) => {
  try {
    const [adminRes, userRes] = await Promise.all([
      fetch(`/api/auth/admin/user/${userId}`, {
        method: "DELETE",
      }),
      fetch(`/api/user/${userId}`, {
        method: "DELETE",
      }),
    ]);

    if (!adminRes.ok || !userRes.ok) {
      const adminErr = await adminRes.text();
      const userErr = await userRes.text();
      throw new Error(
        `Failed to delete user. Admin: ${adminRes.status} ${adminErr}, User: ${userRes.status} ${userErr}`
      );
    }

    return { success: true, message: "Staff deleted successfully" };
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};
