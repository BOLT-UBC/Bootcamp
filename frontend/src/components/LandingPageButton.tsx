import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPageButton = ({ text, path }) => {
  const navigate = useNavigate();

  return (
    <button
      style={{
        backgroundColor: "#C7512A",
        color: "#fdf9f7",
        border: "none",
        padding: "10px 20px",
        fontSize: "16px",
        fontWeight: "bold",
        borderRadius: "10px",
        cursor: "pointer",
        marginRight: "1rem",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
      }}
      onClick={() => navigate(path)}
    >
      {text}
    </button>
  );
};

export default LandingPageButton;
