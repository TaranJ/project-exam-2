export const fetchData = async (url, options = {}) => {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`Failed to fetch data from API. Status: ${response.status}`);
    }
    if (response.status !== 204) {
      const data = await response.json();
      return data;
    }
    return null;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
