export const fetchProfile = async (name, accessToken) => {
  const URL = `${import.meta.env.VITE_APIBase}holidaze/profiles/${name}`;
  const apiKey = import.meta.env.VITE_APIKey;

  try {
    const response = await fetch(URL, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        "X-Noroff-API-Key": apiKey,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch full profile");
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching full profile:", error);
    throw error;
  }
};
