import { fetchData } from "../api";

/**
 * Searches for venues based on a query string.
 * This function sends a GET request to the server to fetch venues that match the search query.
 *
 * @async
 * @function searchVenues
 * @param {string} query - The search query to filter the venues.
 * @returns {Promise<Object>} A promise that resolves to the list of venues matching the search query.
 * @throws {Error} Throws an error if the request fails or if the venues cannot be fetched.
 */

export const searchVenues = async (query) => {
  const URL = `${import.meta.env.VITE_APIBase}holidaze/venues/search?q=${query}`;
  return fetchData(URL);
};
