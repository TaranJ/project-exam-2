/**
 * Creates a new venue by sending a POST request to the API with the provided venue data.
 *
 * @param {Object} venueData - The data for the venue to be created.
 * @param {string} venueData.name - The name of the venue.
 * @param {string} venueData.description - A description of the venue.
 * @param {string} venueData.mediaUrl - The URL of the image for the venue.
 * @param {number} venueData.price - The price per night for the venue.
 * @param {number} venueData.maxGuests - The maximum number of guests allowed at the venue.
 * @param {boolean} venueData.wifi - Whether the venue provides WiFi.
 * @param {boolean} venueData.parking - Whether the venue provides parking.
 * @param {boolean} venueData.breakfast - Whether breakfast is included at the venue.
 * @param {boolean} venueData.pets - Whether pets are allowed at the venue.
 * @param {string} venueData.address - The address of the venue.
 * @param {string} venueData.city - The city where the venue is located.
 *
 * @param {string} token - The authentication token used for authorization in the API request.
 *
 * @returns {Promise<Object>} The response data from the API if the venue creation is successful.
 * @throws {Object} Throws an error object containing error details if the API request fails.
 *
 */
export const createVenue = async (venueData, token) => {
  const apiKey = import.meta.env.VITE_APIKey;
  const url = `${import.meta.env.VITE_APIBase}holidaze/venues`;

  const venuePayload = {
    name: venueData.name,
    description: venueData.description,
    media: [
      {
        url: venueData.mediaUrl,
        alt: "Venue Image",
      },
    ],
    price: venueData.price,
    maxGuests: venueData.maxGuests,
    location: {
      address: venueData.address,
      city: venueData.city,
      zip: "",
      country: "",
      continent: "",
    },
    meta: {
      wifi: venueData.wifi,
      parking: venueData.parking,
      breakfast: venueData.breakfast,
      pets: venueData.pets,
    },
  };

  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "X-Noroff-API-Key": apiKey,
    },
    body: JSON.stringify(venuePayload),
  };

  const response = await fetch(url, options);
  if (!response.ok) {
    const errorData = await response.json();
    throw errorData;
  }
  return response.json();
};
