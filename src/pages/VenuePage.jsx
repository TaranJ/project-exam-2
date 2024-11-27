import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchVenueById } from "../utils/api";

function VenuePage() {
  const { id } = useParams();
  const [venue, setVenue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getVenue = async () => {
      try {
        setLoading(true);
        const fetchedVenue = await fetchVenueById(id);
        setVenue(fetchedVenue.data);
      } catch (error) {
        setError("Error fetching venue");
        console.error("Error fetching venue:", error);
      } finally {
        setLoading(false);
      }
    };

    getVenue();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!venue) {
    return <p>No venue found.</p>;
  }

  return (
    <div className="venue-page">
      <h2>{venue.name}</h2>
      <p>{venue.description}</p>
      <p>Price: {venue.price} NOK</p>
      <img src={venue.media[0]?.url} alt={venue.name} />
    </div>
  );
}

export default VenuePage;
