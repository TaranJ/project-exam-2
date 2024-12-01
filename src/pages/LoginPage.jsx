import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Button, Form, Spinner, Alert } from "react-bootstrap";
import { loginUser } from "../auth/login";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
      <Form onSubmit={handleSubmit}>
        {/* Email Input */}
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </Form.Group>

        {/* Password Input */}
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </Form.Group>

        {/* Display error message */}
        {error && <Alert variant="danger">{error}</Alert>}

        {/* Submit Button */}
        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? <Spinner animation="border" size="sm" /> : "Login"}
        </Button>
      </Form>
    </div>
  );
}

export default LoginPage;
