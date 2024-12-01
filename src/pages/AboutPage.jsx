import React from "react";
import { Helmet } from "react-helmet";

function AboutPage() {
  return (
    <div>
      <Helmet>
        <title>About Us | Holidaze</title>
        <meta name="description" content="Learn more about Holidaze and how we help you find the best places to stay for your next vacation." />
      </Helmet>
      <h2>About Holidaze</h2>
    </div>
  );
}

export default AboutPage;
