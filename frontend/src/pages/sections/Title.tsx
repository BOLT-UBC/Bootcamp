import React from "react";
import "./Title.css";
import "../LandingPage.css";
import Rocket from "../../components/Rocket";
import LandingPageButton from "../../components/LandingPageButton";

import { useNavigate } from "react-router-dom";

export default function Title() {
  return (
    <div className="title-gradient">
      <div className="title-background">
        <Rocket targetDate="2025-02-24T23:59:59" />
        <div className="title-content">
          <h1>Bootcamp</h1>
          <h2>March 9-10, 2025 | BOLT UBC</h2>
          <p>Register by Monday, February 24, 2025!</p>
          <div className="button-container">
            {/* Replace with custom button component */}
            <LandingPageButton text="Register Now" path="/registration" />
            <LandingPageButton text="View Portal" path="/portal" />
          </div>
        </div>
      </div>
    </div>
  );
}
