import { load } from "../storage/load";

export const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch data from API. Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const fetchVenues = async () => {
  const URL = import.meta.env.VITE_APIBase + "holidaze/venues";
  return fetchData(URL);
};

// Fetch a single venue by its ID
export const fetchVenueById = async (id) => {
  const URL = `${import.meta.env.VITE_APIBase}holidaze/venues/${id}`;

  return fetchData(URL);
};

export const fetchBookingsForVenue = async (venueId) => {
  const URL = `${import.meta.env.VITE_APIBase}holidaze/bookings?_venue=true`;

  try {
    const token = load("token");
    const apiKey = import.meta.env.VITE_APIKey;

    if (!token) {
      throw new Error("Token is missing. Please log in.");
    }

    const response = await fetch(URL, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": apiKey,
      },
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch bookings");
    }

    const data = await response.json();

    if (data && Array.isArray(data.data)) {
      const venueBookings = data.data.filter((booking) => booking.venue.id === venueId);
      console.log(venueBookings);
      return venueBookings;
    } else {
      throw new Error("Bookings data is not in the expected format");
    }
  } catch (error) {
    console.error("Error fetching bookings:", error);
    throw error;
  }
};
