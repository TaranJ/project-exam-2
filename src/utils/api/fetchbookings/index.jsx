import { load } from "../../storage/load";
import { fetchData } from "..";

// Utility function to fetch paginated bookings
const fetchPaginatedBookings = async (filterFunction = () => true) => {
  const token = load("token");
  const apiKey = import.meta.env.VITE_APIKey;

  if (!token) {
    console.warn("Token is missing. You may not be able to fetch bookings.");
    return [];
  }

  const URL = `${import.meta.env.VITE_APIBase}holidaze/bookings?_venue=true&_customer=true`;
  let allBookings = [];
  let page = 1;
  const perPage = 100;

  try {
    while (true) {
      const fullUrl = `${URL}&sort=created&sortOrder=desc&page=${page}&per_page=${perPage}`;

      const data = await fetchData(fullUrl, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "X-Noroff-API-Key": apiKey,
        },
        method: "GET",
      });

      if (data && Array.isArray(data.data)) {
        // Apply the filter function to filter bookings
        allBookings = allBookings.concat(data.data.filter(filterFunction));
      }

      if (data.data.length < perPage) {
        break;
      }

      page++;
    }
  } catch (error) {
    console.error("Error fetching paginated bookings:", error);
    return [];
  }

  return allBookings;
};

// Function to fetch all bookings for a user
export const fetchAllBookingsForUser = async () => {
  return fetchPaginatedBookings();
};
