import React, { useEffect, useState } from "react";
import { Form, Button, Col, Row, Container } from "react-bootstrap";
import { fetchVenues } from "../utils/api";
import heroImage from "../images/hotel-1831072_1920.jpg";

function BrowsePage() {
  const [venues, setVenues] = useState([]);
  const [visibleVenues, setVisibleVenues] = useState(15);

  useEffect(() => {
    const getVenues = async () => {
      try {
        const fetchedVenues = await fetchVenues();
        console.log("Fetched venues:", fetchedVenues);
        setVenues(fetchedVenues.data);
      } catch (error) {
        console.error("Error in fetching venues:", error);
      }
    };

    getVenues();
  }, []);

  const handleViewMore = () => {
    setVisibleVenues((prev) => prev + 15);
  };

  return (
    <div className="browsepage">
      {/* Search Section */}
      <div
        className="search-section pt-5 mt-4"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "40vh",
          position: "relative",
          color: "white",
        }}
      >
        <div className="hero-overlay d-flex align-items-center justify-content-center">
          <Form className="w-75">
            <Row>
              <Col className="col-9">
                <Form.Control type="text" placeholder="Search for accommodations" />
              </Col>
              <Col>
                <Button variant="primary" type="submit" className="cta-button search-btn">
                  Search
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
      </div>

      {/* Content Section */}
      <Container fluid className="my-5">
        <div className="mb-4">
          <h2 className="fs-5">Latest accommodations</h2>
        </div>
        <div className="row justify-content-center">
          {venues.length === 0 ? (
            <p>No accommodations found.</p>
          ) : (
            venues.slice(0, visibleVenues).map((venue) => (
              <div key={venue.id} className="col-12 mb-4">
                <div className="card">
                  <div className="row">
                    <div className="col-12 col-md-5 d-flex align-items-center">
                      <div className="card-body">
                        <h5 className="card-title mb-3">{venue.name}</h5>
                        <p className="card-text mb-5">
                          {venue.description.length > 100 ? venue.description.slice(0, 100) + "..." : venue.description}
                        </p>
                        <p className="mb-3">Price: {venue.price} NOK</p>
                        <Button href={`/venue/${venue.id}`} variant="primary" className="cta-button">
                          Book
                        </Button>
                      </div>
                    </div>
                    <div className="col-12 col-md-7">
                      <img src={venue.media[0]?.url} className="browse-img" alt={venue.name} />
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        {/* View More Button */}
        {venues.length > visibleVenues && (
          <div className="text-center mt-4">
            <Button variant="outline-primary" onClick={handleViewMore}>
              View More
            </Button>
          </div>
        )}
      </Container>
    </div>
  );
}

export default BrowsePage;
