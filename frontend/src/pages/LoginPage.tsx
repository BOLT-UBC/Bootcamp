import React from "react";
import SpaceBG from "../components/SpaceBG";

import "./LoginPage.css";
import "./LandingPage.css";

import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase";

export default function LoginPage() {
  const navigate = useNavigate();
  const signInWithGoogle = async () => {
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (!user || authError) {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: `${window.location.origin}/auth/callback`,
            },
        });
        if (error) {
        console.error("Google Sign-In Error:", error);
        } 
    }
    else {
      const userEmail = user.email ?? "";
        await saveUserEmail(userEmail);
        navigate('/auth/callback');
    }
  };

  const saveUserEmail = async (email: string) => {
    try {
      const { error } = await supabase.from("users").upsert(
        [{ email }],
        { onConflict: "email" }
      );
      if (error) throw error;
    } catch (err: any) {
      console.error("Error saving email:", err.message);
    }
  };

  return (
    <div className="space-gradient container">
      {/* <SpaceBG /> */}
      <div className="login-content">
        <h1 className="login-title">Bootcamp</h1>
        <p className="login-subtitle">Welcome to BOLT Bootcamp 2025!</p>
        <button
          className="google-button"
          onClick={signInWithGoogle}
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
