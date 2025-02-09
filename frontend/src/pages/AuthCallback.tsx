import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase.js";

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleRedirect = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error || !user) {
        // Not Logged In
        navigate("/");
        return;
      }

      const userEmail = user.email ?? "";
      localStorage.setItem("user_email", userEmail);

      // Check if the user is already registered
      const { data: existingUser, error: queryError } = await supabase
        .from("users")
        .select("registered")
        .eq("email", userEmail)
        .single();

      if (queryError || !existingUser || !existingUser.registered) {
        // Haven't registered
        navigate("/registration");
      } else {
        // Registered
        navigate("/registration/page-4");
      }
    };

    handleRedirect();
  }, [navigate]);

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
        Authenticating...
      </div>
    </div>
  );
}
