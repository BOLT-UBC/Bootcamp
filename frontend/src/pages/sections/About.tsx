import React from "react";
import "./About.css";
import "../LandingPage.css";
import PortalBoxWidget from "../../components/PortalBoxWidget";

export default function About() {
  return (
    <div className="about-background">
      <div className="display-screen-widget">
      <div className="display-screen">
        <h1 className="about-title">What is BOLT Bootcamp?</h1>
        <p className="about-content">
          BOLT UBC Bootcamp is our <b>flagship annual event</b>, bringing
          together students, industry professionals, and academic experts for a{" "}
          <b>
            week-long experience of learning, problem-solving, and networking
          </b>
          . Participants will engage in{" "}
          <b>workshops, networking sessions, and a case competition</b>, where
          they will apply{" "}
          <b>
            business strategy, data analytics, and project management skills
          </b>{" "}
          to tackle real-world problems.
        </p>
        <p>
          This year, we are excited to collaborate with{" "}
          <b>USS, WiDS, and WiCS</b>, providing students with an opportunity to
          gain valuable industry insights, develop technical and business
          skills, and connect with top professionals.
        </p>

        <div className="why-join">
          <h2>Why Join Bootcamp?</h2>
          <ul>
            <li>
              ✔ Gain <b>real-world experience</b> in business and data
              analytics.
            </li>
            <li>
              ✔ Develop critical skills in{" "}
              <b>problem-solving, teamwork, and storytelling.</b>
            </li>
            <li>
              ✔ Receive <b>mentorship and feedback</b> from industry leaders.
            </li>
            <li>
              ✔ Expand your{" "}
              <b>network with top professionals and recruiters.</b>
            </li>
            <li>
              ✔ Get the chance to <b>win prizes</b> and{" "}
              <b>gain recognition for your work.</b>
            </li>
          </ul>
        </div>
      </div>
      </div>
      <div className="computers"></div>
    </div>
  );
}
