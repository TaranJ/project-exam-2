import { fetchData } from "..";

/**
 * Deletes a venue by sending a DELETE request to the venues API.
 * The request includes the necessary authorization token and API key in the headers.
 * If the venue is successfully deleted, it returns a success message.
 * If an error occurs or if the response is not as expected, it throws an error.
 *
 * @async
 * @function deleteVenue
 * @param {string} id - The ID of the venue to be deleted.
 * @param {string} token - The authorization token required for the request.
 * @returns {Promise<Object>} A message indicating the success or failure of the venue deletion.
 * @throws {Error} Throws an error if the request fails or if the API returns an error.
 */
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
