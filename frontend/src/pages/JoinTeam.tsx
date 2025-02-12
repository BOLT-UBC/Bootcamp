import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from '../supabase';
import ShortText from '../components/ShortText';
import FullFolder from "../components/Folder/FullFolder";
import "./CreateJoin.css"
import Dashboard from './Dashboard';

export default function JoinTeam() {
  const navigate = useNavigate();
  const [id, setId] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const location = useLocation();
  const [email, setEmail] = useState<string>(location.state?.email || "");
  const [activePage, setActivePage] = useState("Join");

  useEffect(() => {
    const storedEmail = localStorage.getItem("user_email");
    if (storedEmail) {
      setEmail(storedEmail);
    } else {
      fetchUserEmail();
    }
  }, []);

  const fetchUserEmail = async () => {
    const { data, error } = await supabase.auth.getUser();
    if (!error && data?.user) {
      setEmail(data.user.email ?? "");
      localStorage.setItem("user_email", data.user.email ?? "");
    }
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Sign Out Error:", error);
    } else {
      console.log("User signed out successfully");
      window.location.href = "/";
    }
  };

  // gets all teams
  const getTeams = async () => {
    const { data, error } = await supabase.from("teams").select("*");

    if (error) {
      console.log("couldn't get teams");
    } else if (data) {
      return data;
    }

    return null;
  };

  // returns true if team is full
  const checkFullness = async (team_id) => {
    const { data, error } = await supabase.from("users").select("team_id");

    if (error) {
      console.log("couldn't get users");
      return;
    }

    let count = 0;

    for (let i = 0; i < data?.length; i++) {
      if (data[i].team_id === team_id) count++;
    }

    return count >= 4;
  };

  const teamExists = async () => {
    const { data, error } = await supabase
      .from("teams")
      .select("id")
      .eq("id", id);

    if (error) {
      return;
    }

    if (data.length !== 0) {
      return true;
    } else {
      return false;
    }
  };

  const userHasTeam = async () => {
    const { data, error } = await supabase
      .from("users")
      .select("team_id")
      .eq("email", email);

    if (error) {
      return;
    }

    if (data[0].team_id !== null) {
      return true;
    } else {
      return false;
    }
  };

  const join = async () => {
    if (email.length <= 0) {
      console.log("You aren't signed in yet.");
      setMessage("You aren't signed in yet.");
      return;
    }

    let full = await checkFullness(id);

    if (full) {
      console.log("The team with the specified ID is full.");
      setMessage("The team with the specified ID is full.");
      return;
    }
    if (id.length !== 4) {
      console.log("ID has to be length 4.");
      setMessage("ID has to be length 4.");
      return;
    }

    let exists = await teamExists();

    if (!exists) {
      console.log("The team with the specified ID does not exist.");
      setMessage("The team with the specified ID does not exist.");
      return;
    }

    let taken = await userHasTeam();

    if (taken) {
      console.log(
        "You have already joined a team, you cannot join another one."
      );
      setMessage(
        "You have already joined a team, you cannot join another one."
      );
      return;
    }

    setMessage("");
    let data = await getTeams();
    if (data == null) {
      console.log("no teams created yet");
      return;
    }
    for (let i = 0; i < data?.length; i++) {
      if (id === data[i].id) {
        // there is a team matching the ID that the user inputted
        const { data, error } = await supabase
          .from("users")
          .update({
            team_id: id,
          })
          .eq("email", email);

        if (error) {
          console.log("Error occurred while trying to update this user.");
          setMessage("Couldn't join this team.");
          return;
        }

        console.log("Team " + id + " successfully joined!");
        setMessage("Team " + id + " successfully joined!");
      }
    }
  };
  //   onClick={() => setActivePage("Dashboard")}
  return (
    <>
      {activePage === "Join" ? (
        <div>
          <a className="teams__dashboard_return" href="#dashboard">
          ← Back to Dashboard
          </a>
          <div className="folder-contents">
            <h1 className="instruction">Enter your team ID below</h1>
            <div className="team-input">
              <ShortText
                value={id}
                onChange={(e) => setId(e.target.value)}
                placeholder="Team ID"
                need={true}
              />
              <button className="teams-button-join" onClick={join}>
                Join
              </button>
            </div>

            {message.length > 0 ? <p className="message">{message}</p> : null}
          </div>
        </div>
      ) : (
        <Dashboard />
      )}
    </>
  );
}