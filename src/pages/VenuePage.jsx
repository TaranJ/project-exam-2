import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Container, Row, Col } from "react-bootstrap";
import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";
import { fetchVenueById, fetchBookingsForVenue } from "../utils/api";

function VenuePage() {
  const { id } = useParams();
  const [venue, setVenue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookedDates, setBookedDates] = useState([]);

  useEffect(() => {
    const getVenueAndBookings = async () => {
      try {
        setLoading(true);
        const [fetchedVenue, bookings] = await Promise.all([fetchVenueById(id), fetchBookingsForVenue(id)]);

        setVenue(fetchedVenue.data);

        const unavailableDates = bookings.flatMap((booking) => {
          const dateFrom = new Date(booking.dateFrom);
          const dateTo = new Date(booking.dateTo);
          const datesInRange = [];

          for (let d = dateFrom; d <= dateTo; d.setDate(d.getDate() + 1)) {
            datesInRange.push(new Date(d));
          }

          return datesInRange;
        });

        setBookedDates(unavailableDates);
      } catch (error) {
        setError("Error fetching venue or bookings");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getVenueAndBookings();
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

  const isDateUnavailable = ({ date }) => {
    return bookedDates.some((bookedDate) => bookedDate.toDateString() === date.toDateString());
  };

  return (
    <div className="venue-page">
      <Container className="my-5" style={{ maxWidth: "1200px" }}>
        <div className="venue-image mb-5">
          <img src={venue.media[0]?.url} alt={venue.name} className="img-fluid" style={{ maxHeight: "500px", width: "100%", objectFit: "cover" }} />
        </div>
        <Row className="g-4">
          <Col md={6}>
            <h2>{venue.name}</h2>
            <p>{venue.description}</p>
          </Col>
          <Col md={6} className="venue-details">
            <p className="mb-0">
              <strong>Address:</strong> {venue.location.address}
            </p>
            <p>
              <strong>City:</strong> {venue.location.city}
            </p>
            <p className="mb-0">
              <strong>Wifi:</strong> {venue.meta.wifi ? "Yes" : "No"}
            </p>
            <p className="mb-0">
              <strong>Parking:</strong> {venue.meta.parking ? "Yes" : "No"}
            </p>
            <p className="mb-0">
              <strong>Breakfast:</strong> {venue.meta.breakfast ? "Yes" : "No"}
            </p>
            <p>
              <strong>Pets:</strong> {venue.meta.pets ? "Yes" : "No"}
            </p>
            <h3 className="fs-5 mt-3">
              <strong>Price:</strong> {venue.price} NOK
            </h3>
          </Col>
        </Row>
        <div className="mt-5 text-center">
          <Button variant="primary" size="lg" className="cta-button book-btn">
            Book
          </Button>
        </div>
        <div className="calendar-container mt-5">
          <h4 className="text-center mb-3">Available Dates</h4>
          {/* Wrapper for two calendars */}
          <div className="calendar-wrapper">
            <Calendar minDate={new Date()} tileDisabled={isDateUnavailable} />
            <Calendar minDate={new Date()} tileDisabled={isDateUnavailable} />
          </div>
        </div>
      </Container>
    </div>
  );
}

export default VenuePage;
