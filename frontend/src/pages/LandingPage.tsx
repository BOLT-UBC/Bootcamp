import React from "react";
import Title from "./sections/Title";
import Schedule from "./sections/Schedule";
import About from "./sections/About";
import Judges from "./sections/Judges";
import FAQ from "./sections/FAQ";
import Sponsors from "./sections/Sponsors";

import "./LandingPage.css";

import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <Title />
      <About />
      <Schedule />
      <Judges />
      <FAQ />
      <Sponsors />
      <h1>Booot camp stuff here</h1>
      <button onClick={() => navigate("/registration")}>
        Go to register rn PLSSSSSS
      </button>
    </div>
  );
}
