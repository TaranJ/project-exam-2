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
        <Col md={2} className="pe-0">
          <Image src={profile?.avatar?.url} alt={profile?.avatar?.alt} style={{ width: "100px", height: "100px", objectFit: "cover" }} />
          <p>
            <Button variant="link" className="ps-0 pt-3 update-profile" onClick={() => setShowModal(true)}>
              Update your profile
            </Button>
          </p>
        </Col>
        <Col md={3} className="align-content-center">
          <h3 className="text-uppercase">{profile?.name}</h3>
          <p>{profile?.bio || "No bio available."}</p>
        </Col>

        {/* Venue Manager Section */}
        {profile?.venueManager && (
          <Col md={3} className="align-content-center">
            <h4 className="fs-5">Venue manager</h4>
            <p>You currently manage {profile._count.venues} venues.</p>
          </Col>
        )}

        {/* Conditional rendering of the Contact Section based on venueManager */}
        {profile?.venueManager && (
          <Col md={3} className="align-content-center">
            <h4 className="fs-5">Contact</h4>
            <p>Email: {profile.email}</p>
          </Col>
        )}
      </Row>

      {/* Conditional rendering for Venue Manager sections */}
      {profile?.venueManager ? (
        <>
          {/* Managed Venues Section */}
          <Container fluid className="my-5">
            <Row className="d-flex justify-content-between align-items-center mb-4">
              <Col>
                <h2 className="fs-5">Managed Venues</h2>
              </Col>
              <Col className="text-end">
                <Button variant="primary cta-button" onClick={handleCreateVenue}>
                  Create Venue
                </Button>
              </Col>
            </Row>

            <div className="row justify-content-center">
              {loading ? (
                <div className="loader-wrapper">
                  <div className="loader"></div>
                </div>
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
                              <Button className="btn btn-link edit-venue-btn">Edit venue</Button>
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
          <Container fluid className="my-5">
            <div className="mb-4">
              <h2 className="fs-5">Upcoming Bookings</h2>
            </div>
            <div className="row justify-content-center">
              {loading ? (
                <div className="loader-wrapper">
                  <div className="loader"></div>
                </div>
              ) : userBookings.length === 0 ? (
                <p>No upcoming bookings.</p>
              ) : (
                userBookings.map((booking) => (
                  <div key={booking.id} className="col-12 col-md-6 mb-4">
                    <div className="card">
                      {/* Image Row */}
                      <div className="row">
                        <div className="col-12">
                          <Link to={`/venue/${booking.venue.id}`}>
                            <img
                              src={booking.venue.media[0]?.url || "https://via.placeholder.com/300"}
                              className="browse-img w-100 profile-venue-img"
                              alt={booking.venue.name || "Booking venue image"}
                            />
                          </Link>
                        </div>
                      </div>
                      {/* Information Row */}
                      <div className="row">
                        <div className="col-3">
                          <div className="card-body pt-2">
                            <h5 className="card-title mb-1">{booking.venue.name}</h5>
                          </div>
                        </div>
                        <div className="col-9 d-flex align-items-center">
                          <div className="card-body pt-2">
                            <p className="card-text mb-1">
                              <strong>Date:</strong> {new Date(booking.dateFrom).toLocaleDateString()} -{" "}
                              {new Date(booking.dateTo).toLocaleDateString()}
                            </p>
                            <p className="card-text mb-1">
                              <strong>Guests:</strong> {booking.guests}
                            </p>
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
          <Button variant="secondary" className="cta-button cancel-btn" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" className="cta-button" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ProfilePage;
