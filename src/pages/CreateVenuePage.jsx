import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { load } from "../utils/storage/load";
import { createVenue } from "../utils/api/createvenue";
import { useNavigate } from "react-router-dom";

/**
 * CreateVenuePage is a component that allows users to create a new venue listing on Holidaze.
 * The form collects information such as the venue's name, description, location, price, amenities, and image URL.
 * After submission, the venue is added to the platform, and the user is redirected to their profile page.
 *
 * @component
 *
 * @returns {JSX.Element} The form for creating a new venue.
 */
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

  /**
   * Handles input changes in the form fields and updates the state with the new values.
   * The values are either updated as a string, number, or boolean (for checkboxes).
   *
   * @param {React.ChangeEvent} e - The event triggered by a form input change.
   */
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    setVenueData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : name === "price" || name === "maxGuests" ? Number(value) : value,
    }));
  };

  /**
   * Handles the form submission. Validates the input fields and attempts to create a venue through the API.
   * If the submission is successful, the user is redirected to the profile page. Otherwise, an error message is displayed.
   *
   * @param {React.FormEvent} e - The event triggered by the form submission.
   */
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
      <Helmet>
        <title>Create new venue | Holidaze</title>
        <meta name="description" content={"List your property on Holidaze by adding a new venue, complete with photos, details, and pricing."} />
      </Helmet>

      <Container fluid="md" className="d-flex justify-content-center pt-5 min-vh-100">
        <Row className="w-100">
          <Col xs={12} md={8} lg={6} className="mx-auto">
            <div className="form-box mt-5 mb-5">
              <h3 className="fs-4 mb-4">Create venue</h3>
              <Form onSubmit={handleSubmit}>
                {/* Form Fields */}
                <Form.Group className="mb-4" controlId="formVenueName">
                  <Form.Label className="mb-0">Venue name</Form.Label>
                  <Form.Control type="text" name="name" value={venueData.name} onChange={handleInputChange} placeholder="Enter venue name" required />
                </Form.Group>
                <Form.Group className="mb-4" controlId="formVenueDescription">
                  <Form.Label className="mb-0">Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="description"
                    value={venueData.description}
                    onChange={handleInputChange}
                    placeholder="Enter venue description"
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-4" controlId="formVenueImage">
                  <Form.Label className="mb-0">Image URL</Form.Label>
                  <Form.Control
                    type="text"
                    name="mediaUrl"
                    value={venueData.mediaUrl}
                    onChange={handleInputChange}
                    placeholder="Enter venue image URL"
                  />
                </Form.Group>
                <Form.Group className="mb-4" controlId="formVenueAddress">
                  <Form.Label className="mb-0">Address</Form.Label>
                  <Form.Control
                    type="text"
                    name="address"
                    value={venueData.address}
                    onChange={handleInputChange}
                    placeholder="Enter venue address"
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-4" controlId="formVenueCity">
                  <Form.Label className="mb-0">City</Form.Label>
                  <Form.Control type="text" name="city" value={venueData.city} onChange={handleInputChange} placeholder="Enter city" required />
                </Form.Group>
                <Form.Group className="mb-4" controlId="formVenuePrice">
                  <Form.Label className="mb-0">Price per night</Form.Label>
                  <Form.Control type="number" name="price" value={venueData.price} onChange={handleInputChange} placeholder="Enter price" required />
                </Form.Group>
                <Form.Group className="mb-4" controlId="formMaxGuests">
                  <Form.Label className="mb-0">Max number of guests</Form.Label>
                  <Form.Control
                    type="number"
                    name="maxGuests"
                    value={venueData.maxGuests}
                    onChange={handleInputChange}
                    placeholder="Enter number"
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-4" controlId="formVenueAmenities">
                  <Form.Label className="mb-1">Amenities</Form.Label>
                  <div>
                    <Form.Check type="checkbox" name="wifi" label="WiFi" checked={venueData.wifi} onChange={handleInputChange} />
                    <Form.Check type="checkbox" name="parking" label="Parking" checked={venueData.parking} onChange={handleInputChange} />
                    <Form.Check type="checkbox" name="breakfast" label="Breakfast" checked={venueData.breakfast} onChange={handleInputChange} />
                    <Form.Check type="checkbox" name="pets" label="Pets Allowed" checked={venueData.pets} onChange={handleInputChange} />
                  </div>
                </Form.Group>
                <Button variant="primary" className="cta-button w-100 mb-2" type="submit" disabled={loading}>
                  {loading ? "Creating..." : "Create Venue"}
                </Button>
                {error && <div className="alert alert-danger">{error}</div>}
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default CreateVenuePage;
