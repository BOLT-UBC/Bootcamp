import React from 'react';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { supabase } from '../supabase.js';


export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleRedirect = async () => {
      const { data: {user}, error } = await supabase.auth.getUser();
      
      if (error || !user) {
        // Not Logged In
        navigate("/");
        return;
      }
      
      const { data: existingUser, error: queryError } = await supabase
        .from("responses")
        .select("user_email")
        .eq("user_email", user?.email)
        .single();

      if (queryError || !existingUser) {
        // Haven't registered
        navigate("/registration");
      } else {
       // Registered
         navigate("/portal"); 
      }
    
    };
    handleRedirect();
  }, [navigate]);

  return <div>Loading...</div>;
};






