import { fetchData } from "..";

/**
 * Fetches a user's full profile by their name using the provided access token.
 *
 * @async
 * @function fetchProfile
 * @param {string} name - The name of the user whose profile is being fetched.
 * @param {string} accessToken - The access token used for authorization.
 * @returns {Promise<Object>} A promise that resolves to the user's profile data.
 * @throws {Error} Throws an error if the profile fetch fails or the request is invalid.
 */
export const fetchProfile = async (name, accessToken) => {
  const URL = `${import.meta.env.VITE_APIBase}holidaze/profiles/${name}`;
  const apiKey = import.meta.env.VITE_APIKey;

  const options = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      "X-Noroff-API-Key": apiKey,
    },
  };

  try {
    const data = await fetchData(URL, options);

    return data.data;
  } catch (error) {
    console.error("Error fetching full profile:", error);
    throw error;
  }
};
