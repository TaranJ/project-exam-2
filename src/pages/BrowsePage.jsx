import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Form, Button, Col, Row, Container } from "react-bootstrap";
import { searchVenues } from "../utils/search";
import { fetchVenues } from "../utils/api/fetchvenues";
import heroImage from "../images/hotel-1831072_1920.jpg";

/**
 * BrowsePage component displays a list of venues available for booking on Holidaze.
 * It includes a search bar to filter venues based on user input and a "View More" button
 * to load more venues in batches.
 *
 * @component
 *
 * @returns {JSX.Element} The BrowsePage component displaying venues and a search form.
 */
function BrowsePage() {
  const [venues, setVenues] = useState([]);
  const [visibleVenues, setVisibleVenues] = useState(15);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  /**
   * Fetches the venues when the component is mounted or when the query changes.
   * The venues are either fetched from an API or filtered based on the search query.
   */
  useEffect(() => {
    const getVenues = async () => {
      try {
        setLoading(true);
        const fetchedVenues = await fetchVenues("");
        setVenues(fetchedVenues.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error in fetching venues:", error);
      }
    };

    getVenues();
  }, []);

  /**
   * Handles the search functionality by calling the searchVenues API with the search query.
   * If the query is empty, it fetches the default list of venues.
   *
   * @param {React.FormEvent} e - The event triggered by the form submission.
   */
  const handleSearch = async (e) => {
    e.preventDefault();

    if (query.trim() === "") {
      setLoading(true);
      try {
        const fetchedVenues = await fetchVenues();
        setVenues(fetchedVenues.data);
        setVisibleVenues(15);
      } catch (error) {
        console.error("Error fetching venues:", error);
      } finally {
        setLoading(false);
      }
      return;
    }

    setLoading(true);
    try {
      const searchedVenues = await searchVenues(query);
      setVenues(searchedVenues.data);
      setVisibleVenues(15);
    } catch (error) {
      console.error("Error in search:", error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Increases the number of visible venues when the "View More" button is clicked.
   */
  const handleViewMore = () => {
    setVisibleVenues((prev) => prev + 15);
  };

  return (
    <div className="browsepage">
      <Helmet>
        <title>Browse | Holidaze</title>
        <meta name="description" content={"Browse through a variety of venues, from cozy homes to luxurious retreats, for your perfect getaway."} />
      </Helmet>
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
          <Form onSubmit={handleSearch} className="w-75">
            <Row>
              <Col className="col-9">
                <Form.Control type="text" placeholder="Search for accommodations" value={query} onChange={(e) => setQuery(e.target.value)} />
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
        {loading && (
          <div className="loader-wrapper browsepage-loader">
            <div className="loader"></div>
          </div>
        )}
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
                        <Link to={`/venue/${venue.id}`}>
                          <Button variant="primary" className="cta-button">
                            Book
                          </Button>
                        </Link>
                      </div>
                    </div>
                    <div className="col-12 col-md-7">
                      <Link to={`/venue/${venue.id}`}>
                        <img src={venue.media[0]?.url} className="browse-img" alt={venue.name} />
                      </Link>
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
            <Button variant="outline-primary" className="cta-button" onClick={handleViewMore}>
              View More
            </Button>
          </div>
        )}
      </Container>
    </div>
  );
}

export default BrowsePage;
