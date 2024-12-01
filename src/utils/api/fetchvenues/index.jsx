import { fetchData } from "..";
import { load } from "../../storage/load";

/**
 * Fetches a list of all venues.
 * This function retrieves all venues without applying any filters or authentication.
 *
 * @async
 * @function fetchVenues
 * @returns {Promise<Array>} A promise that resolves to an array of all venue data.
 * @throws {Error} Throws an error if the request fails.
 */
export const fetchVenues = async () => {
  const URL = import.meta.env.VITE_APIBase + "holidaze/venues";
  return fetchData(URL);
};

/**
 * Fetches a venue by its unique identifier (ID).
 * This function retrieves a venue and includes additional information about its owner and bookings.
 *
 * @async
 * @function fetchVenueById
 * @param {string} id - The unique identifier of the venue.
 * @returns {Promise<Object>} A promise that resolves to the venue data.
 * @throws {Error} Throws an error if the request fails or the venue is not found.
 */
export const fetchVenueById = async (id) => {
  const URL = `${import.meta.env.VITE_APIBase}holidaze/venues/${id}?_owner=true&_bookings=true`;
  return fetchData(URL);
};

/**
 * Fetches a list of venues for a specific manager, filtering by the manager's name.
 * The function fetches paginated results and applies a filter to return only the venues managed by the specified manager.
 *
 * @async
 * @function fetchVenuesForManager
 * @param {string} managerName - The name of the manager whose venues are being fetched.
 * @returns {Promise<Array>} A promise that resolves to an array of venues managed by the specified manager.
 * @throws {Error} Throws an error if the request fails or an issue occurs during pagination.
 */
export const fetchVenuesForManager = async (managerName) => {
  const token = load("token");
  const apiKey = import.meta.env.VITE_APIKey;
  const url = `${import.meta.env.VITE_APIBase}holidaze/venues?_owner=true`;

  try {
    let page = 1;
    const limit = 100;
    let allVenues = [];
    let hasMore = true;

    while (hasMore) {
      const response = await fetch(`${url}&limit=${limit}&page=${page}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "X-Noroff-API-Key": apiKey,
        },
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch venues: ${response.statusText}`);
      }

      const venues = await response.json();
      const venueList = Array.isArray(venues) ? venues : venues.data || [];
      const filteredVenues = venueList.filter((venue) => venue.owner?.name === managerName);
      allVenues = [...allVenues, ...filteredVenues];
      hasMore = venueList.length === limit;
      page += 1;
    }

    console.log("Filtered venues for manager:", allVenues);
    return allVenues;
  } catch (error) {
    console.error("Error fetching venues:", error);
    return [];
  }
};
