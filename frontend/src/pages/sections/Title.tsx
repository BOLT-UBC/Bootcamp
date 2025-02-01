import React from "react";
import "./Title.css";
import "../LandingPage.css";

export default function Title() {
  return (
    <div className="title-gradient">
      <div className="title-background">
        <div className="title-content">
          <h1>Bootcamp</h1>
          <h2>March 9-10, 2025 | BOLT UBC</h2>
          <div className="button-container">
            <button>Register Now</button>
            <button>Learn More</button>
          </div>
        </div>
      </div>
    </div>
  );
}
