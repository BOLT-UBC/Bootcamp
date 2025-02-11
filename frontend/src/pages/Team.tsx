import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from '../supabase';

import FullFolder from "../components/Folder/FullFolder";
import PortalBoxWidget from "../components/PortalBoxWidget";
import CryCat from "../components/assets/anon-doggo.png";
import earlgreyDoggo from "../components/assets/earl-grey-doggo.png";
import orangeDoggo from "../components/assets/orange-doggo.png";
import cookieDoggo from "../components/assets/cookie-doggo.png";
import caramelDoggo from "../components/assets/caramel-doggo.png";

import "./Team.css";
import NoTeamDisplay from "./NoTeamDisplay";

const doggos = [
  earlgreyDoggo,
  orangeDoggo,
  cookieDoggo,
  caramelDoggo
];


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
  }, []); // Empty array = runs only once

  
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

useEffect(() => {
  getUserTeamID();
})


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
  if (teamID) {
    getTeams();
    getTeamInfo();
  }
}, [teamID]);

const handleLeaveTeam = async () => {
  const storedEmail = localStorage.getItem("user_email");

  if (!storedEmail) {
    console.log("User not logged in.");
    return;
  }

  // Update the user's team_id to null (leave the team)
  const { error } = await supabase
    .from("users")
    .update({ team_id: null })
    .eq("email", storedEmail);

  if (error) {
    console.error("Error leaving the team: ", error.message);
  } else {
    console.log("Successfully left the team!");
    setHasTeam(false); // Update state to reflect the user is not in a team
    setTeamID(""); // Clear the team ID
  }
};


  return (
    <>
      <div className="team-page-wrapper">
            {hasTeam ? <div className="team_content_wrapper">
                <h1>Team {teamName} #{teamID}</h1>
                <div className="teammate_cards_wrapper">
                    {members.map((member, index) => (
                      <div className="teammate-widget">
                        <PortalBoxWidget key={member.id}>
                          <img src={doggos[index % doggos.length] || CryCat}  className="teammate_profile_picture"></img>
                          {/* <div className="member-info"> */}
                            <h3 className="teammate-name">{member.preferred_name}|{member.pronouns}</h3>
                            <h3 className="teammate-major">Year {member.year} {member.major} </h3>
                          {/* </div> */}

                        </PortalBoxWidget>
                      </div>
                    ))}
                </div>
                <h4 className='note-team-members'>
                    For someone to join your team, they will need your 4-digit team ID.
                </h4>
                {hasTeam && (
                <button onClick={handleLeaveTeam} className="leave-team-button">
                  Leave Team
                </button>
              )}
            </div> : <NoTeamDisplay/>}
      </div>
    </>
  )
}