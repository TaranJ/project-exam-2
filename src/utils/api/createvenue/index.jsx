export const createVenue = async (venueData, token, apiKey) => {
  const venuePayload = {
    name: venueData.name,
    description: venueData.description,
    media: [
      {
        url: venueData.mediaUrl,
        alt: "Venue Image",
      },
    ],
    price: venueData.price,
    maxGuests: venueData.maxGuests,
    location: {
      address: venueData.address,
      city: venueData.city,
      zip: "",
      country: "",
      continent: "",
    },
    meta: {
      wifi: venueData.wifi,
      parking: venueData.parking,
      breakfast: venueData.breakfast,
      pets: venueData.pets,
    },
  };

  try {
    const response = await fetch(`${import.meta.env.VITE_APIBase}holidaze/venues`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": apiKey,
      },
      body: JSON.stringify(venuePayload),
    });

    if (!response.ok) {
      throw new Error("Failed to create venue.");
    }

    return await response.json(); // Return the parsed JSON response
  } catch (err) {
    console.error("Error creating venue:", err);
    throw err; // Re-throw the error to handle it in the caller
  }
};
