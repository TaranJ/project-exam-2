const URL = "https://v2.api.noroff.dev/holidaze/venues";

// Function to fetch all products from the API
export const fetchVenues = async () => {
  try {
    const response = await fetch(URL);
    if (!response.ok) {
      throw new Error("Failed to fetch data from API");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching venues:", error);
    throw error;
  }
};
