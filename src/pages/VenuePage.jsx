import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Button, Container, Row, Col, Modal, Form, Table } from "react-bootstrap";
import Calendar from "react-calendar";
import { createBooking } from "../utils/api/createbooking";
import { load } from "../utils/storage/load";
import { fetchVenueById } from "../utils/api/fetchvenues";

function VenuePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // State for venue data
  const [venue, setVenue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for booked dates and selected dates
  const [bookedDates, setBookedDates] = useState([]);
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [numberOfGuests, setNumberOfGuests] = useState(1);

  // State for showing and hiding the booking modal
  const [showModal, setShowModal] = useState(false);

  const token = load("token");
  const loggedInUser = load("profile");

  useEffect(() => {
    const getVenueAndBookings = async () => {
      try {
        setLoading(true);

        const fetchedVenue = await fetchVenueById(id);
        const { data } = fetchedVenue;
        setVenue(data);

        const unavailableDates = data.bookings.flatMap((booking) => {
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
        setError("Error fetching venue data");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getVenueAndBookings();
  }, [id]);

  if (loading) {
    return (
      <div className="loader-wrapper venue-loader">
        <div className="loader"></div>
      </div>
    );
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

  const handleCheckInChange = (date) => {
    setCheckInDate(date);
    if (checkOutDate && date >= checkOutDate) {
      setCheckOutDate(null);
    }
  };

  const handleCheckOutChange = (date) => {
    if (date > checkInDate) {
      setCheckOutDate(date);
    }
  };

  const openBookingModal = () => {
    if (!checkInDate || !checkOutDate) {
      alert("Please select both check-in and check-out dates.");
      return;
    }

    if (!token) {
      alert("You must be logged in to make a booking.");
      navigate("/login");
      return;
    }

    setShowModal(true);
  };

  const handleBookingSubmit = async () => {
    const guests = Number(numberOfGuests);

    if (isNaN(guests) || guests <= 0) {
      alert("Please enter a valid number of guests.");
      return;
    }

    try {
      const bookingDetails = {
        dateFrom: checkInDate,
        dateTo: checkOutDate,
        guests,
        venueId: id,
      };

      const bookingResponse = await createBooking(bookingDetails);
      console.log("Booking successful:", bookingResponse);
      setShowModal(false);
      alert("Booking successful!");
    } catch (error) {
      console.error("Booking failed:", error);
      alert("Error creating booking. Please try again.");
    }
  };

  const handleEditVenue = () => {
    navigate(`/edit-venue/${id}`);
  };

  const isOwner = loggedInUser && loggedInUser.email === venue.owner.email;

  return (
    <div className="venue-page">
      <Helmet>
        <title>{venue.name} | Holidaze</title>
        <meta name="description" content={`Explore the details of venue: ${venue.name}.`} />
      </Helmet>
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
        {token && (
          <div className="mt-5 text-center">
            {isOwner ? (
              <>
                <Button variant="warning" size="lg" className="cta-button book-btn" onClick={handleEditVenue}>
                  Edit Venue
                </Button>
                <div className="owner-bookings mt-5">
                  <h4 className="text-center mb-3">Current Bookings</h4>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Check-In</th>
                        <th>Check-Out</th>
                        <th>Guests</th>
                        <th>Booker</th>
                      </tr>
                    </thead>
                    <tbody>
                      {venue.bookings.map((booking, index) => (
                        <tr key={booking.id}>
                          <td>{index + 1}</td>
                          <td>{new Date(booking.dateFrom).toLocaleDateString()}</td>
                          <td>{new Date(booking.dateTo).toLocaleDateString()}</td>
                          <td>{booking.guests}</td>
                          <td>{booking.customer.name}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </>
            ) : (
              <>
                <Button variant="primary" size="lg" className="cta-button book-btn" onClick={openBookingModal}>
                  Book
                </Button>
                <div className="calendar-container mt-5">
                  <h4 className="text-center mb-3">Select Your Stay Dates</h4>
                  <div className="calendar-wrapper">
                    <div className="calendar">
                      <h5>Check-in Date</h5>
                      <Calendar minDate={new Date()} value={checkInDate} onChange={handleCheckInChange} tileDisabled={isDateUnavailable} />
                    </div>
                    <div className="calendar">
                      <h5>Check-out Date</h5>
                      <Calendar
                        minDate={checkInDate || new Date()}
                        value={checkOutDate}
                        onChange={handleCheckOutChange}
                        tileDisabled={isDateUnavailable}
                      />
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </Container>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Booking Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Check-in Date</Form.Label>
              <Form.Control type="text" value={checkInDate?.toLocaleDateString()} readOnly />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Check-out Date</Form.Label>
              <Form.Control type="text" value={checkOutDate?.toLocaleDateString()} readOnly />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Number of Guests</Form.Label>
              <Form.Control type="number" min="1" value={numberOfGuests} onChange={(e) => setNumberOfGuests(e.target.value)} />
            </Form.Group>
            <Button variant="primary" onClick={handleBookingSubmit}>
              Confirm Booking
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default VenuePage;
