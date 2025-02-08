import { useEffect, useState } from "react";
import { supabase } from '../supabase.js';
import React from "react";
import { useNavigate } from "react-router-dom";
import UserInfo from "./UserInfo.js";

export default function ProtectedUserInfo() {
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
      const navigate = useNavigate();

    useEffect(() => {
    const checkAuth = async () => {
        const { data: { user }, error } = await supabase.auth.getUser();

        if (user) {
        setIsAuthenticated(true); // User is authenticated
        } else {
        setIsAuthenticated(false); // User is not authenticated
        }

        setLoading(false);
    };

    checkAuth();
    }, []);

    if (loading) {
    return <div> Loading...</div>; 
    }

    if (!isAuthenticated) {
        navigate('/');
    }

  return <UserInfo />; 
};
