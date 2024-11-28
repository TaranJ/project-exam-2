import { load } from "../../storage/load";
import { save } from "../../storage/save";

export const updateProfile = async (profileName, updatedProfile) => {
  const token = load("token");
  const apiKey = import.meta.env.VITE_APIKey;
  const url = `${import.meta.env.VITE_APIBase}holidaze/profiles/${profileName}`;

  if (!token) {
    throw new Error("You must be logged in to update the profile.");
  }

  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": apiKey,
      },
      body: JSON.stringify(updatedProfile),
    });

    if (!response.ok) {
      throw new Error(`Failed to update profile. Status: ${response.status}`);
    }

    const updatedData = await response.json();
    const newProfile = updatedData.data || updatedData;
    save("profile", newProfile);

    return newProfile;
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
};
