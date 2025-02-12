import React from "react";
import { useNavigate } from "react-router-dom";

import "./LandingPageButton.css";

const LandingPageButton = ({ text, path }) => {
  const navigate = useNavigate();

  return (
    <button
      className="landing-button"
      onMouseEnter={(e) => {
        const target = e.target as HTMLButtonElement;
        target.style.backgroundColor = "#A63E1E"; // Darker shade on hover
        target.style.transform = "translateY(-3px)"; // Bobbing effect
      }}
      onMouseLeave={(e) => {
        const target = e.target as HTMLButtonElement;
        target.style.backgroundColor = "#C7512A"; // Original color
        target.style.transform = "translateY(0)";
      }}
      onClick={() => navigate(path)}
    >
      {text}
    </button>
  );
};

export default LandingPageButton;
