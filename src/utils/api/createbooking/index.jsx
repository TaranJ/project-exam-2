import { load } from "../../storage/load";
import { fetchData } from "..";

/**
 * Creates a booking by sending a POST request to the bookings API with the provided booking details.
 * It includes the authorization token and API key in the request headers.
 * If the booking is successfully created, it returns the response data.
 * If an error occurs, it throws an error.
 *
 * @async
 * @function createBooking
 * @param {Object} bookingDetails - The details of the booking to be created.
 * @param {Date} bookingDetails.dateFrom - The starting date of the booking.
 * @param {Date} bookingDetails.dateTo - The ending date of the booking.
 * @param {number} bookingDetails.guests - The number of guests for the booking.
 * @param {string} bookingDetails.venueId - The ID of the venue being booked.
 * @returns {Promise<Object>} The response data from the API after creating the booking.
 * @throws {Error} Throws an error if the token is missing, the request fails, or if the API returns an error.
 */

export const createBooking = async ({ dateFrom, dateTo, guests, venueId }) => {
  const URL = `${import.meta.env.VITE_APIBase}holidaze/bookings`;

  const token = load("token");
  const apiKey = import.meta.env.VITE_APIKey;

  if (!token) {
    throw new Error("Token is missing. Please log in.");
  }

  try {
    const response = await fetchData(URL, {
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

    return response;
  } catch (error) {
    console.error("Error creating booking:", error);
    throw error;
  }
};
