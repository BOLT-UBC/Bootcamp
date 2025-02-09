import React from "react";
import { useNavigate } from "react-router-dom";

import FullFolder from "../components/Folder/FullFolder";
import PortalBoxWidget from "../components/PortalBoxWidget";

import CryCat from "../components/assets/CryCat.jpg";

import "./Team.css";

const teammateCardStyle = {
  display: "flex",
  flexdirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "20%",
  height: "45%",
  aspectRatio: "1",
  gap: "2rem",
};

const pendingRequestCardStyle = {
  display: "flex",
  flexDirection: "row",
  width: "30%",
  alignItems: "center",
  padding: "1rem"
};

export default function Team() {
  const navigate = useNavigate();

  return (
    <>
      <div className="hehehaha">
        <FullFolder>
          <div className="team_content_wrapper">
            <div className="teammate_cards_wrapper">
              <PortalBoxWidget style={teammateCardStyle}>
                <img src={CryCat} className="teammate_profile_picture"></img>
                <span className="teammate_name">Leo Shang</span>
              </PortalBoxWidget>
              <PortalBoxWidget style={teammateCardStyle}>
                <img src={CryCat} className="teammate_profile_picture"></img>
                <span className="teammate_name">Leo Shang</span>
              </PortalBoxWidget>
              <PortalBoxWidget style={teammateCardStyle}>
                <img src={CryCat} className="teammate_profile_picture"></img>
                <span className="teammate_name">Leo Shang</span>
              </PortalBoxWidget>
              <PortalBoxWidget style={teammateCardStyle}>
                <img src={CryCat} className="teammate_profile_picture"></img>
                <span className="teammate_name">Leo Shang</span>
              </PortalBoxWidget>
            </div>
            <div className="pending_requests_cards_wrapper">
              <PortalBoxWidget style={pendingRequestCardStyle}>
                <img
                  src={CryCat}
                  className="pending_request_profile_picture"
                ></img>
                <div className="pending_request_desc">
                  <span className="teammate_name">Leo Shang</span>
                  <div>
                    <button>Accept</button>
                    <button>Reject</button>
                  </div>
                </div>
              </PortalBoxWidget>
            </div>
          </div>
        </FullFolder>
      </div>
    </>
  );
}
