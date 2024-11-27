export const fetchVenues = async () => {
  const URL = import.meta.env.VITE_APIBase + "holidaze/venues";
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
