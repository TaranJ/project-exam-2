import React from "react";

import { Navbar, Nav, Container } from "react-bootstrap";

function Header() {
  return (
    <Navbar style={{ backgroundColor: "#566D8C" }} variant="dark" expand="lg">
      <Container fluid>
        <Navbar.Brand href="#home">Holidaze</Navbar.Brand>
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
