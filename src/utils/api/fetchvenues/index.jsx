import { fetchData } from "..";
import { load } from "../../storage/load";

export const fetchVenues = async () => {
  const URL = import.meta.env.VITE_APIBase + "holidaze/venues";
  return fetchData(URL);
};

export const fetchVenueById = async (id) => {
  const URL = `${import.meta.env.VITE_APIBase}holidaze/venues/${id}`;

  return fetchData(URL);
};

export const fetchVenuesForManager = async (managerName) => {
  const token = load("token");
  const apiKey = import.meta.env.VITE_APIKey;
  const url = `${import.meta.env.VITE_APIBase}holidaze/venues?_owner=true`;

  try {
    const response = await fetch(url, {
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

    console.log("Filtered venues for manager:", filteredVenues);
    return filteredVenues;
  } catch (error) {
    console.error("Error fetching venues:", error);
    return [];
  }
};
