import React from "react";
import { useNavigate } from "react-router-dom";

import "./LandingPageButton.css";

const LandingPageButton = ({ text, path }) => {
  const navigate = useNavigate();

  return (
    <button
      style={{
        backgroundColor: "#C7512A",
        color: "#fdf9f7",
        border: "none",
        padding: "15px 25px",
        fontSize: "25px",
        fontWeight: "bold",
        borderRadius: "12px",
        cursor: "pointer",
        marginRight: "2rem",
        boxShadow: "0px 10px 8px rgba(0, 0, 0, 0.5)",
        textShadow: "0px 4px 4px rgba(0, 0, 0, 0.5)",
        transition: "background-color 0.3s ease, transform 0.2s ease",
      }}
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
