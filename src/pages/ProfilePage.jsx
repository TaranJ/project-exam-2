import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Image, Modal, Form } from "react-bootstrap";
import { load } from "../utils/storage/load";
import { fetchAllBookingsForUser } from "../utils/api/fetchbookings";
import { updateProfile } from "../utils/api/updateprofile";

const ProfilePage = () => {
  const [userBookings, setUserBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [updatedProfile, setUpdatedProfile] = useState({
    bio: "",
    avatar: { url: "", alt: "" },
  });

  const profile = load("profile");

  useEffect(() => {
    const getUserBookings = async () => {
      const email = profile?.email;
      if (!email) return [];

      const allBookings = await fetchAllBookingsForUser();
      const userBookings = allBookings.filter((booking) => booking.customer.email === email);

      setUserBookings(userBookings);
      setLoading(false);
    };

    if (profile) {
      setUpdatedProfile({
        bio: profile.bio || "",
        avatar: {
          url: profile.avatar?.url || "",
        },
      });
    }

    getUserBookings();
  }, []);

  const handleSubmit = async () => {
    try {
      const newProfile = await updateProfile(profile.name, updatedProfile);
      setShowModal(false); // Close the modal
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
