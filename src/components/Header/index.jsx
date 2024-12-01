import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../images/logo-holidaze.png";
import { load } from "../../utils/storage/load";
import { logout } from "../../auth/logout";

function Header() {
  const token = load("token");
  const navigate = useNavigate();

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
            {token ? (
              <Nav.Item>
                <Link to="/profile" className="nav-link">
                  Profile
                </Link>
              </Nav.Item>
            ) : (
              <Nav.Item>
                <Link to="/login" className="nav-link">
                  Login
                </Link>
              </Nav.Item>
            )}
            {token && (
              <Nav.Item>
                <Link
                  to="#logout"
                  className="nav-link"
                  onClick={(e) => {
                    e.preventDefault();
                    logout(navigate);
                  }}
                >
                  Logout
                </Link>
              </Nav.Item>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
