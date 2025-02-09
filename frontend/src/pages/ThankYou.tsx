import React from 'react';
import { useNavigate } from "react-router-dom";

export default function ThankYou() {
  const navigate = useNavigate();
  return (
    <>
    <h1>thanks ig</h1>
      <button onClick={() => navigate("/")}>
        Home
      </button>
      <button onClick={() => navigate("/portal/team")}>
        Join a Team
      </button>
    </>
  );
}




