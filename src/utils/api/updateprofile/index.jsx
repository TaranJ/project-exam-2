import { load } from "../../storage/load";
import { save } from "../../storage/save";
import { fetchData } from "..";

/**
 * Updates the user's profile with new data.
 * This function sends a PUT request to the server to update the profile associated with the provided profile name.
 * After a successful update, it saves the updated profile to local storage.
 *
 * @async
 * @function updateProfile
 * @param {string} profileName - The name of the profile to be updated.
 * @param {Object} updatedProfile - The new profile data to update with.
 * @param {string} updatedProfile.name - The updated name of the profile.
 * @param {string} updatedProfile.email - The updated email address of the user.
 * @param {string} updatedProfile.phone - The updated phone number of the user.
 * @param {string} updatedProfile.address - The updated address of the user.
 * @returns {Promise<Object>} A promise that resolves to the updated profile data.
 * @throws {Error} Throws an error if the request fails or if the user is not logged in.
 */
export const updateProfile = async (profileName, updatedProfile) => {
  const token = load("token");
  const apiKey = import.meta.env.VITE_APIKey;
  const url = `${import.meta.env.VITE_APIBase}holidaze/profiles/${profileName}`;

  if (!token) {
    throw new Error("You must be logged in to update the profile.");
  }

  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "X-Noroff-API-Key": apiKey,
    },
    body: JSON.stringify(updatedProfile),
  };

  try {
    const updatedData = await fetchData(url, options);
    const newProfile = updatedData.data || updatedData;
    save("profile", newProfile);

    return newProfile;
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
};
