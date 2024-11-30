import { fetchData } from "..";

export const updateVenue = async (id, venueData, token) => {
  const apiKey = import.meta.env.VITE_APIKey;
  const url = `${import.meta.env.VITE_APIBase}holidaze/venues/${id}`;
  const options = {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "X-Noroff-API-Key": apiKey,
    },
    body: JSON.stringify(venueData),
  };

  try {
    const updatedVenue = await fetchData(url, options);
    return updatedVenue;
  } catch (error) {
    console.error("Error updating venue:", error);
    throw new Error("Failed to update venue");
  }
};
