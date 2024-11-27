import { save } from "../../utils/storage/save";

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
    save("profile", profile);
    return profile;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};
