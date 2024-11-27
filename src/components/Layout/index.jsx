import React from "react";
import Footer from "../Footer";
import Header from "../Header";

const PageWrapper = ({ children }) => <div className="d-flex flex-column min-vh-100">{children}</div>;

const MainContent = ({ children }) => <main className="flex-grow-1">{children}</main>;

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
