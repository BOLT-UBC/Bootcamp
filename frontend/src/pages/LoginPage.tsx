import React from "react";
import SpaceBG from "../components/SpaceBG";

import "./LoginPage.css";
import "./LandingPage.css";

import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  return (
    <div className="space-gradient container">
      {/* <SpaceBG /> */}
      <div className="login-content">
        <h1 className="login-title">Bootcamp</h1>
        <p className="login-subtitle">Welcome to BOLT Bootcamp 2025!</p>
        <button
          className="google-button"
          onClick={() => navigate("/registration")}
        >
          <img
            src="/Google__G__logo.svg"
            alt="Google Logo"
            className="google-logo"
          />
          <span>Sign in with Google</span>
        </button>
      </div>
    </div>
  );
}
