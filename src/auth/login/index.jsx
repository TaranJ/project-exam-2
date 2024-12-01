import { save } from "../../utils/storage/save";
import { fetchProfile } from "../../utils/api/fetchprofile";

/**
 * Logs in a user by sending a POST request with the provided email and password.
 * If successful, saves the access token and the user profile to storage.
 * Fetches additional profile details after login and returns the full profile.
 *
 * @async
 * @function loginUser
 * @param {string} email - The user's email address.
 * @param {string} password - The user's password.
 * @returns {Promise<Object>} The full user profile after login.
 * @throws {Error} Throws an error if the login fails or the profile fetch fails.
 *
 */

export const loginUser = async (email, password) => {
  const URL = `${import.meta.env.VITE_APIBase}auth/login`;

  try {
    const response = await fetch(URL, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error("Failed to log in");
    }

    const { accessToken, ...profile } = (await response.json()).data;
    save("token", accessToken);
    const fullProfile = await fetchProfile(profile.name, accessToken);
    save("profile", fullProfile);

    return fullProfile;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};
