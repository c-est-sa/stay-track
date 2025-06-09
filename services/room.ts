import {
  CreateRoomData,
  UpdateRoomData,
  CreateRoomStatusData,
} from "../types/api";

// ROOM SERVICES /////////////////////////////////////

export const createRoom = async (roomData: CreateRoomData) => {
  try {
    const response = await fetch("/api/room", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(roomData),
    });

    if (!response.ok) {
      throw new Error("Failed to create room");
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating room:", error);
    throw error;
  }
};

export const getRooms = async () => {
  try {
    const response = await fetch("/api/room");

    if (!response.ok) {
      throw new Error("Failed to get rooms");
    }

    return await response.json();
  } catch (error) {
    console.error("Error getting rooms:", error);
    throw error;
  }
};

export const getRoomByRoomNumber = async (roomNumber: string) => {
  try {
    const response = await fetch(`/api/room/${roomNumber}`);

    if (!response.ok) {
      throw new Error("Failed to get room by room number");
    }

    return await response.json();
  } catch (error) {
    console.error("Error getting room by room number:", error);
    throw error;
  }
};

export const updateRoom = async (
  roomNumber: string,
  roomData: UpdateRoomData
) => {
  try {
    const response = await fetch(`/api/room/${roomNumber}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(roomData),
    });

    if (!response.ok) {
      throw new Error("Failed to update room");
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating room:", error);
    throw error;
  }
};

export const deleteRoom = async (roomNumber: string) => {
  try {
    const response = await fetch(`/api/room/${roomNumber}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete room");
    }

    return await response.json();
  } catch (error) {
    console.error("Error deleting room:", error);
    throw error;
  }
};

//
// ROOM STATUS SERVICES //////////////////////////////////////

export const createRoomStatus = async (
  roomStatusData: CreateRoomStatusData
) => {
  try {
    const response = await fetch("/api/roomStaus", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(roomStatusData),
    });

    if (!response.ok) {
      throw new Error("Failed to create room status");
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating room status:", error);
    throw error;
  }
};

export const getRoomStatusSettings = async () => {
  try {
    const response = await fetch("/api/roomStatus");

    if (!response.ok) {
      throw new Error("Failed to get room status settings");
    }

    return await response.json();
  } catch (error) {
    console.error("Error getting room status settings:", error);
    throw error;
  }
};

export const getRoomStatusSettingById = async (roomStatusId: number) => {
  try {
    const response = await fetch(`/api/roomStatus/${roomStatusId}`);

    if (!response.ok) {
      throw new Error("Failed to get room status setting by ID");
    }

    return await response.json();
  } catch (error) {
    console.error("Error getting room status setting by ID:", error);
    throw error;
  }
};

export const updateRoomStatusSetting = async (
  roomStatusId: number,
  roomStatusData: CreateRoomStatusData
) => {
  try {
    const response = await fetch(`/api/room/${roomStatusId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(roomStatusData),
    });

    if (!response.ok) {
      throw new Error("Failed to update room status setting");
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating room status setting:", error);
    throw error;
  }
};

export const deleteRoomStatus = async (roomStatusId: number) => {
  try {
    const response = await fetch(`/api/room/${roomStatusId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete room status");
    }

    return await response.json();
  } catch (error) {
    console.error("Error deleting room status:", error);
    throw error;
  }
};
