import { load } from "../../storage/load";
import { fetchData } from "..";

/**
 * Fetches paginated bookings from the API and applies a filter function to the data.
 * It retrieves bookings in pages, combining all the results until no more data is available.
 * The function will stop fetching when a page has fewer bookings than the specified perPage limit.
 *
 * @async
 * @function fetchPaginatedBookings
 * @param {function} [filterFunction = () => true] - A function that filters bookings based on certain criteria.
 *                                                    By default, it does not filter any bookings (returns all).
 * @returns {Promise<Array>} A promise that resolves to an array of filtered bookings.
 * @throws {Error} Throws an error if there is an issue with the API request.
 */
const fetchPaginatedBookings = async (filterFunction = () => true) => {
  const token = load("token");
  const apiKey = import.meta.env.VITE_APIKey;

  if (!token) {
    console.warn("Token is missing. You may not be able to fetch bookings.");
    return [];
  }

  const URL = `${import.meta.env.VITE_APIBase}holidaze/bookings?_venue=true&_customer=true`;
  let allBookings = [];
  let page = 1;
  const perPage = 100;

  try {
    while (true) {
      const fullUrl = `${URL}&sort=created&sortOrder=desc&page=${page}&per_page=${perPage}`;

      const data = await fetchData(fullUrl, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "X-Noroff-API-Key": apiKey,
        },
        method: "GET",
      });

      if (data && Array.isArray(data.data)) {
        allBookings = allBookings.concat(data.data.filter(filterFunction));
      }

      if (data.data.length < perPage) {
        break;
      }

      page++;
    }
  } catch (error) {
    console.error("Error fetching paginated bookings:", error);
    return [];
  }

  return allBookings;
};

/**
 * Fetches all bookings for the current user by calling `fetchPaginatedBookings`.
 * This function is a simplified version that does not apply any filters to the bookings.
 *
 * @async
 * @function fetchAllBookingsForUser
 * @returns {Promise<Array>} A promise that resolves to an array of all bookings for the user.
 */
export const fetchAllBookingsForUser = async () => {
  return fetchPaginatedBookings();
};
