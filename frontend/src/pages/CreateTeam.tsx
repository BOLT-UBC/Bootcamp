import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import ShortText from '../components/ShortText';
import { supabase } from '../supabase';
import "./Dashboard.css";
import FullFolder from "../components/Folder/FullFolder";
import Dashboard from './Dashboard';

export default function CreateTeam() {
  const navigate = useNavigate();
  const [teamName, setTeamName] = useState<string>("");
  const [shortId, setShortId] = useState<string>("");
  const [madeTeam, setMadeTeam] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [activePage, setActivePage] = useState("create");

  const signOut = async () => {
      const { error } = await supabase.auth.signOut();
  
      if (error) {
        console.error("Sign Out Error:", error);
      } else {
        console.log("User signed out successfully");
        window.location.href = "/";
      }
    };

  // returns the id of the team if it exists, otherwise returns an empty string
  const checkIfTeamExists = async() => {
    const { data, error } = await supabase
        .from('teams')
        .select('id') 
        .eq('team_name', teamName)
        .limit(1); 
    
    if (error) {
        console.log("Error checking if team exists: ", error);
    } else if (data && data.length > 0) {
        return data[0].id
    } else {
        return ""
    }
  }

  const teamExists = async () => {
    const { data, error } = await supabase
        .from('teams')
        .select('id')
        .eq('team_name', teamName);
    
    if (error) {
        return
    }

    if (data.length !== 0) {
        return true;
    } else {
        return false;
    }
 }

    const userHasTeam = async () => {
        const storedEmail = localStorage.getItem("user_email");

        const { data, error } = await supabase
            .from('users')
            .select('team_id')
            .eq('email', storedEmail);

        if (error) {
            return
        }

        if (data[0].team_id !== null) {
            return true;
        } else {
            return false;
        }
   }

  const send = async () => {
    let taken = await userHasTeam();

    if (taken) {
        console.log("You have already joined a team, you cannot create another one.");
        setMessage("You have already joined a team, you cannot create another one.");
        return 
    }

    if (teamName.length <= 0) {
        console.log("Team name must not be empty");
        setMessage("Team name must not be empty");
        return
    }

    let exists = await teamExists();

    if (exists) {
        console.log("This name is taken.");
        setMessage("This name is taken.");
        return 
    }

    setMessage("")

    let id = await checkIfTeamExists()

    if (id.length > 0) {
        console.log("Team already exists, no changes made.");
        return; // Exit the function if the team already exists
    }

    let code = Math.random().toString(36).substring(2, 6);
    setShortId(code);

    try {
        const { data, error } = await supabase
            .from("teams")
            .upsert([{ 
                id: code,
                team_name: teamName
            }], { onConflict: 'team_name'})
            .select('*');
    
        if (error) throw error;
        console.log("Team saved:", data);
        setMadeTeam(true)
    } catch (err: any) {
        console.error("Error creating team:", err.message);
    }

    const storedEmail = localStorage.getItem("user_email");

    const { data, error } = await supabase
        .from('users')
        .update({
            team_id: code,
        })
        .eq('email', storedEmail);
};


  return (
    <>
      {activePage === "create" ? (
        <div className="hehehaha">
                <a className="teams__dashboard_return" href="#dashboard">
                ← Back to Dashboard
          </a>
        <div className="folder-contents">
            <h1 className='instruction'>What would you like to name your team?</h1>
            <div className="team-input-create">
                <ShortText
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    placeholder="Enter team name"
                    need={true} 
                />
                {!madeTeam && <button className="teams-button-join" onClick={send}>
                    Create
                </button>}
            </div>
            
            {madeTeam && <p className='message'>Team {teamName} successfully created! Your team ID is: {shortId}.</p>}
            {message.length > 0 ? <p className='message'>{message}</p> : null}
            <h4 className='note'>
                For someone to join your team, they will need your team ID.
            </h4>

            </div>
    </div>
            ) : (
                <Dashboard/>
        )}
    </>
  );
}