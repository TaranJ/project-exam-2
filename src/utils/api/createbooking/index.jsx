import { load } from "../../storage/load";

export const createBooking = async ({ dateFrom, dateTo, guests, venueId }) => {
  const URL = `${import.meta.env.VITE_APIBase}holidaze/bookings`;

  const token = load("token");
  const apiKey = import.meta.env.VITE_APIKey;

  if (!token) {
    throw new Error("Token is missing. Please log in.");
  }

  try {
    const response = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": apiKey,
      },
      body: JSON.stringify({
        dateFrom: dateFrom.toISOString(),
        dateTo: dateTo.toISOString(),
        guests,
        venueId,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to create booking");
    }

    const result = await response.json();
    console.log("Booking created:", result);
    return result;
  } catch (error) {
    console.error("Error creating booking:", error);
    throw error;
  }
};
