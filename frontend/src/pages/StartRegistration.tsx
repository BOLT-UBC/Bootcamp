import React from 'react';
import { useNavigate } from "react-router-dom";

export default function StartRegistration() {
  const navigate = useNavigate();
  return (
    <>
    <h1>Start registration</h1>
      <button onClick={() => navigate("/registration/userInfo")}>
        Next
      </button>
    </>
  );
}




