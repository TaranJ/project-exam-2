import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Image } from "react-bootstrap";
import { load } from "../utils/storage/load";
import { fetchAllBookingsForUser } from "../utils/api/fetchbookings";

const ProfilePage = () => {
  const [userBookings, setUserBookings] = useState([]);
  const [loading, setLoading] = useState(true);
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

    getUserBookings();
  }, []);

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
            <Button variant="link" onClick={() => alert("Go to profile edit page")}>
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
    </Container>
  );
};

export default ProfilePage;
