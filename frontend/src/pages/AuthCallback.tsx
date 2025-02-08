import React from 'react';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { supabase } from '../supabase.js';


export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleRedirect = async () => {
      const { data: user, error } = await supabase.auth.getUser();
      navigate("/registration");
    

      // TODO: Logic once table ready 

      
      if (error || !user) {
        console.log("Not Logged In")
        //console.error("Authentication failed:", error);
        //router.push("/registration");
        //return;
      }
      
      console.log(user);

      /*
      const { data: existingUser, error: userError } = await supabase
        .from("users")
        .select("id")
        .eq("id", user.id)
        .single();

      if (userError || !existingUser) {
        router.push("/registration"); 
      } else {
        router.push("/portal"); 
      }
      */
    
    };
    handleRedirect();
  }, [navigate]);

  return <div>Loading...</div>;
};






