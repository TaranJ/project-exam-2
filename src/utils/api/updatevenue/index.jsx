export const updateVenue = async (id, venueData, token) => {
  const apiKey = import.meta.env.VITE_APIKey;
  const url = `${import.meta.env.VITE_APIBase}holidaze/venues/${id}`;
  const options = {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "X-Noroff-API-Key": apiKey,
    },
    body: JSON.stringify(venueData),
  };

  const response = await fetch(url, options);
  if (!response.ok) {
    const errorData = await response.json();
    throw errorData;
  }
  return response.json();
};
