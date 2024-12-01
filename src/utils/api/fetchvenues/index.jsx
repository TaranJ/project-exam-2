import { fetchData } from "..";
import { load } from "../../storage/load";

export const fetchVenues = async () => {
  const URL = import.meta.env.VITE_APIBase + "holidaze/venues";
  return fetchData(URL);
};

export const fetchVenueById = async (id) => {
  const URL = `${import.meta.env.VITE_APIBase}holidaze/venues/${id}?_owner=true&_bookings=true`;

  return fetchData(URL);
};

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
