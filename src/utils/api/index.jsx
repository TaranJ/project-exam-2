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

const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYWxidXMiLCJlbWFpbCI6ImFsYnVzQG5vcm9mZi5ubyIsImlhdCI6MTczMjczODk5OX0.NwbO6JMc1G8jH_rc634amkcLbr_icSVBDKxrVaegOcM`;
