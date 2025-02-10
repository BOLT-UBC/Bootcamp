import { useEffect, useState } from "react";
import { supabase } from "../supabase.js";
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Portal from "./Portal.js";

export default function ProtectedPortal() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error || !user) {
        navigate(`/login?redirect=${encodeURIComponent(location.pathname)}`); // Preserve redirect
        return;
      }

      // Check if the user is registered
      const { data: existingUser, error: queryError } = await supabase
        .from("users")
        .select("registered")
        .eq("email", user.email)
        .single();

      if (queryError || !existingUser || !existingUser.registered) {
        navigate("/registration"); // Redirect to registration if not registered
      }

      setLoading(false);
    };

    checkAuth();
  }, [navigate, location.pathname]);

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

  return <Portal />;
}
