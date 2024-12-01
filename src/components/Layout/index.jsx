import React from "react";
import Footer from "../Footer";
import Header from "../Header";

/**
 * PageWrapper component that provides a flexible layout wrapper with a minimum height of 100vh
 * to ensure the layout takes up the full viewport height.
 *
 * @component
 * @param {React.ReactNode} children - The content to be wrapped inside the layout.
 * @returns {JSX.Element} A wrapper div that ensures proper structure for the page layout.
 */
const PageWrapper = ({ children }) => <div className="d-flex flex-column min-vh-100">{children}</div>;

/**
 * MainContent component that acts as the main content container.
 * It grows to fill available space within the PageWrapper.
 *
 * @component
 * @param {React.ReactNode} children - The main content to be displayed within the main container.
 * @returns {JSX.Element} A main tag containing the main content.
 */
const MainContent = ({ children }) => <main className="flex-grow-1">{children}</main>;

/**
 * Layout component that renders the header, main content, and footer within a responsive layout.
 * The Header and Footer are rendered once, while the main content is injected dynamically.
 *
 * @component
 * @param {React.ReactNode} children - The content to be rendered inside the main section.
 * @returns {JSX.Element} A full-page layout including Header, MainContent, and Footer.
 */
function Layout({ children }) {
  return (
    <PageWrapper>
      <Header />
      <MainContent>{children}</MainContent>
      <Footer />
    </PageWrapper>
  );
}

export default Layout;
