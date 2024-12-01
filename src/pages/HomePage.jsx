import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import heroImage from "../images/ai-generated-8774912_1920.jpg";
import { fetchVenues } from "../utils/api/fetchvenues";

function HomePage() {
  const [venues, setVenues] = useState([]);

  useEffect(() => {
    const getVenues = async () => {
      try {
        const fetchedVenues = await fetchVenues();
        console.log("Fetched venues:", fetchedVenues);
        setVenues(fetchedVenues.data.slice(0, 4));
      } catch (error) {
        console.error("Error in fetching venues:", error);
      }
    };
    getVenues();
  }, []);

  return (
    <div>
      <Helmet>
        <title>Home | Holidaze</title>
        <meta name="description" content={"Welcome to Holidaze! Explore amazing venues and plan your next vacation with ease."} />
      </Helmet>
      <div
        className="hero-section"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "50vh",
          position: "relative",
          color: "white",
        }}
      >
        <div className="hero-overlay-home d-flex flex-column align-items-start justify-content-center">
          <h1 className="mb-3 fs-6 fw-light">Get ready for your next holiday!</h1>
          <div className="cta-buttons d-flex align-items-center">
            <Link to="/register">
              <button className="btn cta-button">Register</button>
            </Link>
            <p className="mx-4 fw-light mb-0 fs-4">|</p>
            <Link to="/login">
              <button className="btn cta-button-2">Login</button>
            </Link>
          </div>
        </div>
      </div>

      <div className="container my-5">
        <h2 className="mb-3 fs-5">Latest accommodations</h2>
        <div className="row">
          {venues.map((venue) => (
            <div className="col-md-3 mb-4" key={venue.id}>
              <Link to={`/venue/${venue.id}`} className="card-link">
                <div className="card home-card h-100">
                  <img src={venue.media[0]?.url || "https://via.placeholder.com/300x200"} className="card-img-top" alt={venue.name} />
                  <div className="card-body">
                    <h5 className="card-title">{venue.name}</h5>
                    <p className="card-text">{venue.description.length > 100 ? venue.description.slice(0, 100) + "..." : venue.description}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
