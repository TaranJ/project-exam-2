import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Form, Button, Container, Col, Row } from "react-bootstrap";
import { load } from "../utils/storage/load";
import { fetchVenueById } from "../utils/api/fetchvenues";
import { useParams, useNavigate } from "react-router-dom";
import { updateVenue } from "../utils/api/updatevenue";
import { deleteVenue } from "../utils/api/deletevenue";

const EditVenuePage = () => {
  const { id } = useParams();
  const [venueData, setVenueData] = useState({
    name: "",
    description: "",
    mediaUrl: "",
    location: {
      address: "",
      city: "",
    },
    price: 0,
    maxGuests: 0,
    meta: {
      wifi: false,
      parking: false,
      breakfast: false,
      pets: false,
    },
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = load("token");
  const apiKey = import.meta.env.VITE_APIKey;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVenue = async () => {
      try {
        const venue = await fetchVenueById(id, token, apiKey);
        const { data } = venue;
        console.log("Fetched venue data:", data);
        setVenueData({
          name: data.name || "",
          description: data.description || "",
          mediaUrl: data.media?.[0]?.url || "",
          location: {
            address: data.location?.address || "",
            city: data.location?.city || "",
          },
          price: data.price || 0,
          maxGuests: data.maxGuests || 0,
          meta: {
            wifi: data.meta?.wifi || false,
            parking: data.meta?.parking || false,
            breakfast: data.meta?.breakfast || false,
            pets: data.meta?.pets || false,
          },
        });
      } catch (err) {
        console.error("Error fetching venue:", err);
        setError("Failed to fetch venue details.");
      } finally {
        setLoading(false);
      }
    };

    fetchVenue();
  }, [id, token, apiKey]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "address" || name === "city") {
      setVenueData((prevData) => ({
        ...prevData,
        location: {
          ...prevData.location,
          [name]: type === "checkbox" ? checked : value,
        },
      }));
    } else if (name in venueData.meta) {
      setVenueData((prevData) => ({
        ...prevData,
        meta: {
          ...prevData.meta,
          [name]: checked,
        },
      }));
    } else {
      setVenueData((prevData) => ({
        ...prevData,
        [name]: type === "checkbox" ? checked : type === "number" ? parseFloat(value) || 0 : value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !venueData.name ||
      !venueData.description ||
      !venueData.location.address ||
      !venueData.location.city ||
      !venueData.maxGuests ||
      !venueData.price
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    setError("");

    const submitData = {
      name: venueData.name,
      description: venueData.description,
      media: [{ url: venueData.mediaUrl }],
      location: venueData.location,
      price: venueData.price,
      maxGuests: venueData.maxGuests,
      meta: venueData.meta,
    };

    console.log("Submitting data:", submitData);

    try {
      await updateVenue(id, submitData, token, apiKey);
      alert("Venue updated successfully!");
      navigate(`/venue/${id}`);
    } catch (err) {
      setError("Failed to update venue. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this venue?");
    if (confirmDelete) {
      try {
        await deleteVenue(id, token, apiKey);
        alert("Venue deleted successfully!");
        navigate("/profile");
      } catch (err) {
        setError("Failed to delete venue. Please try again.");
      }
    }
  };

  return (
    <Container>
      <Helmet>
        <title>Edit venue | Holidaze</title>
        <meta
          name="description"
          content={"Edit your venue details, update pricing, availability, and more to keep your listing fresh and relevant."}
        />
      </Helmet>

      {error && <div className="alert alert-danger">{error}</div>}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Container fluid="md" className="d-flex justify-content-center pt-5 min-vh-100">
          <Row className="w-100">
            <Col xs={12} md={8} lg={6} className="mx-auto">
              <div className="form-box mt-5 mb-5">
                <h3 className="fs-4 mb-4">Edit Venue</h3>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-4" controlId="formVenueName">
                    <Form.Label className="mb-0">Venue name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={venueData.name}
                      onChange={handleInputChange}
                      placeholder="Enter venue name"
                      required
                    />
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
                      value={venueData.location.address}
                      onChange={handleInputChange}
                      placeholder="Enter venue address"
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-4" controlId="formVenueCity">
                    <Form.Label className="mb-0">City</Form.Label>
                    <Form.Control
                      type="text"
                      name="city"
                      value={venueData.location.city}
                      onChange={handleInputChange}
                      placeholder="Enter city"
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-4" controlId="formVenuePrice">
                    <Form.Label className="mb-0">Price per night</Form.Label>
                    <Form.Control
                      type="number"
                      name="price"
                      value={venueData.price}
                      onChange={handleInputChange}
                      placeholder="Enter price"
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-4" controlId="formMaxGuests">
                    <Form.Label className="mb-0">Max Guests</Form.Label>
                    <Form.Control
                      type="number"
                      name="maxGuests"
                      value={venueData.maxGuests}
                      onChange={handleInputChange}
                      placeholder="Enter max guests"
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-4" controlId="formVenueAmenities">
                    <Form.Label>Amenities</Form.Label>
                    <Form.Check type="checkbox" name="wifi" label="WiFi" checked={venueData.meta.wifi} onChange={handleInputChange} />
                    <Form.Check type="checkbox" name="parking" label="Parking" checked={venueData.meta.parking} onChange={handleInputChange} />
                    <Form.Check type="checkbox" name="breakfast" label="Breakfast" checked={venueData.meta.breakfast} onChange={handleInputChange} />
                    <Form.Check type="checkbox" name="pets" label="Pets Allowed" checked={venueData.meta.pets} onChange={handleInputChange} />
                  </Form.Group>

                  <Button variant="primary" className="cta-button" type="submit" disabled={loading}>
                    {loading ? "Updating..." : "Update Venue"}
                  </Button>
                  <Button variant="danger" className="cta-button delete-btn" onClick={handleDelete} disabled={loading} style={{ marginLeft: "10px" }}>
                    Delete Venue
                  </Button>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      )}
    </Container>
  );
};

export default EditVenuePage;
