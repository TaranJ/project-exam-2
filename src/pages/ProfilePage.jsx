import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate, Link } from "react-router-dom";
import { Container, Row, Col, Button, Image, Modal, Form } from "react-bootstrap";
import { load } from "../utils/storage/load";
import { fetchAllBookingsForUser } from "../utils/api/fetchbookings";
import { fetchVenuesForManager, fetchVenueById } from "../utils/api/fetchvenues";
import { updateProfile } from "../utils/api/updateprofile";

const ProfilePage = () => {
  const [userBookings, setUserBookings] = useState([]);
  const [userVenues, setUserVenues] = useState([]);
  const [bookingsData, setBookingsData] = useState({});
  const [loading, setLoading] = useState(true);
  const [bookingsLoading, setBookingsLoading] = useState(true);
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

  useEffect(() => {
    const fetchVenuesAndBookings = async () => {
      if (userVenues.length === 0) return;
      setBookingsLoading(true);
      const bookingsMap = {};

      try {
        for (const venue of userVenues) {
          const response = await fetchVenueById(venue.id);
          if (response.data) {
            bookingsMap[venue.id] = response.data.bookings || [];
          }
        }
        setBookingsData(bookingsMap);
      } catch (err) {
        console.error("Error fetching bookings for venues:", err);
      } finally {
        setBookingsLoading(false);
      }
    };

    fetchVenuesAndBookings();
  }, [userVenues]);

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
      <Helmet>
        <title>{profile?.name} | Holidaze</title>
        <meta name="description" content={"View and manage your personal information, bookings, and preferences on your Holidaze profile."} />
      </Helmet>
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
          <Container fluid className="my-5">
            <div className="mb-4">
              <h2 className="fs-5">Managed Venues</h2>
            </div>
            <div className="row justify-content-center">
              {loading ? (
                <p>Loading venues...</p>
              ) : userVenues.length === 0 ? (
                <p>No venues managed yet.</p>
              ) : (
                userVenues.map((venue) => (
                  <div key={venue.id} className="col-12 col-md-6 mb-4">
                    <div className="card">
                      {/* Image Row */}
                      <div className="row">
                        <div className="col-12">
                          <Link to={`/venue/${venue.id}`}>
                            <img
                              src={venue.media[0]?.url || "https://via.placeholder.com/300"}
                              className="browse-img w-100 profile-venue-img"
                              alt={venue.name || "Venue image"}
                            />
                          </Link>
                        </div>
                      </div>
                      {/* Information Row */}
                      <div className="row">
                        <div className="col-3">
                          <div className="card-body">
                            <h5 className="card-title mb-1">{venue.name}</h5>
                            <p className="card-text mb-3">
                              {venue.description?.length > 100
                                ? venue.description.slice(0, 100) + "..."
                                : venue.description || "No description available"}
                            </p>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="card-body">
                            <h5 className="card-title mb-1">Bookings</h5>
                            {bookingsLoading ? (
                              <p>Loading bookings...</p>
                            ) : bookingsData[venue.id]?.length > 0 ? (
                              <ul className="bookings-list">
                                {bookingsData[venue.id].map((booking) => (
                                  <li key={booking.id}>
                                    {new Date(booking.dateFrom).toLocaleDateString()} - {new Date(booking.dateTo).toLocaleDateString()} (
                                    {booking.guests} guests)
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <p>No bookings yet.</p>
                            )}
                          </div>
                        </div>
                        <div className="col-3">
                          <div className="card-body text-center">
                            <Link to={`/edit-venue/${venue.id}`}>
                              <Button className="btn btn-link edit-venue-btn">Edit Venue</Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </Container>
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
