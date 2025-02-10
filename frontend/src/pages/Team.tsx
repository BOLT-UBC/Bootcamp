import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from '../supabase';

import FullFolder from "../components/Folder/FullFolder";
import PortalBoxWidget from "../components/PortalBoxWidget";
import CryCat from "../components/assets/CryCat.jpg";

import "./Team.css";
import NoTeamDisplay from "./NoTeamDisplay";

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

type Member = {
    accepted: boolean;
    created_at: string;
    dietary: string;
    email: string;
    id: string;
    major: string;
    name: string;
    preferred_name: string;
    pronouns: string;
    registered: true;
    school: string;
    team_id: string;
    year: number;
};

export default function Team() {
  const [members, setMembers] = useState<Member[]>([]);
  const [hasTeam, setHasTeam] = useState<boolean>(false)
  const checkIfUserHasTeam = async () => {
    const storedEmail = localStorage.getItem("user_email");
    const { data, error } = await supabase
      .from('users')
      .select('team_id')
      .eq("email", storedEmail) 
    
    if (error) {
      console.log("Error occurred while checking if the user has a team: ", error);
    } else {
      if (data[0].team_id == null) {
        setHasTeam(false)
      } else {
        setHasTeam(true)
      }
    }
  }
  useEffect(() => {
    checkIfUserHasTeam();
  })

  
const getUserTeamID = async () => {
    const storedEmail = localStorage.getItem("user_email");
    const { data, error } = await supabase
    .from('users')
    .select('team_id')
    .eq("email", storedEmail) 
    if (error) {
        console.log("There was an error retrieving the user's email: ", error);
    } else {
        return data[0].team_id;
    }
    return null
}

const getTeams = async () => {
    const team_id = await getUserTeamID();
    try {
    const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("team_id", team_id);

    if (error) {
        console.log("There was an error retrieving the user's team members: ", error);
    } else {
        setMembers(data);
    }
    } catch (err: any) {
    console.log("There was an error in retrieving the user's team: ", err.message);
    }

    return null
}

useEffect(() => {
    getTeams();
})

  return (
    <>
      <div className="hehehaha">
            {hasTeam ? <div className="team_content_wrapper">
                <div className="teammate_cards_wrapper">
                    
                    {members.map((member) => (
                    <PortalBoxWidget style={teammateCardStyle} key={member.id}>
                        <img src={CryCat} className="teammate_profile_picture"></img>
                        <span className="teammate-title">
                        <span className="teammate_name">{member.preferred_name}</span>
                        <span className="teammate_pronouns">{member.pronouns}</span>
                        </span>
                        <span className="teammate_name">{member.school}</span>
                        <span className="teammate_name">{member.major}</span>
                    </PortalBoxWidget>
                    ))}
                </div>
            {/* <div className="pending_requests_cards_wrapper">
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
            </div> */}
            </div> : <NoTeamDisplay/>}
      </div>
    </>
  )
}