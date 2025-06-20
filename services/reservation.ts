export const getReservationsForViewTable = async (checkIn: string) => {
  try {
    const response = await fetch(
      `/api/reservationForViewTable?checkIn=${checkIn}`
    );

    if (response.status === 404) {
      return [];
    } else if (!response.ok) {
      throw new Error("Failed to get reservations for View table");
    }

    return await response.json();
  } catch (error) {
    console.error("Error getting reservations by rooms:", error);
    throw error;
  }
};

export const getGuestDetails = async (reservationByRoomId: string) => {
  try {
    const response = await fetch(`/api/guestDetails/${reservationByRoomId}`);

    if (!response.ok) {
      throw new Error("Failed to get guest details");
    }

    return await response.json();
  } catch (error) {
    console.error("Error getting guest details:", error);
    throw error;
  }
};
