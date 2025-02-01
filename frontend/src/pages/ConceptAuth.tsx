import React from 'react';
import { useNavigate } from "react-router-dom";
import { supabase } from '../supabase.js';


export default function ConceptAuth() {
  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    const { user, session, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });

    if (error) {
      console.error("Google Sign-In Error:", error);
    } else {
      console.log("User:", user);
      console.log("Session:", session);
    }
  };

  return (
    <>
      <h1>Concept Authentication Page!!</h1>
      <button onClick={signInWithGoogle}>
        Sign in with google
      </button>
    </>
  );
}





