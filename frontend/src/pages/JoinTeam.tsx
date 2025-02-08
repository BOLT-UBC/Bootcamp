import React from 'react';
import { useNavigate } from "react-router-dom";

export default function JoinTeam() {
  const navigate = useNavigate();

  return (
    <>
        <h1>Join a team</h1>
        <button onClick={() => navigate("/portal")}>
            Back to portal
        </button>
    </>
  );
}