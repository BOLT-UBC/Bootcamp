import React from "react";
import { useNavigate } from "react-router-dom";
import FolderRight from "../components/FolderRight";
import "./Team.css"

export default function Team() {
  const navigate = useNavigate();
  return (
    <FolderRight>
      <div className="team__content-wrapper">
        <p>You are not in a team yet</p>
        <div className="team__buttons-wrapper">
          <button>Join Team</button>
          <button>Create Team</button>
        </div>
      </div>
    </FolderRight>
  );
}
