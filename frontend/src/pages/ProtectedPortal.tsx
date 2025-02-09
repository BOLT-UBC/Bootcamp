import { useEffect, useState } from "react";
import { supabase } from "../supabase.js";
import React from "react";
import { useNavigate } from "react-router-dom";
import Portal from "./Portal.js";

export default function ProtectedPortal() {
  const [loading, setLoading] = useState(true);
  const [isRegistered, setIsRegistered] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (user) {
        // Check Registered
        const { data: existingUser, error: queryError } = await supabase
          .from("responses")
          .select("user_email")
          .eq("user_email", user?.email)
          .single();

        if (queryError || !existingUser) {
          // Haven't registered
          setIsRegistered(false);
        } else {
          // Registered
          setIsRegistered(true);
        }
      } else {
        setIsRegistered(false);
      }

      setLoading(false);
    };

    checkAuth();
  }, []);

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
        <div
          style={{ fontSize: "24px", fontWeight: "bold", color: "#fff" }}
        ></div>
      </div>
    );
  }

  if (!isRegistered) {
    navigate("/");
  }

  return <Portal />;
}
