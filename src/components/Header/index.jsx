import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import logo from "../../images/logo-holidaze.png";

function Header() {
  return (
    <Navbar className="custom-navbar" variant="dark" expand="lg">
      <Container className="navbar-container">
        <Navbar.Brand href="#home">
          <img src={logo} alt="Holidaze Logo" className="navbar-logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#browse">Browse</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="#profile">Profile</Nav.Link>
            <Nav.Link href="#logout">Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
