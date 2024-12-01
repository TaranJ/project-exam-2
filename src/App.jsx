import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

// Components
import Layout from "./components/Layout";

// Pages
import HomePage from "./pages/HomePage";
import BrowsePage from "./pages/BrowsePage";
import ProfilePage from "./pages/ProfilePage";
import AboutPage from "./pages/AboutPage";
import RegisterPage from "./pages/RegisterPage";
import VenuePage from "./pages/VenuePage";
import LoginPage from "./pages/LoginPage";
import CreateVenuePage from "./pages/CreateVenuePage";
import EditVenuePage from "./pages/EditVenuepage";

/**
 * Main App component that sets up routing and layout for the application.
 *
 * This component renders the application's routing logic using React Router.
 * It defines the routes for various pages such as HomePage, BrowsePage, and ProfilePage.
 * All pages are wrapped inside the Layout component which provides a consistent layout structure.
 *
 * @returns {JSX.Element} The root component of the application with routing setup.
 */
function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/browse" element={<BrowsePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/venue/:id" element={<VenuePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/new-venue" element={<CreateVenuePage />} />
          <Route path="/edit-venue/:id" element={<EditVenuePage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
