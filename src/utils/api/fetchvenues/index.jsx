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
  const url = `${import.meta.env.VITE_APIBase}holidaze/venues?manager.name=${managerName}`;

  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": apiKey,
      },
    });

    if (response.status === 429) {
      // Handle rate-limiting error (status 429)
      console.error("API rate limit exceeded. Try again later.");
      return []; // Return an empty array or handle retry logic here
    }

    if (!response.ok) {
      throw new Error("Failed to fetch venues");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching venues:", error);
    return []; // Return empty array in case of error
  }
};
