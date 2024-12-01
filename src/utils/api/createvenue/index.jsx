import { fetchData } from "..";

/**
 * Creates a new venue by sending a POST request to the venues API with the provided venue data.
 * The request includes the necessary authorization token and API key in the headers.
 * If the venue is successfully created, it returns the response data.
 * If an error occurs, it throws an error.
 *
 * @async
 * @function createVenue
 * @param {Object} venueData - The details of the venue to be created.
 * @param {string} venueData.name - The name of the venue.
 * @param {string} venueData.description - The description of the venue.
 * @param {string} venueData.mediaUrl - The URL of the venue's media (e.g., an image).
 * @param {number} venueData.price - The price of the venue.
 * @param {number} venueData.maxGuests - The maximum number of guests the venue can accommodate.
 * @param {string} venueData.address - The address of the venue.
 * @param {string} venueData.city - The city where the venue is located.
 * @param {boolean} venueData.wifi - Whether the venue has WiFi.
 * @param {boolean} venueData.parking - Whether the venue offers parking.
 * @param {boolean} venueData.breakfast - Whether breakfast is available at the venue.
 * @param {boolean} venueData.pets - Whether pets are allowed at the venue.
 * @param {string} token - The authorization token required for the request.
 * @param {string} apiKey - The API key required for the request.
 * @returns {Promise<Object>} The response data from the API after creating the venue.
 * @throws {Error} Throws an error if the request fails or if the API returns an error.
 */

export const createVenue = async (venueData, token, apiKey) => {
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

  const URL = `${import.meta.env.VITE_APIBase}holidaze/venues`;

  try {
    const response = await fetchData(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": apiKey,
      },
      body: JSON.stringify(venuePayload),
    });

    console.log("Venue created:", response);
    return response;
  } catch (err) {
    console.error("Error creating venue:", err);
    throw err;
  }
};
