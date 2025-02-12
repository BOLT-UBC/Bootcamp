import React from "react";
import { useNavigate } from "react-router-dom";
import "./RegisterPage.css";
import { Link } from "react-router-dom";

export default function StartRegistration() {
  const navigate = useNavigate();
  return (
    <div className="container register-gradient">
      <div className="space-bg">
        <div className="register-content">
          <h1 className="register-title">Thank You for Registering!</h1>
          <p className="register-subtitle"></p>
          <div className="register-form">
            <h2 className="form-title">Your Next Steps!</h2>
            <p>
              Head over to{" "}
              <Link to="/portal/#dashboard" className="email-link">
                your portal
              </Link>{" "}
              to join a team and get started.
            </p>
            <p>
              Join our Discord to stay tuned for further updates regarding the
              competition, workshops, and networking opportunities.
            </p>
            <p>
              <b>Discord</b>:{" "}
              <a href="https://discord.gg/8AzXWMyVkE" className="email-link">
                Discord
              </a>{" "}
            </p>
            <p>
              Contact us at our email:{" "}
              <a href="mailto:boltubc@gmail.com" className="email-link">
                boltubc@gmail.com
              </a>{" "}
              if you have any questions!
            </p>
            <div className="button-row-single">
              <button onClick={() => navigate("/")} className="continue-button">
                Return Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
