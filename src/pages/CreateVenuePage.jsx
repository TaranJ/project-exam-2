import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { load } from "../utils/storage/load";
import { createVenue } from "../utils/api/createvenue";
import { useNavigate } from "react-router-dom";

const CreateVenuePage = () => {
  const [venueData, setVenueData] = useState({
    name: "",
    description: "",
    mediaUrl: "",
    address: "",
    city: "",
    price: 0,
    maxGuests: 0,
    wifi: false,
    parking: false,
    breakfast: false,
    pets: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const token = load("token");
  const apiKey = import.meta.env.VITE_APIKey;
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    setVenueData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : name === "price" || name === "maxGuests" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!venueData.name || !venueData.description || !venueData.address || !venueData.city || !venueData.price) {
      setError("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const data = await createVenue(venueData, token, apiKey);
      console.log("Venue created successfully:", data);
      alert("Venue created successfully!");
      navigate("/profile");
    } catch (err) {
      setError("Failed to create venue. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <h3>Create a New Venue</h3>
      {error && <div className="alert alert-danger">{error}</div>}
      <Form onSubmit={handleSubmit}>
        {/* Form Fields */}
        <Form.Group controlId="formVenueName">
          <Form.Label>Venue Name</Form.Label>
          <Form.Control type="text" name="name" value={venueData.name} onChange={handleInputChange} placeholder="Enter venue name" required />
        </Form.Group>
        <Form.Group controlId="formVenueDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            value={venueData.description}
            onChange={handleInputChange}
            placeholder="Enter venue description"
            required
          />
        </Form.Group>
        <Form.Group controlId="formVenueImage">
          <Form.Label>Image URL</Form.Label>
          <Form.Control type="text" name="mediaUrl" value={venueData.mediaUrl} onChange={handleInputChange} placeholder="Enter venue image URL" />
        </Form.Group>
        <Form.Group controlId="formVenueAddress">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            name="address"
            value={venueData.address}
            onChange={handleInputChange}
            placeholder="Enter venue address"
            required
          />
        </Form.Group>
        <Form.Group controlId="formVenueCity">
          <Form.Label>City</Form.Label>
          <Form.Control type="text" name="city" value={venueData.city} onChange={handleInputChange} placeholder="Enter city" required />
        </Form.Group>
        <Form.Group controlId="formVenuePrice">
          <Form.Label>Price</Form.Label>
          <Form.Control type="number" name="price" value={venueData.price} onChange={handleInputChange} placeholder="Enter price" required />
        </Form.Group>
        <Form.Group controlId="formMaxGuests">
          <Form.Label>Max number of guests</Form.Label>
          <Form.Control type="number" name="maxGuests" value={venueData.maxGuests} onChange={handleInputChange} placeholder="Enter number" required />
        </Form.Group>
        <Form.Group controlId="formVenueAmenities">
          <Form.Label>Amenities</Form.Label>
          <div>
            <Form.Check type="checkbox" name="wifi" label="WiFi" checked={venueData.wifi} onChange={handleInputChange} />
            <Form.Check type="checkbox" name="parking" label="Parking" checked={venueData.parking} onChange={handleInputChange} />
            <Form.Check type="checkbox" name="breakfast" label="Breakfast" checked={venueData.breakfast} onChange={handleInputChange} />
            <Form.Check type="checkbox" name="pets" label="Pets Allowed" checked={venueData.pets} onChange={handleInputChange} />
          </div>
        </Form.Group>
        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Venue"}
        </Button>
      </Form>
    </Container>
  );
};

export default CreateVenuePage;
