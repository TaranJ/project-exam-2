/**
 * Updates the details of a venue with the given ID.
 * This function sends a PUT request to the server to update a venue's data.
 *
 * @async
 * @function updateVenue
 * @param {string} id - The unique identifier of the venue to be updated.
 * @param {Object} venueData - The data to update the venue with.
 * @param {string} venueData.name - The updated name of the venue.
 * @param {string} venueData.description - The updated description of the venue.
 * @param {string} venueData.mediaUrl - The updated URL of the venue's media (e.g., image).
 * @param {number} venueData.price - The updated price of the venue.
 * @param {number} venueData.maxGuests - The updated maximum number of guests the venue can accommodate.
 * @param {Object} venueData.location - The updated location details of the venue.
 * @param {string} venueData.location.address - The updated address of the venue.
 * @param {string} venueData.location.city - The updated city of the venue.
 * @param {string} venueData.location.zip - The updated zip code of the venue (optional).
 * @param {string} venueData.location.country - The updated country of the venue (optional).
 * @param {string} venueData.location.continent - The updated continent of the venue (optional).
 * @param {Object} venueData.meta - The updated metadata for the venue.
 * @param {boolean} venueData.meta.wifi - The updated availability of Wi-Fi at the venue.
 * @param {boolean} venueData.meta.parking - The updated availability of parking at the venue.
 * @param {boolean} venueData.meta.breakfast - The updated availability of breakfast at the venue.
 * @param {boolean} venueData.meta.pets - The updated allowance of pets at the venue.
 * @param {string} token - The authentication token of the logged-in user, required for authorization.
 * @returns {Promise<Object>} A promise that resolves to the updated venue data.
 * @throws {Error} Throws an error if the request fails or if the venue cannot be updated.
 */
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

  const response = await fetch(url, options);
  if (!response.ok) {
    const errorData = await response.json();
    throw errorData;
  }
  return response.json();
};
