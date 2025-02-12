import React from "react";
import { useNavigate } from "react-router-dom";

import "./LandingPageButton.css";

const LandingPageButton = ({ text, path }) => {
  const navigate = useNavigate();

  return (
    <button className="landing-button" onClick={() => navigate(path)}>
      {text}
    </button>
  );
};

export default LandingPageButton;
