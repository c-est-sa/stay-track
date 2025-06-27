import {
  UpdateReservationDataType,
  UpdateReservationByRoomDataType,
  UpdateGuestDetailsDataType,
  CreateReservationDataType,
  CreateReservationByRoomDataType,
  CreateGuestDetailsDataType,
} from "@/types/api";

// RESERVATION SERVICES BASIC /////////////////////////////////////

export const createReservation = async (
  reservationData: CreateReservationDataType
) => {
  try {
    const response = await fetch("/api/reservation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reservationData),
    });

    if (!response.ok) {
      throw new Error("Failed to create reservation");
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating reservation:", error);
    throw error;
  }
};

export const updateReservation = async (
  reservationId: string,
  reservationData: UpdateReservationDataType
) => {
  try {
    const response = await fetch(`/api/reservation/${reservationId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reservationData),
    });

    if (!response.ok) {
      throw new Error("Failed to update reservation");
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating reservation:", error);
    throw error;
  }
};

export const deleteReservation = async (reservationId: string) => {
  try {
    const response = await fetch(`/api/reservation/${reservationId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete reservation");
    }

    return await response.json();
  } catch (error) {
    console.error("Error deleting reservation:", error);
    throw error;
  }
};

// RESERVATION BY ROOM SERVICES BASIC /////////////////////////////////////

export const createReservationByRoom = async (
  reservationByRoomData: CreateReservationByRoomDataType
) => {
  try {
    const response = await fetch("/api/reservationByRoom", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reservationByRoomData),
    });

    if (!response.ok) {
      throw new Error("Failed to create reservation by room");
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating reservation by room:", error);
    throw error;
  }
};

export const updateReservationByRoom = async (
  reservationByRoomId: string,
  reservationByRoomIdData: UpdateReservationByRoomDataType
) => {
  try {
    const response = await fetch(
      `/api/reservationByRoom/${reservationByRoomId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reservationByRoomIdData),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update reservation by room");
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating reservation by room:", error);
    throw error;
  }
};

export const deleteReservationByRoom = async (reservationByRoomId: string) => {
  try {
    const response = await fetch(
      `/api/reservationByRoom/${reservationByRoomId}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to delete reservation by room");
    }

    return await response.json();
  } catch (error) {
    console.error("Error deleting reservation by room:", error);
    throw error;
  }
};

// PAGE SPECIFIC SERVICES /////////////////////////////////////

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

export const createGuestDetails = async (
  dataToPost: CreateGuestDetailsDataType
) => {
  try {
    const {
      // reservation
      reservationId,
      // reservationName,
      checkInDate,
      checkOutDate,
      reservedRoomName,
      numberOfAdults,
      numberOfKids,
      // reservationInfo,
      paymentCompletionStatus,
      // reservationsByRoom,
      bookingSiteId: bookingSite,

      // reservationByRoom
      // reservationByRoomId,
      roomNumber,
      // reservationId,
      guestName,
      // numberOfAdults,
      // numberOfKids,
    } = dataToPost;

    const reservationData = {
      reservationId,
      reservationName: guestName,
      checkInDate,
      checkOutDate,
      reservedRoomName,
      numberOfAdults,
      numberOfKids,
      paymentCompletionStatus,
      bookingSiteId: bookingSite,
    };

    const reservationByRoomData = {
      reservationByRoomId: reservationId,
      roomNumber,
      reservationId,
      guestName,
      numberOfAdults,
      numberOfKids,
    };

    console.log(
      "reservationByRoomData from reservation.ts:",
      reservationByRoomData
    );

    // await Promise.all([
    //   createReservation(reservationData),
    //   createReservationByRoom(reservationByRoomData),
    // ]);

    await createReservation(reservationData);
    await createReservationByRoom(reservationByRoomData);

    return { success: true, message: "Guest details created successfully" };
  } catch (error) {
    console.error("Error creating guest details:", error);
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

export const updateGuestDetails = async (
  reservationByRoomId: string,
  dataToUpdate: UpdateGuestDetailsDataType
) => {
  try {
    const {
      reservationId,

      // reservation
      // reservationName,
      checkInDate,
      checkOutDate,
      // reservedRoomName,
      numberOfAdults,
      numberOfKids,
      reservationInfo,
      paymentCompletionStatus,
      // reservationsByRoom,
      bookingSiteId,

      // reservationByRoom
      roomNumber,
      guestName,
      guestStatusId,
      // numberOfAdults,
      // numberOfKids,
    } = dataToUpdate;

    if (!reservationId) {
      throw new Error("Reservation ID is required");
    }

    const reservationData = {
      checkInDate,
      checkOutDate,
      numberOfAdults,
      numberOfKids,
      reservationInfo,
      paymentCompletionStatus,
      bookingSiteId,
    };

    const reservationByRoomData = {
      roomNumber,
      guestName,
      guestStatusId,
      numberOfAdults,
      numberOfKids,
    };

    const clean = <T extends object>(obj: T): Partial<T> =>
      Object.fromEntries(
        Object.entries(obj).filter(([, value]) => value !== undefined)
      ) as Partial<T>;

    console.log("reservationData:", reservationData);
    console.log("reservationData cleaned:", clean(reservationData));

    await Promise.all([
      updateReservation(reservationId, clean(reservationData)),
      updateReservationByRoom(
        reservationByRoomId,
        clean(reservationByRoomData)
      ),
    ]);

    return { success: true, message: "Guest details updated successfully" };
  } catch (error) {
    console.error("Error updating guest details:", error);
    throw error;
  }
};

export const deleteGuestDetails = async () => {};
