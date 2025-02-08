import React from 'react';
import { useNavigate } from "react-router-dom";
import FolderThin from "../components/FolderThin";

export default function Team() {
  const navigate = useNavigate();

  return (
    <>
        {/* <FolderThin></FolderThin> */}
        <h1>make ur team :D</h1>
        <button onClick={() => navigate("/portal")}>
            Back to Portal
        </button>

        <button onClick={() => navigate("/portal/join-team")}>
            Join Team
        </button>

        <button onClick={() => navigate("/portal/create-team")}>
            Create Team
        </button>
    </>
  );
}
