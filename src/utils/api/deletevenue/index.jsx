import { fetchData } from "..";

export const deleteVenue = async (id, token) => {
  const apiKey = import.meta.env.VITE_APIKey;
  const url = `${import.meta.env.VITE_APIBase}holidaze/venues/${id}`;
  const options = {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "X-Noroff-API-Key": apiKey,
    },
  };

  try {
    const data = await fetchData(url, options);
    if (data === null) {
      return { message: "Venue deleted successfully." };
    }
    return data;
  } catch (error) {
    console.error("Error deleting venue:", error);
    throw new Error("Failed to delete venue.");
  }
};
