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
