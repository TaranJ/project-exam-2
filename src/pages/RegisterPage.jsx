import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Button, Form, Alert, Container, Row, Col, Modal } from "react-bootstrap";
import { registerUser } from "../auth/register";

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [venueManager, setVenueManager] = useState(false);

  const [fieldErrors, setFieldErrors] = useState({});
  const [generalError, setGeneralError] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFieldErrors({});
    setGeneralError("");

    const userData = {
      name,
      email,
      password,
      venueManager,
    };

    try {
      const response = await registerUser(userData);
      console.log("User registered successfully:", response);
      setShowSuccessModal(true);
    } catch (error) {
      if (error.errors) {
        const errors = {};
        error.errors.forEach((err) => {
          if (err.path) {
            const field = err.path[0];
            if (!errors[field]) {
              errors[field] = [];
            }
            errors[field].push(err.message);
          } else {
            setGeneralError(err.message);
          }
        });
        setFieldErrors(errors);
      } else if (error.message) {
        setGeneralError(error.message);
      } else {
        setGeneralError("An unexpected error occurred. Please try again.");
      }
    }
  };

  const handleModalClose = () => {
    setShowSuccessModal(false);
    window.location.href = "/login";
  };

  return (
    <div>
      <Helmet>
        <title>Register | Holidaze</title>
        <meta name="description" content={"Create a new account on Holidaze to book your next vacation rental and manage your bookings."} />
      </Helmet>
      <Container fluid="md" className="d-flex justify-content-center pt-5 min-vh-100">
        <Row className="w-100">
          <Col xs={12} md={8} lg={6} className="mx-auto">
            <div className="form-box mt-5">
              <Form onSubmit={handleSubmit}>
                {/* General Error */}
                {generalError && <Alert variant="danger">{generalError}</Alert>}

                <Form.Group className="mb-4" controlId="name">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your username"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    isInvalid={fieldErrors.name}
                    required
                  />
                  {fieldErrors.name && <Form.Text className="text-danger">{fieldErrors.name.join(", ")}</Form.Text>}
                </Form.Group>

                <Form.Group className="mb-4" controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    isInvalid={fieldErrors.email}
                    required
                  />
                  {fieldErrors.email && <Form.Text className="text-danger">{fieldErrors.email.join(", ")}</Form.Text>}
                </Form.Group>

                <Form.Group className="mb-4" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    isInvalid={fieldErrors.password}
                    required
                  />
                  {fieldErrors.password && <Form.Text className="text-danger">{fieldErrors.password.join(", ")}</Form.Text>}
                </Form.Group>

                <Form.Group className="mb-4" controlId="venueManager">
                  <Form.Label className="mb-0">Do you want to register as a venue manager?</Form.Label>
                  <p className="text-muted mb-2">This means you can post your own accommodations for others to book.</p>
                  <Form.Check type="checkbox" label="Yes" checked={venueManager} onChange={() => setVenueManager((prev) => !prev)} />
                </Form.Group>

                <Button variant="primary" type="submit" className="cta-button w-100">
                  Register
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Success Modal */}
      <Modal show={showSuccessModal} onHide={handleModalClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Registration Successful</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Your account has been created successfully! You can now log in to your account.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" className="cta-button" onClick={handleModalClose}>
            Go to Login
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default RegisterPage;
