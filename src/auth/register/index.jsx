export const registerUser = async (userData) => {
  const URL = `${import.meta.env.VITE_APIBase}auth/register`;

  try {
    const response = await fetch(URL, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error("Failed to register user");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};
