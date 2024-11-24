import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../../images/logo-holidaze.png";

function Header() {
  return (
    <Navbar className="custom-navbar" variant="dark" expand="lg">
      <Container className="navbar-container">
        <Navbar.Brand as={Link} to="/">
          <img src={logo} alt="Holidaze Logo" className="navbar-logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Item>
              <Link to="/" className="nav-link">
                Home
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/browse" className="nav-link">
                Browse accommodations
              </Link>
            </Nav.Item>
          </Nav>
          <Nav>
            <Nav.Item>
              <Link to="/profile" className="nav-link">
                Profile
              </Link>
            </Nav.Item>
            <Nav.Link href="#logout">Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
