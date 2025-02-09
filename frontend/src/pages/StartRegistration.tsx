import React from "react";
import { useNavigate } from "react-router-dom";
import "./RegisterPage.css";
import { Link } from "react-router-dom";

export default function StartRegistration() {
  const navigate = useNavigate();
  return (
    <div className="container register-gradient">
      <div className="register-content">
        <h1 className="register-title">Register</h1>
        <p className="register-subtitle">
          Already registered for Bootcamp? View your status in{" "}
          <Link to="/portal" className="portal-link">
            your portal
          </Link>{" "}
          or go back {" "}
          <Link to="/" className="portal-link">
            home
          </Link>{" "}
          !
        </p>

        <div className="register-form">
          <h2 className="form-title">BOLT UBC: 2025 Bootcamp Registration</h2>
          <p className="bootcamp-info">
            <u>
              <b>BOLT Bootcamp Attendees</b>
            </u>
          </p>
          <p>
            THE ANNUAL BOLT BOOTCAMP IS BACK AND BETTER THAN EVER.
            <br />
            <strong>Deadline to register: Feb 24th 2025 at 11:59pm</strong>
          </p>
          <p>
            This Data Bootcamp is a series of data-focused events and a
            competition where teams work together to solve a given case and
            present in front of a panel of professional judges.
          </p>
          <b>
            <p>Food & Drinks will be served for all in-person events.</p>
          </b>
          <p>
            First time participating in a case competition? Don’t worry! We will
            provide workshops, networking opportunities, and more to get you and
            your team prepared to solve this case.
          </p>
          <h3>WHEN ⏰:</h3>
          <ul>
            <li>Wednesday, Feb 26th: Case Release</li>
            <li>
              Saturday, Mar 1st (in-person): Case Workshop and Networking
              Session
            </li>
            <li>Tuesday, Mar 4 (Zoom): Online Workshop</li>
            <li>Wednesday, March 5: Submission Deadline</li>
            <li>Saturday, March 8 (in-person): Final Case Presentations</li>
          </ul>
          <p>
            Contact us at our email:{" "}
            <a href="mailto:boltubc@gmail.com" className="email-link">
              boltubc@gmail.com
            </a>{" "}
            if you have any questions!
          </p>
          <div className="button-row-single">
            <button
              onClick={() => navigate("/registration/userInfo")}
              className="continue-button"
            >
              Next
            </button>
          </div>
        </div>
      </div>
      <div className="planet" />
    </div>
  );
}
