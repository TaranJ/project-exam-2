import React from "react";
import { Helmet } from "react-helmet";
import { Container, Row, Col, Image } from "react-bootstrap";
import heroImageAbout from "../images/seychelles-4916045_1920.jpg";
import img1 from "../images/cabin-7497449_1920.jpg";
import img2 from "../images/bedroom-8052036_1920.png";
import img3 from "../images/castle-3889535_1920.jpg";

/**
 * AboutPage component renders the "About Us" page of the Holidaze platform.
 * This page provides information about the platform's purpose, services, and features.
 * It includes a background image, a heading, a description of the platform, and images highlighting vacation rentals.
 *
 * @component
 */
function AboutPage() {
  return (
    <div>
      <Helmet>
        <title>About Us | Holidaze</title>
        <meta name="description" content="Learn more about Holidaze and how we help you find the best places to stay for your next vacation." />
      </Helmet>
      <div
        style={{
          backgroundImage: `url(${heroImageAbout})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "400px",
          width: "100%",
        }}
      ></div>
      <Container fluid className="my-5" style={{ maxWidth: "1200px" }}>
        <Row>
          <Col>
            <h1 className="text-uppercase heading">Holidaze</h1>
          </Col>
        </Row>
        <Row className="my-5">
          <Col md={6} className="pe-4">
            <p>
              At Holidaze, we make it easy for you to find the perfect place for your next vacation. Whether you're planning a weekend getaway or a
              long-term retreat, we have a wide range of vacation rentals to suit your needs.
            </p>{" "}
            <p>
              Holidaze offers a curated selection of vacation homes, villas, apartments, and unique stays across some of the most beautiful locations.
              Our platform connects you with hosts who are passionate about providing excellent accommodations for your holiday. From cozy getaways to
              luxurious retreats, we have something for everyone.
            </p>
          </Col>
          <Col md={6} className="ps-4">
            <p>
              With Holidaze, booking your next vacation is simple and stress-free. Our intuitive platform allows you to browse, compare, and book the
              best properties all in one place. We provide detailed listings, transparent pricing, and reliable reviews from other guests. Plus, our
              customer support team is always ready to help if you need assistance.
            </p>
          </Col>
        </Row>

        <Row className="my-5 justify-content-center">
          <Col md={4}>
            <Image src={img1} fluid alt="Cabin by a lake" className="mb-2 about-img" />
            <p>Find your perfect vacation spot.</p>
          </Col>
          <Col md={4}>
            <Image src={img2} fluid alt="Luxury bedroom with large window" className="mb-2 about-img" />
            <p>Experience luxury stays with Holidaze.</p>
          </Col>
          <Col md={4}>
            <Image src={img3} fluid alt="Old castle by a lake" className="mb-2 about-img" />
            <p>Adventure awaits in stunning destinations.</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default AboutPage;
