export const registerUser = async (userData) => {
  const URL = `${import.meta.env.VITE_APIBase}auth/register`;

  const response = await fetch(URL, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw errorData;
  }

  return response.json();
};
