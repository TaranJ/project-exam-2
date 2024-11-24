import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../../images/logo-holidaze.png";

function Footer() {
  return (
    <Container fluid className="footer">
      <Row className="text-center">
        <Col>
          <img src={logo} alt="Holidaze Logo" className="footer-logo" />
        </Col>
        <Col className="footer-contact">
          <p>
            <Link to="/about" className="footer-link">
              About us
            </Link>
          </p>
          <p>+47 90 90 15 15</p>
          <p>post@holidaze.com</p>
        </Col>
      </Row>
    </Container>
  );
}

export default Footer;
