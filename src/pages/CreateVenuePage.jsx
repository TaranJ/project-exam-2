import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { load } from "../utils/storage/load";
import { createVenue } from "../utils/api/createvenue";
import { useNavigate } from "react-router-dom";

/**
 * CreateVenuePage component allows users to create a new venue by providing the necessary details.
 * It handles form validation, input changes, and submission to create the venue via API.
 *
 * @component
 * @returns {React.Element} JSX markup for the CreateVenuePage.
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
  const [fieldErrors, setFieldErrors] = useState({});
  const token = load("token");
  const apiKey = import.meta.env.VITE_APIKey;
  const navigate = useNavigate();

  /**
   * Handles changes in form input fields.
   *
   * @param {React.ChangeEvent} e - The event triggered by the input change.
   */
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    setVenueData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : name === "price" || name === "maxGuests" ? Number(value) : value,
    }));
  };

  /**
   * Handles the form submission, including validation and API call to create the venue.
   *
   * @param {React.FormEvent} e - The form submission event.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFieldErrors({});
    setError("");

    const requiredFields = ["name", "description", "address", "city", "price", "maxGuests"];
    const missingFields = requiredFields.filter((field) => !venueData[field]);

    if (missingFields.length > 0) {
      setError(`Please fill in the following fields: ${missingFields.join(", ")}`);
      return;
    }

    setLoading(true);

    try {
      await createVenue(venueData, token);
      alert("Venue created successfully!");
      navigate("/profile");
    } catch (err) {
      if (err.errors) {
        const validationErrors = err.errors.map((error) => error.message).join(", ");
        setError(validationErrors);
      } else {
        setError(err.message || "An error occurred while creating the venue.");
      }
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
                  <Form.Control
                    type="text"
                    name="name"
                    value={venueData.name}
                    onChange={handleInputChange}
                    placeholder="Enter venue name"
                    isInvalid={!!fieldErrors.name}
                    required
                  />
                  <Form.Control.Feedback type="invalid">{fieldErrors.name}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-4" controlId="formVenueDescription">
                  <Form.Label className="mb-0">Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="description"
                    value={venueData.description}
                    onChange={handleInputChange}
                    placeholder="Enter venue description"
                    isInvalid={!!fieldErrors.description}
                    required
                  />
                  <Form.Control.Feedback type="invalid">{fieldErrors.description}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-4" controlId="formVenueImage">
                  <Form.Label className="mb-0">Image URL</Form.Label>
                  <Form.Control
                    type="text"
                    name="mediaUrl"
                    value={venueData.mediaUrl}
                    onChange={handleInputChange}
                    placeholder="Enter venue image URL"
                    isInvalid={!!fieldErrors.mediaUrl}
                  />
                  <Form.Control.Feedback type="invalid">{fieldErrors.mediaUrl}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-4" controlId="formVenueAddress">
                  <Form.Label className="mb-0">Address</Form.Label>
                  <Form.Control
                    type="text"
                    name="address"
                    value={venueData.address}
                    onChange={handleInputChange}
                    placeholder="Enter venue address"
                    isInvalid={!!fieldErrors.address}
                    required
                  />
                  <Form.Control.Feedback type="invalid">{fieldErrors.address}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-4" controlId="formVenueCity">
                  <Form.Label className="mb-0">City</Form.Label>
                  <Form.Control
                    type="text"
                    name="city"
                    value={venueData.city}
                    onChange={handleInputChange}
                    placeholder="Enter city"
                    isInvalid={!!fieldErrors.city}
                    required
                  />
                  <Form.Control.Feedback type="invalid">{fieldErrors.city}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-4" controlId="formVenuePrice">
                  <Form.Label className="mb-0">Price per night</Form.Label>
                  <Form.Control
                    type="number"
                    name="price"
                    value={venueData.price}
                    onChange={handleInputChange}
                    placeholder="Enter price"
                    isInvalid={!!fieldErrors.price}
                    required
                  />
                  <Form.Control.Feedback type="invalid">{fieldErrors.price}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-4" controlId="formMaxGuests">
                  <Form.Label className="mb-0">Max number of guests</Form.Label>
                  <Form.Control
                    type="number"
                    name="maxGuests"
                    value={venueData.maxGuests}
                    onChange={handleInputChange}
                    placeholder="Enter number"
                    isInvalid={!!fieldErrors.maxGuests}
                    required
                  />
                  <Form.Control.Feedback type="invalid">{fieldErrors.maxGuests}</Form.Control.Feedback>
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
