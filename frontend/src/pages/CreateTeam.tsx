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
  const [shortId, setId] = useState<string>("");
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
    setId(code);

    try {
        const { data, error } = await supabase
            .from("teams")
            .upsert([{ 
                id: shortId,
                team_name: teamName
            }], { onConflict: 'team_name'})
            .select('*');
    
        if (error) throw error;
        console.log("Team saved:", data);
        setMadeTeam(true)
        setId(shortId)
    } catch (err: any) {
        console.error("Error creating team:", err.message);
    }

    const storedEmail = localStorage.getItem("user_email");

    const { data, error } = await supabase
        .from('users')
        .update({
            team_id: shortId,
        })
        .eq('email', storedEmail);
};

const navigationComponent = 
<div className="portal_page__navbar">
  <div className="navbar__my_portal_wrapper">
    <h3 className="navbar__section_title">My Portal</h3>
    <nav className="navbar__links">
      <a
        className="link"
        onClick={() => setActivePage("Dashboard")}
        href="#dashboard"
      >
        Dashboard
      </a>
      <a
        className="link link__last"
        onClick={() => setActivePage("My Team")}
        href="#my-team"
      >
        My Team
      </a>
    </nav>
  </div>
  <div className="navbar__general_wrapper">
    <h3 className="navbar__section_title">General</h3>
    <nav className="navbar__links">
      <a
        className="link"
        onClick={() => setActivePage("Schedule")}
        href="#schedule"
      >
        Schedule
      </a>
      <a
        className="link link__last"
        onClick={() => setActivePage("FAQ")}
        href="#faq"
      >
        FAQ
      </a>
    </nav>
  </div>
  <button className="logout_button" onClick={() => signOut()}>
    Log Out{" "}
  </button>
</div>


  return (
    <>
      {activePage === "create" ? (
        <div className="hehehaha">
        <div className="folder-contents">
            <h1 className='instruction'>What would you like to name your team?</h1>
            <div className="team-input">
                <ShortText
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    placeholder="Your Team Name"
                    need={true} 
                />
                {!madeTeam && <button className="teams-button-join" onClick={send}>
                    Create Team
                </button>}
            </div>
            
            {madeTeam && <p className='message'>Team {teamName} successfully created! Your team ID is: {shortId}.</p>}
            {message.length > 0 ? <p className='message'>{message}</p> : null}
            <h4 className='note'>
                For someone to join your team, they will need your team ID. Note that we will only show this ID to you once.
            </h4>
            <button className="teams-button" onClick={() => setActivePage("Dashboard")}>
                Back to Dashboard
            </button>
            </div>
    </div>
            ) : (
                <Dashboard/>
        )}
    </>
  );
}