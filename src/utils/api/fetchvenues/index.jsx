import { fetchData } from "..";

export const fetchVenues = async () => {
  const URL = import.meta.env.VITE_APIBase + "holidaze/venues";
  return fetchData(URL);
};

export const fetchVenueById = async (id) => {
  const URL = `${import.meta.env.VITE_APIBase}holidaze/venues/${id}`;

  return fetchData(URL);
};
