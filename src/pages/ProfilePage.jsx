import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Image, Modal, Form } from "react-bootstrap";
import { load } from "../utils/storage/load";
import { fetchAllBookingsForUser } from "../utils/api/fetchbookings";
import { updateProfile } from "../utils/api/updateprofile";
import { fetchVenuesForManager } from "../utils/api/fetchvenues";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const [userBookings, setUserBookings] = useState([]);
  const [userVenues, setUserVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [updatedProfile, setUpdatedProfile] = useState({
    bio: "",
    avatar: { url: "", alt: "" },
  });

  const profile = load("profile");
  const navigate = useNavigate();

  useEffect(() => {
    const getUserData = async () => {
      if (!profile) return;

      if (!updatedProfile.bio) {
        setUpdatedProfile((prev) => ({
          ...prev,
          bio: profile.bio || "",
          avatar: {
            url: profile.avatar?.url || "",
            alt: profile.avatar?.alt || "",
          },
        }));
      }

      if (profile?.venueManager && userVenues.length === 0) {
        try {
          const venues = await fetchVenuesForManager(profile.name);
          if (venues.length > 0) {
            setUserVenues(venues);
          }
        } catch (err) {
          console.error("Error fetching venues:", err);
        }
      } else if (!profile?.venueManager && userBookings.length === 0) {
        try {
          const allBookings = await fetchAllBookingsForUser();
          const userBookings = allBookings.filter((booking) => booking.customer.email === profile.email);
          if (userBookings.length > 0) {
            setUserBookings(userBookings);
          }
        } catch (err) {
          console.error("Error fetching bookings:", err);
        }
      }

      setLoading(false);
    };

    getUserData();
  }, [profile?.name, profile?.venueManager, userVenues.length, userBookings.length]);

  const handleSubmit = async () => {
    try {
      const newProfile = await updateProfile(profile.name, updatedProfile);
      setShowModal(false);
      alert("Profile updated successfully");
    } catch (error) {
      alert("Failed to update profile. Please try again.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("avatar")) {
      const key = name.split(".")[1];
      setUpdatedProfile((prev) => ({
        ...prev,
        avatar: {
          ...prev.avatar,
          [key]: value,
        },
      }));
    } else {
      setUpdatedProfile((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleCreateVenue = () => {
    navigate("/new-venue");
  };

  return (
    <Container className="my-5">
      {/* Profile Section */}
      <Row className="mb-5">
        <Col md={3} className="text-center">
          <Image
            src={profile?.avatar?.url}
            alt={profile?.avatar?.alt}
            roundedCircle
            style={{ width: "150px", height: "150px", objectFit: "cover" }}
          />
        </Col>
        <Col md={9}>
          <h3>{profile?.name}</h3>
          <p>{profile?.bio || "No bio available."}</p>
          <p>
            <Button variant="link" onClick={() => setShowModal(true)}>
              Update your profile
            </Button>
          </p>
        </Col>
      </Row>
      {profile?.venueManager ? (
        <>
          {/* Venue Manager Section */}
          <Row className="mb-4">
            <Col>
              <h4>Venue Manager</h4>
              <p>You currently manage {profile._count.venues} venues.</p>
            </Col>
          </Row>

          {/* Contact Section */}
          <Row className="mb-4">
            <Col>
              <h4>Contact</h4>
              <p>Email: {profile.email}</p>
            </Col>
          </Row>
          <Button variant="primary cta-button" onClick={handleCreateVenue}>
            Create Venue
          </Button>

          {/* Managed Venues Section */}
          <Row>
            <Col>
              <h4>Managed Venues</h4>
              {loading ? (
                <p>Loading venues...</p>
              ) : userVenues.length > 0 ? (
                <ul>
                  {userVenues.map((venue) => (
                    <li key={venue.id}>
                      <strong>{venue.name}</strong> - Located in {venue.location?.city || "N/A"}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No venues managed yet.</p>
              )}
            </Col>
          </Row>
        </>
      ) : (
        <>
          {/* Upcoming Bookings Section */}
          <Row>
            <Col>
              <h4>Upcoming Bookings</h4>
              {loading ? (
                <p>Loading bookings...</p>
              ) : userBookings.length > 0 ? (
                <ul>
                  {userBookings.map((booking) => (
                    <li key={booking.id}>
                      <strong>{booking.venue.name}</strong> - {new Date(booking.dateFrom).toLocaleDateString()}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No upcoming bookings.</p>
              )}
            </Col>
          </Row>
        </>
      )}
      {/* Modal for Editing Profile */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBio">
              <Form.Label>Bio</Form.Label>
              <Form.Control type="text" name="bio" value={updatedProfile.bio} onChange={handleInputChange} placeholder="Enter your bio" />
            </Form.Group>
            <Form.Group controlId="formAvatarUrl" className="mt-3">
              <Form.Label>Avatar URL</Form.Label>
              <Form.Control
                type="text"
                name="avatar.url"
                value={updatedProfile.avatar.url}
                onChange={handleInputChange}
                placeholder="Enter avatar image URL"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ProfilePage;
