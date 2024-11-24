import React from "react";
import { Container, Row, Col } from "react-bootstrap";
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
            <a href="#about" className="footer-link">
              About us
            </a>
          </p>
          <p>+47 90 90 15 15</p>
          <p>post@holidaze.com</p>
        </Col>
      </Row>
    </Container>
  );
}

export default Footer;
