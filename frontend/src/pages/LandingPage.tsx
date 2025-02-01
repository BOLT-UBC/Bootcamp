import React from "react";
import Title from "./sections/Title";
import Schedule from "./sections/Schedule";
import About from "./sections/About";
import Judges from "./sections/Judges";
import FAQ from "./sections/FAQ";
import Sponsors from "./sections/Sponsors";

import "./LandingPage.css";

export default function LandingPage() {
  return (
    <div classname="landing-page">
      <Title />
      <About />
      <Schedule />
      <Judges />
      <FAQ />
      <Sponsors />
    </div>
  );
}
