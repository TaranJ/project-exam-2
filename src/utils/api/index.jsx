/**
 * Fetches data from a given URL using the provided options (e.g., headers, method).
 * If the response is successful, it parses and returns the JSON data.
 * If the status is 204 (No Content), it returns `null`.
 * In case of an error, it throws an error with the appropriate message.
 *
 * @async
 * @function fetchData
 * @param {string} url - The URL to fetch data from.
 * @param {Object} [options={}] - Optional configuration object (e.g., headers, method) for the fetch request.
 * @returns {Promise<Object|null>} The parsed JSON data if the request is successful, or `null` if the response status is 204.
 * @throws {Error} Throws an error if the fetch request fails or the response is not OK.
 */
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
