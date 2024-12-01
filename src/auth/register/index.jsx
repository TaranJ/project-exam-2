/**
 * Registers a new user by sending a POST request with the provided user data.
 * If the registration is successful, returns the response data.
 * If the registration fails, throws an error with the response data.
 *
 * @async
 * @function registerUser
 * @param {Object} userData - The user data required for registration (e.g., email, password, etc.).
 * @returns {Promise<Object>} The response data from the server after successful registration.
 * @throws {Object} Throws an error containing the error data from the server if registration fails.
 */

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
