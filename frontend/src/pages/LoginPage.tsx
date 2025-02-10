import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "../supabase";
import SpaceBG from "../components/SpaceBG";

import "./LoginPage.css";
import "./LandingPage.css";

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  // Get intended redirection page
  const redirectTo = new URLSearchParams(location.search).get("redirect");

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error || !user) {
        setLoading(false); // User is not signed in, show login page
        return;
      }

      const userEmail = user.email ?? "";

      // Check if the user is registered
      const { data: existingUser, error: queryError } = await supabase
        .from("users")
        .select("registered")
        .eq("email", userEmail)
        .single();

      if (queryError || !existingUser || !existingUser.registered) {
        navigate("/registration"); // User is not registered, redirect
      } else {
        navigate("/portal"); // User is registered, redirect
      }
    };

    checkAuth();
  }, [navigate]);

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?redirect=${
          redirectTo || "portal"
        }`,
      },
    });

    if (error) {
      console.error("Google Sign-In Error:", error);
    }
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          background:
            "linear-gradient(to top, #693b48 0%, #422932 19%, #17161b 81%)",
        }}
      >
        <div style={{ fontSize: "24px", fontWeight: "bold", color: "#fff" }}>
          Checking authentication...
        </div>
      </div>
    );
  }

  return (
    <div className="space-gradient container">
      <div className="space-bg">
        <div className="login-content">
          <h1 className="login-title">Bootcamp</h1>
          <p className="login-subtitle">Welcome to BOLT Bootcamp 2025!</p>
          <button className="google-button" onClick={signInWithGoogle}>
            <img
              src="/Google__G__logo.svg"
              alt="Google Logo"
              className="google-logo"
            />
            <span>Sign in with Google</span>
          </button>
        </div>
      </div>
    </div>
  );
}
