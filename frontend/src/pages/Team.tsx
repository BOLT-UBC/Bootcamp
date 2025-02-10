import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TeamDisplay from "./TeamDisplay";
import NoTeamDisplay from "./NoTeamDisplay";
import { supabase } from '../supabase';

import FullFolder from "../components/Folder/FullFolder";
import PortalBoxWidget from "../components/PortalBoxWidget";

import CryCat from "../components/assets/CryCat.jpg";

import "./Team.css";


export default function Team() {
  const navigate = useNavigate();
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

  return (
    <>
      <div className="hehehaha">
        <FullFolder>
          {hasTeam ? <TeamDisplay /> : <NoTeamDisplay />}
        </FullFolder>
      </div>
    </>
  );
}
