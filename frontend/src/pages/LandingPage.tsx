import React from 'react';
import { useNavigate } from "react-router-dom";


export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <>
      <h1>Booot camp stuff here</h1>
      <button onClick={() => navigate("/registration")}>
        Go to register rn PLSSSSSS
      </button>
    </>
  );
}




