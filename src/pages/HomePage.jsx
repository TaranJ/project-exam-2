import React from "react";
import heroImage from "../images/ai-generated-8774912_1920.jpg";

function HomePage() {
  return (
    <div>
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
        <div className="hero-overlay d-flex flex-column align-items-center justify-content-center">
          <h1 className="mb-3 fs-4 text-center">Get ready for your next holiday!</h1>
          <div className="cta-buttons">
            <button className="btn cta-button me-2">Register</button>
            <button className="btn">Login</button>
          </div>
        </div>
      </div>

      <div className="container my-5">
        <h2 className="mb-4">Recommended Accommodations</h2>
      </div>
    </div>
  );
}

export default HomePage;
