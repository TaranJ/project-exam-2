import { fetchData } from "../api";

export const searchVenues = async (query) => {
  const URL = `${import.meta.env.VITE_APIBase}holidaze/venues/search?q=${query}`;
  return fetchData(URL);
};
