import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from '../supabase';

import FullFolder from "../components/Folder/FullFolder";
import PortalBoxWidget from "../components/PortalBoxWidget";
import CryCat from "../components/assets/CryCat.jpg";

import "./Team.css";
import NoTeamDisplay from "./NoTeamDisplay";

const teammateCardStyle = {
  
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
  const [teamName, setTeamName] = useState("");
  const [hasTeam, setHasTeam] = useState<boolean>(false);
  const [teamID, setTeamID] = useState("");

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
        console.log("There was an error retrieving the user's team ID: ", error);
    } else {
        setTeamID(data[0].team_id);
    }
}


const getTeams = async () => {
    try {
    const { data : teammateData, error } = await supabase
        .from("users")
        .select("*")
        .eq("team_id", teamID);

    if (error) {
        console.log("There was an error retrieving the user's team members: ", error);
    } else {
        setMembers(teammateData);
    }
    } catch (err: any) {
    console.log("There was an error in retrieving the user's team: ", err.message);
    }

    return null
}

const getTeamInfo = async () => {
  try {
    const { data: teamData, error } = await supabase
      .from("teams")
      .select("*")
      .eq("id", teamID)
      .single(); 

    if (error) {
      console.error("Error retrieving team members:", error);
      return;
    }

    if (teamData) {
      setTeamName(teamData.team_name);
    }
  } catch (err: any) {
    console.error("Error retrieving team:", err.message);
  }
};

useEffect(() => {
  checkIfUserHasTeam();
  getUserTeamID();
  getTeams();
  getTeamInfo();
})

  return (
    <>
      <div className="team-page-wrapper">
            {hasTeam ? <div className="team_content_wrapper">
                <h1>Team {teamName} #{teamID}</h1>
                <div className="teammate_cards_wrapper">
                    {members.map((member) => (
                      <div className="teammate-widget">
                        <PortalBoxWidget key={member.id}>
                          <img src={CryCat} className="teammate_profile_picture"></img>
                          {/* <div className="member-info"> */}
                            <h3 className="teammate-name">{member.preferred_name}|{member.pronouns}</h3>
                            <h3 className="teammate-major">Year {member.year} {member.major} </h3>
                          {/* </div> */}

                        </PortalBoxWidget>
                      </div>
                    ))}
                </div>
            </div> : <NoTeamDisplay/>}
      </div>
    </>
  )
}