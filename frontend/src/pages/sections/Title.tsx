import React from "react";
import "./Title.css";
import "../LandingPage.css";
import Rocket from "../../components/Rocket";
import LandingPageButton from "../../components/LandingPageButton";

export default function Title() {
  return (
    <div className="title-gradient">
      <div className="title-background">
        <Rocket targetDate="2025-02-10T23:59:59" />
        <div className="title-content">
          <h1>Bootcamp</h1>
          <h2>March 9-10, 2025 | BOLT UBC</h2>
          <div className="button-container">
            {/* Replace with custom button component */}
            <LandingPageButton text="Register Now" />
            <LandingPageButton text="View Portal" />
          </div>
        </div>
      </div>
    </div>
  );
}
