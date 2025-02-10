import { useEffect, useState } from "react";
import { supabase } from "../supabase.js";
import React from "react";
import { useNavigate } from "react-router-dom";
import FinalPage from "./FinalPage.js";

export default function ProtectedResponses() {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [registered, setRegistered] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (user) {
        setIsAuthenticated(true);

        // Check if user is registered
        const { data, error: userError } = await supabase
          .from("users")
          .select("registered")
          .eq("email", user.email)
          .single();

        if (userError) {
          console.error("Error checking registration:", userError.message);
        } else if (data?.registered) {
          setRegistered(true);
        }
      } else {
        setIsAuthenticated(false);
      }

      setLoading(false);
    };

    checkAuth();
  }, []);

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        navigate(`/login?redirect=%2Fregistration`);
      } else if (registered) {
        navigate("/registration/page-4"); // Redirect if user is not registered
      }
    }
  }, [loading, isAuthenticated, registered, navigate]);

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

  return <FinalPage />;
}
