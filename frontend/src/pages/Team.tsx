import React from 'react';
import { useNavigate } from "react-router-dom";

export default function Team() {
  const navigate = useNavigate();
  return (
    <>
    <h1>Make ur team</h1>
      <button onClick={() => navigate("/registration/thankyou")}>
        Next
      </button>
    </>
  );
}




