import React from "react";
import Title from "./sections/Title";
import Schedule from "./sections/Schedule";
import About from "./sections/About";
import Judges from "./sections/Judges";
import FAQ from "./sections/FAQ";
import Sponsors from "./sections/Sponsors";
import SectionSeparator from "../components/SectionSeparator";

import { supabase } from "../supabase.js";

import "./LandingPage.css";

import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      console.error("Google Sign-In Error:", error);
    }
  };

  return (
    <div className="landing-page">
      <Title />
      <SectionSeparator />
      <About />
      <SectionSeparator />
      <Schedule />
      <SectionSeparator />
      {/* <Judges /> */}
      {/* <SectionSeparator /> */}
      <FAQ />
      {/* <Sponsors /> */}
      <SectionSeparator />

      {/* <h1>Booot camp stuff here</h1>
      <button onClick={signInWithGoogle}>Go to register rn PLSSSSSS</button>

      <button onClick={() => navigate("/registration")}>Portall!</button> */}
    </div>
  );
}
