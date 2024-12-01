import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Button, Form, Spinner, Alert, Container, Row, Col } from "react-bootstrap";
import { loginUser } from "../auth/login";

/**
 * LoginPage component allows users to log in to their account using email and password.
 * It manages the submission of login credentials and handles loading and error states.
 *
 * @component
 */
function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Handles form submission, attempts to log in the user.
   * If the login is successful, the user is redirected to the home page.
   * If there's an error, an error message is displayed.
   *
   * @async
   * @function handleSubmit
   * @param {Object} e - The submit event object.
   * @returns {void}
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await loginUser(email, password);
      console.log("Login successful:", response);
      window.location.href = "/";
    } catch (error) {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <Helmet>
        <title>Login | Holidaze</title>
        <meta name="description" content={"Log in to your Holidaze account to manage bookings, edit your profile, and explore exclusive offers."} />
      </Helmet>

      <Container fluid="md" className="d-flex justify-content-center pt-5 min-vh-100">
        <Row className="w-100">
          <Col xs={12} md={8} lg={6} className="mx-auto">
            <div className="form-box mt-5">
              <Form onSubmit={handleSubmit}>
                {/* Email Input */}
                <Form.Group className="mb-4" controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </Form.Group>

                {/* Password Input */}
                <Form.Group className="mb-4" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                {/* Display error message */}
                {error && <Alert variant="danger">{error}</Alert>}

                {/* Submit Button */}
                <Button variant="primary" type="submit" className="cta-button w-100" disabled={loading}>
                  {loading ? <Spinner animation="border" size="sm" /> : "Login"}
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default LoginPage;
